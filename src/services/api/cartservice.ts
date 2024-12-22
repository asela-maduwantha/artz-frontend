import api from "./axiosconfig";

export interface CartItemCustomization {
  size?: string;
  color?: string;
  [key: string]: any;  // Allow for other customization properties
}

export interface CartItem {
  productId: number;
  quantity: number;
  customization_data?: CartItemCustomization;
}

export interface Cart {
  user: {
    id: number;
  };
  items: CartItem[];
  id: number;
}

export const cartService = {
  async getUserCart(userId: number) {
    try {
      const response = await api.get(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async clearCart(userId: number) {
    try {
      const response = await api.delete(`/cart/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addItemToCart(userId: number, item: CartItem) {
    try {
      const response = await api.post(`/cart/${userId}/items`, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateCartItem(userId: number, itemId: number, item: CartItem) {
    try {
      const response = await api.patch(`/cart/${userId}/items/${itemId}`, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async removeCartItem(userId: number, itemId: number) {
    try {
      const response = await api.delete(`/cart/${userId}/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};