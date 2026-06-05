import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Automatically attach token to every request if logged in
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('careerlens_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// CAREERS
export const getAllCareers = (params) => API.get('/careers', { params });
export const getCareerById = (id) => API.get(`/careers/${id}`);
export const getDomains = () => API.get('/careers/domains');
export const getCareerSuggestions = (params) => API.get('/careers/suggestions', { params });

// SAVED
export const saveCareer = (career_id) => API.post('/saved', { career_id });
export const unsaveCareer = (career_id) => API.delete(`/saved/${career_id}`);
export const getSavedCareers = () => API.get('/saved');
export const checkSaved = (career_id) => API.get(`/saved/check/${career_id}`);

// COMMENTS
export const getComments = (career_id) => API.get(`/comments/${career_id}`);
export const addComment = (data) => API.post('/comments', data);

// PROFESSIONALS
export const registerProfessional = (data) => API.post('/professionals/register', data);
export const getProfessionalProfile = () => API.get('/professionals/me');