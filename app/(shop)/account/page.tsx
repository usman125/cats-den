import { redirect } from "next/navigation";
import Link from "next/link";
import { auth, signOut } from "@/lib/auth";
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { Button, Card } from "@/components/ui";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const menuItems = [
    {
      href: "/account/orders",
      icon: Package,
      label: "My Orders",
      description: "Track your orders and view history",
    },
    {
      href: "/account/wishlist",
      icon: Heart,
      label: "Wishlist",
      description: "Kittens you've saved for later",
    },
    {
      href: "/account/addresses",
      icon: MapPin,
      label: "Addresses",
      description: "Manage your shipping addresses",
    },
    {
      href: "/account/settings",
      icon: Settings,
      label: "Settings",
      description: "Account preferences and security",
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <div className="bg-gradient-hero py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-coral-light rounded-full flex items-center justify-center">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-terracotta" />
              )}
            </div>
            <div>
              <h1 className="font-heading text-3xl font-bold text-charcoal">
                {session.user.name || "Welcome"}
              </h1>
              <p className="text-charcoal-light">{session.user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {menuItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Card
                variant="elevated"
                hoverable
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-coral-light rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-terracotta" />
                </div>
                <div className="flex-1">
                  <h2 className="font-heading font-semibold text-charcoal">
                    {item.label}
                  </h2>
                  <p className="text-sm text-charcoal-light">
                    {item.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-charcoal-light" />
              </Card>
            </Link>
          ))}
        </div>

        {/* Sign out */}
        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <Button type="submit" variant="outline" leftIcon={<LogOut className="w-4 h-4" />}>
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}










