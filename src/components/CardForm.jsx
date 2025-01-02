import React, { useState } from 'react';

const CardForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    card_no: initialData?.card_no || '',
    expire_month: initialData?.expire_month || '',
    expire_year: initialData?.expire_year || '',
    name_on_card: initialData?.name_on_card || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="card_no" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="card_no"
          value={formData.card_no}
          onChange={(e) => setFormData({ ...formData, card_no: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
          maxLength="16"
          pattern="[0-9]{16}"
          placeholder="1234 5678 9012 3456"
        />
      </div>

      <div>
        <label htmlFor="name_on_card" className="block text-sm font-medium text-gray-700">
          Name on Card
        </label>
        <input
          type="text"
          id="name_on_card"
          value={formData.name_on_card}
          onChange={(e) => setFormData({ ...formData, name_on_card: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="expire_month" className="block text-sm font-medium text-gray-700">
            Expiry Month
          </label>
          <select
            id="expire_month"
            value={formData.expire_month}
            onChange={(e) => setFormData({ ...formData, expire_month: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
              <option key={month} value={month}>
                {month.toString().padStart(2, '0')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="expire_year" className="block text-sm font-medium text-gray-700">
            Expiry Year
          </label>
          <select
            id="expire_year"
            value={formData.expire_year}
            onChange={(e) => setFormData({ ...formData, expire_year: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          >
            <option value="">Select Year</option>
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-dark"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default CardForm;
