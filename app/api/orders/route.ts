import { z } from "zod";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db/connection";
import Order from "@/lib/db/models/order";
import { Errors, handleAPIError, apiSuccess } from "@/lib/api/errors";

const orderSchema = z.object({
  items: z.array(
    z.object({
      kittenId: z.string(),
      kittenName: z.string(),
      kittenBreed: z.string(),
      price: z.number(),
      image: z.string().optional(),
    })
  ),
  shippingAddress: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string(),
    phone: z.string(),
  }),
  subtotal: z.number(),
  shipping: z.number(),
  tax: z.number(),
  total: z.number(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Errors.unauthorized();
    }

    const body = await request.json();
    const result = orderSchema.safeParse(body);

    if (!result.success) {
      return Errors.validationError(result.error.issues[0].message);
    }

    const db = await connectToDatabase();
    if (!db) {
      return Errors.databaseError();
    }

    const order = new Order({
      userId: session.user.id,
      ...result.data,
    });

    await order.save();

    return apiSuccess(
      {
        orderNumber: order.orderNumber,
        message: "Order created successfully",
      },
      201
    );
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Errors.unauthorized();
    }

    const db = await connectToDatabase();
    if (!db) {
      return Errors.databaseError();
    }

    const orders = await Order.find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    return apiSuccess(orders);
  } catch (error) {
    return handleAPIError(error);
  }
}










