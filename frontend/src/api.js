import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Event API endpoints
export const eventAPI = {
  getEvents: (category) => {
    const params = category && category !== 'all' ? { category } : {};
    return API.get('/events', { params });
  },

  // Create new event
  createEvent: (eventData) => API.post('/events', eventData),

  // Update event
  updateEvent: (id, eventData) => API.put(`/events/${id}`, eventData),

  // Delete event
  deleteEvent: (id) => API.delete(`/events/${id}`),
};

export default API;