import { useEffect, useState } from 'react';
import { fetchContractorsReviews } from '../api/contractors';

export const useContractorReviews = () => {
  const [contractorReviews, setContractorReviews] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContractorReviews();
  }, []);

  const getContractorReviews = async () => {
    setLoading(true);
    try {
      const contractorsResponse = await fetchContractorsReviews();
      setContractorReviews(contractorsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch Contractor Reviews');
    } finally {
      setLoading(false);
    }
  };

  const reFetchDataContractors = () => {
    getContractorReviews();
  };

  return {
    contractorReviews,
    loading,
    error,
    getContractorReviews,
    reFetchDataContractors,
  };
};
