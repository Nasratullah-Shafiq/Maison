import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Hero.css";

const ShoppingInfo = () => {
  const pageRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);

    // Register ScrollTrigger
    ScrollTrigger.refresh();

    // Animation for page sections
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Animate each section on scroll
    sectionRefs.current.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
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
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Helper to add refs to the array
  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div ref={pageRef} className="shopping-info-page">
      <div className="container">
        <div className="shopping-info-grid">
          <aside className="shopping-info-sidebar">
            <nav className="sidebar-nav">
              <h3 className="sidebar-title">Shopping Info</h3>
              <ul className="sidebar-nav-list">
                <li className="sidebar-nav-item">
                  <a href="#time-to-process" className="sidebar-nav-link">
                    Time to process
                  </a>
                </li>
                <li className="sidebar-nav-item">
                  <a href="#transit-time" className="sidebar-nav-link">
                    Transit time
                  </a>
                </li>
                <li className="sidebar-nav-item">
                  <a href="#size-and-availability" className="sidebar-nav-link">
                    Size and availability
                  </a>
                </li>
                <li className="sidebar-nav-item">
                  <a href="#shipping" className="sidebar-nav-link">
                    Shipping
                  </a>
                </li>
                <li className="sidebar-nav-item">
                  <a href="#returns" className="sidebar-nav-link">
                    Returns
                  </a>
                </li>
                <li className="sidebar-nav-item">
                  <a href="#size-chart" className="sidebar-nav-link">
                    Size chart
                  </a>
                </li>
              </ul>
            </nav>
          </aside>

          <div className="shopping-info-content">
            <h1 className="page-title">Shopping Info</h1>

            <section
              ref={addToRefs}
              id="time-to-process"
              className="info-section"
            >
              <h2 className="section-title">Time to process</h2>
              <p>
                We fulfill all orders Monday through Friday, 9am-5pm ET. Orders
                take approximately 2-3 business days (Monday to Friday) to
                process once the order has been placed. Orders placed on
                Fridays, weekends, and holidays will begin processing the
                following business day. During the holiday season, processing
                times may be longer than usual.
              </p>
              <p>
                Please note that all delivery dates provided at checkout are
                estimates and are not guaranteed. Delivery dates can vary
                depending on the country of delivery, shipping carrier delays,
                and customs processes.
              </p>
              <p>
                If you're interested in placing a large group or bulk order,
                please contact us at{" "}
                <a href="mailto:shop@github.com">shop@github.com</a> and tell us
                how many items you're looking to order, and we can give you
                delivery expectations.
              </p>
            </section>

            <section ref={addToRefs} id="transit-time" className="info-section">
              <h2 className="section-title">Transit time & availability</h2>
              <p>
                Our distribution center is located in the United States. Once
                your order has been processed and packaged, it'll be passed to
                the courier. Transit time will depend on the delivery address
                location.
              </p>
              <p>
                We ship internationally and can deliver to most countries. If
                your country is not listed at checkout, please contact us at{" "}
                <a href="mailto:shop@github.com">shop@github.com</a>.
              </p>
            </section>

            <section
              ref={addToRefs}
              id="size-and-availability"
              className="info-section"
            >
              <h2 className="section-title">Size and availability</h2>
              <p>
                All inventory shown on the site is up to date. If you're looking
                for a size that's not currently listed on the product page,
                please check back later as we restock frequently.
              </p>
            </section>

            <section ref={addToRefs} id="shipping" className="info-section">
              <h2 className="section-title">Shipping</h2>
              <p>
                The GitHub Shop ships to most countries worldwide. Shipping
                costs are calculated at checkout based on your location and the
                items in your order.
              </p>

              <table className="shipping-table">
                <thead>
                  <tr>
                    <th>Delivery Times</th>
                    <th>Continental U.S.</th>
                    <th>Hawaii, Alaska, U.S. territories</th>
                    <th>Canada</th>
                    <th>International</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Standard</td>
                    <td>3-7 days</td>
                    <td>5-10 days</td>
                    <td>5-10 days</td>
                    <td>7-21 days</td>
                  </tr>
                  <tr>
                    <td>Express</td>
                    <td>2-3 days</td>
                    <td>3-5 days</td>
                    <td>3-5 days</td>
                    <td>5-7 days</td>
                  </tr>
                </tbody>
              </table>

              <p className="info-note">
                * Please note that delivery times are estimates and are not
                guaranteed. International shipments may be subject to customs
                delays, which are beyond our control.
              </p>
            </section>

            <section ref={addToRefs} id="returns" className="info-section">
              <h2 className="section-title">Returns</h2>
              <p>
                Our goal is your complete satisfaction with your GitHub Shop
                purchase. If you're not entirely satisfied, we're here to help.
              </p>
              <p>
                You may return or exchange unworn, unwashed, or defective
                merchandise within 30 days of receiving your order. To initiate
                a return, please email{" "}
                <a href="mailto:shop@github.com">shop@github.com</a> with your
                order number and reason for return.
              </p>
              <p>
                Once your return is approved, you will receive return
                instructions. Return shipping costs are the responsibility of
                the customer unless the return is due to a defect or error on
                our part.
              </p>
              <p>
                Unfortunately, we cannot accept returns on customized items,
                unless they are defective or damaged upon receipt.
              </p>
            </section>

            <section ref={addToRefs} id="size-chart" className="info-section">
              <h2 className="section-title">Size Chart</h2>
              <p>
                Finding the right fit is important. Use our size charts below as
                a guide to help you select the best size for your needs.
              </p>

              <h3 className="subsection-title">T-Shirts</h3>
              <table className="size-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>2XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chest (inches)</td>
                    <td>31-33</td>
                    <td>34-36</td>
                    <td>37-39</td>
                    <td>40-42</td>
                    <td>43-45</td>
                    <td>46-48</td>
                  </tr>
                  <tr>
                    <td>Chest (cm)</td>
                    <td>79-84</td>
                    <td>86-91</td>
                    <td>94-99</td>
                    <td>102-107</td>
                    <td>109-114</td>
                    <td>117-122</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="subsection-title">Hoodies</h3>
              <table className="size-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>XS</th>
                    <th>S</th>
                    <th>M</th>
                    <th>L</th>
                    <th>XL</th>
                    <th>2XL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Chest (inches)</td>
                    <td>33-35</td>
                    <td>36-38</td>
                    <td>39-41</td>
                    <td>42-44</td>
                    <td>45-47</td>
                    <td>48-50</td>
                  </tr>
                  <tr>
                    <td>Chest (cm)</td>
                    <td>84-89</td>
                    <td>91-97</td>
                    <td>99-104</td>
                    <td>107-112</td>
                    <td>114-119</td>
                    <td>122-127</td>
                  </tr>
                </tbody>
              </table>

              <p className="info-note">
                * For fitted styles, we recommend sizing up if you prefer a more
                relaxed fit.
              </p>
            </section>

            <section ref={addToRefs} className="info-section">
              <h2 className="section-title">Customer Support</h2>
              <p>
                Have questions or need assistance? Our team is here to help!
              </p>
              <ul className="contact-list">
                <li>
                  <strong>Email:</strong>{" "}
                  <a href="mailto:shop@github.com">shop@github.com</a>
                </li>
                <li>
                  <strong>Hours:</strong> Monday-Friday, 9am-5pm ET
                </li>
                <li>
                  <strong>Response Time:</strong> Within 1-2 business days
                </li>
              </ul>
            </section>

            <section ref={addToRefs} className="info-section">
              <h2 className="section-title">Reviews</h2>
              <p>
                We love hearing from our customers! Reviews help us improve our
                products and service. After receiving your order, you'll receive
                an invitation to leave a product review via email.
              </p>
              <p>
                If you have any questions about products before purchasing, feel
                free to contact us at{" "}
                <a href="mailto:shop@github.com">shop@github.com</a>.
              </p>
            </section>

            <section ref={addToRefs} className="info-section">
              <h2 className="section-title">FAQs</h2>

              <div className="faq-item">
                <h3 className="faq-question">Do you ship internationally?</h3>
                <p className="faq-answer">
                  Yes, we ship to most countries around the world. Shipping
                  costs and delivery times vary by location. If your country is
                  not listed during checkout, please contact us.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">How much does shipping cost?</h3>
                <p className="faq-answer">
                  Shipping costs are calculated at checkout based on
                  destination, weight, and selected shipping method. You'll see
                  the exact cost before completing your purchase.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  Can I modify my order after it's placed?
                </h3>
                <p className="faq-answer">
                  We aim to process orders quickly, so we have limited ability
                  to modify orders once placed. Please contact customer service
                  immediately if you need to make changes.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">What is your return policy?</h3>
                <p className="faq-answer">
                  We accept returns within 30 days of purchase for unworn,
                  unwashed items in original condition. Return shipping is the
                  customer's responsibility unless the item is defective.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  Where is my order? I haven't received a tracking number.
                </h3>
                <p className="faq-answer">
                  Tracking numbers are sent via email once orders are shipped.
                  Please check your spam folder. If you still can't find it,
                  please contact us with your order number.
                </p>
              </div>

              <div className="faq-item">
                <h3 className="faq-question">
                  Are GitHub Shop items different from GitHub Marketplace
                  apparel?
                </h3>
                <p className="faq-answer">
                  Yes, GitHub Shop offers official merchandise from GitHub
                  itself, while GitHub Marketplace apparel may be sold by
                  third-party developers. Our shop items are designed and
                  quality-checked by the GitHub team.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingInfo;
