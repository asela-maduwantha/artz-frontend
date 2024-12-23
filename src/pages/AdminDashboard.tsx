import { FC, useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, ShoppingBag, TrendingUp, Package, LucideIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { analyticsService, MonthlyRevenue, MostOrderedProduct, CategoryStats } from '../services/api/analyticsservice';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
}

const StatCard: FC<StatCardProps> = ({ title, value, icon: Icon, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg p-6 shadow-lg"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{title}</p>
        <h3 className="text-2xl font-bold mt-2">{value}</h3>
        {!trend && (
          <p className="text-green-600 text-sm mt-2">
            <TrendingUp className="inline-block w-4 h-4 mr-1" />
            {trend}
          </p>
        )}
      </div>
      <div className="bg-green-100 p-3 rounded-full">
        <Icon className="w-6 h-6 text-green-600" />
      </div>
    </div>
  </motion.div>
);

const AdminDashboard: FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<MonthlyRevenue[]>([]);
  const [topProducts, setTopProducts] = useState<MostOrderedProduct[]>([]);
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [revenue, products, categories] = await Promise.all([
          analyticsService.getMonthlyRevenue(2024),
          analyticsService.getMostOrderedProducts(),
          analyticsService.getCategoryStats(),
        ]);
        
        setMonthlyRevenue(revenue);
        setTopProducts(products);
        setCategoryStats(categories);
      } catch (error) {
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total revenue
  const totalRevenue = monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0);
  const totalOrders = monthlyRevenue.reduce((sum, month) => sum + month.total_orders, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Arts By Usha Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`LKR ${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          trend="+12% from last month"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders}
          icon={ShoppingBag}
          
        />
        <StatCard
          title="Categories"
          value={categoryStats.length}
          icon={Package}
        
        />
        <StatCard
          title="Avg Order Value"
          value={`LKR ${(totalRevenue / totalOrders || 0).toFixed(2)}`}
          icon={TrendingUp}
         
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-lg p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-6">Monthly Revenue</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Top Products</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product_name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_orders" fill="#059669" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Stats */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Category Distribution</h2>
          <div className="space-y-4">
            {categoryStats.map((category) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-600 mr-3" />
                  <span className="text-gray-700">{category.category}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">{category.product_count} products</span>
                  <span className="text-green-600 font-medium">
                    LKR {category.total_value.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;