import api from "./axiosconfig";

// Payment Interfaces
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


// Order Service
export const orderService = {
  async createOrder(orderData: Order) {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getAllOrders() {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getOrderById(id: number) {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteOrder(id: number) {
    try {
      const response = await api.delete(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getOrdersByUser(userId: number) {
    try {
      const response = await api.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getOrdersByStatus(status: OrderStatus) {
    try {
      const response = await api.get(`/orders/status/${status}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateOrderStatus(id: number, status: OrderStatus) {
    try {
      const response = await api.patch(`/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};