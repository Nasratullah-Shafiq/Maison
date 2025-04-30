import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Hero.css";

const Login = () => {
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const formRef = useRef(null);
  const octocatRef = useRef(null);

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

  // useEffect(() => {
  //   const tl = gsap.timeline({});

  //   tl.from(
  //     textRef.current,
  //     {
  //       y: 30,
  //       opacity: 0,
  //       duration: 0.8,
  //       ease: "power3.out",
  //     },
  //     "-=0.5"
  //   )
  //     .from(
  //       buttonRef.current,
  //       {
  //         y: 20,
  //         opacity: 0,
  //         duration: 0.6,
  //         ease: "power3.out",
  //       },
  //       "-=0.4"
  //     )
  //     .from(
  //       imageRef.current,
  //       {
  //         scale: 0.9,
  //         opacity: 0,
  //         duration: 1,
  //         ease: "power3.out",
  //       },
  //       "-=0.6"
  //     );

  //   return () => {
  //     if (tl.scrollTrigger) {
  //       tl.scrollTrigger.kill();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);

    // Register ScrollTrigger
    ScrollTrigger.refresh();

    // Main page animation
    gsap.fromTo(pageRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 });

    // Content animation
    gsap.fromTo(
      contentRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
    );

    // Form elements animation
    gsap.fromTo(
      formRef.current.querySelectorAll("input, button, a"),
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.4,
      }
    );

    // Octocat animation
    gsap.fromTo(
      octocatRef.current,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        delay: 0.8,
      }
    );

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, we would handle login here
    console.log("Login submitted");
  };

  return (
    <div ref={pageRef} className="login-page">
      <div className="container">
        <div ref={contentRef} className="login-content">
          <h1 className="login-title">Sign into GitHub Shop</h1>
          <p className="login-subtitle">
            Use your email to access your account.
          </p>

          <div className="new-account-prompt">
            <span className="new-account-text">New here?</span>
            <Link to="/" className="create-account-link">
              Create an account
            </Link>
          </div>

          <form ref={formRef} className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <div className="password-header">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <Link to="/" className="forgot-password-link">
                  Forgot your password?
                </Link>
              </div>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>

            <Link to="/shop">
              <div className="buttoncontainers" ref={buttonRef}>
                <div className="corner2 top-left" ref={topLeftRef}></div>
                <div className="corner2 top-right" ref={topRightRef}></div>
                <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
                <div
                  className="corner2 bottom-right"
                  ref={bottomRightRef}
                ></div>
                <button type="submit" className="touchbutton">
                  LOGIN
                </button>
              </div>
            </Link>

            <div className="sso-option">
              <p className="sso-text">
                Have SSO credentials?{" "}
                <Link to="/" className="sso-link">
                  Sign-in here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
