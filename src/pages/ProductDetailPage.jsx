import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductById, 
  selectCurrentProduct, 
  selectProductLoading, 
  selectProductError 
} from '../actions/productActions';
import LoadingSpinner from '../components/LoadingSpinner';
import { Star, Minus, Plus, Heart, Share2 } from 'lucide-react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get product data from Redux store
  const product = useSelector(state => selectCurrentProduct(state));
  const loading = useSelector(state => selectProductLoading(state));
  const error = useSelector(state => selectProductError(state));

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          {error}
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-gray-500">
          Product not found
        </div>
      </div>
    );
  }

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="aspect-w-3 aspect-h-4 mb-4">
            <img
              src={selectedImage || product.images[0]?.url}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-wrap -mx-1">
            {product.images.map((image, index) => (
              <div key={index} className="w-1/4 px-1 mb-2">
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-24 object-cover cursor-pointer"
                  onClick={() => setSelectedImage(image.url)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-700 hover:text-primary"
                >
                  Home
                </button>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <button
                    onClick={() => navigate(-1)}
                    className="text-gray-700 hover:text-primary"
                  >
                    Back
                  </button>
                </div>
              </li>
            </ol>
          </nav>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.rating?.toFixed(1) || '0.0'})
            </span>
          </div>

          <p className="text-gray-700 mb-6">
            {product.description}
          </p>

          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-price">
                ${product.price?.toFixed(2)}
              </span>
              {product.discount > 0 && (
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${(product.price * (1 + product.discount/100)).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <span className={product.stock > 0 ? 'text-green-500' : 'text-red-500'}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
              {product.stock > 0 && (
                <span className="text-gray-500">
                  ({product.stock} available)
                </span>
              )}
            </div>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Size</h3>
            <div className="flex space-x-2">
              {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-sm rounded-md ${
                    selectedSize === size
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
            <div className="flex space-x-2">
              {['Black', 'White', 'Gray', 'Navy'].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 text-sm rounded-md ${
                    selectedColor === color
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= product.stock}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="flex space-x-4 mb-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark disabled:opacity-50"
            >
              Add to Cart
            </button>
            <button className="p-3 rounded-md bg-gray-100 hover:bg-gray-200">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-md bg-gray-100 hover:bg-gray-200">
              <Share2 className="w-6 h-6" />
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Product Details
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Material: {product.material || 'Cotton Blend'}</li>
              <li>Style: {product.style || 'Casual'}</li>
              <li>Care: Machine wash</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
