import mongoose, { Schema, Document, Model, CallbackError } from "mongoose";

export interface ICartItem {
  kittenId: string;
  addedAt: Date;
}

export interface ICart extends Document {
  userId?: mongoose.Types.ObjectId;
  sessionId?: string;
  items: ICartItem[];
  updatedAt: Date;
}

const cartItemSchema = new Schema<ICartItem>(
  {
    kittenId: { type: String, required: true },
    addedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const cartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      sparse: true,
    },
    sessionId: {
      type: String,
      sparse: true,
    },
    items: {
      type: [cartItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Custom validation to ensure either userId or sessionId is present
cartSchema.path("sessionId").validate(function (this: ICart) {
  return this.userId || this.sessionId;
}, "Cart must have either userId or sessionId");

// Index for faster queries
cartSchema.index({ userId: 1 }, { sparse: true });
cartSchema.index({ sessionId: 1 }, { sparse: true });
cartSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 604800 }); // Expire anonymous carts after 7 days

const Cart: Model<ICart> =
  mongoose.models.Cart || mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
