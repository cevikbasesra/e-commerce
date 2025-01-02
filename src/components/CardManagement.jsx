import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CardForm from './CardForm';
import CardCard from './CardCard';
import cardService from '../services/cardService';

const CardManagement = ({ onCardSelect }) => {
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const data = await cardService.getCards();
      setCards(data);
    } catch (error) {
      toast.error('Error loading cards');
    }
  };

  const handleAddCard = async (cardData) => {
    try {
      await cardService.addCard(cardData);
      toast.success('Card added successfully');
      setShowForm(false);
      loadCards();
    } catch (error) {
      toast.error('Error adding card');
    }
  };

  const handleUpdateCard = async (cardData) => {
    try {
      await cardService.updateCard({
        ...cardData,
        id: editingCard.id
      });
      toast.success('Card updated successfully');
      setEditingCard(null);
      loadCards();
    } catch (error) {
      toast.error('Error updating card');
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await cardService.deleteCard(cardId);
        toast.success('Card deleted successfully');
        if (selectedCard?.id === cardId) {
          setSelectedCard(null);
        }
        loadCards();
      } catch (error) {
        toast.error('Error deleting card');
      }
    }
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    if (onCardSelect) {
      onCardSelect(card);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Card Information</h2>
        {!showForm && !editingCard && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
          >
            Add New Card
          </button>
        )}
      </div>

      {(showForm || editingCard) && (
        <CardForm
          onSubmit={editingCard ? handleUpdateCard : handleAddCard}
          initialData={editingCard}
          onCancel={() => {
            setShowForm(false);
            setEditingCard(null);
          }}
        />
      )}

      <div className="space-y-3">
        {cards.map(card => (
          <CardCard
            key={card.id}
            card={card}
            isSelected={selectedCard?.id === card.id}
            onSelect={handleCardSelect}
            onEdit={(card) => setEditingCard(card)}
            onDelete={handleDeleteCard}
          />
        ))}
      </div>
    </div>
  );
};

export default CardManagement;
