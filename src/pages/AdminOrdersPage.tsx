import { useState, useEffect } from 'react';
import { Package, ChevronDown, ChevronUp, Loader2, Search } from 'lucide-react';
import { orderService, OrderStatus } from '../services/api/orderservice';

// Updated interfaces to match API response
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  created_at: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  img_url: string;
  price: number;
  category: string;
  is_customizable: boolean;
  is_active: boolean;
}

interface Customization {
  id: number;
  selected_value: string;
  price_impact: string;
}

interface OrderItem {
  id: number;
  quantity: number;
  product: Product;
  customizations: Customization[];
}

interface Order {
  id: number;
  order_date: string;
  total_amount: number;
  discount_amount: number;
  status: OrderStatus;
  shipping_address: string;
  user: User;
  discount: any | null;
  order_items: OrderItem[];
}

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [isUpdating, setIsUpdating] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();
      setOrders(response);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: number, newStatus: OrderStatus) => {
    try {
      setIsUpdating(orderId);
      await orderService.updateOrderStatus(orderId, newStatus);
      await fetchOrders(); // Refresh orders after update
    } catch (err) {
      setError('Failed to update order status. Please try again.');
    } finally {
      setIsUpdating(null);
    }
  };

  const getStatusColor = (status: OrderStatus): string => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return 'bg-green-100 text-green-800';
      case OrderStatus.CONFIRMED:
        return 'bg-blue-100 text-blue-800';
      case OrderStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case OrderStatus.CANCELLED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' || 
      order.id.toString().includes(searchTerm) ||
      order.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.order_items.some(item => 
        item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const ordersByStatus = Object.values(OrderStatus).reduce((acc, status) => {
    acc[status] = filteredOrders.filter(order => order.status === status);
    return acc;
  }, {} as Record<OrderStatus, Order[]>);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Package className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl font-bold">Order Management</h1>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | 'ALL')}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="ALL">All Statuses</option>
            {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
          {error}
        </div>
      )}

      {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
        statusOrders.length > 0 && (
          <div key={status} className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{status} Orders ({statusOrders.length})</h2>
            <div className="space-y-4">
              {statusOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Order #{order.id}</p>
                        <p className="font-medium">{formatDate(order.order_date)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <button
                          onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedOrder === order.id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {expandedOrder === order.id && (
                      <div className="border-t pt-4">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <h3 className="font-semibold mb-2">Customer Details</h3>
                            <p className="text-sm">
                              Name: {order.user.firstName} {order.user.lastName}
                            </p>
                            <p className="text-sm">Email: {order.user.email}</p>
                          </div>
                          <div>
                            <h3 className="font-semibold mb-2">Shipping Address</h3>
                            <p className="text-sm">{order.shipping_address || 'No shipping address provided'}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-semibold mb-2">Order Items</h3>
                          <div className="space-y-3">
                            {order.order_items.map((item) => (
                              <div key={item.id} className="border-b pb-3">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium">{item.product.name}</p>
                                    <p className="text-sm text-gray-500">
                                      Quantity: {item.quantity} × ${item.product.price}
                                    </p>
                                    {item.customizations && item.customizations.length > 0 && (
                                      <div className="mt-2">
                                        <p className="text-sm font-medium">Customizations:</p>
                                        <ul className="text-sm text-gray-600">
                                          {item.customizations.map((custom) => (
                                            <li key={custom.id}>
                                              {custom.selected_value}
                                              {custom.price_impact !== "0.00" && 
                                                ` (+$${custom.price_impact})`
                                              }
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    )}
                                  </div>
                                  <p className="font-medium">
                                    ${(item.quantity * item.product.price).toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center border-t pt-4">
                          <div>
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value as OrderStatus)}
                              disabled={isUpdating === order.id}
                              className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {Object.values(OrderStatus).map((status) => (
                                <option key={status} value={status}>{status}</option>
                              ))}
                            </select>
                            {isUpdating === order.id && (
                              <span className="ml-2 text-sm text-gray-500">Updating...</span>
                            )}
                          </div>
                          <div className="text-right">
                            {order.discount_amount > 0 && (
                              <p className="text-sm text-green-600">
                                Discount: -${order.discount_amount.toFixed(2)}
                              </p>
                            )}
                            <p className="font-bold text-lg">
                              Total: ${order.total_amount.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      ))}

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">
            {searchTerm || statusFilter !== 'ALL' 
              ? 'No orders match your filters'
              : 'No orders found'
            }
          </h2>
          <p className="text-gray-500 mt-2">
            {searchTerm || statusFilter !== 'ALL'
              ? 'Try adjusting your search or filters'
              : 'Orders will appear here when customers place them'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;