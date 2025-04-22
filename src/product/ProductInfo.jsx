import React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ColorSelector from "./ColorSelector";
import SizeSelector from "./SizeSelector";
import QuantitySelector from "./QuantitySelector";
import "./ProductInfo.css";
import arrow from "../assets/arrow.svg";

const ProductInfo = ({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
}) => {
  const selectedColorObj = product.colors.find((c) => c.name === selectedColor);
  const selectedSizeObj = product.sizes.find((s) => s.name === selectedSize);

  const imageRef = useRef(null);
  const buttonRef = useRef(null);
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    const corners = [
      topLeftRef.current,
      topRightRef.current,
      bottomLeftRef.current,
      bottomRightRef.current,
    ];

    gsap.set(corners, {
      opacity: 0,
      scale: 0,
    });

    const timeline = gsap.timeline({ paused: true });

    timeline.to(corners, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      stagger: 0.05,
      ease: "back.out(1.5)",
    });

    // Add event listeners for hover
    const button = buttonRef.current;

    const handleMouseEnter = () => {
      timeline.play();
    };

    const handleMouseLeave = () => {
      timeline.reverse();
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    // Cleanup
    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = () => {
    const selectedProduct = {
      name: product.name,
      price: product.price,
      color: selectedColorObj?.label || selectedColor,
      size: selectedSizeObj?.label || selectedSize,
      quantity,
    };

    console.log("Adding to cart:", selectedProduct);

    alert(
      `Added to cart: ${quantity} ${selectedProduct.color} ${product.name} (${selectedProduct.size})`
    );
    window.location.href = "/CartPage";
  };

  return (
    <div className="product-info">
      <div className="product-brand">Maison Tissu</div>
      <h2 className="product-name">{product.name}</h2>
      <div className="product-price">${product.price.toFixed(2)}</div>

      <div className="product-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="star">
            ★
          </span>
        ))}
      </div>

      <p className="product-description">{product.description}</p>

      <ul className="product-features">
        {product.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <div className="product-color-section">
        <h3>
          Color <span>{selectedColorObj?.label || selectedColor}</span>
        </h3>
        <ColorSelector
          colors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
        />
      </div>

      <div className="product-size-section">
        <h3>
          Size <span>{selectedSizeObj?.dimensions || selectedSize}</span>
        </h3>
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={setSelectedSize}
        />
      </div>

      <div className="product-quantity-section">
        <h3>Quantity</h3>
        <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />
      </div>

      <div className="button-container button-add" ref={buttonRef}>
        <div className="corner2 top-left" ref={topLeftRef}></div>
        <div className="corner2 top-right" ref={topRightRef}></div>
        <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
        <div className="corner2 bottom-right" ref={bottomRightRef}></div>
        <button className="touch-button" onClick={handleAddToCart}>
          Add To Cart
          <img src={arrow} alt="" className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
