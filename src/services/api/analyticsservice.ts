import api from "./axiosconfig";

// Interfaces for API responses
export interface MonthlyRevenue {
  month: string;
  revenue: number;
  total_orders: number;
  average_order_value: number;
}

export interface MostOrderedProduct {
  product_id: number;
  product_name: string;
  total_orders: number;
  total_quantity: number;
  total_revenue: number;
}

export interface CategoryStats {
  category: string;
  product_count: number;
  total_value: number;
}

export const analyticsService = {
  // Get monthly revenue data for a specific year
  async getMonthlyRevenue(year: number): Promise<MonthlyRevenue[]> {
    try {
      const response = await api.get<MonthlyRevenue[]>(
        `/payments/analytics/monthly-revenue`,
        {
          params: { year }
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get most ordered products analytics
  async getMostOrderedProducts(): Promise<MostOrderedProduct[]> {
    try {
      const response = await api.get<MostOrderedProduct[]>(
        `/orders/analytics/most-ordered`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get product statistics by category
  async getCategoryStats(): Promise<CategoryStats[]> {
    try {
      const response = await api.get<CategoryStats[]>(
        `/products/analytics/category-stats`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};