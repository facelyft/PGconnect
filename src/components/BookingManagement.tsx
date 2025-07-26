import React, { useState } from 'react';
import { Calendar, User, MapPin, CreditCard, Phone, Mail } from 'lucide-react';
import { mockBookings, mockProperties, mockRooms, mockUsers } from '../data/mockData';

interface BookingManagementProps {
  userType: 'owner' | 'customer';
}

const BookingManagement: React.FC<BookingManagementProps> = ({ userType }) => {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBookingDetails = (booking: any) => {
    const property = mockProperties.find(p => p.id === booking.propertyId);
    const room = mockRooms.find(r => r.id === booking.roomId);
    const customer = mockUsers.find(u => u.id === booking.customerId);
    return { property, room, customer };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {userType === 'owner' ? 'Booking Management' : 'My Bookings'}
        </h1>
        {userType === 'customer' && (
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Find New PG
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {userType === 'owner' ? 'Customer' : 'Property'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {mockBookings.map((booking) => {
                const { property, room, customer } = getBookingDetails(booking);
                return (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {userType === 'owner' ? (
                          <>
                            <div className="flex-shrink-0 h-10 w-10">
                              {customer?.avatar ? (
                                <img src={customer.avatar} alt={customer.name} className="h-10 w-10 rounded-full" />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <User className="h-5 w-5 text-gray-500" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{customer?.name}</div>
                              <div className="text-sm text-gray-500">{customer?.email}</div>
                            </div>
                          </>
                        ) : (
                          <div>
                            <div className="text-sm font-medium text-gray-900">{property?.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property?.city}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Room {room?.roomNumber}</div>
                      <div className="text-sm text-gray-500">{room?.type} occupancy</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.checkIn.toLocaleDateString()} to {booking.checkOut.toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">{booking.duration} term</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{booking.totalAmount.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">₹{booking.rent.toLocaleString()}/month</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => setSelectedBooking(booking.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {userType === 'owner' && booking.status === 'pending' && (
                        <>
                          <button className="text-green-600 hover:text-green-900">
                            Approve
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            {(() => {
              const booking = mockBookings.find(b => b.id === selectedBooking);
              const { property, room, customer } = getBookingDetails(booking);
              
              return (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Booking Details</h2>
                    <button
                      onClick={() => setSelectedBooking(null)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Property Information</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p className="font-medium">{property?.name}</p>
                          <p className="text-sm text-gray-600">{property?.address}</p>
                          <p className="text-sm text-gray-600">{property?.city}, {property?.state}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Room Details</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <p>Room {room?.roomNumber} ({room?.type})</p>
                          <p className="text-sm text-gray-600">Capacity: {room?.capacity} people</p>
                          <p className="text-sm text-gray-600">Gender: {room?.gender}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {userType === 'owner' && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center space-x-3 mb-2">
                              {customer?.avatar ? (
                                <img src={customer.avatar} alt={customer.name} className="h-10 w-10 rounded-full" />
                              ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                  <User className="h-5 w-5 text-gray-500" />
                                </div>
                              )}
                              <div>
                                <p className="font-medium">{customer?.name}</p>
                                <p className="text-sm text-gray-600">{customer?.type}</p>
                              </div>
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                                {customer?.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                                {customer?.phone}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">Booking Details</h3>
                        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                          <div className="flex justify-between">
                            <span>Check-in:</span>
                            <span>{booking?.checkIn.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Check-out:</span>
                            <span>{booking?.checkOut.toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly Rent:</span>
                            <span>₹{booking?.rent.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security Deposit:</span>
                            <span>₹{booking?.deposit.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between font-semibold border-t pt-2">
                            <span>Total Amount:</span>
                            <span>₹{booking?.totalAmount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;