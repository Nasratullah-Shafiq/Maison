import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/FeaturedProducts.css";

import hoodieImg from "../assets/bedandpillow.png";
import hoodieHoverImg from "../assets/bedandpillow2.jpg";
import toteImg from "../assets/pillow-blue.png";
import toteHoverImg from "../assets/pillow-blue2.jpg";
import varsityJacketImg from "../assets/bed-spreed.png";
import varsityJacketHoverImg from "../assets/bed-spreed2.jpg";
import monaFigurineImg from "../assets/pillow0.png";
import monaFigurineHoverImg from "../assets/pillow02.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const FeaturedProducts = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    // Title animation
    gsap.from(titleRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    // Products animation - staggered entry
    const products = productsRef.current.querySelectorAll(".product-card");
    gsap.from(products, {
      y: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: productsRef.current,
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Featured product data
  const featuredProducts = [
    {
      id: 1,
      name: '"The Classic" Invertocat Hoodie',
      price: 57,
      image: hoodieImg,
      alternateImage: hoodieHoverImg,
      link: "/products/invertocat-hoodie",
    },
    {
      id: 2,
      name: "All Purpose Tote",
      price: 13,
      image: toteImg,
      alternateImage: toteHoverImg,
      link: "/products/all-purpose-tote",
    },
    {
      id: 3,
      name: "Mona Varsity Jacket",
      price: 100,
      image: varsityJacketImg,
      alternateImage: varsityJacketHoverImg,
      link: "/products/gh-varsity-jacket",
    },
    {
      id: 4,
      name: 'Mona Figurine 5.5"',
      price: 35,
      image: monaFigurineImg,
      alternateImage: monaFigurineHoverImg,
      link: "/products/mona-figurine",
    },
  ];

  return (
    <section className="featured-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Featured Products
        </h2>
        <div className="products-grid" ref={productsRef}>
          {featuredProducts.map((product) => {
            const [currentImage, setCurrentImage] = useState(product.image);
            return (
              <div className="productcard" key={product.id}>
                <a href={product.link} className="product-link">
                  <div
                    className="product-image"
                    onMouseEnter={() => setCurrentImage(product.alternateImage)}
                    onMouseLeave={() => setCurrentImage(product.image)}
                  >
                    <img src={currentImage} alt={product.name} />
                  </div>
                  <div className="productinfo">
                    <h3 className="productname">{product.name}</h3>
                    <p className="productprice">Price ${product.price}</p>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
