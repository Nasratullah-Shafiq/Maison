import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import arrow from "../assets/arrownext.svg";

import "../styles/ShopPage.css";
const Products = () => {
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const filtersRef = useRef(null);
  const productsRef = useRef(null);
  const imageRef = useRef(null);
  const [sortBy, setSortBy] = useState("featured");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFeatureMenu, setShowFeatureMenu] = useState(false);

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

  // Product data
  const products = [
    {
      id: 1,
      name: "Universetocat Stickers - Pack of 2",
      price: "$2",
      image: "/images/product1.jpg",
      category: "stickers",
      isNew: true,
    },
    {
      id: 2,
      name: "SuperTsar Logo Patch Cropped Crewneck",
      price: "$98",
      image: "/images/product2.jpg",
      category: "apparel",
    },
    {
      id: 3,
      name: "Logo Bucket Hat",
      price: "$30",
      image: "/images/product3.jpg",
      category: "accessories",
      isOnSale: true,
    },
    {
      id: 4,
      name: "Universe 24 Socks",
      price: "$18",
      salePrice: "$15.30",
      image: "/images/product4.jpg",
      category: "accessories",
      isOnSale: true,
    },
    {
      id: 5,
      name: "Universe 24 Patches - Set of 4",
      price: "$20",
      salePrice: "$17.00",
      image: "/images/product5.jpg",
      category: "accessories",
      isOnSale: true,
    },
    {
      id: 6,
      name: "Universe 24 Cap",
      price: "$25.00",
      image: "/images/product6.jpg",
      category: "accessories",
      isOnSale: true,
    },
    {
      id: 7,
      name: "GitHub Skateboard Deck 7.8",
      price: "$109",
      image: "/images/product7.jpg",
      category: "collectibles",
    },
    {
      id: 8,
      name: "Playing Cards",
      price: "$17",
      image: "/images/product8.jpg",
      category: "collectibles",
    },
    {
      id: 9,
      name: "Octocat Pin",
      price: "$9",
      image: "/images/product9.jpg",
      category: "accessories",
    },
    {
      id: 10,
      name: "Ship It Glow Mug",
      price: "$20",
      image: "/images/product10.jpg",
      category: "drinkware",
    },
    {
      id: 11,
      name: "Copilot Glow-in-the-Dark Shirt",
      price: "$32",
      image: "/images/product11.jpg",
      category: "apparel",
    },
    {
      id: 12,
      name: "Copilot Glow-in-the-Dark Hoodie",
      price: "$65",
      image: "/images/product12.jpg",
      category: "apparel",
    },
  ];

  return (
    <div ref={pageRef} className="products-page">
      <div className="container">
        <div ref={headerRef} className="products-header">
          <div className="breadcrumb">
            <Link to="/products">PRODUCTS</Link> / <span>ALL</span>
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
                <li className="category-item">
                  <Link to="/" className="category-link">
                    New Arrivals
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/" className="category-link">
                    Best Sellers
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/" className="category-link">
                    Stickers
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/" className="category-link">
                    Apparel
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/" className="category-link">
                    Lifestyle
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/" className="category-link">
                    Collectibles
                  </Link>
                </li>
                <li className="category-item">
                  <Link to="/" className="category-link">
                    Sale
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">COLLECTION</h3>
              <ul className="collection-list">
                <li className="collection-item">
                  <Link to="/" className="collection-link">
                    SPORTtech
                  </Link>
                </li>
                <li className="collection-item">
                  <Link to="/" className="collection-link">
                    WFH
                  </Link>
                </li>
                <li className="collection-item">
                  <Link to="/" className="collection-link">
                    Pride
                  </Link>
                </li>
              </ul>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">TYPE</h3>
              <div className="filter-options">
                <div className="filter-option">
                  <input type="checkbox" id="type-accessories" />
                  <label htmlFor="type-accessories">Accessories</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-bags" />
                  <label htmlFor="type-bags">Bags</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-collectibles" />
                  <label htmlFor="type-collectibles">Collectibles</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-drinkware" />
                  <label htmlFor="type-drinkware">Drinkware</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-kids" />
                  <label htmlFor="type-kids">Kids</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-outerwear" />
                  <label htmlFor="type-outerwear">Outerwear</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-shirts" />
                  <label htmlFor="type-shirts">Shirts</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-stickers" />
                  <label htmlFor="type-stickers">Stickers</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="type-technology" />
                  <label htmlFor="type-technology">Technology</label>
                </div>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">COLOR</h3>
              <div className="color-options">
                <button className="color-option beige"></button>
                <button className="color-option black"></button>
                <button className="color-option blue"></button>
                <button className="color-option gold"></button>
                <button className="color-option green"></button>
                <button className="color-option navy"></button>
                <button className="color-option orange"></button>
                <button className="color-option pink"></button>
                <button className="color-option purple"></button>
                <button className="color-option red"></button>
                <button className="color-option yellow"></button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">SIZE</h3>
              <div className="size-options">
                <button className="size-option">XS</button>
                <button className="size-option">S</button>
                <button className="size-option">M</button>
                <button className="size-option">L</button>
                <button className="size-option">XL</button>
                <button className="size-option">2XL</button>
                <button className="size-option">3XL</button>
                <button className="size-option">Infant</button>
                <button className="size-option">Toddler</button>
                <button className="size-option">Kids</button>
                <button className="size-option">8 in</button>
                <button className="size-option">24 in</button>
              </div>
            </div>

            <div className="sidebar-section">
              <h3 className="sidebar-title">FIT</h3>
              <div className="filter-options">
                <div className="filter-option">
                  <input type="checkbox" id="fit-fitted" />
                  <label htmlFor="fit-fitted">Fitted</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="fit-standard" />
                  <label htmlFor="fit-standard">Standard</label>
                </div>
              </div>
            </div>
          </div>

          <div ref={productsRef} className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={
                        product.image ||
                        `https://via.placeholder.com/300x300?text=${product.name}`
                      }
                      alt={product.name}
                    />
                    {product.isNew && (
                      <span className="badge new-badge">NEW</span>
                    )}
                    {product.isOnSale && (
                      <span className="badge sale-badge">SALE</span>
                    )}
                    <div className="quick-view">
                      <button className="quick-view-btn"></button>
                    </div>
                  </Link>
                </div>
                <div className="product-info">
                  <h3 className="product-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                  </h3>
                  <div className="product-price">
                    {product.salePrice ? (
                      <>
                        <span className="original-price">{product.price}</span>
                        <span className="sale-price">{product.salePrice}</span>
                      </>
                    ) : (
                      <span>{product.price}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pagination">
          <button className="load-more-btn">
            LOAD MORE <img src={arrow} alt="" className="arrow-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Products;
