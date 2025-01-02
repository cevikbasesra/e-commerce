import React from 'react';
import { Trash2, PencilLine } from 'lucide-react';

const CardCard = ({ card, onEdit, onDelete, isSelected, onSelect }) => {
  // Format card number to show only last 4 digits
  const maskedCardNumber = `**** **** **** ${card.card_no.slice(-4)}`;

  return (
    <div 
      className={`p-4 border rounded-lg ${isSelected ? 'border-primary' : 'border-gray-200'} cursor-pointer`}
      onClick={() => onSelect(card)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="font-medium">{card.name_on_card}</div>
          <div className="text-gray-600">{maskedCardNumber}</div>
          <div className="text-sm text-gray-500">
            {String(card.expire_month).padStart(2, '0')}/{card.expire_year}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(card);
            }}
            className="text-gray-600 hover:text-gray-800"
          >
            <PencilLine size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(card.id);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardCard;
