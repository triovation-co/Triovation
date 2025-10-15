import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = ({ phoneNumber = "+918828293426", message = "Thank you for contacting Triovaton! Please let us know how we can help you." }) => {
  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className=" fixed bottom-4 right-4 md:bottom-6 md:right-6 
                  flex items-center justify-center 
                  bg-green-500 hover:bg-green-600 
                  text-white shadow-lg rounded-full 
                  w-14 h-14 md:w-16 md:h-16 
                  transition-all duration-300 ease-in-out 
                  hover:scale-110"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </button>
  );
};

export default WhatsAppButton;
