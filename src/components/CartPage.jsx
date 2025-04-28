import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import "../styles/CartPage.css";
import arrow from "../assets/arrow.svg";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="cart-item">
      {/* Product Image */}
      <div className="cart-item-image">
        <Link to={`/product/${item.id}`}>
          <img src={item.image} alt={item.name} />
        </Link>
      </div>

      {/* Product Details */}
      <div className="cart-item-details">
        <h3>
          <Link to={`/product/${item.id}`}>{item.name}</Link>
        </h3>

        {item.selectedColor && (
          <p>
            Color: <span className="font-medium">{item.selectedColor}</span>
          </p>
        )}

        {item.selectedSize && (
          <p>
            Size: <span className="font-medium">{item.selectedSize}</span>
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="quantity-control">
        <button
          onClick={() =>
            updateQuantity(item.id, Math.max(1, item.quantity - 1))
          }
        >
          -
        </button>
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={(e) =>
            updateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))
          }
        />
        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
          +
        </button>
      </div>

      {/* Price */}
      <div className="cart-item-price">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button */}
      <div>
        <button
          onClick={() => removeFromCart(item.id)}
          className="remove-button"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="remove-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const CartPage = ({ cartItems, removeFromCart, updateQuantity, cartTotal }) => {
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
  }, []);

  useGSAP(() => {
    gsap.from(".cart-item", {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
    });

    gsap.from(".cart-summary", {
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.2,
      ease: "power2.out",
    });
  }, [cartItems.length]);

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/shop">
          <div className="button-containers" ref={buttonRef}>
            <div className="corner2 top-left" ref={topLeftRef}></div>
            <div className="corner2 top-right" ref={topRightRef}></div>
            <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
            <div className="corner2 bottom-right" ref={bottomRightRef}></div>
            <button className="touch-button">
              Start Shopping
              <img src={arrow} alt="" className="arrow-icon" />
            </button>
          </div>
        </Link>
      </div>
    );
  }

  // Calculate tax (7%)
  const tax = cartTotal * 0.07;
  // Calculate final total
  const finalTotal = cartTotal + tax;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart</h1>
      </div>

      <div className="cart-grid">
        {/* Cart Items */}
        <div className="cart-items-container">
          {/* Cart Header - Desktop Only */}
          <div className="cart-table-header">
            <div>Product</div>
            <div>Details</div>
            <div>Quantity</div>
            <div>Price</div>
            <div></div>
          </div>

          {/* Cart Items */}
          <div>
            {cartItems.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Continue Shopping */}
          <div className="continue-shopping">
            <Link to="/shop">
              <div className="button-containers" ref={buttonRef}>
                <div className="corner2 top-left" ref={topLeftRef}></div>
                <div className="corner2 top-right" ref={topRightRef}></div>
                <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
                <div
                  className="corner2 bottom-right"
                  ref={bottomRightRef}
                ></div>
                <button className="touch-button">
                  Continue Shopping
                  <img src={arrow} alt="" className="arrow-icon" />
                </button>
              </div>
            </Link>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span className="label">Subtotal</span>
            <span className="value">${cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span className="label">Shipping</span>
            <span className="value">Free</span>
          </div>

          <div className="summary-row">
            <span className="label">Tax (7%)</span>
            <span className="value">${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span className="label">Total</span>
            <span className="value">${finalTotal.toFixed(2)}</span>
          </div>

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <div className="payment-methods">
            <p>We accept</p>
            <div className="payment-icons">
              <div className="payment-icon visa"></div>
              <div className="payment-icon mastercard"></div>
              <div className="payment-icon amex"></div>
              <div className="payment-icon paypal"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
