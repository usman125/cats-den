"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, Check } from "lucide-react";
import { Button, Input, Card, Select } from "@/components/ui";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: "", label: "Select a subject" },
  { value: "kitten-inquiry", label: "Kitten Inquiry" },
  { value: "breed-info", label: "Breed Information" },
  { value: "shipping", label: "Shipping Questions" },
  { value: "health", label: "Health Guarantee" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Form data:", data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <Card variant="elevated">
      {isSubmitted ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-sage-dark" />
          </div>
          <h2 className="font-heading text-2xl font-semibold text-charcoal mb-2">
            Message Sent!
          </h2>
          <p className="text-charcoal-light">
            Thank you for reaching out. We&apos;ll get back to you soon.
          </p>
        </div>
      ) : (
        <>
          <h2 className="font-heading text-xl font-semibold text-charcoal mb-6">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Name"
                error={errors.name?.message}
                {...register("name")}
              />
              <Input
                label="Email"
                type="email"
                error={errors.email?.message}
                {...register("email")}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Phone (optional)"
                type="tel"
                {...register("phone")}
              />
              <Select
                label="Subject"
                options={subjectOptions}
                error={errors.subject?.message}
                {...register("subject")}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-charcoal mb-1.5">
                Message
              </label>
              <textarea
                className="w-full h-32 px-4 py-3 bg-white border-2 border-cream-dark rounded-xl text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 resize-none"
                placeholder="Tell us how we can help..."
                {...register("message")}
              />
              {errors.message && (
                <p className="mt-1.5 text-sm text-red-500">
                  {errors.message.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="lg"
              isLoading={isSubmitting}
              leftIcon={<Send className="w-5 h-5" />}
            >
              Send Message
            </Button>
          </form>
        </>
      )}
    </Card>
  );
}

