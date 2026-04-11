export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
};

export const MENU: MenuItem[] = [
  { id: "espresso", name: "Espresso", price: 3.5, description: "A single shot of pure espresso." },
  { id: "americano", name: "Americano", price: 4.0, description: "Espresso topped with hot water." },
  { id: "latte", name: "Latte", price: 5.0, description: "Espresso with steamed milk and light foam." },
  { id: "cappuccino", name: "Cappuccino", price: 4.5, description: "Equal parts espresso, steamed milk, foam." },
  { id: "mocha", name: "Mocha", price: 5.5, description: "Latte with chocolate syrup." },
  { id: "cold-brew", name: "Cold Brew", price: 4.5, description: "Slow-steeped, served cold." },
  { id: "macchiato", name: "Macchiato", price: 4.0, description: "Espresso marked with a dollop of foam." },
  { id: "flat-white", name: "Flat White", price: 4.5, description: "Double espresso with velvety microfoam." },
];
