import { User, Property, Room, Booking, Payment, Complaint, Expense } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    type: 'owner',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    type: 'customer',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
  }
];

export const mockProperties: Property[] = [
  {
    id: '1',
    ownerId: '1',
    name: 'Elite PG for Professionals',
    address: '123 MG Road, Koramangala',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560034',
    latitude: 12.9352,
    longitude: 77.6245,
    description: 'Premium PG accommodation with modern amenities, ideal for working professionals.',
    amenities: ['WiFi', 'AC', 'Laundry', 'Parking', 'Security', 'Housekeeping'],
    rules: ['No smoking', 'No alcohol', 'Guests allowed till 10 PM'],
    images: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    rating: 4.5,
    totalRooms: 20,
    availableRooms: 5,
    priceRange: { min: 15000, max: 25000 },
    nearbyPlaces: {
      colleges: ['IIM Bangalore', 'IISC', 'Christ University'],
      companies: ['Google', 'Microsoft', 'Amazon', 'Flipkart'],
      transport: ['Koramangala Metro', 'Bus Stop'],
      entertainment: ['Forum Mall', 'Indiranagar', 'Brigade Road']
    },
    createdAt: new Date('2024-01-15')
  }
];

export const mockRooms: Room[] = [
  {
    id: '1',
    propertyId: '1',
    roomNumber: 'A101',
    type: 'single',
    capacity: 1,
    occupancy: 0,
    rent: 20000,
    deposit: 40000,
    amenities: ['AC', 'Attached Bathroom', 'Study Table'],
    images: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800'],
    isAvailable: true,
    gender: 'unisex'
  },
  {
    id: '2',
    propertyId: '1',
    roomNumber: 'A102',
    type: 'double',
    capacity: 2,
    occupancy: 1,
    rent: 15000,
    deposit: 30000,
    amenities: ['AC', 'Attached Bathroom', 'Study Table'],
    images: ['https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=800'],
    isAvailable: true,
    gender: 'male'
  }
];

export const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: '2',
    propertyId: '1',
    roomId: '2',
    checkIn: new Date('2024-02-01'),
    checkOut: new Date('2024-08-01'),
    duration: 'medium',
    status: 'active',
    rent: 15000,
    deposit: 30000,
    totalAmount: 120000,
    createdAt: new Date('2024-01-20')
  }
];

export const mockPayments: Payment[] = [
  {
    id: '1',
    bookingId: '1',
    amount: 15000,
    type: 'rent',
    status: 'completed',
    method: 'online',
    dueDate: new Date('2024-02-01'),
    paidDate: new Date('2024-01-30'),
    createdAt: new Date('2024-01-20')
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    customerId: '2',
    propertyId: '1',
    roomId: '2',
    category: 'wifi',
    title: 'WiFi connectivity issues',
    description: 'Internet connection is very slow and frequently disconnects.',
    priority: 'medium',
    status: 'in_progress',
    attachments: [],
    createdAt: new Date('2024-01-25')
  }
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    propertyId: '1',
    category: 'utilities',
    description: 'Electricity bill for January',
    amount: 12000,
    date: new Date('2024-01-31')
  }
];