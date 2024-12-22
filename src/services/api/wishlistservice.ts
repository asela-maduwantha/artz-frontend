import api from "./axiosconfig";

export interface WishlistItem {
  productId: number;
}

export interface Wishlist {
  user: {
    id: number;
  };
  items: WishlistItem[];
  id: number;
}

export const wishlistService = {
  async getUserWishlist(userId: number) {
    try {
      const response = await api.get(`/wishlist/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async clearWishlist(userId: number) {
    try {
      const response = await api.delete(`/wishlist/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async addItemToWishlist(userId: number, item: WishlistItem) {
    try {
      const response = await api.post(`/wishlist/${userId}/items`, item);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async removeWishlistItem(userId: number, itemId: number) {
    try {
      const response = await api.delete(`/wishlist/${userId}/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async checkProductInWishlist(userId: number, productId: number) {
    try {
      const response = await api.get(`/wishlist/${userId}/check/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};