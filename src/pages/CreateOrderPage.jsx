import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Trash2, PencilLine } from 'lucide-react';
import CardManagement from '../components/CardManagement';
import orderService from '../services/orderService';
import { resetCart } from '../actions/cartActions';
import api, { endpoints } from '../services/apiService';

const validateCardData = (card) => {
  if (!card) return false;
  
  // Check required fields exist
  const requiredFields = ['card_no', 'expire_month', 'expire_year', 'name_on_card'];
  const hasAllFields = requiredFields.every(field => card[field] !== undefined && card[field] !== null);
  if (!hasAllFields) return false;

  // Validate card number (should be 16 digits)
  const cardNoStr = card.card_no.toString().replace(/[\s-]/g, '');
  if (!/^\d{16}$/.test(cardNoStr)) return false;

  // Validate expiry date
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  if (card.expire_year < currentYear || 
      (card.expire_year === currentYear && card.expire_month < currentMonth) ||
      card.expire_month < 1 || 
      card.expire_month > 12) {
    return false;
  }

  return true;
};

const validateCVV = (cvv) => {
  return /^\d{3,4}$/.test(cvv);
};

const mapCardToOrderFormat = (savedCard, cvv) => {
  if (!validateCardData(savedCard)) {
    throw new Error('Invalid card data');
  }

  if (!validateCVV(cvv)) {
    throw new Error('Invalid CVV');
  }

  return {
    card_no: parseInt(savedCard.card_no.toString().replace(/[\s-]/g, '')),
    card_name: savedCard.name_on_card,
    card_expire_month: savedCard.expire_month,
    card_expire_year: savedCard.expire_year,
    card_ccv: cvv
  };
};

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
  const [selectedCard, setSelectedCard] = useState(null);
  const [use3DSecure, setUse3DSecure] = useState(false);
  const [cvv, setCvv] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector(state => state.cart);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const calculateShipping = () => {
    const subtotal = parseFloat(calculateSubtotal());
    return subtotal >= 150 ? 0 : 29.99;
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    const shipping = calculateShipping();
    return (subtotal + shipping).toFixed(2);
  };

  const handleSubmitOrder = async () => {
    setIsLoading(true);
    try {
      if (!selectedShippingAddress) {
        toast.error('Please select a shipping address');
        return;
      }

      if (!selectedCard) {
        toast.error('Please select or add a payment method');
        return;
      }

      if (!cvv) {
        toast.error('Please enter CVV');
        return;
      }

      // Validate and map card data
      let cardData;
      try {
        cardData = mapCardToOrderFormat(selectedCard, cvv);
      } catch (error) {
        toast.error(error.message);
        return;
      }

      // Calculate total price
      const totalPrice = cart.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);

      // Validate total price
      if (totalPrice <= 0) {
        toast.error('Invalid order total');
        return;
      }

      // Format current date in required format
      const orderDate = new Date().toISOString();

      // Construct order data with validated card information
      const orderData = {
        address_id: selectedShippingAddress.id,
        order_date: orderDate,
        ...cardData,
        price: totalPrice,
        products: cart.map(item => ({
          product_id: item.id,
          count: item.quantity,
          detail: item.selectedVariant || ''
        }))
      };

      // Validate products array
      if (!orderData.products.length) {
        toast.error('Cart is empty');
        return;
      }

      const response = await orderService.createOrder(orderData);
      
      // Clear cart after successful order
      dispatch(resetCart());
      
      // Show success message
      toast.success('Order placed successfully! Thank you for your purchase.');
      
      // Navigate to success page
      navigate('/order-success');
    } catch (error) {
      if (error.response) {
        toast.error(error.response?.data?.message || 'Failed to create order. Please try again.');
      } else {
        toast.error('Unable to connect to the server. Please try again later.');
      }
      console.error('Order submission error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await api.get(endpoints.address);
      setAddresses(response.data);
      setServerError(false);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setServerError(true);
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

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setCvv(''); // Reset CVV when changing cards
  };

  const handleAddressSelect = (address, type) => {
    if (type === 'shipping') {
      setSelectedShippingAddress(address);
    } else {
      setSelectedBillingAddress(address);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {serverError && (
        <div className="bg-red-50 p-4 rounded-md mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Server Temporarily Unavailable
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>
                  We're experiencing technical difficulties. Please try again in a few minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold mb-6">Create Order</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Address Section */}
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
                    onSelect={() => handleAddressSelect(address, 'shipping')}
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
                  className="form-checkbox text-primary"
                  checked={sameAsShipping}
                  onChange={(e) => {
                    setSameAsShipping(e.target.checked);
                    if (e.target.checked) {
                      setSelectedBillingAddress(selectedShippingAddress);
                    }
                  }}
                />
                <span>Same as shipping address</span>
              </label>
            </div>

            {!sameAsShipping && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    isSelected={selectedBillingAddress?.id === address.id}
                    onSelect={() => handleAddressSelect(address, 'billing')}
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

          {/* Payment Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                You can securely pay with your Bank/Credit Card or Shopping Credit
              </p>
              <CardManagement onCardSelect={setSelectedCard} />
            </div>
            
            {selectedCard && (
              <div className="space-y-4 mt-4">
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    maxLength="4"
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                  />
                </div>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="form-checkbox text-primary"
                    checked={use3DSecure}
                    onChange={(e) => setUse3DSecure(e.target.checked)}
                  />
                  <span>Pay with 3D Secure</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="w-full h-fit bg-white rounded-lg shadow p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {/* Cart Items */}
              {cart.map(item => (
                <div key={item.id} className="flex items-center gap-4 py-2">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                  </div>
                  <div className="text-sm text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}

              {/* Order Details */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Products Total</span>
                  <span className="text-gray-900">${calculateSubtotal()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping Total</span>
                  <span className="text-gray-900">${calculateShipping().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Free Shipping Over $150 (Seller Covers)</span>
                  <span className="text-[#23A6F0]">
                    ${calculateShipping() === 0 ? '-29.99' : '0.00'}
                  </span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-4 border-t">
                  <span>Total</span>
                  <span className="text-[#23A6F0] font-semibold">
                    ${calculateTotal()}
                  </span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handleSubmitOrder}
                disabled={isLoading || !selectedShippingAddress || !selectedCard || !cvv}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  isLoading || !selectedShippingAddress || !selectedCard || !cvv
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#23A6F0] hover:bg-[#1a85c2] transition-colors'
                }`}
              >
                {isLoading ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrderPage;
