import React from "react";
import { Icon } from "@iconify/react";
import { socialLinks } from "..";

const SocialLink = () => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl md:text-3xl xl:text-[2vw]">Connect with us</h2>
      <div className="flex justify-center gap-4">
        {socialLinks.map((social, idx) => (
          <div
            key={idx}
            className="bg-foreground p-2 text-background transition-colors"
            aria-label={`Connect on social media ${idx}`}
          >
            <Icon icon={social.icon} className="size-6 xl:size-[1.5vw]" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLink;
