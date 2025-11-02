import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: string;
  listingId: string;
  title: string;
  tier: "A" | "B";
  sellerPrice: number;
  buyerPrice: number;
  city: string;
  size: string;
  category: string;
  image?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  platformFee: number;
  grandTotal: number;
  addToCart: (item: Omit<CartItem, "id" | "quantity">) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PLATFORM_FEE_PERCENTAGE = 0.075; // 7.5%
const LOCAL_STORAGE_KEY = "clothcycle_cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();

  // Check authentication status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserId(session?.user?.id || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Load cart items
  useEffect(() => {
    loadCart();
  }, [userId]);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      if (userId) {
        // Load from database for authenticated users
        const { data, error } = await supabase
          .from("cart_items")
          .select("*")
          .eq("user_id", userId);

        if (error) throw error;

        setItems(
          data.map((item) => ({
            id: item.id,
            listingId: item.listing_id,
            title: item.title,
            tier: item.tier as "A" | "B",
            sellerPrice: Number(item.seller_price),
            buyerPrice: Number(item.buyer_price),
            city: item.city,
            size: item.size,
            category: item.category,
            image: item.image || undefined,
            quantity: item.quantity,
          }))
        );
      } else {
        // Load from local storage for non-authenticated users
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          setItems(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error("Error loading cart:", error);
      toast({
        title: "Error loading cart",
        description: "Could not load your cart items",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveToLocalStorage = (cartItems: CartItem[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
  };

  const addToCart = async (item: Omit<CartItem, "id" | "quantity">) => {
    try {
      if (userId) {
        // Check if item already exists in cart
        const existingItem = items.find((i) => i.listingId === item.listingId);
        
        if (existingItem) {
          // Update quantity
          await updateQuantity(existingItem.id, existingItem.quantity + 1);
          return;
        }

        // Add to database
        const { data, error } = await supabase
          .from("cart_items")
          .insert({
            user_id: userId,
            listing_id: item.listingId,
            title: item.title,
            tier: item.tier,
            seller_price: item.sellerPrice,
            buyer_price: item.buyerPrice,
            city: item.city,
            size: item.size,
            category: item.category,
            image: item.image,
            quantity: 1,
          })
          .select()
          .single();

        if (error) throw error;

        const newItem: CartItem = {
          id: data.id,
          listingId: data.listing_id,
          title: data.title,
          tier: data.tier as "A" | "B",
          sellerPrice: Number(data.seller_price),
          buyerPrice: Number(data.buyer_price),
          city: data.city,
          size: data.size,
          category: data.category,
          image: data.image || undefined,
          quantity: data.quantity,
        };

        setItems([...items, newItem]);
      } else {
        // Add to local storage
        const existingItem = items.find((i) => i.listingId === item.listingId);
        
        if (existingItem) {
          const updatedItems = items.map((i) =>
            i.listingId === item.listingId
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
          setItems(updatedItems);
          saveToLocalStorage(updatedItems);
        } else {
          const newItem: CartItem = {
            ...item,
            id: `local-${Date.now()}`,
            quantity: 1,
          };
          const updatedItems = [...items, newItem];
          setItems(updatedItems);
          saveToLocalStorage(updatedItems);
        }
      }

      toast({
        title: "Added to cart",
        description: `${item.title} has been added to your cart`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      if (userId && !id.startsWith("local-")) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("id", id);

        if (error) throw error;
      }

      const updatedItems = items.filter((item) => item.id !== id);
      setItems(updatedItems);
      
      if (!userId) {
        saveToLocalStorage(updatedItems);
      }

      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error",
        description: "Could not remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) {
      await removeFromCart(id);
      return;
    }

    try {
      if (userId && !id.startsWith("local-")) {
        const { error } = await supabase
          .from("cart_items")
          .update({ quantity })
          .eq("id", id);

        if (error) throw error;
      }

      const updatedItems = items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      setItems(updatedItems);

      if (!userId) {
        saveToLocalStorage(updatedItems);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast({
        title: "Error",
        description: "Could not update item quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      if (userId) {
        const { error } = await supabase
          .from("cart_items")
          .delete()
          .eq("user_id", userId);

        if (error) throw error;
      }

      setItems([]);
      
      if (!userId) {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error",
        description: "Could not clear cart",
        variant: "destructive",
      });
    }
  };

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.buyerPrice * item.quantity,
    0
  );
  const platformFee = totalAmount * PLATFORM_FEE_PERCENTAGE;
  const grandTotal = totalAmount + platformFee;

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalAmount,
        platformFee,
        grandTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
