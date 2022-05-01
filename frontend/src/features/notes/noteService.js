import axios from 'axios';

const API_URL = '/api/tickets';

// Get notes

const getNotes = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/${ticketId}/notes`, config);

  return response.data;
};

// Create new note

const createNote = async (noteData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/${noteData.ticket}/notes`,
    noteData,
    config
  );
  return response.data;
};

const noteService = {
  getNotes,
  createNote,
};

export default noteService;
