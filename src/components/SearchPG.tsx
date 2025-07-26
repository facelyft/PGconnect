import React, { useState } from 'react';
import { Search, MapPin, Star, Wifi, Car, Shield, Utensils, Filter } from 'lucide-react';
import { mockProperties } from '../data/mockData';

const SearchPG: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [priceRange, setPriceRange] = useState([10000, 30000]);
  const [selectedGender, setSelectedGender] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const amenityIcons = {
    'WiFi': Wifi,
    'Parking': Car,
    'Security': Shield,
    'Food': Utensils,
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Find Your Perfect PG</h1>
        
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by location, college, company..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="5000"
                    max="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                  <span className="text-sm">₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unisex">Unisex</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  <option value="all">All Types</option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="triple">Triple</option>
                  <option value="shared">Shared</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {mockProperties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={property.images[0]} 
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium">{property.rating}</span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
              
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.city}</span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {property.amenities.slice(0, 4).map((amenity) => {
                  const Icon = amenityIcons[amenity as keyof typeof amenityIcons] || Wifi;
                  return (
                    <div key={amenity} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                      <Icon className="h-3 w-3" />
                      <span>{amenity}</span>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{property.priceRange.min.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm">/month</span>
                </div>
                <div className="text-sm text-gray-500">
                  {property.availableRooms} rooms available
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="text-sm">
                  <span className="font-medium">Nearby:</span>
                  <div className="text-gray-600">
                    <span>{property.nearbyPlaces.colleges.slice(0, 2).join(', ')}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors">
                  View Details
                </button>
                <button className="bg-green-100 text-green-700 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
                  <MapPin className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPG;