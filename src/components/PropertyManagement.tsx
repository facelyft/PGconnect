import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Users, MapPin, Star } from 'lucide-react';
import { mockProperties, mockRooms } from '../data/mockData';

const PropertyManagement: React.FC = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Property Management</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Property</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {mockProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src={property.images[0]} 
              alt={property.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">{property.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{property.rating}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.address}</span>
              </div>
              
              <div className="flex items-center text-gray-600 mb-4">
                <Users className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.availableRooms}/{property.totalRooms} rooms available</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-blue-600">
                  ₹{property.priceRange.min.toLocaleString()} - ₹{property.priceRange.max.toLocaleString()}
                </span>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedProperty(property.id)}
                  className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm hover:bg-blue-200 transition-colors flex items-center justify-center"
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Rooms
                </button>
                <button className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button className="bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm hover:bg-red-200 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Room Details</h2>
            <button
              onClick={() => setSelectedProperty(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockRooms.filter(room => room.propertyId === selectedProperty).map((room) => (
              <div key={room.id} className="border rounded-lg p-4">
                <img 
                  src={room.images[0]} 
                  alt={`Room ${room.roomNumber}`}
                  className="w-full h-32 object-cover rounded mb-3"
                />
                <h4 className="font-semibold mb-2">Room {room.roomNumber}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Type: {room.type}</p>
                  <p>Occupancy: {room.occupancy}/{room.capacity}</p>
                  <p>Rent: ₹{room.rent.toLocaleString()}/month</p>
                  <p>Gender: {room.gender}</p>
                </div>
                <div className="mt-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    room.isAvailable 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {room.isAvailable ? 'Available' : 'Occupied'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Add New Property</h2>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                <input type="text" className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <textarea className="w-full border rounded-lg px-3 py-2 rows-3"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input type="text" className="w-full border rounded-lg px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Rooms</label>
                <input type="number" className="w-full border rounded-lg px-3 py-2" />
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyManagement;