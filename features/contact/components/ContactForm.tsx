"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/shared/ui/Button";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
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

    if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (form.address.trim().length < 2) {
      newErrors.address = "Address must be at least 2 characters.";
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

    if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
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
      setForm({ name: "", phone: "", email: "", address: "", message: "" });
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
    `w-full border-none p-4 text-base md:text-sm xl:text-[0.8vw] placeholder:text-foreground/70 outline transition-all ${errors[field]
      ? "outline-red-400 focus:ring-1 focus:ring-red-400"
      : "outline-foreground/30 focus:ring-1 focus:ring-primary"
    }`;

  return (
    <div className="w-full xl:max-w-[50vw] mx-auto space-y-8 mb-16">
      <div className="text-center space-y-4">
        <h2 className="tracking-wide text-2xl md:text-3xl xl:text-[2vw] text-foreground">
          How Can We Help You Shine?
        </h2>
        <p className="xl:text-[1vw] text-foreground/70 max-w-lg xl:max-w-[40vw] mx-auto leading-relaxed">
          Whether you need personalized guidance on our formulations or have
          inquiries about your order, our dedicated skincare specialists are
          here to assist you.
        </p>
      </div>

      {/* Success Modal */}
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
              className="relative bg-[#0A0A0A] border border-white/10 p-8 xl:p-12 max-w-md xl:max-w-[35vw] w-full text-center space-y-6"
            >
              {/* Checkmark icon */}
              <div className="mx-auto w-16 h-16 xl:w-[4vw] xl:h-[4vw] rounded-full border-2 border-foreground flex items-center justify-center">
                <motion.svg
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="w-8 h-8 xl:w-[2vw] xl:h-[2vw] text-foreground"
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

              <div className="space-y-2">
                <h3 className="text-white text-lg md:text-xl xl:text-[1.3vw] font-light tracking-[0.2em] uppercase">
                  Message Sent
                </h3>
                <p className="text-foreground/70 text-sm xl:text-[0.85vw] leading-relaxed">
                  Thank you for reaching out. Our team will get back to you
                  shortly.
                </p>
              </div>

              <button
                onClick={() => setSuccess(false)}
                className="mt-2 px-8 py-2.5 text-xs xl:text-[0.75vw] tracking-[0.25em] uppercase text-white/80 border border-white/20 hover:border-white/40 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={inputClass("name")}
          />
          {errors.name && (
            <p className="text-red-500 text-xs xl:text-[0.8vw] mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            id="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className={inputClass("address")}
          />
          {errors.address && (
            <p className="text-red-500 text-xs xl:text-[0.8vw] mt-1">
              {errors.address}
            </p>
          )}
        </div>

        <div>
          <input
            type="email"
            id="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs xl:text-[0.8vw] mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            id="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={inputClass("phone")}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs xl:text-[0.8vw] mt-1">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <textarea
            id="message"
            placeholder="Message"
            rows={6}
            value={form.message}
            onChange={handleChange}
            className={`${inputClass("message")} resize-none`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs xl:text-[0.8vw] mt-1">
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex justify-center pt-4">
          <Button
            title={loading ? "Sending..." : "Send Message"}
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full md:w-fit"

          > Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
