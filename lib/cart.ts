import { MenuItem } from "./menu";

export type CartItem = {
  item: MenuItem;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export type CartAction =
  | { type: "add"; item: MenuItem }
  | { type: "remove"; id: string }
  | { type: "clear" };

const TAX_RATE = 0.08;

export const initialCart: CartState = { items: [] };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const existing = state.items.find((ci) => ci.item.id === action.item.id);
      if (existing) {
        return {
          items: state.items.map((ci) =>
            ci.item.id === action.item.id
              ? { ...ci, quantity: ci.quantity + 1 }
              : ci
          ),
        };
      }
      return { items: [...state.items, { item: action.item, quantity: 1 }] };
    }
    case "remove": {
      return { items: state.items.filter((ci) => ci.item.id !== action.id) };
    }
    case "clear":
      return initialCart;
  }
}

export function computeSubtotal(items: CartItem[]): number {
  return items.reduce((acc, ci) => acc + ci.item.price * ci.quantity, 0);
}

export function computeTax(subtotal: number): number {
  return subtotal * TAX_RATE;
}

export function computeTotal(subtotal: number, tax: number): number {
  return subtotal + tax;
}

export function formatPrice(n: number): string {
  return `$${n.toFixed(2)}`;
}
