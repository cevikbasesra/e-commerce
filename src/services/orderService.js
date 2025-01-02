import api from './apiService';

const orderService = {
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/order', orderData);
      return response.data;
    } catch (error) {
      console.error('Order creation error details:', error.response?.data || error.message);
      throw error;
    }
  }
};

export default orderService;
