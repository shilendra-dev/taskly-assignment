import axios from 'axios'

// Create axios instance
export const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor - it adds auth token to the request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - it handles errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle auth errors & it logout user
    return Promise.reject(error)
  }
)