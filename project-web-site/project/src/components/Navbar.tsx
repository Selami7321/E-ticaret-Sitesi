import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Store } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const cartItems = useCartStore(state => state.items);
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold">E-Shop</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            
            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600">
              <ShoppingCart className="h-6 w-6" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <Link to="/login" className="text-gray-700 hover:text-blue-600">
              <User className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;