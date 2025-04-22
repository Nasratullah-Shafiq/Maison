import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrow from "../assets/arrow.svg";
import "../styles/Hero.css";
// import products from "./components/products";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  // const buttonRef = useRef(null);
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

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.from(headingRef.current, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .from(
        textRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .from(
        imageRef.current,
        {
          scale: 0.9,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.6"
      );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section className="hero-section" ref={heroRef}>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 ref={headingRef}>
            Wrap <span>Your Home </span>in Elegance & Comfort
          </h1>
          <p ref={textRef}>
            Explore collectibles that celebrate coding, apparel that blends
            comfort with creativity
          </p>
          <Link to="/shop">
            <div className="button-containers" ref={buttonRef}>
              <div className="corner2 top-left" ref={topLeftRef}></div>
              <div className="corner2 top-right" ref={topRightRef}></div>
              <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
              <div className="corner2 bottom-right" ref={bottomRightRef}></div>
              <button className="touch-button">
                SHOP NOW
                <img src={arrow} alt="" className="arrow-icon" />
              </button>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
