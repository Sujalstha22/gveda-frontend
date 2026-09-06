"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

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

    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    try {
      // Simulate form submission sending delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
      });
      setErrors({});

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full bg-transparent border-0 border-b ${errors[field]
      ? "border-b-red-400 focus:border-b-red-400"
      : "border-b-black/50 focus:border-b-primary"
    } py-3 sm:py-3.5 lg:py-[0.8vw] text-sm sm:text-base lg:text-[0.85vw] text-primary placeholder:text-primary/45 font-primary outline-none focus:outline-none focus:ring-0 transition-colors rounded-none`;

  return (
    <section
      aria-label="Contact Form"
      className="w-full max-w-4xl lg:max-w-[55vw] mx-auto px-4 sm:px-8 lg:px-0 my-12 sm:my-16 lg:my-[4vw] select-none"
    >
      {/* ── Section Title ── */}
      <Title
        title="What is on your mind?"
        description="We’d love to hear from you. Send us a message and our specialists will be in touch."
        className="mb-10 sm:mb-14 lg:mb-[3.5vw]"
      />

      {/* ── Success Modal ── */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSuccess(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0A0A0A] border border-white/10 p-8 lg:p-[2.5vw] max-w-md lg:max-w-[30vw] w-full text-center space-y-6 lg:space-y-[1.5vw] rounded-xl lg:rounded-[1vw]"
            >
              {/* Checkmark icon */}
              <div className="mx-auto w-16 h-16 lg:w-[3.8vw] lg:h-[3.8vw] rounded-full border-2 border-foreground flex items-center justify-center">
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="w-8 h-8 lg:w-[1.8vw] lg:h-[1.8vw] text-foreground"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <motion.path
                    d="M5 13l4 4L19 7"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  />
                </motion.svg>
              </div>

              <div className="space-y-2 lg:space-y-[0.5vw]">
                <h3 className="text-white text-lg md:text-xl lg:text-[1.2vw] font-light tracking-[0.2em] uppercase">
                  Message Sent
                </h3>
                <p className="text-foreground/70 text-sm lg:text-[0.8vw] leading-relaxed">
                  Thank you for reaching out. Our team will get back to you shortly.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSuccess(false)}
                className="mt-2 lg:mt-[0.5vw] px-8 py-2.5 lg:px-[2vw] lg:py-[0.6vw] text-xs lg:text-[0.75vw] tracking-[0.25em] uppercase text-white/80 border border-white/20 hover:border-white/40 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Underline Form ── */}
      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 lg:space-y-[2vw]">
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
            rows={5}
            value={form.message}
            onChange={handleChange}
            className={`w-full bg-transparent border-0 border-b ${errors.message
              ? "border-b-red-400 focus:border-b-red-400"
              : "border-b-black/50 focus:border-b-primary"
              } py-3 sm:py-3.5 lg:py-[0.8vw] text-sm sm:text-base lg:text-[0.85vw] text-primary placeholder:text-primary/45 font-primary outline-none focus:outline-none focus:ring-0 transition-colors resize-none rounded-none`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs lg:text-[0.75vw] mt-1 lg:mt-[0.25vw]">
              {errors.message}
            </p>
          )}
        </div>

        {/* Bottom Actions: Right-aligned Send Button */}
        <div className="flex items-center justify-end pt-4 sm:pt-6 lg:pt-[1.5vw]">
          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="px-8 sm:px-10 lg:px-[2.5vw] py-3 lg:py-[0.7vw] rounded-full text-xs sm:text-sm lg:text-[0.8vw] tracking-wider uppercase"
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
