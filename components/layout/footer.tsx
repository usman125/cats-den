import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Kittens", href: "/kittens" },
    { name: "Available Kittens", href: "/kittens?availability=available" },
    { name: "Browse by Breed", href: "/breeds" },
    { name: "Featured Kittens", href: "/kittens?featured=true" },
  ],
  breeds: [
    { name: "British Shorthair", href: "/breeds/british-shorthair" },
    { name: "Ragdoll", href: "/breeds/ragdoll" },
    { name: "Maine Coon", href: "/breeds/maine-coon" },
    { name: "Persian", href: "/breeds/persian" },
    { name: "Scottish Fold", href: "/breeds/scottish-fold" },
    { name: "Bengal", href: "/breeds/bengal" },
  ],
  support: [
    { name: "About Us", href: "/about" },
    { name: "Shipping Info", href: "/shipping" },
    { name: "Health Guarantee", href: "/health-guarantee" },
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Return Policy", href: "/returns" },
  ],
};

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-cream">
      {/* Main footer */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 bg-terracotta rounded-xl flex items-center justify-center">
                <span className="text-3xl">🐱</span>
              </div>
              <div>
                <span className="font-heading text-2xl font-bold text-cream">
                  Cat&apos;s Den
                </span>
                <span className="block text-sm text-cream/70">
                  Premium Kittens
                </span>
              </div>
            </Link>
            <p className="text-cream/80 mb-6 max-w-sm">
              Your trusted source for healthy, well-socialized kittens from
              champion bloodlines. We match loving families with their perfect
              feline companions.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@catsden.com"
                className="flex items-center gap-3 text-cream/80 hover:text-terracotta transition-colors"
              >
                <Mail className="w-5 h-5 text-terracotta" />
                hello@catsden.com
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-cream/80 hover:text-terracotta transition-colors"
              >
                <Phone className="w-5 h-5 text-terracotta" />
                +1 (234) 567-890
              </a>
              <div className="flex items-center gap-3 text-cream/80">
                <MapPin className="w-5 h-5 text-terracotta flex-shrink-0" />
                <span>123 Kitten Lane, Purrville, CA 90210</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-cream/10 rounded-lg flex items-center justify-center hover:bg-terracotta transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Breeds links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Breeds</h3>
            <ul className="space-y-3">
              {footerLinks.breeds.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-cream/80 hover:text-terracotta transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream/60 text-sm text-center md:text-left">
              © {currentYear} Cat&apos;s Den. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-cream/60 text-sm">
              Made with <Heart className="w-4 h-4 text-terracotta mx-1" /> for
              cat lovers everywhere
            </div>
            <div className="flex items-center gap-4">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-cream/60 text-sm hover:text-terracotta transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}










