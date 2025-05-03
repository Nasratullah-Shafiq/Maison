import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import products from "../data/products";
import "../styles/Hero.css";

const SearchBar = ({ inline = false }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  // // Load recent searches when component mounts
  // useEffect(() => {
  //   setRecentSearches(getSearchHistory());
  // }, []);

  // GSAP animation for the search dropdown
  useGSAP(() => {
    if (isSearchOpen) {
      gsap.to(searchRef.current, {
        width: inline ? "100%" : "320px",
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          if (!inline && inputRef.current) {
            inputRef.current.focus();
          }
        },
      });
    } else {
      if (!inline) {
        gsap.to(searchRef.current, {
          width: "40px",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }

    // Animation for search results
    if (
      (searchResults.length > 0 ||
        suggestions.length > 0 ||
        (recentSearches.length > 0 && showHistory)) &&
      isFocused
    ) {
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [
    isSearchOpen,
    searchResults.length,
    suggestions.length,
    isFocused,
    showHistory,
    recentSearches.length,
    inline,
  ]);

  // Generate search suggestions as user types
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSuggestions([]);
      setShowHistory(true);
      return;
    }

    setShowHistory(false);
    const generatedSuggestions = generateSearchSuggestions(
      searchQuery,
      products
    );
    setSuggestions(generatedSuggestions);
  }, [searchQuery]);

  // Handle search input changes for finding products
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query))
    );

    // Limit to 4 results for dropdown
    setSearchResults(results.slice(0, 4));
  }, [searchQuery]);

  // Handle clicking outside to close search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
        if (!inline && searchQuery === "") {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [inline, searchQuery]);

  // Handle escape key to close search
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsFocused(false);
        if (!inline) {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [inline]);

  // Navigate to product page
  const handleProductSelect = (productSlug) => {
    navigate(`/product/${productSlug}`);
    setSearchQuery("");
    setIsFocused(false);
    setIsSearchOpen(false);
  };

  // Navigate to search results page
  const handleSearchSubmit = (e) => {
    e && e.preventDefault();

    if (searchQuery.trim()) {
      // Save to search history
      saveSearchQuery(searchQuery);
      setRecentSearches(getSearchHistory());

      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsFocused(false);
      if (!inline) setIsSearchOpen(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    saveSearchQuery(suggestion);
    setRecentSearches(getSearchHistory());
    navigate(`/shop?search=${encodeURIComponent(suggestion)}`);
    setIsFocused(false);
    if (!inline) setIsSearchOpen(false);
  };

  // Handle recent search click
  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
    saveSearchQuery(query);
    setRecentSearches(getSearchHistory());
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setIsFocused(false);
    if (!inline) setIsSearchOpen(false);
  };

  // Toggle search open/close
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setIsFocused(true);
      setShowHistory(true);
    } else {
      setIsFocused(false);
    }
  };

  return (
    <div
      ref={searchRef}
      className={`relative search-bar-container${
        inline
          ? "search-bar-full-widthl"
          : isSearchOpen
          ? "search-bar-expanded "
          : "search-bar-collapsed"
      } transition-all`}
    >
      {!inline && (
        <button
          type="button"
          onClick={toggleSearch}
          className="search-icon-button"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="search-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}

      <form
        onSubmit={handleSearchSubmit}
        className={`${
          !inline && !isSearchOpen
            ? "search-form search-form-hidden"
            : "search-form-visible"
        } transition-opacity duration-300`}
      >
        {inline && (
          <div className="search-icon-container ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        )}
        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            setShowHistory(searchQuery.trim() === "");
          }}
          className={`
            search-input
          `}
        />
        {searchQuery.trim() !== "" && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setIsFocused(true);
              setShowHistory(true);
              inputRef.current.focus();
            }}
            className="clear-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="clear-icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <button type="submit" className="submit-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="submit-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>

      {/* Search Results Dropdown */}
      {isFocused &&
        (searchResults.length > 0 ||
          suggestions.length > 0 ||
          (recentSearches.length > 0 && showHistory)) && (
          <div ref={resultsRef} className="search-results-dropdown">
            <ul className="py-2">
              {/* Product Results */}
              {searchResults.length > 0 && (
                <>
                  <li className="results-list">Products</li>
                  {searchResults.map((product) => (
                    <li key={product.id} className="results-header result-item">
                      <button
                        onClick={() => handleProductSelect(product.slug)}
                        className="flex items-center w-full px-4 py-2 text-left"
                      >
                        <div className="product-result-item">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover rounded"
                          />
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{product.name}</p>
                          <p className="text-xs text-gray-500">
                            ${product.price.toFixed(2)}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </>
              )}

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <>
                  <li className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Suggestions
                  </li>
                  {suggestions.map((suggestion, index) => (
                    <li key={index} className="hover:bg-gray-100">
                      <button
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="flex items-center w-full px-4 py-2 text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                        <span className="text-sm">{suggestion}</span>
                      </button>
                    </li>
                  ))}
                </>
              )}

              {/* Recent Searches */}
              {recentSearches.length > 0 && showHistory && (
                <>
                  <li className="px-4 py-1 text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                    Recent Searches
                  </li>
                  {recentSearches.slice(0, 5).map((query, index) => (
                    <li key={index} className="hover:bg-gray-100">
                      <button
                        onClick={() => handleRecentSearchClick(query)}
                        className="flex items-center w-full px-4 py-2 text-left"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm">{query}</span>
                      </button>
                    </li>
                  ))}
                </>
              )}

              {/* Search Button */}
              {searchQuery.trim() !== "" && (
                <li className="border-t border-gray-200 mt-2 pt-2">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full px-4 py-2 text-sm text-primary-600 hover:bg-gray-100 text-left"
                  >
                    See all results for "{searchQuery}"
                  </button>
                </li>
              )}
            </ul>
          </div>
        )}
    </div>
  );
};

export default SearchBar;
