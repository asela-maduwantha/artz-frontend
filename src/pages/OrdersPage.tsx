import { Package, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const OrdersPage = () => {
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);

  const orders = [
    {
      id: 1,
      date: '2024-03-20',
      status: 'Delivered',
      total: 299.97,
      items: [
        { id: 1, name: 'Hand-painted Vase', quantity: 1, price: 149.99 },
        { id: 2, name: 'Decorative Wall Art', quantity: 2, price: 74.99 },
      ],
    },
    {
      id: 2,
      date: '2024-03-15',
      status: 'In Transit',
      total: 189.98,
      items: [
        { id: 3, name: 'Crafted Jewelry Box', quantity: 1, price: 189.98 },
      ],
    },
    {
      id: 3,
      date: '2024-03-10',
      status: 'Processing',
      total: 259.97,
      items: [
        { id: 4, name: 'Handwoven Basket', quantity: 1, price: 89.99 },
        { id: 5, name: 'Table Runner', quantity: 2, price: 84.99 },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-100 text-green-800';
      case 'In Transit':
        return 'bg-blue-100 text-blue-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Package className="w-6 h-6 text-green-500" />
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-lg shadow">
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="font-medium">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  {expandedOrder === order.id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </div>
              
              {expandedOrder === order.id && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-3">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-green-500">${order.total}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">No orders yet</h2>
          <p className="text-gray-500 mt-2">Start shopping to see your orders here!</p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;