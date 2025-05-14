import hoodieImg from "../assets/bedandpillow.png";
import hoodieHoverImg from "../assets/bedandpillow2.jpg";
import toteImg from "../assets/pillow-blue.png";
import toteHoverImg from "../assets/pillows/pillow-white.png";
import bedspreadImg from "../assets/bed-spreed.png";
import bedspreadHoverImg from "../assets/bed-spreed2.jpg";
import pillowImg from "../assets/pillow0.png";
import pillowBlueImg from "../assets/pillow-blue2.jpg";
import bedroomImg from "../assets/bedroom-blue.jpg";

const products = [
  {
    id: 1,
    name: "Bubble Pillow",
    price: 57,
    image: hoodieImg,
    alternateImage: hoodieHoverImg,
    link: "/product/1",
    description: "Luxury handcrafted bubble pillow with premium cotton cover, perfect for any modern bedroom.",
    features: ["100% organic cotton", "Hypoallergenic", "Machine washable", "Available in multiple colors"],
    colors: [
      { name: "white", label: "White", code: "#ffffff" },
      { name: "cream", label: "Cream", code: "#f5f5dc" },
      { name: "gray", label: "Gray", code: "#808080" }
    ],
    sizes: [
      { name: "s", label: "Small", dimensions: "16\" x 16\"", price: 47 },
      { name: "m", label: "Medium", dimensions: "18\" x 18\"", price: 57 },
      { name: "l", label: "Large", dimensions: "20\" x 20\"", price: 67 }
    ],
    category: "pillows",
    inStock: true,
    featured: true
  },
  {
    id: 2,
    name: "Blue Pillow",
    price: 49,
    image: toteImg,
    alternateImage: toteHoverImg,
    link: "/product/2",
    description: "Elegant blue pillow with soft texture and vibrant color, designed to complement any living space.",
    features: ["Soft microfiber cover", "Stain resistant", "Dense filling for comfort", "Zipper closure"],
    colors: [
      { name: "blue", label: "Blue", code: "#1e3a8a" },
      { name: "navy", label: "Navy", code: "#172554" },
      { name: "white", label: "White", code: "#ffffff" }
    ],
    sizes: [
      { name: "s", label: "Small", dimensions: "16\" x 16\"", price: 39 },
      { name: "m", label: "Medium", dimensions: "18\" x 18\"", price: 49 },
      { name: "l", label: "Large", dimensions: "20\" x 20\"", price: 59 }
    ],
    category: "pillows",
    inStock: true,
    featured: true
  },
  {
    id: 3,
    name: "Luxury Bedspread",
    price: 129,
    image: bedspreadImg,
    alternateImage: bedspreadHoverImg,
    link: "/product/3",
    description: "Premium bedspread with elegant design and exceptional craftsmanship for a sophisticated bedroom.",
    features: ["100% Egyptian cotton", "Hotel quality", "Wrinkle resistant", "Detailed stitching"],
    colors: [
      { name: "white", label: "White", code: "#ffffff" },
      { name: "beige", label: "Beige", code: "#f5f5dc" },
      { name: "gray", label: "Gray", code: "#808080" }
    ],
    sizes: [
      { name: "twin", label: "Twin", dimensions: "68\" x 88\"", price: 129 },
      { name: "queen", label: "Queen", dimensions: "88\" x 92\"", price: 149 },
      { name: "king", label: "King", dimensions: "102\" x 92\"", price: 169 }
    ],
    category: "bedspreads",
    inStock: true,
    featured: true
  },
  {
    id: 4,
    name: "Decorative Pillow Set",
    price: 89,
    image: pillowImg,
    alternateImage: pillowBlueImg,
    link: "/product/4",
    description: "Set of 2 decorative pillows with exquisite patterns, perfect for adding a touch of elegance to your home.",
    features: ["Set of 2 matching pillows", "Premium fabric cover", "Hidden zipper closure", "Fade resistant"],
    colors: [
      { name: "mixed", label: "Mixed Pattern", code: "#ffffff" },
      { name: "blue", label: "Blue Pattern", code: "#1e3a8a" }
    ],
    sizes: [
      { name: "s", label: "Small", dimensions: "16\" x 16\"", price: 79 },
      { name: "m", label: "Medium", dimensions: "18\" x 18\"", price: 89 }
    ],
    category: "pillows",
    inStock: true,
    featured: false
  },
  {
    id: 5,
    name: "Complete Bedroom Set",
    price: 299,
    image: bedroomImg,
    alternateImage: bedroomImg,
    link: "/product/5",
    description: "Complete luxury bedroom set including duvet cover, sheet set, and decorative pillows for a coordinated look.",
    features: ["100% cotton", "Includes duvet cover, sheet set, and 2 pillow shams", "Machine washable", "Fade resistant"],
    colors: [
      { name: "blue", label: "Blue", code: "#1e3a8a" },
      { name: "white", label: "White", code: "#ffffff" },
      { name: "gray", label: "Gray", code: "#808080" }
    ],
    sizes: [
      { name: "queen", label: "Queen", dimensions: "Standard Queen Size", price: 299 },
      { name: "king", label: "King", dimensions: "Standard King Size", price: 349 }
    ],
    category: "bedroom-sets",
    inStock: true,
    featured: true
  }
];

export default products;
