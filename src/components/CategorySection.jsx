import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrow from "../assets/arrow.svg";
import lifestyleImg from "../assets/bed.jpg";
import apparelImg from "../assets/bb1.jpg";
import collectiblesImg from "../assets/pillow-blue2.jpg";
import "../styles/Hero.css";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const CategorySection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const categoriesRef = useRef(null);

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

  useEffect(() => {
    // Title and text animation
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    headerTl
      .from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      })
      .from(
        textRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      )
      .from(
        buttonRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

    // Category cards animation
    const categoryCards =
      categoriesRef.current.querySelectorAll(".category-card");
    gsap.from(categoryCards, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Category data
  const categories = [
    {
      id: 1,
      name: "Bedspreads",
      image: lifestyleImg,
      link: "/shop",
      category: "bedspreads",
    },
    {
      id: 2,
      name: "Blankets",
      image: apparelImg,
      link: "/shop",
      category: "blankets",
    },
    {
      id: 3,
      name: "Pillows",
      image: collectiblesImg,
      link: "/shop",
      category: "pillows",
    },
  ];

  return (
    <section className="category-section" ref={sectionRef}>
      <div className="container">
        <div className="category-header">
          <h2 ref={titleRef}>Shop by category</h2>
          <p ref={textRef}>
            Explore our premium textile collection to transform your home: from
            luxurious bedspreads and cozy blankets to stylish decorative
            pillows.
          </p>
          <Link to="/shop">
            <div className="button-container" ref={buttonRef}>
              <div className="corner2 top-left" ref={topLeftRef}></div>
              <div className="corner2 top-right" ref={topRightRef}></div>
              <div className="corner2 bottom-left" ref={bottomLeftRef}></div>
              <div className="corner2 bottom-right" ref={bottomRightRef}></div>
              <button className="touch-button">
                SHOP ALL
                <img src={arrow} alt="" className="arrow-icon" />
              </button>
            </div>
          </Link>
        </div>

        <div className="categories-grid" ref={categoriesRef}>
          {categories.map((category) => (
            <Link
              to={`/shop?category=${category.category}`}
              state={{ category: category.category }}
              className="category-card"
              key={category.id}
            >
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="category-name">
                {category.name}
                <img src={arrow} alt="" className="category-arrow" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
