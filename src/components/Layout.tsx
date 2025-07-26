import React from 'react';
import { User, Building2, MapPin, CreditCard, MessageSquare, BarChart3, Settings, Bell, Search } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'owner' | 'customer';
  currentView: string;
  onViewChange: (view: string) => void;
  user: any;
}

const Layout: React.FC<LayoutProps> = ({ children, userType, currentView, onViewChange, user }) => {
  const ownerNavigation = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'properties', label: 'Properties', icon: Building2 },
    { id: 'bookings', label: 'Bookings', icon: User },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'expenses', label: 'Expenses', icon: BarChart3 },
  ];

  const customerNavigation = [
    { id: 'search', label: 'Find PG', icon: Search },
    { id: 'bookings', label: 'My Bookings', icon: User },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'complaints', label: 'Complaints', icon: MessageSquare },
    { id: 'map', label: 'Map View', icon: MapPin },
  ];

  const navigation = userType === 'owner' ? ownerNavigation : customerNavigation;
  const themeColor = userType === 'owner' ? 'blue' : 'green';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-${themeColor}-600 text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8" />
              <h1 className="text-xl font-bold">
                PG Manager {userType === 'owner' ? 'Pro' : 'Find'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 cursor-pointer hover:opacity-80" />
              <div className="flex items-center space-x-2">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
                ) : (
                  <div className={`h-8 w-8 rounded-full bg-${themeColor}-500 flex items-center justify-center`}>
                    <User className="h-5 w-5" />
                  </div>
                )}
                <span className="font-medium">{user?.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-lg h-screen sticky top-0">
          <div className="p-4">
            <div className={`text-${themeColor}-600 font-semibold mb-4`}>
              {userType === 'owner' ? 'Owner Dashboard' : 'Customer Portal'}
            </div>
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => onViewChange(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        currentView === item.id
                          ? `bg-${themeColor}-100 text-${themeColor}-700`
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;