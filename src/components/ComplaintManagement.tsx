import React, { useState } from 'react';
import { Plus, MessageSquare, Clock, CheckCircle, AlertTriangle, Camera, Send } from 'lucide-react';
import { mockComplaints, mockProperties, mockRooms } from '../data/mockData';

interface ComplaintManagementProps {
  userType: 'owner' | 'customer';
}

const ComplaintManagement: React.FC<ComplaintManagementProps> = ({ userType }) => {
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintDescription, setComplaintDescription] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);

  const categories = [
    { id: 'wifi', label: 'WiFi', icon: '📶' },
    { id: 'lift', label: 'Lift', icon: '🛗' },
    { id: 'water', label: 'Water', icon: '💧' },
    { id: 'food', label: 'Food', icon: '🍽️' },
    { id: 'cleanliness', label: 'Cleanliness', icon: '🧹' },
    { id: 'noise', label: 'Noise', icon: '🔊' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { id: 'other', label: 'Other', icon: '📝' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="h-5 w-5 text-orange-500" />;
      case 'in_progress': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'closed': return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-orange-100 text-orange-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getComplaintDetails = (complaint: any) => {
    const property = mockProperties.find(p => p.id === complaint.propertyId);
    const room = mockRooms.find(r => r.id === complaint.roomId);
    return { property, room };
  };

  const handleSubmitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically submit the complaint to your backend
    console.log('Submitting complaint:', {
      category: selectedCategory,
      title: complaintTitle,
      description: complaintDescription,
    });
    setShowComplaintForm(false);
    setSelectedCategory('');
    setComplaintTitle('');
    setComplaintDescription('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">
          {userType === 'owner' ? 'Complaint Management' : 'My Complaints'}
        </h1>
        {userType === 'customer' && (
          <button
            onClick={() => setShowComplaintForm(true)}
            className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-red-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Report Issue</span>
          </button>
        )}
      </div>

      {/* Complaint Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplaints.filter(c => c.status === 'open').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplaints.filter(c => c.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockComplaints.filter(c => c.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-gray-100">
              <MessageSquare className="h-6 w-6 text-gray-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="text-2xl font-bold text-gray-900">{mockComplaints.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Complaints List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Complaints</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {mockComplaints.map((complaint) => {
            const { property, room } = getComplaintDetails(complaint);
            const categoryInfo = categories.find(c => c.id === complaint.category);
            
            return (
              <div key={complaint.id} className="p-6 hover:bg-gray-50 cursor-pointer"
                   onClick={() => setSelectedComplaint(complaint.id)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">{categoryInfo?.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-medium text-gray-900">{complaint.title}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(complaint.priority)}`}>
                          {complaint.priority}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{complaint.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{property?.name}</span>
                        {room && <span>Room {room.roomNumber}</span>}
                        <span>{complaint.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(complaint.status)}
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(complaint.status)}`}>
                      {complaint.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Complaint Form Modal */}
      {showComplaintForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Report an Issue</h2>
              <button
                onClick={() => setShowComplaintForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmitComplaint} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <div className="grid grid-cols-4 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`p-3 rounded-lg border text-center transition-colors ${
                        selectedCategory === category.id
                          ? 'border-red-500 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-xl mb-1">{category.icon}</div>
                      <div className="text-xs">{category.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={complaintTitle}
                  onChange={(e) => setComplaintTitle(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Brief description of the issue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={complaintDescription}
                  onChange={(e) => setComplaintDescription(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 h-24 resize-none"
                  placeholder="Detailed description of the issue"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Click to add photos</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowComplaintForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedCategory || !complaintTitle || !complaintDescription}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-96 overflow-y-auto">
            {(() => {
              const complaint = mockComplaints.find(c => c.id === selectedComplaint);
              const { property, room } = getComplaintDetails(complaint);
              const categoryInfo = categories.find(c => c.id === complaint?.category);
              
              return (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Complaint Details</h2>
                    <button
                      onClick={() => setSelectedComplaint(null)}
                      className="text-gray-500 hover:text-gray-700 text-xl"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{categoryInfo?.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-semibold">{complaint?.title}</h3>
                          <span className={`px-2 py-1 text-sm font-medium rounded-full ${getPriorityColor(complaint?.priority || 'low')}`}>
                            {complaint?.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 mb-4">{complaint?.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Property:</span> {property?.name}
                          </div>
                          <div>
                            <span className="font-medium">Room:</span> {room?.roomNumber || 'Common Area'}
                          </div>
                          <div>
                            <span className="font-medium">Category:</span> {categoryInfo?.label}
                          </div>
                          <div>
                            <span className="font-medium">Created:</span> {complaint?.createdAt.toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(complaint?.status || 'open')}
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(complaint?.status || 'open')}`}>
                          {complaint?.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    
                    {userType === 'owner' && complaint?.status !== 'resolved' && (
                      <div className="flex space-x-3 pt-4 border-t">
                        <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                          Mark in Progress
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                          Mark Resolved
                        </button>
                      </div>
                    )}
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

export default ComplaintManagement;