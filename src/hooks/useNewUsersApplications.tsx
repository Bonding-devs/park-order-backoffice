import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { acceptOrRejectContractorApplication, getContractorApplications } from '../api/super_admin_api';

export const useNewUsersApplications = (status: string) => {
    const [applications, setApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchApplications();
    }, [status]);

    const fetchApplications = async () => {
        setLoading(true);
        try {
            const response = await getContractorApplications(status);
            setApplications(response.data);
            setLoading(false);
        } catch (error) {
            setError('Failed to fetch applications');
            setLoading(false);
            toast.error('Failed to fetch applications');
        }
    };

    const handleApplicationAction = async (applicationId: string, actionTaken: string) => {
        setActionLoading(true);
        try {
            const result = await acceptOrRejectContractorApplication(applicationId, actionTaken);
            if (result) {
                toast.success(`Application ${actionTaken} successfully.`);
                fetchApplications();
            } else {
                toast.error('Failed to perform action on application.');
            }
        } catch (error) {
            toast.error('Failed to perform action on application.');
        } finally {
            setActionLoading(false);
        }
    };

    return {
        applications,
        loading,
        error,
        actionLoading,
        handleApplicationAction,
    };
};
