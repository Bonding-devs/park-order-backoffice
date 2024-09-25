import { IconBaseProps, IconType } from 'react-icons';

interface IconButtonProps extends IconBaseProps {
  onHandleClick?: () => void;
  Icon: IconType;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  onHandleClick,
  Icon,
  size,
  color,
  disabled = false,
  ...props
}) => {
  return (
    <button
      onClick={onHandleClick}
      className={`rounded-full p-2 text-white hover:bg-slate-100 focus:bg-slate-50 focus:outline-none w-10 h-10 items-center justify-center flex`}
      aria-label="Edit"
      disabled={disabled}
    >
      <Icon color={color} size={size} {...props} />
    </button>
  );
};
