import api from './axiosconfig';

export interface Discount {
  id: string;
  code: string;
  description: string;
  value: number;
  end_date: string;
  minimumPurchase?: number;
  maximumDiscount?: number;
  imageUrl?: string;
  isActive: boolean;
}

export const discountService = {
  async getDiscounts(): Promise<Discount[]> {
    try {
      const response = await api.get('/discounts');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};