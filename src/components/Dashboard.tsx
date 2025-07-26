import React from 'react';
import { Building2, Users, CreditCard, AlertCircle, TrendingUp, MapPin } from 'lucide-react';

interface DashboardProps {
  userType: 'owner' | 'customer';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  const themeColor = userType === 'owner' ? 'blue' : 'green';

  if (userType === 'owner') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Properties</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Tenants</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <CreditCard className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹4,50,000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Open Complaints</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Room A102 - Elite PG</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium">Amit Kumar</p>
                  <p className="text-sm text-gray-500">Room B201 - Elite PG</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Pending</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Revenue</span>
                <span className="font-semibold">₹4,50,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Total Expenses</span>
                <span className="font-semibold text-red-600">₹1,20,000</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Net Profit</span>
                <span className="font-bold text-green-600">₹3,30,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <div className="text-sm text-gray-500">
          Find your perfect PG accommodation
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Find Nearby PGs</h3>
              <p className="text-gray-500">Discover accommodations near you</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Pay Rent</h3>
              <p className="text-gray-500">Quick payment options</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-orange-600" />
            <div className="ml-4">
              <h3 className="text-lg font-semibold">Report Issue</h3>
              <p className="text-gray-500">Get help with any problems</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Booking */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Current Booking</h3>
        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
          <div>
            <h4 className="font-medium">Elite PG for Professionals</h4>
            <p className="text-sm text-gray-600">Room A102 • Koramangala, Bangalore</p>
            <p className="text-sm text-gray-500">Check-in: Feb 1, 2024 • Check-out: Aug 1, 2024</p>
          </div>
          <div className="text-right">
            <p className="font-semibold text-green-600">₹15,000/month</p>
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
          </div>
        </div>
      </div>

      {/* Recommended PGs */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recommended for You</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <img 
              src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
              alt="PG" 
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="font-medium mt-2">Premium PG Near IT Hub</h4>
            <p className="text-sm text-gray-500">Whitefield, Bangalore</p>
            <p className="font-semibold text-green-600">₹18,000/month</p>
          </div>
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            <img 
              src="https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" 
              alt="PG" 
              className="w-full h-32 object-cover rounded"
            />
            <h4 className="font-medium mt-2">Student Friendly PG</h4>
            <p className="text-sm text-gray-500">BTM Layout, Bangalore</p>
            <p className="font-semibold text-green-600">₹12,000/month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;