import hoodieImg from "../assets/bedandpillow.png";
import hoodieHoverImg from "../assets/bedandpillow2.jpg";
import toteImg from "../assets/pillow-blue.png";
import toteHoverImg from "../assets/pillows/pillow-white.png";
// import varsityJacketImg from "../assets/bed-spreed.png";
// import varsityJacketHoverImg from "../assets/bed-spreed2.jpg";
// import monaFigurineImg from "../assets/pillow0.png";

const products = [
  {
    id: 1,
    name: "Bubble Pillow",
    price: 57,
    image: hoodieImg,
    alternateImage: hoodieHoverImg,
    link: "/products/invertocat-hoodie",
    description: "A stylish hoodie with GitHub’s mascot.",
    features: ["Soft fleece", "Modern fit", "Iconic logo"],
    colors: [{ name: "white", label: "White" }],
    sizes: [{ name: "m", label: "M", dimensions: "Medium" }],
  },
  {
    id: 2,
    name: "All Purpose Tote",
    price: 13,
    image: toteImg,
    alternateImage: toteHoverImg,
    link: "/products/all-purpose-tote",
    description: "A durable tote bag for everyday use.",
    features: ["100% cotton", "Roomy", "Machine washable"],
    colors: [{ name: "blue", label: "Blue" }],
    sizes: [{ name: "one", label: "One Size", dimensions: "15” x 16”" }],
  },
  // Add others similarly...
];

export default products;
