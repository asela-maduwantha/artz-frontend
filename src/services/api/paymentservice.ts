import api from "./axiosconfig";

export interface PaymentIntent {
  amount: number;
  user_id: number;
  order_items: OrderItem[];
}

export interface OrderItem {
  product_id: number;
  quantity: number;
  customizations: Customization[];
}

export interface Customization {
  customization_option_id: number;
  selected_value: string;
}

export interface PaymentCompletion {
  payment_intent_id: string;
}

export interface PaymentRefund {
  payment_id: number;
  amount: number;
  reason: string;
}

// Order Interfaces
export interface Order {
  user_id: number;
  discount_id?: number;
  order_date: string;
  total_amount: number;
  discount_amount: number;
  status: OrderStatus;
  shipping_address: string;
  order_items: OrderItem[];
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED"
}

// Payment Service
export const paymentService = {
  async createPaymentIntent(paymentIntent: PaymentIntent) {
    try {
      const response = await api.post('/payments/create-intent', paymentIntent);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async completePayment(paymentCompletion: PaymentCompletion) {
    try {
      const response = await api.post('/payments/complete', paymentCompletion);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async refundPayment(refundData: PaymentRefund) {
    try {
      const response = await api.post('/payments/refund', refundData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllPayments() {
    try {
      const response = await api.get('/payments');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getPaymentById(id: number) {
    try {
      const response = await api.get(`/payments/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
