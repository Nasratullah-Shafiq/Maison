import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import "../styles/CartPage.css";
import Checkout from "./Checkout";

const CartItem = ({ item, removeFromCart, updateQuantity }) => {
  return (
    <div className="cart-item ">
      {/* Product Image (2 cols) */}
      <div className="md:col-span-2">
        <Link to={`/product/${item.slug}`} className="block">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-[100px] object-cover rounded-md"
          />
        </Link>
      </div>

      {/* Product Details (4 cols) */}
      <div className="md:col-span-4">
        <Link
          to={`/product/${item.slug}`}
          className="text-lg font-medium hover:text-primary-600 transition-colors"
        >
          {item.name}
        </Link>

        {item.selectedColor && (
          <p className="text-sm text-gray-500 mt-1">
            Color: <span className="font-medium">{item.selectedColor}</span>
          </p>
        )}

        {item.selectedSize && (
          <p className="text-sm text-gray-500">
            Size: <span className="font-medium">{item.selectedSize}</span>
          </p>
        )}
      </div>

      {/* Quantity (3 cols) */}
      <div className="md:col-span-3 flex items-center">
        <div className="flex items-center">
          <button
            onClick={() =>
              updateQuantity(item.id, Math.max(1, item.quantity - 1))
            }
            className="w-8 h-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateQuantity(
                item.id,
                Math.max(1, parseInt(e.target.value) || 1)
              )
            }
            className="w-12 h-8 border-t border-b border-gray-300 text-center focus:outline-none"
          />
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Price (2 cols) */}
      <div className="md:col-span-2 flex items-center font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove Button (1 col) */}
      <div className="md:col-span-1 flex items-center justify-end">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
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
      <div className="container-custom py-32 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mx-auto text-gray-400 mb-6"
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
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600 mb-8">
          Looks like you haven't added any products to your cart yet.
        </p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 md:py-24">
      <h1 className="text-3xl font-bold mb-12 text-center md:text-left">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-8">
          {/* Cart Header - Desktop Only */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-gray-500 font-medium">
            <div className="md:col-span-2">Product</div>
            <div className="md:col-span-4">Details</div>
            <div className="md:col-span-3">Quantity</div>
            <div className="md:col-span-2">Price</div>
            <div className="md:col-span-1"></div>
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
          <div className="mt-8">
            <Link
              to="/shop"
              className="text-primary-600 hover:text-primary-800 transition-colors inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="cart-summary">
          <div className="cart-summary bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-3 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">
                  ${(cartTotal * 0.07).toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-6 pt-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${(cartTotal + cartTotal * 0.07).toFixed(2)}</span>
              </div>
            </div>
            <Link to={Checkout}>
              <button className="btn-primary w-full py-4">Checkout Now </button>
            </Link>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>We accept</p>
              <div className="flex justify-center space-x-2 mt-2">
                <div className="w-10 h-6 bg-blue-800 rounded"></div>
                <div className="w-10 h-6 bg-red-600 rounded"></div>
                <div className="w-10 h-6 bg-gray-800 rounded"></div>
                <div className="w-10 h-6 bg-yellow-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
