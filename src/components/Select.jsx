import React from "react";

const Select = React.forwardRef(
  ({ label, options = [], className = "", ...rest }, ref) => {
    return (
      <div className="mb-4">
        {label && <label className="block mb-1 font-semibold">{label}</label>}

        <select
          ref={ref}
          className={`w-full border p-2 rounded ${className}`}
          {...rest}
        >
          {options.map((opt, index) => (
            <option key={index} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default Select;
