import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE_KEY

export const getTickets = (params = {}) =>
  axios.get(`${API_BASE}/tickets/`, { params });

export const createTicket = (data) =>
  axios.post(`${API_BASE}/tickets/`, data);

export const updateTicket = (id, data) =>
  axios.patch(`${API_BASE}/tickets/${id}/`, data);

export const getStats = () =>
  axios.get(`${API_BASE}/tickets/stats/`);

export const classifyTicket = (description) =>
  axios.post(`${API_BASE}/tickets/classify/`, { description });
