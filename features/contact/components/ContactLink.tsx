import React from "react";
import { Icon } from "@iconify/react";
import { contactLinks } from "..";

const ContactLink = () => {
  return (
    <div>
      <div className="text-center mb-8 pt-24">
        <h2 className="text-2xl md:text-3xl xl:text-[2vw]">
          Get in touch with us
        </h2>
      </div>
      {/* Contact Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 lg:gap-12 mb-12 lg:mb-24 max-w-5xl mx-auto">
        {contactLinks.map((info, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center text-center space-y-1.5 lg:space-y-2 group ${idx === 2 && "col-span-2 lg:col-span-1"}`}
          >
            <div className=" mb-2 transform group-hover:scale-110 transition-transform">
              <Icon icon={info.icon} className="size-6 xl:size-[1.5vw]" />
            </div>
            <h3 className="text-sm xl:text-[1vw] uppercase tracking-widest">
              {info.title}
            </h3>
            <p className="text-foreground/70 xl:text-[0.8vw] tracking-tight whitespace-pre-line">
              {info.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactLink;
