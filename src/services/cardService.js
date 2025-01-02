import api from './apiService';

const cardService = {
  // Get all saved cards
  getCards: async () => {
    try {
      const response = await api.get('/user/card');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add a new card
  addCard: async (cardData) => {
    try {
      const response = await api.post('/user/card', cardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update existing card
  updateCard: async (cardData) => {
    try {
      const response = await api.put('/user/card', cardData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Delete a card
  deleteCard: async (cardId) => {
    try {
      const response = await api.delete(`/user/card/${cardId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default cardService;
