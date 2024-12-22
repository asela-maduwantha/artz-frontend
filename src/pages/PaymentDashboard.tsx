import React, { useEffect, useState } from 'react';
import { paymentService } from '../services/api/paymentservice';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCcw
} from 'lucide-react';

interface Payment {
  id: number;
  payment_method: string;
  amount: string;
  payment_date: string;
  stripe_id: string;
  status: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  order: {
    id: number;
    order_date: string;
    total_amount: number;
    status: string;
  };
}

const PaymentDashboard: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [stats, setStats] = useState({
    thisMonth: 0,
    lastMonth: 0,
    today: 0,
    percentageChange: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await paymentService.getAllPayments();
      setPayments(data);
      calculateStats(data);
    } catch (error) {
      toast.error('Failed to fetch payments');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (paymentData: Payment[]) => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const lastMonth = thisMonth - 1;
    const today = now.toISOString().split('T')[0];

    const thisMonthPayments = paymentData.filter(p => 
      new Date(p.payment_date).getMonth() === thisMonth
    ).reduce((sum, p) => sum + parseFloat(p.amount), 0);

    const lastMonthPayments = paymentData.filter(p => 
      new Date(p.payment_date).getMonth() === lastMonth
    ).reduce((sum, p) => sum + parseFloat(p.amount), 0);

    const todayPayments = paymentData.filter(p => 
      p.payment_date.startsWith(today)
    ).reduce((sum, p) => sum + parseFloat(p.amount), 0);

    const percentageChange = lastMonthPayments === 0 ? 100 :
      ((thisMonthPayments - lastMonthPayments) / lastMonthPayments) * 100;

    setStats({
      thisMonth: thisMonthPayments,
      lastMonth: lastMonthPayments,
      today: todayPayments,
      percentageChange
    });
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    change?: number;
    icon: React.ReactNode;
  }> = ({ title, value, change, icon }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <h3 className="text-2xl font-bold mt-1">${value.toFixed(2)}</h3>
          {change !== undefined && (
            <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
              <span className="text-sm font-medium ml-1">{Math.abs(change).toFixed(1)}%</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-blue-50 rounded-lg">
          {icon}
        </div>
      </div>
    </motion.div>
  );

  const filteredPayments = payments.filter(payment => 
    payment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.stripe_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {!loading&&<StatCard 
          title="This Month Revenue" 
          value={stats.thisMonth}
          icon={<DollarSign size={24} className="text-blue-500" />}
          change={stats.percentageChange}
        />}
        <StatCard 
          title="Last Month Revenue" 
          value={stats.lastMonth}
          icon={<Calendar size={24} className="text-blue-500" />}
        />
        <StatCard 
          title="Today's Revenue" 
          value={stats.today}
          icon={<DollarSign size={24} className="text-blue-500" />}
        />
      </div>

      {/* Search and Refresh */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          onClick={fetchPayments}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCcw size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment ID</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <AnimatePresence>
              {paginatedPayments.map((payment, index) => (
                <motion.tr 
                  key={payment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{`${payment.user.firstName} ${payment.user.lastName}`}</div>
                    <div className="text-sm text-gray-500">{payment.user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${parseFloat(payment.amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      payment.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    #{payment.order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.stripe_id}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Pagination */}
        <div className="px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing page <span className="font-medium">{currentPage}</span> of{' '}
                <span className="font-medium">{totalPages}</span>
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDashboard;