import { useEffect, useState } from 'react';
import { createSetupIntent, fetchPaymentMethods } from '../api/paymentsApi';
import { PaymentMethod } from '../models/paymentMethod';

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [clientSecret, setClientSecret] = useState<string>('');

  useEffect(() => {
    getPaymentMethods();
  }, []);

  const getPaymentMethods = async () => {
    setLoading(true);
    try {
      const paymentMethodsResponse = await fetchPaymentMethods();
      setPaymentMethods(paymentMethodsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch payment methods');
    } finally {
      setLoading(false);
    }
  };

  const cretePaymentMethodIntent = async () => {
    setLoading(true);
    try {
      const response = await createSetupIntent();
      setClientSecret(response.clientSecret);
      return response.clientSecret;
    } catch (err) {
      setError('Failed to fetch payment methods');
    } finally {
      setLoading(false);
    }
  };

  const reFetchDataPaymentMethods = () => {
    getPaymentMethods();
  };

  return {
    paymentMethods,
    loading,
    error,
    getPaymentMethods,
    cretePaymentMethodIntent,
    clientSecret,
    reFetchDataPaymentMethods,
  };
};
