import React, { useState, useEffect } from "react";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import Filter from "../components/Filter";
import { eventAPI } from "../api";
import { Calendar } from "lucide-react";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingEvent, setEditingEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtering events based on category
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredEvents(events);
    } else {
      setFilteredEvents(
        events.filter((event) => event.category === selectedCategory)
      );
    }
  }, [events, selectedCategory]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await eventAPI.getEvents();
      setEvents(response.data);
      setError("");
    } catch (error) {
      setError(
        "Failed to fetch events. Make sure the backend server is running."
      );
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreateEvent = async (eventData) => {
    try {
      const response = await eventAPI.createEvent(eventData);
      setEvents((prev) => [...prev, response.data]);
      setError("");
    } catch (error) {
      setError(
        "Failed to create event. Please check your input and try again."
      );
      console.error("Error creating event:", error);
    }
  };

  const handleUpdateEvent = async (eventData) => {
    try {
      const response = await eventAPI.updateEvent(editingEvent._id, eventData);
      setEvents((prev) =>
        prev.map((event) =>
          event._id === editingEvent._id ? response.data : event
        )
      );
      setEditingEvent(null);
      setError("");
    } catch (error) {
      setError("Failed to update event. Please try again.");
      console.error("Error updating event:", error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await eventAPI.deleteEvent(eventId);
        setEvents((prev) => prev.filter((event) => event._id !== eventId));
        setError("");
      } catch (error) {
        setError("Failed to delete event. Please try again.");
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Calendar className="w-16 h-16 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600 text-lg">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Calendar className="w-12 h-12 text-emerald-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Event Planner</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Organize your life, one event at a time
          </p>
        </header>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">{error}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          <EventForm
            onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
            editingEvent={editingEvent}
            onCancelEdit={handleCancelEdit}
          />

          <Filter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <EventList
            events={filteredEvents}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
