import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ColorSwitch from "./ColorSwitch";
import "../styles/Hero.css";

const ChairCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentColor, setCurrentColor] = useState("black");
  const carouselRef = useRef(null);
  const slideRefs = useRef([]);
  const dotsRef = useRef([]);
  const timeline = useRef(null);
  const isAnimating = useRef(false);
  const intervalRef = useRef(null);

  // Chair data with color variations
  const chairsData = [
    {
      id: 1,

      colors: {
        black: new URL("../assets/bedroom-b.jpg", import.meta.url).href,
        white: new URL("../assets/bedroom-w.jpg", import.meta.url).href,
        lightblue: new URL("../assets/bedroom-blue.jpg", import.meta.url).href,
        purple: new URL("../assets/bedroom-p.jpg", import.meta.url).href,
      },
    },
    {
      id: 2,

      colors: {
        black: new URL("../assets/livingroom-b.jpg", import.meta.url).href,
        white: new URL("../assets/livingroom-w.jpg", import.meta.url).href,
        lightblue: new URL("../assets/livingroom-blue.jpg", import.meta.url)
          .href,
        purple: new URL("../assets/livingroom-pr.jpg", import.meta.url).href,
      },
    },
    {
      id: 3,

      colors: {
        black: new URL("../assets/bg2.png", import.meta.url).href,
        blue: new URL("../assets/bg2.png", import.meta.url).href,
        green: new URL("../assets/bg2.png", import.meta.url).href,
        red: new URL("../assets/bg2.png", import.meta.url).href,
      },
    },
  ];

  // Get current chair data with the selected color
  const chairs = chairsData.map((chair) => ({
    ...chair,
    image: chair.colors[currentColor],
  }));

  // Initialize animation timeline
  useEffect(() => {
    // Reset refs with correct length
    slideRefs.current = slideRefs.current.slice(0, chairs.length);
    dotsRef.current = dotsRef.current.slice(0, chairs.length);

    // Set initial position of all slides
    gsap.set(slideRefs.current, {
      opacity: 0,
      scale: 0.8,
      x: "100%",
    });

    // Show the first slide with animation
    const tl = gsap.timeline();

    tl.to(slideRefs.current[currentIndex], {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Add a subtle bounce to the image
    tl.to(
      slideRefs.current[currentIndex].querySelector("img"),
      {
        y: "-10px",
        duration: 0.5,
        ease: "power2.out",
        yoyo: true,
        repeat: 1,
      },
      "-=0.5"
    );

    // Auto-play carousel (commented out for now)
    // intervalRef.current = setInterval(() => {
    //   if (!document.hidden && !isAnimating.current) {
    //     nextSlide();
    //   }
    // }, 8000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Effect for color changes
  useEffect(() => {
    if (slideRefs.current[currentIndex]) {
      const img = slideRefs.current[currentIndex].querySelector("img");

      // Create a smooth transition effect when changing colors
      gsap.to(img, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          // Update image source to new color
          img.src = chairsData[currentIndex].colors[currentColor];

          // Animate back in
          gsap.to(img, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        },
      });

      // Change the color theme
      document.documentElement.style.setProperty(
        "black",
        getColorHex(currentColor)
      );
    }
  }, [currentColor]);

  const getColorHex = (colorName) => {
    const colorMap = {
      black: "black",
      white: "white",
      lightblue: "lightblue",
      red: "#ef4444",
    };
    return colorMap[colorName] || colorMap.purple;
  };

  const updateActiveDot = (index) => {
    gsap.to(dotsRef.current, {
      backgroundColor: "#ccc",
      scale: 1,
      duration: 0.3,
    });

    gsap.to(dotsRef.current[index], {
      backgroundColor: getColorHex(currentColor),
      scale: 1.3,
      duration: 0.3,
    });
  };

  const goToSlide = (index) => {
    if (index === currentIndex || isAnimating.current) return;

    isAnimating.current = true;

    // Create a new timeline
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimating.current = false;
        setCurrentIndex(index);
      },
    });

    // Direction is based on which slide we're moving to
    const direction = index > currentIndex ? 1 : -1;

    // Current slide animation
    tl.to(slideRefs.current[currentIndex], {
      opacity: 0,
      scale: 0.8,
      x: -100 * direction + "%",
      duration: 0.7,
      ease: "power3.in",
    });

    // Next slide preparation
    tl.set(
      slideRefs.current[index],
      {
        x: 100 * direction + "%",
        opacity: 0,
        scale: 0.8,
      },
      0
    );

    // Next slide animation
    tl.to(slideRefs.current[index], {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    // Update active dot
    updateActiveDot(index);
  };

  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % chairs.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + chairs.length) % chairs.length;
    goToSlide(newIndex);
  };

  // Handle color change
  const handleColorChange = (colorId) => {
    setCurrentColor(colorId);
  };

  return (
    <div className="carousel-container">
      <div ref={carouselRef} className="carousel">
        {chairs.map((chair, index) => (
          <div
            key={chair.id}
            ref={(el) => (slideRefs.current[index] = el)}
            className="slide"
          >
            <div className="chair-image">
              <img src={chair.image} alt={chair.title} />
            </div>
          </div>
        ))}

        <ColorSwitch
          className="chair-info"
          onColorChange={handleColorChange}
          currentColor={currentColor}
        />
      </div>
      <div className="carousel-controls">
        <button className="control-button prev" onClick={prevSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="prevsvg"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button className="control-button next" onClick={nextSlide}>
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
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChairCarousel;
