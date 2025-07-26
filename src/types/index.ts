export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: 'owner' | 'customer';
  avatar?: string;
}

export interface Property {
  id: string;
  ownerId: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  description: string;
  amenities: string[];
  rules: string[];
  images: string[];
  rating: number;
  totalRooms: number;
  availableRooms: number;
  priceRange: {
    min: number;
    max: number;
  };
  nearbyPlaces: {
    colleges: string[];
    companies: string[];
    transport: string[];
    entertainment: string[];
  };
  createdAt: Date;
}

export interface Room {
  id: string;
  propertyId: string;
  roomNumber: string;
  type: 'single' | 'double' | 'triple' | 'shared';
  capacity: number;
  occupancy: number;
  rent: number;
  deposit: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
  gender: 'male' | 'female' | 'unisex';
}

export interface Booking {
  id: string;
  customerId: string;
  propertyId: string;
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  duration: 'short' | 'medium' | 'long';
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  rent: number;
  deposit: number;
  totalAmount: number;
  createdAt: Date;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  type: 'rent' | 'deposit' | 'maintenance' | 'fine';
  status: 'pending' | 'completed' | 'failed';
  method: 'cash' | 'online' | 'bank_transfer';
  dueDate: Date;
  paidDate?: Date;
  createdAt: Date;
}

export interface Complaint {
  id: string;
  customerId: string;
  propertyId: string;
  roomId?: string;
  category: 'wifi' | 'lift' | 'water' | 'food' | 'cleanliness' | 'noise' | 'maintenance' | 'other';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  attachments: string[];
  createdAt: Date;
  resolvedAt?: Date;
}

export interface Expense {
  id: string;
  propertyId: string;
  category: 'maintenance' | 'utilities' | 'staff' | 'supplies' | 'other';
  description: string;
  amount: number;
  date: Date;
  receipt?: string;
}