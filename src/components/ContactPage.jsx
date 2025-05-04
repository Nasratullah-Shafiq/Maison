import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "../styles/Hero.css";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function Contactpage() {
  const formRef = useRef(null);
  const contactInfoRef = useRef(null);
  const headerRef = useRef(null);

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

    // Create GSAP timeline for initial page load animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Form animation with ScrollTrigger
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Create a separate timeline for the form elements
    const formElements = formRef.current.querySelectorAll(".form-element");

    gsap.fromTo(
      formElements,
      { opacity: 0, y: 50, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate contact info items with a more elaborate animation
    const contactItems =
      contactInfoRef.current.querySelectorAll(".contact-item");

    contactItems.forEach((item, index) => {
      const icon = item.querySelector(".contact-icon");
      const details = item.querySelector(".contact-details");

      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      contactTl

        .fromTo(
          icon,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }
        )
        .fromTo(
          details,
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        );
    });

    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="Contactpage">
      {/* Header */}

      {/* Main Content */}
      <main className="main-content">
        <div className="contact-container">
          <div className="contact-header" ref={headerRef}>
            <h1>Contact Us</h1>
            <p>
              If you would like to contact the The Masion Tissu Shop with
              questions, comments, or suggestions, simply complete and submit
              the form. If you need help with a specific order, please include
              the order number in your message.
            </p>
          </div>

          {/* Contact Form */}
          <form className="contact-form" ref={formRef}>
            <div className="form-element">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-element">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-element">
              <label htmlFor="phone">Phone number</label>
              <input type="tel" id="phone" name="phone" />
            </div>

            <div className="form-element">
              <label htmlFor="message">How can we help?</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                required
              ></textarea>
            </div>

            <div className="button-container form-element" ref={buttonRef}>
              <div className="corner2 top-left" ref={topLeftRef}></div>
              <div className="corner2 top-right" ref={topRightRef}></div>
              <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
              <div className="corner2 bottom-right" ref={bottomRightRef}></div>
              <button className="touch-button">SUBMIT</button>
            </div>
          </form>

          <hr className="divider" />

          {/* Contact Information */}
          <div className="contact-info" ref={contactInfoRef}>
            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Phone</h3>
                <p className="phone-number">1-888-250-6439</p>
                <p className="contact-time">
                  Call us toll-free
                  <br />
                  5:00 a.m. – 5:00 p.m. PST
                  <br />
                  Monday – Friday
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Email</h3>
                <p className="email">
                  <a href="mailto:shop@github.com">shop@MAISONTISSU.com</a>
                </p>
                <p className="contact-time">
                  8:00 a.m. – 5:00 p.m. PST
                  <br />
                  Monday – Friday
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div className="contact-details">
                <h3>Mailing Address</h3>
                <p className="address">
                  The GitHub Shop
                  <br />
                  C/O Bensussen, Deutsch & Associates, LLC:15525
                  <br />
                  Woodinville - Redmond Road NE Woodinville,
                  <br />
                  Washington 98072-8577
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}

export default Contactpage;
