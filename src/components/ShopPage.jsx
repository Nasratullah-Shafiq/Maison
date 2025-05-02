import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrow from "../assets/arrow.svg";
import products from "../data/products";
import "../styles/ShopPage.css";

const ShopPage = ({ addToCart }) => {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const productsRef = useRef(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFeatureMenu, setShowFeatureMenu] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");

  // Get category from URL if available
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const categoryFromUrl = urlParams.get("category");

  // Set the active category from URL or location state on component mount
  useEffect(() => {
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    } else if (location.state && location.state.category) {
      setActiveCategory(location.state.category);
    }
  }, [categoryFromUrl, location.state]);

  // Apply sorting and filtering
  useEffect(() => {
    let productsToShow = [...products];

    // Apply category filtering
    if (activeCategory !== "all") {
      productsToShow = productsToShow.filter(
        (product) => product.category === activeCategory
      );
    }

    // Apply sorting
    if (sortBy === "price-low") {
      productsToShow.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      productsToShow.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      // If we had a date field, we'd sort by that
      // For now, just use the id as a proxy for newness
      productsToShow.sort((a, b) => b.id - a.id);
    }
    // featured is the default order from data

    setFilteredProducts(productsToShow);
  }, [sortBy, activeCategory]);

  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);

    // Register ScrollTrigger
    ScrollTrigger.refresh();

    // Header animation
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );

    // Filters animation
    gsap.fromTo(
      filtersRef.current,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", delay: 0.2 }
    );

    // Products animation with stagger
    const productItems = productsRef.current.querySelectorAll(".product-card");
    gsap.fromTo(
      productItems,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: productsRef.current,
          start: "top bottom-=100",
          toggleActions: "play none none none",
        },
      }
    );

    // Initialize filtered products
    setFilteredProducts(products);

    return () => {
      // Clean up animations
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  const toggleFeatureMenu = () => {
    setShowFeatureMenu(!showFeatureMenu);
  };

  const changeSortBy = (value) => {
    setSortBy(value);
    setShowSortMenu(false);
  };

  const handleAddToCart = (product) => {
    addToCart(product);

    // Animation for add to cart button
    gsap.to(`#add-to-cart-${product.id}`, {
      scale: 1.1,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    });
  };

  // Get unique categories from products
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  // Format category name for display
  const formatCategoryName = (category) => {
    if (category === "all") return "All Products";

    // Convert from kebab-case or snake_case to Title Case with spaces
    return category
      .replace(/-|_/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div ref={pageRef} className="products-page">
      <div className="shop-container">
        <div ref={headerRef} className="products-header">
          <div className="breadcrumb">
            <Link to="/">HOME</Link> / <Link to="/shop">SHOP</Link> /
            <span>
              {activeCategory === "all"
                ? " ALL PRODUCTS"
                : ` ${formatCategoryName(activeCategory).toUpperCase()}`}
            </span>
          </div>

          <div className="products-sorting">
            <div className="sort-by">
              <span className="sort-label">SORT BY:</span>
              <div className="sort-dropdown-container">
                <button className="sort-dropdown-btn" onClick={toggleSortMenu}>
                  {sortBy === "featured"
                    ? "FEATURED"
                    : sortBy === "price-low"
                    ? "PRICE: LOW TO HIGH"
                    : sortBy === "price-high"
                    ? "PRICE: HIGH TO LOW"
                    : sortBy === "newest"
                    ? "NEWEST"
                    : "FEATURED"}
                  <img src={arrow} alt="" className="arrow-icon" />
                </button>
                {showSortMenu && (
                  <div className="sort-dropdown-menu">
                    <button
                      className={`sort-option ${
                        sortBy === "featured" ? "active" : ""
                      }`}
                      onClick={() => changeSortBy("featured")}
                    >
                      FEATURED
                    </button>
                    <button
                      className={`sort-option ${
                        sortBy === "price-low" ? "active" : ""
                      }`}
                      onClick={() => changeSortBy("price-low")}
                    >
                      PRICE: LOW TO HIGH
                    </button>
                    <button
                      className={`sort-option ${
                        sortBy === "price-high" ? "active" : ""
                      }`}
                      onClick={() => changeSortBy("price-high")}
                    >
                      PRICE: HIGH TO LOW
                    </button>
                    <button
                      className={`sort-option ${
                        sortBy === "newest" ? "active" : ""
                      }`}
                      onClick={() => changeSortBy("newest")}
                    >
                      NEWEST
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="features-filter">
              <button
                className="feature-dropdown-btn"
                onClick={toggleFeatureMenu}
              >
                FEATURES <img src={arrow} alt="" className="arrow-icon" />
              </button>
              {showFeatureMenu && (
                <div className="feature-dropdown-menu">
                  <div className="feature-option">
                    <input type="checkbox" id="feature-new" />
                    <label htmlFor="feature-new">New Arrivals</label>
                  </div>
                  <div className="feature-option">
                    <input type="checkbox" id="feature-sale" />
                    <label htmlFor="feature-sale">On Sale</label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="products-container">
          <div ref={filtersRef} className="products-sidebar">
            <div className="sidebar-section">
              <h3 className="sidebar-title">All Products</h3>
              <ul className="category-list">
                {categories.map((category) => (
                  <li
                    key={category}
                    className={`category-item ${
                      activeCategory === category ? "active" : ""
                    }`}
                  >
                    <button
                      className="category-link-button"
                      onClick={() => setActiveCategory(category)}
                    >
                      {formatCategoryName(category)}
                    </button>
                  </li>
                ))}
                <li className="category-item">
                  <Link to="/shop" className="category-link">
                    New Arrivals
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/shop" className="category-link">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">COLLECTION</h3>
              <ul className="collection-list">
                <li className="collection-item">
                  <Link
                    to="/shop?category=bedspreads"
                    className="collection-link"
                    onClick={() => setActiveCategory("bedspreads")}
                  >
                    Bedroom
                  </Link>
                </li>
                <li className="collection-item">
                  <Link
                    to="/shop?category=bedroom-sets"
                    className="collection-link"
                    onClick={() => setActiveCategory("bedroom-sets")}
                  >
                    Living Room
                  </Link>
                </li>
                <li className="collection-item">
                  <Link
                    to="/shop"
                    className="collection-link"
                    onClick={() => setActiveCategory("all")}
                  >
                    Dining
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">COLOR</h3>
              <div className="color-options">
                <button
                  className="color-option"
                  style={{ backgroundColor: "#ffffff" }}
                  title="White"
                ></button>
                <button
                  className="color-option"
                  style={{ backgroundColor: "#f5f5dc" }}
                  title="Beige"
                ></button>
                <button
                  className="color-option"
                  style={{ backgroundColor: "#808080" }}
                  title="Gray"
                ></button>
                <button
                  className="color-option"
                  style={{ backgroundColor: "#1e3a8a" }}
                  title="Blue"
                ></button>
                <button
                  className="color-option"
                  style={{ backgroundColor: "#172554" }}
                  title="Navy"
                ></button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">SIZE</h3>
              <div className="size-options">
                <button className="size-option">S</button>
                <button className="size-option">M</button>
                <button className="size-option">L</button>
                <button className="size-option">Twin</button>
                <button className="size-option">Queen</button>
                <button className="size-option">King</button>
              </div>
            </div>
          </div>

          <div ref={productsRef} className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <Link to={`/product/${product.id}`}>
                      <img src={product.image} alt={product.name} />
                      {product.isNew && (
                        <span className="badge new-badge">NEW</span>
                      )}
                      {product.isOnSale && (
                        <span className="badge sale-badge">SALE</span>
                      )}
                    </Link>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <div className="product-price">
                      <span>${product.price.toFixed(2)}</span>
                    </div>
                    <button
                      id={`add-to-cart-${product.id}`}
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products-message">
                <p>
                  No products found in this category. Try a different filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
