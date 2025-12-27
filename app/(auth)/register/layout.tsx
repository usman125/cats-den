import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Cat's Den account to start your journey to finding your perfect kitten companion.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

