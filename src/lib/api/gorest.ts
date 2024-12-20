import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import type { UserDto } from '@/types/user.interface';

const BASE_URL = 'https://gorest.co.in/public/v2';

// Initialize an Axios instance with Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Set up a function to update API token
export const setToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
};

// Function to fetch posts with pagination
export const fetchPosts = async ({ pageParam = 1, queryKey }: QueryFunctionContext) => {
  const [per_page, title] = queryKey;
  const response =  await apiClient.get(`/posts`, {
    params: { page: pageParam, per_page, title },
  });

  return {
      data: response.data,
      pagination: {
          limit: response.headers['x-pagination-limit'],
          page: response.headers['x-pagination-page'],
          totalPages: response.headers['x-pagination-pages'],
          totalItems: response.headers['x-pagination-total']
      }
  };
};

// Fetch a single post
export const fetchPost = (id: string) => {
  return apiClient.get(`/posts/${id}`);
};

// Create a new post
export const createPost = (data: { title: string; body: string }) => {
  const payload = {
    ...data,
    user: localStorage.getItem('userId'),
    user_id: localStorage.getItem('userId'),

  }
  return apiClient.post('/posts', payload);
};

// Update a post
export const updatePost = (id: string, data: { title?: string; body?: string }) => {
  return apiClient.put(`/posts/${id}`, data);
};

// Delete a post
export const deletePost = (id: string) => {
  return apiClient.delete(`/posts/${id}`);
};

export const fetchAuthor = (id: number) => {
  return apiClient.get(`/users/${id}`);
};

export const createUser = (data: UserDto, credential: string) => {
  setToken(credential);
  return apiClient.post('/users', data);
};

apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token'); 
    }
    return Promise.reject(error);
  }
);
