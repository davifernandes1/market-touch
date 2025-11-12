import { Product, Category } from "@/types/product";
import categoryBeverages from "@/assets/category-beverages.jpg";
import categoryBakery from "@/assets/category-bakery.jpg";
import categoryFrozen from "@/assets/category-frozen.jpg";
import categorySnacks from "@/assets/category-snacks.jpg";
import productChocolate from "@/assets/product-chocolate.jpg";
import productWater from "@/assets/product-water.jpg";

export const categories: Category[] = [
  { id: "beverages", name: "Bebidas", image: categoryBeverages },
  { id: "bakery", name: "Padaria", image: categoryBakery },
  { id: "frozen", name: "Congelados", image: categoryFrozen },
  { id: "snacks", name: "Doces & Snacks", image: categorySnacks },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Água Mineral",
    description: "Água mineral natural 500ml",
    price: 2.5,
    image: productWater,
    category: "beverages",
  },
  {
    id: "2",
    name: "Chocolate Premium",
    description: "Chocolate ao leite premium 100g",
    price: 8.9,
    image: productChocolate,
    category: "snacks",
  },
  {
    id: "3",
    name: "Refrigerante",
    description: "Refrigerante cola 350ml",
    price: 4.5,
    image: productWater,
    category: "beverages",
  },
  {
    id: "4",
    name: "Suco Natural",
    description: "Suco de laranja natural 300ml",
    price: 6.0,
    image: productWater,
    category: "beverages",
  },
  {
    id: "5",
    name: "Pão Francês",
    description: "Pão francês fresco",
    price: 0.8,
    image: productChocolate,
    category: "bakery",
  },
  {
    id: "6",
    name: "Croissant",
    description: "Croissant de manteiga",
    price: 5.5,
    image: productChocolate,
    category: "bakery",
  },
];
