import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ChevronDown, ChevronUp } from 'lucide-react';
import api, { endpoints } from '../services/apiService';
import { toast } from 'react-toastify';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchAddressDetails = async (addressId) => {
    try {
      const response = await api.get(endpoints.address);
      const address = response.data.find(addr => addr.id === addressId);
      return address || null;
    } catch (error) {
      console.error(`Error fetching address ${addressId}:`, error);
      return null;
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get(endpoints.order);
      const ordersData = Array.isArray(response.data) ? response.data : [response.data];
      const filteredOrders = ordersData.filter(order => order !== null);
      
      // Fetch addresses for all orders
      const addressPromises = filteredOrders
        .map(order => order.address_id)
        .filter((id, index, self) => id && self.indexOf(id) === index) // unique address IDs
        .map(async (addressId) => {
          const address = await fetchAddressDetails(addressId);
          if (address) {
            return [addressId, address];
          }
          return null;
        });

      const addressResults = await Promise.all(addressPromises);
      const addressMap = Object.fromEntries(
        addressResults.filter(result => result !== null)
      );

      setAddresses(addressMap);
      setOrders(filteredOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const getAddressForOrder = (order) => {
    const address = addresses[order.address_id];
    if (!address) return null;
    
    return {
      title: address.title,
      street: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country
    };
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getOrderStatus = (orderDate) => {
    const orderDateTime = new Date(orderDate);
    const now = new Date();
    const diffInHours = (now - orderDateTime) / (1000 * 60 * 60);

    let status;
    let classes;

    if (diffInHours < 1) {
      status = 'Processing';
      classes = 'bg-blue-100 text-blue-800';
    } else if (diffInHours < 24) {
      status = 'Confirmed';
      classes = 'bg-green-100 text-green-800';
    } else if (diffInHours < 48) {
      status = 'Shipped';
      classes = 'bg-purple-100 text-purple-800';
    } else {
      status = 'Delivered';
      classes = 'bg-gray-100 text-gray-800';
    }

    return {
      status,
      className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`
    };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No orders found</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              {/* Order Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                onClick={() => toggleOrderDetails(order.id)}
              >
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      Order #{order.id} • {formatDate(order.order_date)}
                    </span>
                    {(() => {
                      const { status, className } = getOrderStatus(order.order_date);
                      return (
                        <span className={className}>
                          {status}
                        </span>
                      );
                    })()}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">${order.price?.toFixed(2) || '0.00'}</span>
                    {expandedOrder === order.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {expandedOrder === order.id && (
                <div className="border-t border-gray-200 p-4">
                  <div className="space-y-4">
                    {/* Shipping Address */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Address</h3>
                      {(() => {
                        const address = getAddressForOrder(order);
                        return address ? (
                          <p className="text-sm text-gray-500">
                            <span className="font-medium">{address.title}</span><br />
                            {address.street}<br />
                            {address.city}{address.state ? `, ${address.state}` : ''} {address.zip}<br />
                            {address.country}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">Address information not available</p>
                        );
                      })()}
                    </div>

                    {/* Products */}
                    <div>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Products</h3>
                      <div className="space-y-2">
                        {order.products?.map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center justify-between text-sm"
                          >
                            <div className="flex items-center">
                              <span className="font-medium">{product.name || 'Unknown Product'}</span>
                              <span className="text-gray-500 ml-2">x{product.count || 1}</span>
                            </div>
                            <span>${((product.price || 0) * (product.count || 1)).toFixed(2)}</span>
                          </div>
                        )) || <p className="text-sm text-gray-500">No products found</p>}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">Total</span>
                        <span className="font-medium">${order.price?.toFixed(2) || '0.00'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
