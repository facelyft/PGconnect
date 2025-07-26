import React, { useState } from 'react';
import { MapPin, Navigation, Search, Filter, Star, Wifi, Car } from 'lucide-react';
import { mockProperties } from '../data/mockData';

const MapView: React.FC = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [showNearby, setShowNearby] = useState<string>('all');

  const nearbyCategories = [
    { id: 'all', label: 'All', icon: '🏢' },
    { id: 'colleges', label: 'Colleges', icon: '🎓' },
    { id: 'companies', label: 'Companies', icon: '🏢' },
    { id: 'transport', label: 'Transport', icon: '🚇' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
  ];

  // Mock nearby places for demonstration
  const getNearbyPlaces = (propertyId: string, category: string) => {
    const property = mockProperties.find(p => p.id === propertyId);
    if (!property) return [];

    switch (category) {
      case 'colleges':
        return property.nearbyPlaces.colleges.map((name, index) => ({
          id: `college-${index}`,
          name,
          type: 'college',
          distance: `${Math.random() * 5 + 0.5}`.slice(0, 3) + ' km',
          icon: '🎓'
        }));
      case 'companies':
        return property.nearbyPlaces.companies.map((name, index) => ({
          id: `company-${index}`,
          name,
          type: 'company',
          distance: `${Math.random() * 10 + 1}`.slice(0, 3) + ' km',
          icon: '🏢'
        }));
      case 'transport':
        return property.nearbyPlaces.transport.map((name, index) => ({
          id: `transport-${index}`,
          name,
          type: 'transport',
          distance: `${Math.random() * 2 + 0.2}`.slice(0, 3) + ' km',
          icon: '🚇'
        }));
      case 'entertainment':
        return property.nearbyPlaces.entertainment.map((name, index) => ({
          id: `entertainment-${index}`,
          name,
          type: 'entertainment',
          distance: `${Math.random() * 8 + 1}`.slice(0, 3) + ' km',
          icon: '🎬'
        }));
      default:
        return [
          ...property.nearbyPlaces.colleges.slice(0, 2).map((name, index) => ({
            id: `college-${index}`,
            name,
            type: 'college',
            distance: `${Math.random() * 5 + 0.5}`.slice(0, 3) + ' km',
            icon: '🎓'
          })),
          ...property.nearbyPlaces.companies.slice(0, 2).map((name, index) => ({
            id: `company-${index}`,
            name,
            type: 'company',
            distance: `${Math.random() * 10 + 1}`.slice(0, 3) + ' km',
            icon: '🏢'
          })),
        ];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Map View</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors">
            <Navigation className="h-5 w-5" />
            <span>My Location</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-96 bg-gradient-to-br from-green-100 to-blue-100 relative">
              {/* Mock Map Interface */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Interactive Map</p>
                  <p className="text-sm text-gray-500">Properties and nearby amenities</p>
                </div>
              </div>

              {/* Mock Property Markers */}
              {mockProperties.map((property, index) => (
                <div
                  key={property.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                    index === 0 ? 'top-1/2 left-1/2' : `top-${30 + index * 20}% left-${40 + index * 15}%`
                  }`}
                  onClick={() => setSelectedProperty(property.id)}
                >
                  <div className={`bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition-colors ${
                    selectedProperty === property.id ? 'ring-4 ring-green-300' : ''
                  }`}>
                    <MapPin className="h-5 w-5" />
                  </div>
                  {selectedProperty === property.id && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white p-3 rounded-lg shadow-lg min-w-64 z-10">
                      <h4 className="font-semibold mb-1">{property.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{property.address}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-green-600 font-bold">₹{property.priceRange.min.toLocaleString()}+</span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                          View Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <button className="bg-white p-2 rounded-lg shadow hover:shadow-md transition-shadow">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
                <button className="bg-white p-2 rounded-lg shadow hover:shadow-md transition-shadow">
                  <Filter className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Property List & Nearby Places */}
        <div className="space-y-6">
          {/* Property List */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Properties</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {mockProperties.map((property) => (
                <div
                  key={property.id}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedProperty === property.id ? 'bg-green-50 border-green-200' : ''
                  }`}
                  onClick={() => setSelectedProperty(property.id)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium mb-1">{property.name}</h4>
                      <div className="flex items-center space-x-2 mb-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{property.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600">{property.city}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Wifi className="h-3 w-3 text-gray-400" />
                        <Car className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">+{property.amenities.length - 2} more</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">₹{property.priceRange.min.toLocaleString()}</p>
                      <p className="text-xs text-gray-500">/month</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nearby Places */}
          {selectedProperty && (
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b">
                <h3 className="text-lg font-semibold mb-3">Nearby Places</h3>
                <div className="flex flex-wrap gap-2">
                  {nearbyCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setShowNearby(category.id)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        showNearby === category.id
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <span className="mr-1">{category.icon}</span>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {getNearbyPlaces(selectedProperty, showNearby).map((place) => (
                  <div key={place.id} className="p-3 border-b hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{place.icon}</span>
                        <div>
                          <p className="font-medium">{place.name}</p>
                          <p className="text-sm text-gray-500 capitalize">{place.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{place.distance}</p>
                        <button className="text-xs text-green-600 hover:text-green-700">
                          Directions
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;