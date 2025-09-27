import { useState } from 'react';
import { useCreateInvoice } from '../lib/api';

export const useNowPayments = () => {
  const [invoice, setInvoice] = useState<any>(null);
  const createInvoiceMutation = useCreateInvoice();

  const handleCreateInvoice = async (amount: number, currency: string) => {
    try {
      const newInvoice = await createInvoiceMutation.mutateAsync({
        amount,
        currency,
        userId: 'user-123', // Placeholder
        depositId: `dep-${Date.now()}`, // Placeholder
      });
      setInvoice(newInvoice);
      return newInvoice;
    } catch (error) {
      console.error('Failed to create invoice:', error);
      // Handle error display to the user
    }
  };

  return {
    invoice,
    isPending: createInvoiceMutation.isPending,
    error: createInvoiceMutation.error,
    handleCreateInvoice,
  };
};
