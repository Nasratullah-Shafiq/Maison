import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Hero.css";

const Account = () => {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);

    // Register ScrollTrigger
    ScrollTrigger.refresh();

    // Main page animation
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );

    // Animate each section
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3 + index * 0.1,
          ease: "power2.out",
        }
      );
    });

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Helper to add refs to the array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div ref={pageRef} className="account-page">
      <div className="container">
        <header ref={headerRef} className="account-header">
          <div className="account-user">
            <h1 className="user-name">mary leto</h1>
            <p className="user-email">saanii.bt77@gmail.com</p>
            <button className="sign-out-btn">SIGN OUT</button>
          </div>
        </header>

        <div className="account-content">
          <aside className="account-sidebar">
            <nav className="account-nav">
              <ul className="account-nav-list">
                <li className="account-nav-item">
                  <button
                    className={`account-nav-link ${
                      activeTab === "orders" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("orders")}
                  >
                    Recent Orders
                  </button>
                </li>
                <li className="account-nav-item">
                  <button
                    className={`account-nav-link ${
                      activeTab === "contact" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("contact")}
                  >
                    Contact Info
                  </button>
                </li>
                <li className="account-nav-item">
                  <button
                    className={`account-nav-link ${
                      activeTab === "address" ? "active" : ""
                    }`}
                    onClick={() => handleTabChange("address")}
                  >
                    Address Book
                  </button>
                </li>
              </ul>
            </nav>

            <div className="contact-us-section">
              <h2 className="section-title">Contact Us</h2>
            </div>
          </aside>

          <div className="account-main">
            {activeTab === "orders" && (
              <section ref={addToRefs} className="orders-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="mail-icon">📧</span>
                    My Orders
                  </h2>
                </div>

                <div className="no-orders-message">
                  <p>You don't have any orders yet.</p>
                  <p>
                    Find something you like -{" "}
                    <Link to="/" className="shop-link">
                      Shop now
                    </Link>
                  </p>
                </div>
              </section>
            )}

            {activeTab === "contact" && (
              <section ref={addToRefs} className="contact-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="contact-icon">👤</span>
                    Contact Info
                  </h2>
                </div>

                <div className="contact-info-box">
                  <div className="contact-info-content">
                    <p className="contact-name">mary leto</p>
                    <p className="contact-email">saanii.bt77@gmail.com</p>
                  </div>
                </div>
              </section>
            )}

            {activeTab === "address" && (
              <section ref={addToRefs} className="address-section">
                <div className="section-header">
                  <h2 className="section-title">
                    <span className="address-icon">📚</span>
                    Address Book <span className="address-count">(01)</span>
                  </h2>
                  <button className="add-address-btn">ADD ADDRESS</button>
                </div>

                <div className="address-book-content">
                  <div className="address-card">
                    <div className="address-card-header">
                      <div className="address-name">mary leto</div>
                      <div className="address-default-badge">DEFAULT</div>
                    </div>
                    <div className="address-details">
                      <p>mary leto</p>
                      <p>Afghanistan</p>
                    </div>
                    <div className="address-actions">
                      <button className="edit-address-btn">EDIT</button>
                      <button className="remove-address-btn">REMOVE</button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
