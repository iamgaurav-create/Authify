import React, { useRef } from "react";

const OTPInput = ({ length = 6, value = "", onChange }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, idx) => {
    const val = e.target.value.replace(/\D/, ""); // only digits
    if (!val) return;

    const newValue =
      value.substring(0, idx) + val + value.substring(idx + 1);

    onChange(newValue);

    // Move to next box if not last
    if (idx < length - 1) {
      inputsRef.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace") {
      e.preventDefault();

      let newValue =
        value.substring(0, idx) + "" + value.substring(idx + 1);
      onChange(newValue);

      if (idx > 0) {
        inputsRef.current[idx - 1].focus();
      }
    }
  };

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, idx) => (
        <input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          ref={(el) => (inputsRef.current[idx] = el)}
          value={value[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
          className="otp-input"
        />
      ))}
    </div>
  );
};

export default OTPInput;
