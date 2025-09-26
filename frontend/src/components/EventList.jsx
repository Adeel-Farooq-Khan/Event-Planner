import React from 'react';
import { CreditCard as Edit, Trash2, Calendar, Tag } from 'lucide-react';

const EventList = ({ events, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'personal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'other':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (events.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Found</h3>
        <p className="text-gray-500">Start by adding your first event!</p>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Events</h2>
      
      {events.map((event) => (
        <div
          key={event._id}
          className="bg-white rounded-xl shadow-lg p-6  border-purple-500 hover:shadow-xl transition-all duration-200"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(event.category)}`}>
                  <Tag className="w-3 h-3 inline mr-1" />
                  {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                </span>
              </div>
              
              {event.description && (
                <p className="text-gray-600 mb-3 leading-relaxed">{event.description}</p>
              )}
              
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-medium">{formatDate(event.date)}</span>
              </div>
            </div>
            
            <div className="flex gap-2 ml-4">
              <button
                onClick={() => onEdit(event)}
                className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                title="Edit event"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(event._id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete event"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;