import React from "react";
import { Icon } from "@iconify/react";
import { contactLinks } from "..";

const ContactLink = () => {
  return (
    <div className="w-full my-12 sm:my-16 lg:my-[4vw] px-4 sm:px-8 lg:px-[5vw] select-none">
      {/* Contact Info Items */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-[3vw] max-w-5xl lg:max-w-[60vw] mx-auto">
        {contactLinks.map((info, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center text-center space-y-1.5 sm:space-y-2 lg:space-y-[0.4vw] group ${
              idx === 2 ? "col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="mb-2 lg:mb-[0.5vw] transform group-hover:scale-110 transition-transform">
              <Icon icon={info.icon} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-[1.5vw] lg:h-[1.5vw] text-foreground" />
            </div>
            <h3 className="text-xs sm:text-sm lg:text-[0.85vw] font-medium uppercase tracking-widest text-foreground">
              {info.title}
            </h3>
            <p className="text-foreground/70 text-xs sm:text-sm lg:text-[0.8vw] tracking-tight whitespace-pre-line leading-relaxed">
              {info.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactLink;

