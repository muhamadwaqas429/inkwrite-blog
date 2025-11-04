// src/components/Button.jsx
import React from "react";

const Button = ({ children, type = "submit", className = "", ...props }) => {
  return (
    <button
      type={type}
      className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
