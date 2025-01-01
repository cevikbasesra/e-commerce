import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api, { endpoints } from '../services/apiService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trash2, PencilLine } from 'lucide-react';

const AddressForm = ({ onSubmit, initialData = null, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    surname: '',
    phone: '',
    city: '',
    district: '',
    neighborhood: '',
    ...initialData
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Address Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Surname</label>
          <input
            type="text"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">District</label>
        <input
          type="text"
          name="district"
          value={formData.district}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Neighborhood</label>
        <textarea
          name="neighborhood"
          value={formData.neighborhood}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
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
          Save Address
        </button>
      </div>
    </form>
  );
};

const AddressCard = ({ address, onEdit, onDelete, isSelected, onSelect }) => {
  return (
    <div 
      className={`p-4 border rounded-lg ${isSelected ? 'border-primary' : 'border-gray-200'} cursor-pointer`}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{address.title}</h3>
        <div className="flex items-center space-x-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(address);
            }}
            className="text-gray-700 hover:text-gray-900"
          >
            <PencilLine size={18} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(address.id);
            }}
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <p className="text-gray-600">{address.name} {address.surname}</p>
      <p className="text-gray-600">{address.phone}</p>
      <p className="text-gray-600">
        {address.neighborhood}, {address.district}, {address.city}
      </p>
    </div>
  );
};

const CreateOrderPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null);
  const [selectedBillingAddress, setSelectedBillingAddress] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const navigate = useNavigate();
  const { cart } = useSelector(state => state.cart);

  // Calculate totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal >= 150 ? 0 : 29.99;
  const total = subtotal + shipping;

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get(endpoints.address);
      setAddresses(response.data);
    } catch (error) {
      toast.error('Failed to fetch addresses');
      console.error('Error fetching addresses:', error);
    }
  };

  const handleAddAddress = async (formData) => {
    try {
      await api.post(endpoints.address, formData);
      toast.success('Address added successfully');
      fetchAddresses();
      setShowAddressForm(false);
    } catch (error) {
      toast.error('Failed to add address');
      console.error('Error adding address:', error);
    }
  };

  const handleUpdateAddress = async (formData) => {
    try {
      await api.put(endpoints.address, formData);
      toast.success('Address updated successfully');
      fetchAddresses();
      setEditingAddress(null);
      setShowAddressForm(false);
    } catch (error) {
      toast.error('Failed to update address');
      console.error('Error updating address:', error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    try {
      await api.delete(`${endpoints.address}/${addressId}`);
      toast.success('Address deleted successfully');
      fetchAddresses();
    } catch (error) {
      toast.error('Failed to delete address');
      console.error('Error deleting address:', error);
    }
  };

  const handleContinue = () => {
    if (!selectedShippingAddress || (!sameAsShipping && !selectedBillingAddress)) {
      toast.error('Please select both shipping and billing addresses');
      return;
    }
    // Navigate to payment step or handle order creation
    // You'll implement this in the next step
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Create Order</h1>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">1</div>
          <div className="h-1 w-16 bg-gray-300 mx-2"></div>
          <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center">2</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Address Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              {!showAddressForm && (
                <button
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddressForm(true);
                  }}
                  className="text-primary hover:text-primary-dark"
                >
                  + Add New Address
                </button>
              )}
            </div>

            {showAddressForm ? (
              <AddressForm
                onSubmit={editingAddress ? handleUpdateAddress : handleAddAddress}
                initialData={editingAddress}
                onCancel={() => {
                  setShowAddressForm(false);
                  setEditingAddress(null);
                }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedShippingAddress?.id === address.id}
                    onSelect={() => setSelectedShippingAddress(address)}
                    onEdit={(address) => {
                      setEditingAddress(address);
                      setShowAddressForm(true);
                    }}
                    onDelete={handleDeleteAddress}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Billing Address Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Billing Address</h2>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={sameAsShipping}
                  onChange={(e) => {
                    setSameAsShipping(e.target.checked);
                    if (e.target.checked) {
                      setSelectedBillingAddress(selectedShippingAddress);
                    }
                  }}
                  className="mr-2"
                />
                Same as shipping address
              </label>
            </div>

            {!sameAsShipping && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedBillingAddress?.id === address.id}
                    onSelect={() => setSelectedBillingAddress(address)}
                    onEdit={(address) => {
                      setEditingAddress(address);
                      setShowAddressForm(true);
                    }}
                    onDelete={handleDeleteAddress}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              {shipping === 0 && (
                <div className="text-green-600 text-sm">
                  Free shipping on orders over $150!
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="w-full mt-6 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
