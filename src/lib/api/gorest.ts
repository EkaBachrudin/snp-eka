import axios from 'axios';
import type { UserDto } from '@/types/user.interface';
import { FetchAllPostsFunction, FetchAllPostsModel } from '@/types/post';

const BASE_URL = 'https://gorest.co.in/public/v2';

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const setToken = (token: string) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);
};

export const fetchAllPosts: FetchAllPostsFunction = async (currentPage: number, perPage: number, search: string) => {
  const response =  await apiClient.get(`/posts`, {
    params: { page: currentPage, per_page: perPage, title: search },
  });

  const data: FetchAllPostsModel = {
      data: response.data,
      pagination: {
          limit: response.headers['x-pagination-limit'],
          page: response.headers['x-pagination-page'],
          totalPages: response.headers['x-pagination-pages'],
          totalItems: response.headers['x-pagination-total']
      }
  };

  return data;
}

export const fetchPost = (id: string) => {
  return apiClient.get(`/posts/${id}`);
};

export const createPost = (data: { title: string; body: string }) => {
  const payload = {
    ...data,
    user: localStorage.getItem('userId'),
    user_id: localStorage.getItem('userId'),

  }
  return apiClient.post('/posts', payload);
};

export const updatePost = (id: string, data: { title?: string; body?: string }) => {
  return apiClient.put(`/posts/${id}`, data);
};

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
