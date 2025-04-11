

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Upload CAD file
export const uploadFile = (formData) =>
  API.post('/files/upload', formData);

// Get blocks list
export const fetchBlocks = (page = 1, search = '') =>
  API.get(`/blocks?page=${page}&search=${search}`);

// Get single block
export const fetchBlockDetails = (blockId) =>
  API.get(`/blocks/${blockId}`);

