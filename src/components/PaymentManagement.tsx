import React, { useState } from 'react';
import { CreditCard, Calendar, Download, Filter, CheckCircle, Clock, XCircle } from 'lucide-react';
import { mockPayments, mockBookings, mockProperties, mockRooms } from '../data/mockData';

interface PaymentManagementProps {
  userType: 'owner' | 'customer';
}

const PaymentManagement: React.FC<PaymentManagementProps> = ({ userType }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentDetails = (payment: any) => {
    const booking = mockBookings.find(b => b.id === payment.bookingId);
    const property = mockProperties.find(p => p.id === booking?.propertyId);
    const room = mockRooms.find(r => r.id === booking?.roomId);
    return { booking, property, room };
  };

  const totalRevenue = mockPayments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = mockPayments
    .filter(p => p.status === 'pending')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {userType === 'owner' ? 'Payment Management' : 'My Payments'}
        </h1>
        {userType === 'customer' && (
          <button
            onClick={() => setShowPaymentModal(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <CreditCard className="h-5 w-5" />
            <span>Pay Rent</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${userType === 'owner' ? 'bg-green-100' : 'bg-blue-100'}`}>
              <CreditCard className={`h-6 w-6 ${userType === 'owner' ? 'text-green-600' : 'text-blue-600'}`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {userType === 'owner' ? 'Total Revenue' : 'Total Paid'}
              </p>
              <p className="text-2xl font-bold text-gray-900">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                {userType === 'owner' ? 'Pending Collections' : 'Pending Payments'}
              </p>
              <p className="text-2xl font-bold text-gray-900">₹{pendingAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">This Month</p>
              <p className="text-2xl font-bold text-gray-900">₹{(totalRevenue * 0.3).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property/Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockPayments
                .filter(payment => selectedFilter === 'all' || payment.status === selectedFilter)
                .map((payment) => {
                  const { property, room } = getPaymentDetails(payment);
                  return (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{property?.name}</div>
                          <div className="text-sm text-gray-500">Room {room?.roomNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900 capitalize">{payment.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">₹{payment.amount.toLocaleString()}</div>
                        <div className="text-sm text-gray-500 capitalize">{payment.method}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{payment.dueDate.toLocaleDateString()}</div>
                        {payment.paidDate && (
                          <div className="text-sm text-gray-500">Paid: {payment.paidDate.toLocaleDateString()}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(payment.status)}
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          View
                        </button>
                        {payment.status === 'pending' && userType === 'customer' && (
                          <button
                            onClick={() => setShowPaymentModal(true)}
                            className="text-green-600 hover:text-green-900"
                          >
                            Pay Now
                          </button>
                        )}
                        {payment.status === 'completed' && (
                          <button className="text-gray-600 hover:text-gray-900">
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Make Payment</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Payment Details</h3>
                <div className="flex justify-between mb-2">
                  <span>Monthly Rent</span>
                  <span>₹15,000</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Maintenance</span>
                  <span>₹2,000</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total Amount</span>
                  <span>₹17,000</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option>Credit/Debit Card</option>
                  <option>UPI</option>
                  <option>Net Banking</option>
                  <option>Cash</option>
                </select>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentManagement;