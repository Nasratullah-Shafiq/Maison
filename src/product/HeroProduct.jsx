import { useState, useEffect } from "react";
import ProductViewer from "./ProductViewer";
import ProductInfo from "./ProductInfo";
import "./HeroProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

function HeroProduct({ addToCart }) {
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("standard");
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Get the product ID from the URL parameter
  const { id } = useParams();

  // Find product and handle initial setup
  useEffect(() => {
    // Find the product by ID
    const foundProduct = products.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
    setLoading(false);

    // If product not found, navigate to shop page
    if (!foundProduct) {
      navigate("/shop");
      return;
    }

    // Set default color if available
    if (foundProduct.colors && foundProduct.colors.length > 0) {
      setSelectedColor(foundProduct.colors[0].name);
    }

    // Set default size if available
    if (foundProduct.sizes && foundProduct.sizes.length > 0) {
      setSelectedSize(foundProduct.sizes[0].name);
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (!product) return;

    // Get the selected size data
    const selectedSizeData = product.sizes && product.sizes.find(s => s.name === selectedSize);
    const price = selectedSizeData ? selectedSizeData.price : product.price;

    const productToAdd = {
      ...product,
      selectedColor,
      selectedSize,
      price
    };

    addToCart(productToAdd, quantity);
  };

  // Show loading state while product is being fetched
  if (loading) {
    return (
      <div className="heroproduct">
        <div className="loading-container">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  // Show error message if product not found
  if (!product) {
    return (
      <div className="heroproduct">
        <div className="error-container">
          <h2>Product not found</h2>
          <p>We couldn't find the product you're looking for.</p>
          <button className="back-button" onClick={() => navigate("/shop")}>
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  // Render product details
  return (
    <div className="heroproduct">
      <main className="product-container">
        <ProductViewer selectedColor={selectedColor} product={product} />
        <ProductInfo
          product={product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          quantity={quantity}
          setQuantity={setQuantity}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
}

export default HeroProduct;
