import { useState, useEffect } from "react";
import ProductViewer from "./ProductViewer";
import ProductInfo from "./ProductInfo";
import "./HeroProduct.css";
import { useParams } from "react-router-dom";
import products from "../data/products";

function HeroProduct() {
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("standard");
  const [quantity, setQuantity] = useState(1);

  const { productId } = useParams();

  const product = products.find(
    (p) => p.link.split("/products/")[1] === productId
  );

  // Fallback if product is not found
  if (!product) return <div>Product not found</div>;

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
        />
      </main>
    </div>
  );
}

export default HeroProduct;
