import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';

const BASE_URL = 'https://gorest.co.in/public-api';

// Initialize an Axios instance with Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
});

// Set up a function to update API token
export const setToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Function to fetch posts with pagination
export const fetchPosts = ({ pageParam = 1, queryKey }: QueryFunctionContext) => {
  const [_key, search] = queryKey;
  return apiClient.get(`/posts`, {
    params: { page: pageParam, search },
  });
};

// Fetch a single post
export const fetchPost = (id: string) => {
  return apiClient.get(`/posts/${id}`);
};

// Create a new post
export const createPost = (data: { title: string; body: string }) => {
  return apiClient.post('/posts', data);
};

// Update a post
export const updatePost = (id: string, data: { title?: string; body?: string }) => {
  return apiClient.put(`/posts/${id}`, data);
};

// Delete a post
export const deletePost = (id: string) => {
  return apiClient.delete(`/posts/${id}`);
};
