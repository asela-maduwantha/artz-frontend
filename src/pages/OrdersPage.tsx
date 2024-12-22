import { Package, ChevronDown, ChevronUp, Loader2, Search, SortAsc, SortDesc } from 'lucide-react';
import { useState, useEffect } from 'react';
import { orderService, OrderStatus } from '../services/api/orderservice';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
}

interface Order {
  id: number;
  order_date: string;
  status: OrderStatus;
  order_items: OrderItem[];
  discount_amount: number;
  total_amount: number;
  shipping_address: string | null;
}

type SortField = 'date' | 'total' | 'status';
type SortOrder = 'asc' | 'desc';

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL');
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userId = 1; // Replace with actual user ID from auth context
      const response = await orderService.getOrdersByUser(userId);
      setOrders(response);
    } catch (err) {
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
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

  const sortOrders = (ordersToSort: Order[]): Order[] => {
    return [...ordersToSort].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = new Date(a.order_date).getTime() - new Date(b.order_date).getTime();
          break;
        case 'total':
          comparison = a.total_amount - b.total_amount;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  };

  const filterOrders = (ordersToFilter: Order[]): Order[] => {
    return ordersToFilter.filter(order => {
      const matchesSearch = searchTerm === '' || 
        order.id.toString().includes(searchTerm) ||
        order.order_items.some(item => 
          item.product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedOrders = sortOrders(filterOrders(orders));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={fetchOrders}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex items-center gap-2 mb-8">
        <Package className="w-6 h-6 text-green-500" />
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      <div className="mb-6 space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px] relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="relative w-[180px]">
            <button
              onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
              className="w-full px-4 py-2 text-left border border-gray-300 rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <span className="block truncate">
                {statusFilter === 'ALL' ? 'All Statuses' : statusFilter}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </span>
            </button>
            
            {isStatusDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                <ul className="py-1">
                  <li
                    className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                    onClick={() => {
                      setStatusFilter('ALL');
                      setIsStatusDropdownOpen(false);
                    }}
                  >
                    All Statuses
                  </li>
                  {Object.values(OrderStatus).map((status) => (
                    <li
                      key={status}
                      className="px-4 py-2 hover:bg-green-100 cursor-pointer"
                      onClick={() => {
                        setStatusFilter(status);
                        setIsStatusDropdownOpen(false);
                      }}
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => toggleSort('date')}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              sortField === 'date' ? 'bg-green-100 text-green-800' : 'text-gray-600'
            }`}
          >
            Date
            {sortField === 'date' && (
              sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => toggleSort('total')}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              sortField === 'total' ? 'bg-green-100 text-green-800' : 'text-gray-600'
            }`}
          >
            Total
            {sortField === 'total' && (
              sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />
            )}
          </button>
          <button
            onClick={() => toggleSort('status')}
            className={`flex items-center gap-1 px-3 py-1 rounded ${
              sortField === 'status' ? 'bg-green-100 text-green-800' : 'text-gray-600'
            }`}
          >
            Status
            {sortField === 'status' && (
              sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAndSortedOrders.map((order: Order) => (
          <div key={order.id} className="bg-white rounded-lg shadow">
            <div 
              className="p-6 cursor-pointer"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="font-medium">{formatDate(order.order_date)}</p>
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
                    {order.order_items.map((item: OrderItem) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                          <p className="text-sm text-gray-500">${item.product.price} each</p>
                        </div>
                        <p className="font-medium">${item.quantity * item.product.price}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t space-y-2">
                    {order.discount_amount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="text-green-500">-${order.discount_amount}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-green-500">${order.total_amount}</span>
                    </div>
                  </div>

                  {order.shipping_address && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-600">Shipping Address:</p>
                      <p className="text-sm">{order.shipping_address}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAndSortedOrders.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-600">
            {searchTerm || statusFilter !== 'ALL' 
              ? 'No orders match your filters'
              : 'No orders yet'
            }
          </h2>
          <p className="text-gray-500 mt-2">
            {searchTerm || statusFilter !== 'ALL'
              ? 'Try adjusting your search or filters'
              : 'Start shopping to see your orders here!'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;