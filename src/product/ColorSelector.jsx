import React from "react";
import "./ColorSelector.css";

const ColorSelector = ({ colors, selectedColor, onSelectColor }) => {
  const getColorStyle = (colorName) => {
    switch (colorName) {
      case "white":
        return "#ffffff";
      case "blue":
        return "#3b5998";
      case "mint":
        return "#a7e8bd";
      case "gray":
        return "#7d8491";
      case "beige":
        return "#e8d2b7";
      case "decorative":
        return "linear-gradient(45deg, #3b5998 25%, #a7e8bd 25%, #a7e8bd 50%, #7d8491 50%, #7d8491 75%, #e8d2b7 75%)";
      case "monogram":
        return "linear-gradient(45deg, #ffffff 50%, #000000 50%)";
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="color-selector">
      {colors.map((color) => (
        <button
          key={color.name}
          className={`coloroption ${
            selectedColor === color.name ? "active" : ""
          }`}
          style={{
            background: getColorStyle(color.name),
            border: color.name === "white" ? "1px solid #e0e0e0" : "none",
          }}
          onClick={() => onSelectColor(color.name)}
          aria-label={`Select ${color.label}`}
          title={color.label}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
