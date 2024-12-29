import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchProductById, 
  selectCurrentProduct, 
  selectProductLoading, 
  selectProductError 
} from '../actions/productActions';
import { addToCart } from '../actions/cartActions';
import LoadingSpinner from '../components/LoadingSpinner';
import { Star, Minus, Plus, Heart, Share2, ShoppingCart, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get product data from Redux store
  const product = useSelector(selectCurrentProduct) || null;
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#23A6F0');
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
    return <LoadingSpinner />;
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
    if (product) {
      dispatch(addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url,
        quantity: 1
      }));
    }
  };

  const handlePrevImage = () => {
    const currentIndex = product.images.findIndex(image => image.url === selectedImage);
    const newIndex = (currentIndex - 1 + product.images.length) % product.images.length;
    setSelectedImage(product.images[newIndex].url);
  };

  const handleNextImage = () => {
    const currentIndex = product.images.findIndex(image => image.url === selectedImage);
    const newIndex = (currentIndex + 1) % product.images.length;
    setSelectedImage(product.images[newIndex].url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb 
        items={[
          { label: 'Home', link: '/' },
          { label: 'Shop', link: '/shop' },
          { label: product.name }
        ]} 
      />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Images */}
        <div className="lg:w-1/2">
          <div className="relative mb-4">
            <img
              src={selectedImage || product.images[0]?.url}
              alt={product.name}
              className="w-full aspect-square object-cover rounded-lg"
            />
            {/* Navigation Arrows */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <div className="flex gap-4">
            {product.images.slice(0, 4).map((image, index) => (
              <button 
                key={index} 
                className={`w-24 aspect-square rounded-lg overflow-hidden ${selectedImage === image.url ? 'ring-2 ring-primary' : ''}`}
                onClick={() => setSelectedImage(image.url)}
              >
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-medium text-gray-900 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-gray-600">{product.reviews} Reviews</span>
          </div>

          <div className="mb-6">
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">Availability :</span>
              <span className="text-primary">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
            </div>
          </div>

          <div className="border-b border-gray-200 py-6 mb-6">
            <p className="text-gray-600">
              {product.description}
            </p>
          </div>

          <div className="mb-8">
            <div className="flex gap-3">
              {['#23A6F0', '#2DC071', '#E77C40', '#252B42'].map((color, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 rounded-full`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-white py-3 px-6 rounded-md hover:bg-primary-dark">
              Select Options
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-50">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
