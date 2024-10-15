import { useEffect, useRef, useState } from 'react';
import { fetchWOByLocation } from '../../api/ReportsApi';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { emptyLocationsData, LocationData } from '../../models/locations-data';


export const useGetWOByLocation = () => {
    const today = dayjs().toDate();
  const oneMonthAgo = dayjs().subtract(1, 'month').toDate();
  const [data, setData] = useState<LocationData>(emptyLocationsData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState({
    startDate: oneMonthAgo,
    endDate: today,
  });

  const isFirstRender = useRef(true);
  const prevDateRef = useRef(date);

  const {startDate, endDate} = date;
  const handleDateChange = (newValue) => {
    if (
      newValue.startDate !== prevDateRef.current.startDate ||
      newValue.endDate !== prevDateRef.current.endDate
    ) {
      setDate(newValue);
    }
  };

  const fetchData = async () => {
    if(!(startDate && endDate)) return;
    setIsLoading(true);
    try {
      const response = await fetchWOByLocation({
        createdAtSince: startDate,
        createdAtUntil: endDate,
      });
      setData(response);
    } catch (error) {
      setError(error);
      toast.error('Error fetching WO By Location');
    } finally {
      setIsLoading(false);
    }
  };

  const reload = () => { 
    fetchData();
    setError(null);
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchData();
    } else {
      if (
        date.startDate !== prevDateRef.current.startDate ||
        date.endDate !== prevDateRef.current.endDate
      ) {
        fetchData();
        prevDateRef.current = date;
      }
    }
  }, [date]);

  return {
    data,
    date,
    today,
    handleDateChange,
    isLoading,
    error,
    reload,
  };
}