import React, { useState } from 'react';
import { ProductModel } from '../models/Product';
import { useCartStore } from '../store/cartStore';
import { ShoppingCart, Tag } from 'lucide-react';

const Products = () => {
  const productModel = ProductModel.getInstance();
  const products = productModel.getAllProducts();
  const addToCart = useCartStore(state => state.addItem);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : productModel.getProductsByCategory(selectedCategory);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Featured Products */}
      {selectedCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productModel.getFeaturedProducts().map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-100">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  {product.discount > 0 && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600 mt-2">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      {product.discount > 0 ? (
                        <>
                          <span className="text-xl font-bold text-red-500">
                            ${productModel.getDiscountedPrice(product).toFixed(2)}
                          </span>
                          <span className="ml-2 text-sm text-gray-500 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl font-bold">${product.price}</span>
                      )}
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              {product.discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm">
                  {product.discount}% OFF
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-600">{product.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  {product.discount > 0 ? (
                    <>
                      <span className="text-xl font-bold text-red-500">
                        ${productModel.getDiscountedPrice(product).toFixed(2)}
                      </span>
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-xl font-bold">${product.price}</span>
                  )}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
              </div>
              <div className="mt-2 text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} units in stock` : 'Out of stock'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;