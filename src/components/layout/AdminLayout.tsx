import  { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Leaf, 
  Package, 
  Settings, 
  LogOut, 
  User, 
  BarChart3, 
  Menu, 
  X, 
  ShoppingCart,
  Users,
  MessageCircle
} from 'lucide-react';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigationItems = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: BarChart3 },
    { title: 'Products', path: '/admin/product', icon: Package },
    { title: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { title: 'Customers', path: '/admin/customers', icon: Users },
    { title: 'Reviews', path: '/admin/reviews', icon: MessageCircle },
    { title: 'Settings', path: '/admin/profile-settings', icon: Settings },
  ];

  const isActiveRoute = (path:string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* Header */}
      <header className="bg-emerald-700 text-white py-3 px-4 shadow-lg">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-emerald-600 rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center space-x-2">
              <Leaf className="text-emerald-300" />
              <h1 className="text-xl font-semibold">ArtsbyUsha Admin</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-3 py-2 hover:bg-emerald-600 rounded-lg transition-colors">
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className={`
          fixed lg:static inset-y-0 left-0 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:transform-none transition-transform duration-200 ease-in-out
          w-64 bg-white border-r border-emerald-100 shadow-lg
          z-30 lg:z-0
        `}>
          <div className="flex flex-col h-full p-4">
            <div className="space-y-1 flex-1">
              {navigationItems.map((item) => {
                const ItemIcon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActiveRoute(item.path)
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-gray-600 hover:bg-emerald-50 hover:text-emerald-600'
                      }
                    `}
                  >
                    <ItemIcon size={20} />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </div>

            {/* Environment Impact Stats */}
            <div className="mt-auto p-4 bg-emerald-50 rounded-lg">
              <h3 className="text-sm font-semibold text-emerald-700 mb-2">
                Today's Impact
              </h3>
              <div className="space-y-2 text-sm text-emerald-600">
                <div className="flex justify-between">
                  <span>CO₂ Saved</span>
                  <span className="font-medium">24.5 kg</span>
                </div>
                <div className="flex justify-between">
                  <span>Trees Saved</span>
                  <span className="font-medium">3.2</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-4 lg:p-6 bg-stone-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;