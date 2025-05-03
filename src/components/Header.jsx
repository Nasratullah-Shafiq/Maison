import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import SearchBar from "./SearchBar";

const Header = ({ cartItemsCount }) => {
  const headerRef = useRef(null);
  const bannerRef = useRef(null);

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

  useEffect(() => {
    // Banner animation
    const bannerTl = gsap.timeline();
    bannerTl.from(bannerRef.current, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    });

    // Header animation with slight delay
    const headerTl = gsap.timeline({ delay: 0.2 });
    headerTl.from(
      headerRef.current.querySelectorAll(
        ".nav-item, .logo, .search-icon, .account-icon, .cart-icon"
      ),
      {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      }
    );

    return () => {
      bannerTl.kill();
      headerTl.kill();
    };
  }, []);

  const closeBanner = () => {
    const banner = bannerRef.current;
    gsap.to(banner, {
      height: 0,
      opacity: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.3,
      onComplete: () => {
        banner.style.display = "none";
      },
    });
  };

  return (
    <>
      <div className="top-banner" ref={bannerRef}>
        <div className="container banner-content">
          <span> Free</span>
          <p>The best things in life are free, now including .....</p>
          <Link to="#" className="learn-more">
            Learn more
          </Link>
          <button className="close-banner" onClick={closeBanner}>
            ×
          </button>
        </div>
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="container header-container">
          <nav className="main-nav">
            <ul className="nav-list">
              <div className="button-container" ref={buttonRef}>
                <div className="corner top-left" ref={topLeftRef}></div>
                <div className="corner top-right" ref={topRightRef}></div>
                <div className="corner bottom-left" ref={bottomLeftRef}></div>
                <div className="corner bottom-right" ref={bottomRightRef}></div>
                <li className="nav-item touch-nav">
                  <Link to="/shop">All Products</Link>
                </li>
              </div>

              <div className="button-container" ref={buttonRef}>
                <div className="corner top-left" ref={topLeftRef}></div>
                <div className="corner top-right" ref={topRightRef}></div>
                <div className="corner bottom-left" ref={bottomLeftRef}></div>
                <div className="corner bottom-right" ref={bottomRightRef}></div>
                <li className="nav-item touch-nav">
                  <Link to="/shop">Collectibles</Link>
                </li>
              </div>
              <div className="button-container" ref={buttonRef}>
                <div className="corner top-left" ref={topLeftRef}></div>
                <div className="corner top-right" ref={topRightRef}></div>
                <div className="corner bottom-left" ref={bottomLeftRef}></div>
                <div className="corner bottom-right" ref={bottomRightRef}></div>
                <li className="nav-item touch-nav">
                  <Link to="/shop">Lifestyle</Link>
                </li>
              </div>
            </ul>
          </nav>
          <Link to="/" className="logo">
            <span>MaisonTissu</span>
          </Link>

          <div className="header-actions">
            <SearchBar />
            <Link to="/login" className="icon-btn account-icon">
              <svg
                aria-hidden="true"
                height="16"
                viewBox="0 0 16 16"
                version="1.1"
                width="16"
                data-view-component="true"
              >
                <path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path>
              </svg>
            </Link>

            <Link to="/cart" className="icon-btn account-icon ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="bag-icon"
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
              {cartItemsCount > 0 && (
                <span className="badge-notification">{cartItemsCount}</span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
