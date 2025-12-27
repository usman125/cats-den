"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Search,
  Heart,
  ChevronDown,
  LogOut,
  Package,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { useCartStore } from "@/stores/cart";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Kittens",
    href: "/kittens",
    children: [
      { name: "All Kittens", href: "/kittens" },
      { name: "Available", href: "/kittens?availability=available" },
      { name: "Reserved", href: "/kittens?availability=reserved" },
    ],
  },
  {
    name: "Breeds",
    href: "/breeds",
    children: [
      { name: "All Breeds", href: "/breeds" },
      { name: "British Shorthair", href: "/breeds/british-shorthair" },
      { name: "Ragdoll", href: "/breeds/ragdoll" },
      { name: "Maine Coon", href: "/breeds/maine-coon" },
      { name: "Persian", href: "/breeds/persian" },
      { name: "Scottish Fold", href: "/breeds/scottish-fold" },
      { name: "Bengal", href: "/breeds/bengal" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const cartItemCount = useCartStore((state) => state.items.length);
  const { data: session, status } = useSession();
  
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-cream-dark">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-terracotta rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <span className="text-2xl">🐱</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-heading text-xl font-bold text-charcoal">
                Cat&apos;s Den
              </span>
              <span className="block text-xs text-charcoal-light -mt-1">
                Premium Kittens
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg font-medium transition-colors inline-flex items-center gap-1",
                    isActive(item.href)
                      ? "text-terracotta bg-terracotta/10"
                      : "text-charcoal hover:text-terracotta hover:bg-terracotta/5"
                  )}
                >
                  {item.name}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform",
                        openDropdown === item.name && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                {item.children && openDropdown === item.name && (
                  <div className="absolute top-full left-0 pt-2 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-xl border border-cream-dark py-2 min-w-[200px]">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-charcoal hover:text-terracotta hover:bg-cream transition-colors"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search button */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {isMounted && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User menu */}
            <div 
              className="relative hidden md:block"
              onMouseEnter={() => isAuthenticated && setIsUserMenuOpen(true)}
              onMouseLeave={() => setIsUserMenuOpen(false)}
            >
              {isLoading ? (
                <Button variant="ghost" size="icon" disabled>
                  <User className="w-5 h-5 animate-pulse" />
                </Button>
              ) : isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="relative"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  >
                    {session?.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-terracotta text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                  </Button>
                  
                  {/* User dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute top-full right-0 pt-2 animate-fade-in z-50">
                      <div className="bg-white rounded-xl shadow-xl border border-cream-dark py-2 min-w-[200px]">
                        <div className="px-4 py-2 border-b border-cream-dark">
                          <p className="font-medium text-charcoal truncate">
                            {session?.user?.name || "User"}
                          </p>
                          <p className="text-sm text-charcoal-light truncate">
                            {session?.user?.email}
                          </p>
                        </div>
                        <Link
                          href="/account"
                          className="flex items-center gap-2 px-4 py-2 text-charcoal hover:text-terracotta hover:bg-cream transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          My Account
                        </Link>
                        <Link
                          href="/account/orders"
                          className="flex items-center gap-2 px-4 py-2 text-charcoal hover:text-terracotta hover:bg-cream transition-colors"
                        >
                          <Package className="w-4 h-4" />
                          My Orders
                        </Link>
                        <button
                          onClick={handleSignOut}
                          className="flex items-center gap-2 px-4 py-2 w-full text-left text-charcoal hover:text-terracotta hover:bg-cream transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-cream-dark animate-slide-down">
            <div className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg font-medium transition-colors",
                      isActive(item.href)
                        ? "text-terracotta bg-terracotta/10"
                        : "text-charcoal hover:text-terracotta hover:bg-terracotta/5"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-1 mt-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-charcoal-light hover:text-terracotta transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile actions */}
            <div className="mt-4 pt-4 border-t border-cream-dark px-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 py-2">
                    {session?.user?.image ? (
                      <img 
                        src={session.user.image} 
                        alt={session.user.name || "User"} 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-terracotta text-white rounded-full flex items-center justify-center text-lg font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-charcoal">
                        {session?.user?.name || "User"}
                      </p>
                      <p className="text-sm text-charcoal-light">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>
                  <Link href="/account" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="w-4 h-4 mr-2" />
                      My Account
                    </Button>
                  </Link>
                  <Link href="/account/orders" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <Package className="w-4 h-4 mr-2" />
                      My Orders
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register" className="flex-1" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
