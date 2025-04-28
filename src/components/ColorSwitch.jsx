import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "../styles/Hero.css";

const ColorSwitch = ({ onColorChange, currentColor = "purple" }) => {
  const colorOptions = [
    { id: "black", label: "black", hex: "black" },
    { id: "white", label: "white", hex: "white" },
    { id: "lightblue", label: "lightblue", hex: "lightblue" },
    { id: "red", label: "Red", hex: "#574b63" },
  ];

  const colorsRef = useRef([]);

  useEffect(() => {
    // Animate the color options appearance
    gsap.fromTo(
      colorsRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.5,
      }
    );

    // Highlight the current color
    highlightCurrentColor();
  }, []);

  useEffect(() => {
    // Update the highlight when the current color changes
    highlightCurrentColor();
  }, [currentColor]);

  const highlightCurrentColor = () => {
    // Reset all colors
    gsap.to(colorsRef.current, {
      scale: 1,
      duration: 0.3,
    });

    // Find the index of the current color
    const currentIndex = colorOptions.findIndex(
      (color) => color.id === currentColor
    );

    if (currentIndex >= 0 && colorsRef.current[currentIndex]) {
      // Highlight the current color
      gsap.to(colorsRef.current[currentIndex], {
        scale: 1.2,
        boxShadow: `0 0 0 3px ${colorOptions[currentIndex].hex}, 0 0 10px rgba(0, 0, 0, 0.3)`,
        duration: 0.3,
      });
    }
  };

  const handleColorClick = (colorId) => {
    onColorChange(colorId);
  };

  return (
    <div className="color-switch">
      {/* <span className="color-switch-label">Choose Color:</span> */}
      <div className="color-options">
        {colorOptions.map((color, index) => (
          <button
            key={color.id}
            ref={(el) => (colorsRef.current[index] = el)}
            className={`color-option ${
              currentColor === color.id ? "active" : ""
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => handleColorClick(color.id)}
            aria-label={`Switch to ${color.label}`}
            title={color.label}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSwitch;
