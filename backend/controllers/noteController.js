const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// Get notes for a ticket
// GET /api/tickets/:id/notes
// Private

module.exports.getNotes = catchAsync(async (req, res) => {
  // Get user using the id in JWT

  const user = await User.findById(req.user.id);
  const { ticketId } = req.params;

  const ticket = await Ticket.findById(ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const notes = await Note.find({ ticket: ticketId });

  res.status(200).json(notes);
});

// Create ticket note
// Post /api/tickets/:id/notes
// Private

module.exports.addNote = catchAsync(async (req, res) => {
  // Get user using the id in JWT

  const user = await User.findById(req.user.id);
  const { ticketId } = req.params;

  const ticket = await Ticket.findById(ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
    user: req.user.id,
  });

  res.status(200).json(note);
});
