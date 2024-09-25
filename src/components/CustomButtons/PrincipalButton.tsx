interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  bgColor?: string;
  size?: SizeButton;
}

export enum SizeButton {
  Small = 'px-3 py-2',
  Medium = 'px-6 py-3',
  Large = 'px-9 py-3',
}

export const PrincipalButton: React.FC<React.PropsWithChildren<Props>> = ({
  disabled = false,
  bgColor,
  children,
  size = SizeButton.Large,
  ...props
}: Props) => {

  return (
    <div className="flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
      <button
        {...props}
        className={`rounded-md ${
          bgColor ? bgColor : 'bg-primary'
        } ${size} font-medium text-white ${
          disabled ? 'cursor-not-allowed bg-opacity-50' : 'hover:bg-opacity-90'
        }`}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
