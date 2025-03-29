import React from 'react';
import { useCartStore } from '../store/cartStore';
import { Trash2, Plus, Minus } from 'lucide-react';

const Cart = () => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {items.map(item => (
          <div key={item.product.id} className="flex items-center py-4 border-b">
            <img
              src={item.product.image}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1 ml-4">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">${item.product.price}</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="p-1 rounded-full hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
        
        <div className="mt-6 flex justify-between items-center">
          <div>
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold ml-2">${total().toFixed(2)}</span>
          </div>
          
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;