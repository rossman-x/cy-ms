import React, { useState } from "react";
const Cell = ({ updateText, isCorrect, isLocked, isMisplaced }) => {
  const [text, setText] = useState("");

  const modifyText = (newText) => {
    if (newText) {
      setText(newText[0]);
      updateText(newText[0]);
    }
  };

  return (
    <div
      className={`w-full text-[24px] mx-2 border-2 border-black border-solid text-center ${
        isCorrect
          ? " bg-green-500"
          : isMisplaced
          ? `bg-yellow-500`
          : isLocked
          ? "bg-red-500"
          : "bg-gray-500"
      }`}
    >
      <input
        type="text"
        disabled={isLocked}
        className="w-6 text-center rounded-lg"
        placeholder="-"
        onChange={(e) => modifyText(e.target.value.toUpperCase())}
        value={text}
      />
    </div>
  );
};
export default Cell;
