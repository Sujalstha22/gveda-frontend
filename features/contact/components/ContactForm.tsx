"use client";

import React, { useState } from "react";
import Image from "next/image";
import Button from "@/shared/ui/Button";
import Title from "@/shared/ui/Title";

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));

    if (status) {
      setStatus(null);
    }

    // Clear error for this field when user types
    if (errors[id]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (form.firstName.trim().length < 2) {
      newErrors.firstName = "Please enter your first name.";
    }

    if (form.lastName.trim().length < 1) {
      newErrors.lastName = "Please enter your last name.";
    }

    const allowedDomains = [
      "gmail.com",
      "yahoo.com",
      "outlook.com",
      "hotmail.com",
      "icloud.com",
      "protonmail.com",
      "proton.me",
    ];
    const emailParts = form.email.trim().toLowerCase().split("@");
    const localPart = emailParts[0] || "";
    const domain = emailParts[1] || "";

    if (
      emailParts.length !== 2 ||
      localPart.length < 1 ||
      !allowedDomains.includes(domain) ||
      /^[.]|[.]$|[.]{2}/.test(localPart) ||
      !/^[a-zA-Z0-9._-]+$/.test(localPart)
    ) {
      newErrors.email = "Please use a valid email.";
    }

    if (!/^\+?[\d\s-]{7,15}$/.test(form.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (form.message.trim().length < 6) {
      newErrors.message = "Message must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setStatus({
        type: "error",
        message: "Please correct the errors above and try again.",
      });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      // Simulate form submission sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
      setErrors({});
      setStatus({
        type: "success",
        message: "Message sent successfully. We will be in touch soon.",
      });
    } catch (error) {
      console.error("Submission error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-0 border-b ${
      errors[field]
        ? "border-b-red-400 focus:border-b-red-400"
        : "border-b-black/20 focus:border-b-primary"
    } py-3 sm:py-3.5 lg:py-[0.8vw] text-sm sm:text-base lg:text-[0.88vw] text-primary placeholder:text-primary/85 font-primary outline-none focus:outline-none focus:ring-0 transition-colors rounded-none`;

  return (
    <section
      aria-label="Contact Form"
      className="relative w-full px-4 sm:px-6 lg:px-8 my-14 sm:my-20 lg:my-[5vw] select-none"
    >
      {/* ── Section Title ── */}
      <Title
        eyebrow="Get In Touch"
        title="What is on your mind?"
        description="We’d love to hear from you. Send us a message and our specialists will be in touch."
        className="mb-10 sm:mb-14 lg:mb-[3vw]"
      />

      {/* ── 50vw White Card with Subtle Botanical Accents ── */}
      <div className="relative w-full max-w-[94vw] lg:w-[70vw] mx-auto bg-secondary-light rounded-2xl sm:rounded-3xl lg:rounded-[1.6vw] p-8 sm:p-12 lg:p-[3.5vw] border border-[#ECE4DA] shadow-[0_10px_40px_rgba(0,0,0,0.03)] overflow-visible">
        {/* Subtle Botanical Corner Elements */}
        <div className="absolute -top-8 -right-8 w-32 h-32 lg:w-[12vw] lg:h-[12vw] opacity-15 pointer-events-none select-none z-0">
          <Image
            src="/vector/leaves.png"
            alt=""
            fill
            className="object-contain rotate-45"
          />
        </div>
        <div className="absolute -bottom-8 -left-8 w-28 h-28 lg:w-[10vw] lg:h-[10vw] opacity-10 pointer-events-none select-none z-0">
          <Image
            src="/vector/fl.png"
            alt=""
            fill
            className="object-contain -rotate-12"
          />
        </div>

        {/* ── Form Inputs ── */}
        <form
          onSubmit={handleSubmit}
          className="relative z-10 space-y-6 sm:space-y-8 lg:space-y-[2vw]"
        >
          {/* Row 1: First Name & Last Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 lg:gap-[3vw]">
            <div className="flex flex-col">
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                value={form.firstName}
                onChange={handleChange}
                className={inputClass("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs lg:text-[0.75vw] mt-1 lg:mt-[0.25vw]">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
                className={inputClass("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs lg:text-[0.75vw] mt-1 lg:mt-[0.25vw]">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          {/* Row 2: Phone & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 lg:gap-[3vw]">
            <div className="flex flex-col">
              <input
                type="tel"
                id="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
                className={inputClass("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs lg:text-[0.75vw] mt-1 lg:mt-[0.25vw]">
                  {errors.phone}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className={inputClass("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-xs lg:text-[0.75vw] mt-1 lg:mt-[0.25vw]">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Row 3: Message Textarea */}
          <div className="flex flex-col">
            <textarea
              id="message"
              placeholder="Send us your message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              className={`w-full bg-transparent border-0 border-b ${
                errors.message
                  ? "border-b-red-400 focus:border-b-red-400"
                  : "border-b-black/20 focus:border-b-primary"
              } py-3 sm:py-3.5 lg:py-[0.8vw] text-sm sm:text-base lg:text-[0.88vw] text-primary placeholder:text-primary/80 font-primary outline-none focus:outline-none focus:ring-0 transition-colors resize-none rounded-none`}
            />
            {errors.message && (
              <p className="text-red-500 text-xs lg:text-[0.75vw] mt-1 lg:mt-[0.25vw]">
                {errors.message}
              </p>
            )}
          </div>

          {/* Bottom Actions: Status Span and Send Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 sm:pt-6 lg:pt-[1.5vw]">
            <div className="flex items-center min-h-[1.5rem]">
              {status && (
                <span
                  role="status"
                  aria-live="polite"
                  className={`text-xs sm:text-sm lg:text-[0.85vw] font-primary font-medium tracking-wide ${
                    status.type === "success"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {status.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full sm:w-auto px-8 sm:px-10 lg:px-[2.5vw] py-3 lg:py-[0.7vw] rounded-full text-xs sm:text-sm lg:text-[0.8vw] tracking-wider uppercase cursor-pointer"
            >
              {loading ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
