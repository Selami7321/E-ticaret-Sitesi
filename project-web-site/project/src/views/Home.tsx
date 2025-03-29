import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to E-Shop</h1>
      <p className="text-xl text-gray-600 mb-8">
        Discover our amazing collection of products at great prices
      </p>
      
      <Link 
        to="/products" 
        className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        <ShoppingBag className="h-5 w-5" />
        <span>Start Shopping</span>
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Quality Products</h3>
          <p className="text-gray-600">Carefully selected items for your needs</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
          <p className="text-gray-600">Quick and reliable shipping to your door</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
          <p className="text-gray-600">Always here to help with your questions</p>
        </div>
      </div>
    </div>
  );
}

export default Home;