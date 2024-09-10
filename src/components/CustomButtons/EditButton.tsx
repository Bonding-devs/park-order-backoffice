import { FaPencilAlt } from 'react-icons/fa';

interface EditButtonProps {
  onHandleClick?: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onHandleClick }) => {
  return (
    <button
      onClick={onHandleClick}
      className="rounded-full p-2 text-white hover:bg-slate-400 focus:bg-green-600 focus:outline-none focus:ring-2 "
      aria-label="Edit"
    >
      <FaPencilAlt color="#16a34a" />
    </button>
  );
};
