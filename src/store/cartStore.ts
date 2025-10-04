import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shade?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, shade?: string) => void;
  updateQuantity: (id: string, quantity: number, shade?: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          item => item.id === newItem.id && item.shade === newItem.shade
        );
        
        if (existingItemIndex > -1) {
          set({
            items: items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          });
        }
      },
      
      removeItem: (id, shade) => {
        set({
          items: get().items.filter(
            item => !(item.id === id && item.shade === shade)
          ),
        });
      },
      
      updateQuantity: (id, quantity, shade) => {
        if (quantity <= 0) {
          get().removeItem(id, shade);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === id && item.shade === shade
              ? { ...item, quantity }
              : item
          ),
        });
      },
      
      clearCart: () => set({ items: [] }),
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      
      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'VELOUR-cart-storage',
    }
  )
);