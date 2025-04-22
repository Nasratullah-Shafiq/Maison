import React from "react";
import "./SizeSelector.css";

const SizeSelector = ({ sizes, selectedSize, onSelectSize }) => {
  return (
    <div className="size-selector">
      {sizes.map((size) => (
        <button
          key={size.name}
          className={`size-option ${
            selectedSize === size.name ? "active" : ""
          }`}
          onClick={() => onSelectSize(size.name)}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
