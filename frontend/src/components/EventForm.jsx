import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit3 } from 'lucide-react';

const EventForm = ({ onSubmit, editingEvent, onCancelEdit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    category: 'work'
  });

  useEffect(() => {
    if (editingEvent) {
      setFormData({
        title: editingEvent.title || '',
        description: editingEvent.description || '',
        date: editingEvent.date ? new Date(editingEvent.date).toISOString().split('T')[0] : '',
        category: editingEvent.category || 'work'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        date: '',
        category: 'work'
      });
    }
  }, [editingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.date) {
      alert('Title and date are required!');
      return;
    }

    onSubmit(formData);
    
    if (!editingEvent) {
      setFormData({
        title: '',
        description: '',
        date: '',
        category: 'work'
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        {editingEvent ? <Edit3 className="w-6 h-6 text-purple-600 mr-2" /> : <Plus className="w-6 h-6 text-emerald-600 mr-2" />}
        <h2 className="text-2xl font-bold text-gray-800">
          {editingEvent ? 'Edit Event' : 'Add New Event'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-0 focus:border-transparent transition-all"
            placeholder="Enter event title"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
            placeholder="Enter event description (optional)"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              required
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className={`flex-1 px-6 py-3 ${
              editingEvent 
                ? 'bg-purple-600 hover:bg-purple-700' 
                : 'bg-green-600 hover:bg-green-700'
            } text-white font-semibold rounded-lg transition-colors`}
          >
            {editingEvent ? 'Update Event' : 'Add Event'}
          </button>
          
          {editingEvent && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EventForm;