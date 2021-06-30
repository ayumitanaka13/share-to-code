import React from "react";

const Footer = () => {
  return (
    <div className="h-16 lg:h-32 min-w-full FlexCenter px-8 lg:px-16">
      <div className="text-center Hover">
        <a
          href="https://ayumitanaka.net"
          target="_blank"
          rel="noopener noreferrer"
        >
          <small className="font-poppins text-orange">
            &copy; 2021 {"< "}Ayumi Tanaka{" />"} - All Rights Reserved
          </small>
        </a>
      </div>
    </div>
  );
};

export default Footer;
