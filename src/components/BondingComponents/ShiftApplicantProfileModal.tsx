import { useEffect, useState } from 'react';
import { shiftApplicationDetails } from '../../api/shiftsApi';
import userPlaceholder from '../../images/user/default_user.jpg';
import BondingSpinner, { SpinnerSize } from '../BondingComponents/BondingSpinner';

const ShiftApplicantProfileModal = ({ applicantId, onClose, onAccept, onReject, isLoading, defaultApplicant }) => {
    const [applicant, setApplicant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplicantDetails = async () => {
            if (defaultApplicant != null) {
                setApplicant(defaultApplicant);
                setLoading(false);
            } else {
                try {
                    const response = await shiftApplicationDetails(applicantId);
                    setApplicant(response);
                } catch (error) {
                    setError('Failed to fetch applicant details');
                } finally {
                    setLoading(false);
                }
            }

        };

        fetchApplicantDetails();
    }, [applicantId]);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                <BondingSpinner size={SpinnerSize.Large} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Error</h2>
                        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                            X
                        </button>
                    </div>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Applicant Profile</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        X
                    </button>
                </div>
                <div className="flex flex-col items-center mb-4">
                    <img
                        className="h-24 w-24 rounded-full object-cover mb-4"
                        src={userPlaceholder}
                        alt="Applicant profile"
                    />
                    <h3 className="text-xl font-medium text-black dark:text-white">
                        {applicant.user.firstName} {applicant.user.lastName}
                    </h3>
                </div>
                <div className="space-y-2 mb-4">
                    <p><strong>Position:</strong> {applicant.position}</p>
                    <p><strong>Graduation Institution:</strong> {applicant.graduationInstitution}</p>
                    <p><strong>Year of Graduation:</strong> {applicant.yearOfGraduation}</p>
                    <p><strong>Known Software:</strong> {applicant.knownSoftware.join(', ')}</p>
                    <p><strong>Trained Skills:</strong> {applicant.trainedSkills.join(', ')}</p>
                    <p><strong>Languages:</strong> {applicant.languages.join(', ')}</p>
                    <p><strong>Place of Experience:</strong> {applicant.placeOfExperience.join(', ')}</p>
                    {applicant.offer && (
                        <p className="text-sm"><strong>Bid:</strong> <span className="font-semibold bg-yellow-200 px-2 py-1 rounded">${applicant.offer}</span></p>
                    )}
                </div>
                <div className="flex items-center justify-around mt-12">
                    {isLoading ? (
                        <BondingSpinner size={SpinnerSize.Small} />
                    ) : (
                        <>
                            <button
                                className="px-4 py-2 text-white bg-red hover:bg-[#CC0000] rounded w-2/5"
                                onClick={() => onReject(applicant.id, 'reject')}
                            >
                                Reject
                            </button>
                            <button
                                className="px-4 py-2 text-white bg-green-500 hover:bg-green-700 rounded w-2/5"
                                onClick={() => onAccept(applicant.id, 'accept')}
                            >
                                Accept
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ShiftApplicantProfileModal;
