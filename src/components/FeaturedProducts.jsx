import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Hero.css";
import products from "../data/products";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const ProductCard = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.image);

  return (
    <div className="productcard product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div
          className="product-image"
          onMouseEnter={() => setCurrentImage(product.alternateImage)}
          onMouseLeave={() => setCurrentImage(product.image)}
        >
          <img src={currentImage} alt={product.name} />
        </div>
        <div className="productinfo">
          <h3 className="productname">{product.name}</h3>
          <p className="productprice">Price ${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

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
    const productElements =
      productsRef.current.querySelectorAll(".product-card");
    gsap.from(productElements, {
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

  // Get only featured products from our data
  const featuredProducts = products.filter((product) => product.featured);

  return (
    <section className="featured-section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Featured Products
        </h2>
        <div className="products-grid" ref={productsRef}>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
