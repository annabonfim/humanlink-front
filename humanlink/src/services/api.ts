import axios from 'axios';

const api = axios.create({
  baseURL: 'https://humanlink-api-production.up.railway.app/humanlink',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'chave123', 
  },
});

export default api;