import api from './axiosconfig';

export interface Discount {
  id: string;
  name: string;
  code: string;
  description: string;
  value: number;
  start_date: string;
  end_date: string;
  usage_limit: number;
  minimumPurchase?: number;
  maximumDiscount?: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface CreateDiscountDto {
  name: string;
  value: number;
  start_date: string;
  end_date: string;
  description: string;
  code: string;
  usage_limit: number;
}

export const discountService = {
  async getDiscounts(): Promise<Discount[]> {
    const response = await api.get('/discounts');
    return response.data;
  },

  async getDiscountById(id: string): Promise<Discount> {
    const response = await api.get(`/discounts/${id}`);
    return response.data;
  },

  async createDiscount(discount: CreateDiscountDto): Promise<void> {
    await api.post('/discounts', discount);
  },

  async deleteDiscount(id: string): Promise<void> {
    await api.delete(`/discounts/${id}`);
  },

  async getExpiredDiscounts(): Promise<Discount[]> {
    const response = await api.get('/discounts/expired');
    return response.data;
  }
};
