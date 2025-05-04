import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedProducts from "./components/FeaturedProducts";
import PromoSection from "./components/PromoSection";
import CategorySection from "./components/CategorySection";
import Footer from "./components/Footer";
import "./App.css";

import CartPage from "./components/CartPage";
import ShopPage from "./components/ShopPage";
import ContactPage from "./components/ContactPage";
import ShoppingInfo from "./components/ShoppingInfo";
import Login from "./components/Login";
import HeroProduct from "./product/HeroProduct";
import Checkout from "./components/Checkout";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Add to cart function
  const addToCart = (product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove from cart function
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Update cart item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  useEffect(() => {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href");
        if (targetId !== "#") {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: targetId,
              offsetY: 100,
            },
            ease: "power3.inOut",
          });
        }
      });
    });

    // Clean up
    return () => {
      anchorLinks.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <div className="app">
      <Header cartItemsCount={cartItems.length} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <FeaturedProducts />
              <PromoSection />
              <CategorySection />
            </>
          }
        />
        <Route
          path="/product/:id"
          element={<HeroProduct addToCart={addToCart} />}
        />
        <Route
          path="/cart"
          element={
            <CartPage
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              cartTotal={cartTotal}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/shop" element={<ShopPage addToCart={addToCart} />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/shoppinginfo" element={<ShoppingInfo />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />
    </div>
  );
}
export default App;
