/**
 * Abstract payment service interface
 * This provides a provider-agnostic payment layer that can be implemented
 * with Stripe, PayPal, or other payment providers
 */

export interface PaymentAmount {
  amount: number; // In cents
  currency: string;
}

export interface PaymentCustomer {
  id?: string;
  email: string;
  name?: string;
}

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  status: PaymentIntentStatus;
  amount: PaymentAmount;
}

export type PaymentIntentStatus =
  | "requires_payment_method"
  | "requires_confirmation"
  | "requires_action"
  | "processing"
  | "succeeded"
  | "canceled"
  | "failed";

export interface CreatePaymentIntentParams {
  amount: PaymentAmount;
  customer?: PaymentCustomer;
  metadata?: Record<string, string>;
  orderId?: string;
}

export interface PaymentWebhookEvent {
  type: string;
  data: {
    object: unknown;
  };
}

export interface PaymentService {
  /**
   * Create a payment intent for checkout
   */
  createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntent>;

  /**
   * Retrieve a payment intent by ID
   */
  getPaymentIntent(id: string): Promise<PaymentIntent | null>;

  /**
   * Cancel a payment intent
   */
  cancelPaymentIntent(id: string): Promise<boolean>;

  /**
   * Verify and parse a webhook event
   */
  verifyWebhookEvent(
    payload: string | Buffer,
    signature: string
  ): Promise<PaymentWebhookEvent>;

  /**
   * Get the public key for client-side integration
   */
  getPublicKey(): string;
}

/**
 * Mock payment service for development
 * Replace with actual implementation (Stripe, PayPal, etc.)
 */
export class MockPaymentService implements PaymentService {
  private intents: Map<string, PaymentIntent> = new Map();

  async createPaymentIntent(
    params: CreatePaymentIntentParams
  ): Promise<PaymentIntent> {
    const id = `pi_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    const clientSecret = `${id}_secret_${Math.random().toString(36).substring(7)}`;

    const intent: PaymentIntent = {
      id,
      clientSecret,
      status: "requires_payment_method",
      amount: params.amount,
    };

    this.intents.set(id, intent);
    return intent;
  }

  async getPaymentIntent(id: string): Promise<PaymentIntent | null> {
    return this.intents.get(id) || null;
  }

  async cancelPaymentIntent(id: string): Promise<boolean> {
    const intent = this.intents.get(id);
    if (intent) {
      intent.status = "canceled";
      return true;
    }
    return false;
  }

  async verifyWebhookEvent(
    payload: string | Buffer,
    _signature: string
  ): Promise<PaymentWebhookEvent> {
    // In mock mode, just parse the payload
    const data = typeof payload === "string" ? JSON.parse(payload) : JSON.parse(payload.toString());
    return {
      type: data.type || "payment_intent.succeeded",
      data: {
        object: data.data?.object || {},
      },
    };
  }

  getPublicKey(): string {
    return process.env.PAYMENT_PUBLIC_KEY || "pk_test_mock";
  }
}

/**
 * Stripe payment service implementation (ready to activate)
 * Uncomment and configure when Stripe is set up
 */
// import Stripe from 'stripe';
//
// export class StripePaymentService implements PaymentService {
//   private stripe: Stripe;
//   private webhookSecret: string;
//
//   constructor() {
//     this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//       apiVersion: '2023-10-16',
//     });
//     this.webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
//   }
//
//   async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntent> {
//     const intent = await this.stripe.paymentIntents.create({
//       amount: params.amount.amount,
//       currency: params.amount.currency,
//       metadata: {
//         ...params.metadata,
//         orderId: params.orderId || '',
//       },
//       customer: params.customer?.id,
//       receipt_email: params.customer?.email,
//     });
//
//     return {
//       id: intent.id,
//       clientSecret: intent.client_secret!,
//       status: intent.status as PaymentIntentStatus,
//       amount: {
//         amount: intent.amount,
//         currency: intent.currency,
//       },
//     };
//   }
//
//   async getPaymentIntent(id: string): Promise<PaymentIntent | null> {
//     try {
//       const intent = await this.stripe.paymentIntents.retrieve(id);
//       return {
//         id: intent.id,
//         clientSecret: intent.client_secret!,
//         status: intent.status as PaymentIntentStatus,
//         amount: {
//           amount: intent.amount,
//           currency: intent.currency,
//         },
//       };
//     } catch {
//       return null;
//     }
//   }
//
//   async cancelPaymentIntent(id: string): Promise<boolean> {
//     try {
//       await this.stripe.paymentIntents.cancel(id);
//       return true;
//     } catch {
//       return false;
//     }
//   }
//
//   async verifyWebhookEvent(
//     payload: string | Buffer,
//     signature: string
//   ): Promise<PaymentWebhookEvent> {
//     const event = this.stripe.webhooks.constructEvent(
//       payload,
//       signature,
//       this.webhookSecret
//     );
//     return {
//       type: event.type,
//       data: event.data,
//     };
//   }
//
//   getPublicKey(): string {
//     return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
//   }
// }

/**
 * Get the configured payment service
 */
export function getPaymentService(): PaymentService {
  // Switch based on environment variable
  const provider = process.env.PAYMENT_PROVIDER;

  switch (provider) {
    // case 'stripe':
    //   return new StripePaymentService();
    // case 'paypal':
    //   return new PayPalPaymentService();
    default:
      return new MockPaymentService();
  }
}










