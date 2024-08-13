import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { fetchOwnerShifts } from '../api/shiftsApi';
import { Shift } from '../models/shift';

const useOwnerShifts = (year: number, month: number) => {
    const [shifts, setShifts] = useState<Shift[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getShifts = async () => {
            setLoading(true);
            try {
                const startAtGtThan = format(new Date(year, month, 1), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                const startAtLsThan = format(new Date(year, month + 1, 1), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
                const data = await fetchOwnerShifts(startAtGtThan, startAtLsThan);
                setShifts(data.data);
            } catch (err) {
                setError('Failed to fetch shifts');
            } finally {
                setLoading(false);
            }
        };

        getShifts();
    }, [year, month]);

    return { shifts, loading, error };
};

export default useOwnerShifts;
