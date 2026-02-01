import axios from 'axios';
import { SearchResponse } from '../Types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const searchProducts = async (query: string): Promise<SearchResponse> => {
  try {
    const response = await api.post<SearchResponse>('/products/search', { query });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw error;
  }
};

export const getProductHistory = async (productId: number) => {
  try {
    const response = await api.get(`/products/${productId}/history`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    throw error;
  }
};

export default api;