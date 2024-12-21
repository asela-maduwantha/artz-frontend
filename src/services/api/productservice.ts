import api from "./axiosconfig";


export interface ProductFeature {
  tag: string;
  description: string;
  icon: string;
}

export interface CustomizationOption {
  name: string;
  type: string;
  available_values: string[];
  min_value: number;
  max_value: number;
  additional_price: number;
  is_required: boolean;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  img_url: string;
  category: string;
  is_customizable: boolean;
  is_active: boolean;
  features: ProductFeature[];
  customization_options: CustomizationOption[];
}

export const productService = {
  async getAllProducts() {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async createProduct(productData: ProductData) {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async updateProduct(id: string, productData: ProductData) {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async deleteProduct(id: string) {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};