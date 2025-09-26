import express from 'express';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';

const router = express.Router();

// listing all the events
router.get('/', getEvents);

// create event
router.post('/', createEvent);

// update event by id
router.put('/:id', updateEvent);

// delete event by id
router.delete('/:id', deleteEvent);

export default router;