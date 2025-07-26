import React, { useState } from 'react';
import { Plus, TrendingDown, Calendar, Receipt, Filter, Download } from 'lucide-react';
import { mockExpenses, mockProperties } from '../data/mockData';

const ExpenseManagement: React.FC = () => {
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  const categories = [
    { id: 'maintenance', label: 'Maintenance', color: 'blue' },
    { id: 'utilities', label: 'Utilities', color: 'yellow' },
    { id: 'staff', label: 'Staff', color: 'green' },
    { id: 'supplies', label: 'Supplies', color: 'purple' },
    { id: 'other', label: 'Other', color: 'gray' },
  ];

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category);
    return cat ? cat.color : 'gray';
  };

  const filteredExpenses = mockExpenses.filter(expense => {
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    const matchesMonth = expense.date.getMonth() === selectedMonth;
    return matchesCategory && matchesMonth;
  });

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const categoryTotals = categories.map(category => ({
    ...category,
    total: filteredExpenses
      .filter(expense => expense.category === category.id)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Expense Management</h1>
        <button
          onClick={() => setShowExpenseForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">₹{totalExpenses.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {categoryTotals.slice(0, 3).map((category) => (
          <div key={category.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className={`p-3 rounded-full bg-${category.color}-100`}>
                <div className={`h-6 w-6 bg-${category.color}-600 rounded`}></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">{category.label}</p>
                <p className="text-2xl font-bold text-gray-900">₹{category.total.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border rounded-lg px-3 py-2"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-200 transition-colors">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Expense List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredExpenses.map((expense) => {
                const property = mockProperties.find(p => p.id === expense.propertyId);
                const category = categories.find(c => c.id === expense.category);
                return (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{expense.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-${category?.color}-100 text-${category?.color}-800`}>
                        {category?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{property?.name}</div>
                      <div className="text-sm text-gray-500">{property?.city}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">₹{expense.amount.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{expense.date.toLocaleDateString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        Edit
                      </button>
                      {expense.receipt && (
                        <button className="text-green-600 hover:text-green-900 flex items-center space-x-1">
                          <Receipt className="h-4 w-4" />
                          <span>Receipt</span>
                        </button>
                      )}
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showExpenseForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Add New Expense</h2>
              <button
                onClick={() => setShowExpenseForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  {mockProperties.map((property) => (
                    <option key={property.id} value={property.id}>
                      {property.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full border rounded-lg px-3 py-2">
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="e.g., Plumbing repair for room A101"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <input
                  type="number"
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded-lg px-3 py-2"
                  defaultValue={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Receipt (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Receipt className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">Upload receipt</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowExpenseForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseManagement;