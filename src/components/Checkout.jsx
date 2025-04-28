import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Hero.css";

const Checkout = () => {
  const pageRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);

    // Register ScrollTrigger
    ScrollTrigger.refresh();

    // Animation for checkout sections
    const timeline = gsap.timeline();

    timeline.fromTo(
      leftColumnRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    timeline.fromTo(
      rightColumnRef.current,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6" // Start a bit before the previous animation ends
    );

    // Add scroll animations for form sections
    gsap.utils.toArray(".checkout-section").forEach((section, i) => {
      gsap.fromTo(
        section,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 * i,
          scrollTrigger: {
            trigger: section,
            start: "top bottom-=100",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      // Clean up animations
      timeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={pageRef} className="checkout-page">
      <div className="container">
        <div className="checkout-grid">
          <div ref={leftColumnRef} className="checkout-form">
            <h1 className="checkout-title">Express checkout</h1>
            <button className="shop-pay-button">
              <span className="shop-pay-text">Shop</span>
              <span className="shop-pay-icon">Pay</span>
            </button>

            <div className="checkout-divider">
              <span className="divider-line"></span>
              <span className="divider-text">OR</span>
              <span className="divider-line"></span>
            </div>

            <section className="checkout-section">
              <h2 className="section-title">Contact</h2>
              <div className="login-link-container">
                <Link to="/login" className="login-link">
                  Log in
                </Link>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Email or mobile phone number"
                />
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="newsletter"
                  className="checkbox-input"
                />
                <label htmlFor="newsletter" className="checkbox-label">
                  Email me with news and offers
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="section-title">Delivery</h2>
              <div className="form-group">
                <div className="select-wrapper">
                  <select className="form-control">
                    <option value="AF">Afghanistan</option>
                    <option value="AL">Albania</option>
                    <option value="DZ">Algeria</option>
                    <option value="AS">American Samoa</option>
                    {/* More countries would be added here */}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Company (optional)"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Postal code (optional)"
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="input-with-icon">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Phone"
                  />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="section-title">Shipping method</h2>
              <div className="shipping-info-box">
                <div className="shipping-info-icon"></div>
                <p className="shipping-info-text">
                  Order processing times: Please allow 2-3 business days for
                  orders shipping within the United States and 5-7 business days
                  for orders shipping outside of the United States, followed by
                  shipping times. All orders ship from the United States.
                </p>
              </div>

              <div className="shipping-method-placeholder">
                <p className="shipping-method-text">
                  Enter your shipping address to view available shipping
                  methods.
                </p>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="section-title">Payment</h2>
              <p className="payment-secure-text">
                All transactions are secure and encrypted.
              </p>

              <div className="payment-option">
                <div className="payment-option-header">
                  <div className="radio-group">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      className="radio-input"
                      checked
                      readOnly
                    />
                    <label htmlFor="credit-card" className="radio-label">
                      Credit card
                    </label>
                  </div>
                  <div className="credit-card-icons">
                    <span className="card-icon visa">visa</span>
                    <span className="card-icon mastercard">mastercard</span>
                    <span className="card-icon amex">amex</span>
                    <span className="card-icon discover">discover</span>
                    <span className="card-icon more">+3</span>
                  </div>
                </div>
                <div className="credit-card-form">
                  <div className="form-group">
                    <div className="input-with-icon card-number-input">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Card number"
                      />
                      <span className="lock-icon"></span>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Expiration date (MM / YY)"
                      />
                    </div>
                    <div className="form-group">
                      <div className="input-with-icon">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Security code"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                    />
                  </div>

                  <div className="form-checkbox">
                    <input
                      type="checkbox"
                      id="billing-address"
                      className="checkbox-input"
                      checked
                      readOnly
                    />
                    <label htmlFor="billing-address" className="checkbox-label">
                      Use shipping address as billing address
                    </label>
                  </div>
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <h2 className="section-title">Remember me</h2>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="save-info"
                  className="checkbox-input"
                  checked
                  readOnly
                />
                <label htmlFor="save-info" className="checkbox-label">
                  Save my information for a faster checkout with a Shop account
                </label>
              </div>

              <div className="mobile-input-container">
                <div className="country-code">+93</div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile phone number"
                />
              </div>

              <div className="secure-info">
                <span className="secure-icon"></span>
                <span className="secure-text">Secure and encrypted</span>
                <span className="shop-logo">shop</span>
              </div>

              <button className="pay-button">Pay now</button>

              <p className="terms-text">
                Your info will be saved to a Shop account. By continuing, you
                agree to Shop's{" "}
                <a href="#" className="terms-link">
                  Terms of Service
                </a>{" "}
                and acknowledge the{" "}
                <a href="#" className="terms-link">
                  Privacy Policy
                </a>
                .
              </p>
            </section>

            <div className="policy-links">
              <a href="#" className="policy-link">
                Refund policy
              </a>
              <a href="#" className="policy-link">
                Shipping policy
              </a>
              <a href="#" className="policy-link">
                Privacy policy
              </a>
            </div>
          </div>

          <div ref={rightColumnRef} className="checkout-summary">
            <div className="checkout-cart">
              <div className="cart-item">
                <div className="cart-item-image">
                  <img
                    src="https://github-shop.s3.us-west-2.amazonaws.com/product-tshirt.jpeg"
                    alt="Invertocat 4.0 Shirt"
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title">
                    Invertocat 4.0 Shirt - Fitted
                  </div>
                  <div className="cart-item-options">Black / XS / Consumer</div>
                </div>
                <div className="cart-item-price">$25.00</div>
              </div>

              <div className="cart-item">
                <div className="cart-item-image">
                  <img
                    src="https://github-shop.s3.us-west-2.amazonaws.com/product-jacket.jpeg"
                    alt="Mona Varsity Jacket"
                  />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title">Mona Varsity Jacket</div>
                  <div className="cart-item-options">S / Consumer</div>
                </div>
                <div className="cart-item-price">$100.00</div>
              </div>

              <div className="discount-code-container">
                <input
                  type="text"
                  className="discount-code-input"
                  placeholder="Discount code"
                />
                <button className="discount-code-button">Apply</button>
              </div>

              <div className="cart-subtotal">
                <div className="subtotal-label">Subtotal · 2 items</div>
                <div className="subtotal-amount">$125.00</div>
              </div>

              <div className="cart-shipping">
                <div className="shipping-label">Shipping</div>
                <div className="shipping-amount">Enter shipping address</div>
              </div>

              <div className="cart-total">
                <div className="total-label">Total</div>
                <div className="total-amount">
                  <span className="currency">USD</span>
                  <span className="amount">$125.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
