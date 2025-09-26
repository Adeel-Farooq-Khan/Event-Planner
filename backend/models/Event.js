import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
    trim: true,
    maxLength: [100]
  },
  description: {
    type: String,
    trim: true,
    maxLength: [500]
  },
  date: {
    type: Date,
    required: [true]
  },
  category: {
    type: String,
    required: [true],
    enum: {
      values: ['work', 'personal', 'other'],
      message: 'Category must be work, personal, or other'
    }
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;