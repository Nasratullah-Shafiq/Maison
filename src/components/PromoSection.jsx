import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import playingCardsImg from "../assets/bg2.png";
import arrow from "../assets/arrow.svg";
import "../styles/Hero.css";
import ChairCarousel from "./ChairCarousel";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const PromoSection = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

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
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Badge animation
    tl.from(badgeRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.7)",
    });

    // Title, text and button animations
    tl.from(
      [titleRef.current, textRef.current, buttonRef.current],
      {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.3"
    );

    // Image animation
    tl.from(
      imageRef.current,
      {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    );

    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
    };
  }, []);

  return (
    <section className="promo-section" ref={sectionRef}>
      <div className="container promo-container">
        <div className="promo-content" ref={contentRef}>
          <div className="promo-badge" ref={badgeRef}>
            New
          </div>
          <h2 ref={titleRef}>Design your dream Home</h2>
          <p ref={textRef}>
            This Octocat has some new tricks! Play your best hand (or tentacle!)
            with this deck of custom playing cards.
          </p>
          <div className="button-container" ref={buttonRef}>
            <div className="corner2 top-left" ref={topLeftRef}></div>
            <div className="corner2 top-right" ref={topRightRef}></div>
            <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
            <div className="corner2 bottom-right" ref={bottomRightRef}></div>
            <button className="touch-button">
              SHOP NOW
              <img src={arrow} alt="" className="arrow-icon" />
            </button>
          </div>
        </div>
        <ChairCarousel />
        {/* <div className="promo-image" ref={imageRef}>
          <img src={playingCardsImg} alt="Octocat Playing Cards" />
        </div> */}
      </div>
    </section>
  );
};

export default PromoSection;
