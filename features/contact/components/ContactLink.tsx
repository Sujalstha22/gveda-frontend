import React from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { contactLinks } from "..";

function getContactMeta(title: string, detail: string) {
  const t = title.toLowerCase();
  if (t.includes("phone")) {
    return {
      icon: (
        <Phone
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.3vw] lg:h-[1.3vw]"
          strokeWidth={1.75}
          aria-hidden
        />
      ),
      href: `tel:${detail.replace(/[^0-9+]/g, "")}`,
      actionLabel: "Call Us",
      isExternal: false,
    };
  }
  if (t.includes("address") || t.includes("map") || t.includes("location")) {
    return {
      icon: (
        <MapPin
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.3vw] lg:h-[1.3vw]"
          strokeWidth={1.75}
          aria-hidden
        />
      ),
      href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        detail,
      )}`,
      actionLabel: "Find Us",
      isExternal: true,
    };
  }
  return {
    icon: (
      <Mail
        className="w-5 h-5 sm:w-6 sm:h-6 lg:w-[1.3vw] lg:h-[1.3vw]"
        strokeWidth={1.75}
        aria-hidden
      />
    ),
    href: `mailto:${detail.trim()}`,
    actionLabel: "Write to Us",
    isExternal: false,
  };
}

const ContactLink = () => {
  return (
    <div className="w-full my-12 sm:my-16 lg:my-[4vw] px-4 sm:px-8 lg:px-[5vw] select-none">
      {/* Contact Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-[1.8vw] max-w-5xl lg:max-w-[62vw] mx-auto">
        {contactLinks.map((info, idx) => {
          const meta = getContactMeta(info.title, info.detail);

          return (
            <a
              key={idx}
              href={meta.href}
              target={meta.isExternal ? "_blank" : undefined}
              rel={meta.isExternal ? "noopener noreferrer" : undefined}
              className="group relative flex flex-col items-center text-center p-7 sm:p-8 lg:p-[2vw] bg-[#FAFAF8] border border-black/10 rounded-2xl lg:rounded-[1.2vw] transition-all duration-300 hover:border-black/30 hover:bg-white hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.04)] cursor-pointer"
            >
              {/* Icon badge */}
              <div className="w-12 h-12 sm:w-13 sm:h-13 lg:w-[3vw] lg:h-[3vw] rounded-full bg-warm-ivory border border-black/10 flex items-center justify-center text-primary mb-4 sm:mb-5 lg:mb-[1vw] group-hover:bg-primary group-hover:text-warm-ivory group-hover:border-primary transition-all duration-300">
                {meta.icon}
              </div>

              {/* Title */}
              <h3 className="text-xs lg:text-[0.72vw] font-semibold uppercase tracking-[0.2em] text-primary/55 mb-2 lg:mb-[0.4vw]">
                {info.title}
              </h3>

              {/* Detail */}
              <p className="text-sm sm:text-base lg:text-[0.95vw] font-medium text-primary tracking-tight leading-relaxed">
                {info.detail}
              </p>

              {/* Action label */}
              <span className="mt-4 lg:mt-[0.9vw] text-xs lg:text-[0.7vw] font-semibold text-primary/40 group-hover:text-primary tracking-wider uppercase transition-colors">
                {meta.actionLabel}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactLink;


