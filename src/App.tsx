import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PropertyManagement from './components/PropertyManagement';
import SearchPG from './components/SearchPG';
import BookingManagement from './components/BookingManagement';
import PaymentManagement from './components/PaymentManagement';
import ComplaintManagement from './components/ComplaintManagement';
import MapView from './components/MapView';
import ExpenseManagement from './components/ExpenseManagement';
import { mockUsers } from './data/mockData';

function App() {
  const [userType, setUserType] = useState<'owner' | 'customer'>('owner');
  const [currentView, setCurrentView] = useState('dashboard');
  
  const currentUser = mockUsers.find(u => u.type === userType) || mockUsers[0];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard userType={userType} />;
      case 'properties':
        return <PropertyManagement />;
      case 'search':
        return <SearchPG />;
      case 'bookings':
        return <BookingManagement userType={userType} />;
      case 'payments':
        return <PaymentManagement userType={userType} />;
      case 'complaints':
        return <ComplaintManagement userType={userType} />;
      case 'map':
        return <MapView />;
      case 'expenses':
        return <ExpenseManagement />;
      default:
        return <Dashboard userType={userType} />;
    }
  };

  return (
    <div className="App">
      {/* User Type Switcher - For Demo Purposes */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-lg shadow-lg p-2 border">
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setUserType('owner');
              setCurrentView('dashboard');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              userType === 'owner'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            PG Owner
          </button>
          <button
            onClick={() => {
              setUserType('customer');
              setCurrentView('search');
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              userType === 'customer'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Customer
          </button>
        </div>
      </div>

      <Layout
        userType={userType}
        currentView={currentView}
        onViewChange={setCurrentView}
        user={currentUser}
      >
        {renderCurrentView()}
      </Layout>
    </div>
  );
}

export default App;