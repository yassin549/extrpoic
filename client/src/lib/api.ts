import axios from 'axios';
import { useQuery, useMutation } from '@tanstack/react-query';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- NOWPayments API Hooks ---

interface CreateInvoicePayload {
  amount?: number;
  currency?: string;
  userId: string; // This would typically come from auth state
  depositId: string; // A unique ID generated client-side
}

const createInvoice = async (payload: CreateInvoicePayload) => {
  const { data } = await apiClient.post('/payments/invoice', payload);
  return data;
};

export const useCreateInvoice = () => {
  return useMutation({ mutationFn: createInvoice });
};

// --- User Data API Hooks ---

const getDeposits = async () => {
  // In a real app, the user ID would be inferred from the auth token on the backend
  const { data } = await apiClient.get('/deposits'); // Assuming the backend has a GET /api/deposits
  return data;
};

export const useGetDeposits = () => {
  return useQuery({ queryKey: ['deposits'], queryFn: getDeposits });
};

// --- Admin API Hooks ---

const getIpnLogs = async () => {
  const { data } = await apiClient.get('/admin/ipn-logs');
  return data;
};

export const useGetIpnLogs = () => {
  return useQuery({ queryKey: ['ipnLogs'], queryFn: getIpnLogs });
};

const getPayouts = async () => {
  const { data } = await apiClient.get('/admin/payouts');
  return data;
};

export const useGetPayouts = () => {
  return useQuery({ queryKey: ['payouts'], queryFn: getPayouts });
};

// --- CSRF Token --- 
// In a real app, you'd fetch this token on load and include it in headers
const getCsrfToken = async () => {
  const { data } = await apiClient.get('/csrf-token');
  apiClient.defaults.headers.common['csrf-token'] = data.csrfToken;
  return data.csrfToken;
};

export const useCsrfToken = () => {
  return useQuery({
    queryKey: ['csrfToken'],
    queryFn: getCsrfToken,
    staleTime: Infinity,
    gcTime: Infinity, // gcTime was previously cacheTime in v4
  });
};
