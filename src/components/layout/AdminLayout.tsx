
import { Link, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-green-600 text-white py-4 px-6 shadow">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded">
              Profile
            </button>
            <button className="bg-red-500 hover:bg-red-400 px-4 py-2 rounded">
              Logout
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <div className="flex flex-1">
        {/* Navigation Sidebar */}
        <nav className="bg-green-100 w-1/4 min-w-[200px] p-6 shadow-lg">
          <ul className="space-y-6">
            <li>
              <Link
                to="/admin/dashboard"
                className="text-green-600 font-medium hover:text-green-800"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/admin/product"
                className="text-green-600 font-medium hover:text-green-800"
              >
                Product Management
              </Link>
            </li>
            <li>
              <Link
                to="/admin/profile-settings"
                className="text-green-600 font-medium hover:text-green-800"
              >
                Profile Settings
              </Link>
            </li>
          </ul>
        </nav>
        {/* Main Content Section */}
        <main className="flex-1 p-6 bg-white">
          {/* Outlet for rendering child routes */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;