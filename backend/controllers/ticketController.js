const catchAsync = require('../utils/catchAsync');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');

// Get user tickets
// GET /api/tickets/me
// Private

module.exports.getTickets = catchAsync(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

// Create a ticket
// POST /api/tickets/me
// Private

module.exports.createTicket = catchAsync(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error('Please add a product and description');
  }
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new',
  });

  res.status(201).json(ticket);
});

// Get user ticket
// GET /api/tickets/:id
// Private

module.exports.getTicket = catchAsync(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  res.status(200).json(ticket);
});

// Delete ticket
// DELETE /api/tickets/:id
// Private

module.exports.deleteTicket = catchAsync(async (req, res) => {
  // Get user using the id in JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  await ticket.remove();
  res.status(200).json({ success: true });
});

// Update a ticket
// PATCH /api/tickets/:id
// Private

module.exports.updateTicket = catchAsync(async (req, res) => {
  const { product, description, status } = req.body;

  // Get user using the id in JWT
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error('Ticket not found');
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Unauthorized');
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json({ updatedTicket });
});
