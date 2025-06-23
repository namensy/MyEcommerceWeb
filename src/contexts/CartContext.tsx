import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

export interface CartItem {
  id: number;
  title: string;
  images: image[];
  thumbnail?: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  brand: string;
  stock: number;
}

export interface image {
  number: string;
}

interface CartContextType {
  items: CartItem[];
  setItems: Dispatch<SetStateAction<CartItem[]>>;
  addItem: (product: any) => void;
  removeItem: (ids: number) => void;
  updateQuantity: (id: number, newQuantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: CartItem) => {
    // item.quantity += product.quantity; // Quantity เปลี่ยนเป็น ค่าที่ user กดปุ่ม Click Add to Cart
    const existingItem = items.find((item) => item.id === product.id);
    if (existingItem) {
      setItems(
        items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setItems([...items, product]);
    }
  };

  const removeItem = (ids: number) => {
    if (items.length > 0) {
      const remainingItem = items.filter((item) => item.id !== ids);
      setItems([...remainingItem]);
    }
  };

  // จัดการจำนวนสินค้า
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity >= 1) {
      setItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    if (items.length > 0) {
      const total = items
        .map((item) => item.quantity)
        .reduce((prev, acc) => prev + acc, 0);
      return total;
    } else {
      return 0;
    }
  };
  const getTotalPrice = () => {
    if (items.length > 0) {
      return items
        .map((item) => item.price * item.quantity)
        .reduce((prev, acc) => prev + acc, 0);
    } else {
      return 0;
    }
  };

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        addItem,
        removeItem,
        updateQuantity,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
