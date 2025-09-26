import Event from '../models/Event.js';

//  get all events

export const getEvents = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    
    if (category && category !== 'all') {
      filter.category = category;
    }
    const events = await Event.find(filter).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//create new event

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    // Validation of all the input fields
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }
    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }
    if (!['work', 'personal', 'other'].includes(category)) {
      return res.status(400).json({ message: 'Category must be work, personal, or other' });
    }

    const event = new Event({
      title,
      description,
      date,
      category
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// update any event

export const updateEvent = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    // Basic Validation 
    if (category && !['work', 'personal', 'other'].includes(category)) {
      return res.status(400).json({ message: 'Category must be work, personal, or other' });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title: title || event.title,
        description: description !== undefined ? description : event.description,
        date: date || event.date,
        category: category || event.category
      },
      { new: true, runValidators: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//    Delete any sepecific  event

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};