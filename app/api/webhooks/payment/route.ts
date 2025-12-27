import { NextResponse } from "next/server";
import { getPaymentService } from "@/lib/payments/service";
import { connectToDatabase } from "@/lib/db/connection";
import Order from "@/lib/db/models/order";

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    const paymentService = getPaymentService();

    // Verify the webhook event
    const event = await paymentService.verifyWebhookEvent(payload, signature);

    await connectToDatabase();

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as {
          id: string;
          metadata?: { orderId?: string };
        };

        if (paymentIntent.metadata?.orderId) {
          await Order.findOneAndUpdate(
            { orderNumber: paymentIntent.metadata.orderId },
            {
              paymentStatus: "paid",
              paymentIntentId: paymentIntent.id,
              status: "confirmed",
            }
          );

          console.log(`Order ${paymentIntent.metadata.orderId} marked as paid`);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as {
          id: string;
          metadata?: { orderId?: string };
        };

        if (paymentIntent.metadata?.orderId) {
          await Order.findOneAndUpdate(
            { orderNumber: paymentIntent.metadata.orderId },
            {
              paymentStatus: "failed",
            }
          );

          console.log(`Payment failed for order ${paymentIntent.metadata.orderId}`);
        }
        break;
      }

      case "charge.refunded": {
        const charge = event.data.object as {
          payment_intent?: string;
          metadata?: { orderId?: string };
        };

        if (charge.metadata?.orderId) {
          await Order.findOneAndUpdate(
            { orderNumber: charge.metadata.orderId },
            {
              paymentStatus: "refunded",
              status: "cancelled",
            }
          );

          console.log(`Order ${charge.metadata.orderId} refunded`);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 400 }
    );
  }
}










