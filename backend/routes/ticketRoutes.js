const express = require('express');
const router = express.Router();

//Controller
const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getTickets).post(protect, createTicket);
router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .patch(protect, updateTicket);

module.exports = router;
