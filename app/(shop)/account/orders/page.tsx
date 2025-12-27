import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db/connection";
import Order from "@/lib/db/models/order";
import { ChevronLeft, Package, ChevronRight } from "lucide-react";
import { Card, Badge } from "@/components/ui";
import { formatPrice, formatDate } from "@/lib/utils";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  await connectToDatabase();

  const orders = await Order.find({ userId: session.user.id })
    .sort({ createdAt: -1 })
    .lean();

  const statusBadge = {
    pending: { variant: "warning" as const, label: "Pending" },
    confirmed: { variant: "info" as const, label: "Confirmed" },
    processing: { variant: "info" as const, label: "Processing" },
    shipped: { variant: "success" as const, label: "Shipped" },
    delivered: { variant: "success" as const, label: "Delivered" },
    cancelled: { variant: "danger" as const, label: "Cancelled" },
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-8">
        <div className="container mx-auto px-4">
          <Link
            href="/account"
            className="inline-flex items-center gap-2 text-charcoal-light hover:text-terracotta transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to account
          </Link>
          <h1 className="font-heading text-3xl font-bold text-charcoal">
            My Orders
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {orders.length === 0 ? (
          <Card variant="elevated" className="text-center py-12">
            <div className="w-16 h-16 bg-coral-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-terracotta" />
            </div>
            <h2 className="font-heading text-xl font-semibold text-charcoal mb-2">
              No orders yet
            </h2>
            <p className="text-charcoal-light mb-4">
              When you place an order, it will appear here.
            </p>
            <Link
              href="/kittens"
              className="text-terracotta font-medium hover:underline"
            >
              Browse kittens →
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link key={order._id.toString()} href={`/account/orders/${order.orderNumber}`}>
                <Card variant="elevated" hoverable>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-heading font-semibold text-charcoal">
                          {order.orderNumber}
                        </span>
                        <Badge variant={statusBadge[order.status].variant}>
                          {statusBadge[order.status].label}
                        </Badge>
                      </div>
                      <p className="text-sm text-charcoal-light">
                        {order.items.length} item
                        {order.items.length > 1 ? "s" : ""} •{" "}
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-heading font-semibold text-terracotta">
                        {formatPrice(order.total)}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-charcoal-light flex-shrink-0" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}










