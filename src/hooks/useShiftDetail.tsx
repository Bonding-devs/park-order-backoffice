import { useEffect, useState } from 'react';
import { acceptOrRejectApplication, fetchOwnerShiftApplications, fetchOwnerShiftDetail } from '../api/shiftsApi';
import { Shift } from '../models/shift';
import { ShiftApplication } from '../models/shiftApplication';

const useShiftDetail = (shiftId: string) => {
    const [shift, setShift] = useState<Shift | null>(null);
    const [applications, setApplications] = useState<ShiftApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [actionSuccess, setActionSuccess] = useState<string | null>(null);

    const getShiftDetail = async () => {
        setLoading(true);
        try {
            const shiftDetail = await fetchOwnerShiftDetail(shiftId);
            setShift(shiftDetail);

            const shiftApplications = await fetchOwnerShiftApplications(shiftId);
            setApplications(shiftApplications);
            setError(null);
        } catch (err) {
            setError('Failed to fetch shift details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getShiftDetail();
    }, [shiftId]);

    const handleApplicationAction = async (applicationId: string, actionTaken: string) => {
        setLoading(true);
        setActionError(null);
        setActionSuccess(null);
        try {
            const result = await acceptOrRejectApplication(applicationId, actionTaken);
            if (result) {
                setActionSuccess(`Application ${actionTaken} successfully.`);
                // Refresh applications list after action
                const updatedApplications = await fetchOwnerShiftApplications(shiftId);
                setApplications(updatedApplications);
            } else {
                setActionError('Failed to perform action on application.');
            }
        } catch (err) {
            setActionError('Failed to perform action on application.');
        } finally {
            setLoading(false);
        }
    };

    return { shift, applications, loading, error, handleApplicationAction, actionError, actionSuccess, retryFetchShiftDetail: getShiftDetail };
};

export default useShiftDetail;
