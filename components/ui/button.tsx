"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-terracotta text-white hover:bg-terracotta-dark active:scale-[0.98] shadow-md hover:shadow-lg",
      secondary:
        "bg-coral text-charcoal hover:bg-coral-light active:scale-[0.98]",
      outline:
        "border-2 border-terracotta text-terracotta hover:bg-terracotta hover:text-white bg-transparent",
      ghost:
        "text-charcoal hover:bg-cream-dark bg-transparent",
      danger:
        "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm rounded-lg gap-1.5",
      md: "h-10 px-5 text-base rounded-xl gap-2",
      lg: "h-12 px-7 text-lg rounded-xl gap-2.5",
      icon: "h-10 w-10 rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };










