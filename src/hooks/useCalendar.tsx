import { addMonths, subMonths } from 'date-fns';
import { useEffect, useState } from 'react';
import { Shift } from '../models/shift';
import useOwnerShifts from './useOwnerShifts';

const useCalendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [showMoreModal, setShowMoreModal] = useState(false);
    const [moreShifts, setMoreShifts] = useState<Shift[]>([]);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const { shifts, loading, error } = useOwnerShifts(year, month);

    const statusColors: Record<string, string> = {
        'available': 'bg-green-500',
        'application-pending': 'bg-yellow-500',
        'application-rejected': 'bg-red-500',
        'closed': 'bg-gray-500',
        'open': 'bg-blue-500',
    };

    const statusLabels: Record<string, string> = {
        'available': 'Available',
        'application-pending': 'Application pending',
        'application-rejected': 'Application rejected',
        'closed': 'Closed',
        'open': 'Open',
    };

    useEffect(() => {
        if (showModal || showMoreModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [showModal, showMoreModal]);

    const handlePrevMonth = () => {
        setCurrentDate(subMonths(currentDate, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(addMonths(currentDate, 1));
    };

    const handleShiftClick = (shift: Shift, event: React.MouseEvent) => {
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const modalWidth = 300;
        const modalHeight = 400;

        let top = rect.top + window.scrollY;
        let left = rect.left + window.scrollX;

        if (top + modalHeight > window.innerHeight) {
            top = window.innerHeight - modalHeight - 20;
        }
        if (top < 0) {
            top = 20;
        }

        if (left + modalWidth > window.innerWidth) {
            left = window.innerWidth - modalWidth - 20;
        }
        if (left < 0) {
            left = 20;
        }

        setModalPosition({ top, left });
        setSelectedShift(shift);
        setShowModal(true);
    };

    const handleMoreClick = (date: string) => {
        const filteredShifts = shifts.filter(shift =>
            new Date(shift.startAt).toDateString() === new Date(date).toDateString()
        );
        setMoreShifts(filteredShifts);
        setShowMoreModal(true);
    };

    const renderShiftsForDate = (date: string) => {
        if (!shifts) return null;
        const filteredShifts = shifts.filter(shift =>
            new Date(shift.startAt).toDateString() === new Date(date).toDateString()
        );
        return filteredShifts.length > 0 ? (
            <div className="mt-4">
                <h2 className="text-lg font-bold">Shifts on {new Date(date).toDateString()}</h2>
                <ul>
                    {filteredShifts.map(shift => (
                        <li
                            key={shift.id}
                            className="cursor-pointer hover:text-primary"
                            onClick={(event) => handleShiftClick(shift, event)}
                        >
                            {shift.organization.name} - {shift.location.address}
                        </li>
                    ))}
                </ul>
            </div>
        ) : (
            <p className="mt-4">No shifts for this date.</p>
        );
    };

    return {
        currentDate,
        selectedShift,
        showModal,
        modalPosition,
        selectedDate,
        shifts,
        loading,
        error,
        handlePrevMonth,
        handleNextMonth,
        handleShiftClick,
        renderShiftsForDate,
        setShowModal,
        setSelectedDate,
        handleMoreClick,
        moreShifts,
        showMoreModal,
        setShowMoreModal,
        setModalPosition,
        statusColors,
        statusLabels,
    };
};

export default useCalendar;
