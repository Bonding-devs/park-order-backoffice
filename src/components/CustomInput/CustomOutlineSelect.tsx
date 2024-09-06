import { UseFormRegisterReturn } from 'react-hook-form';
import { TextError } from '../Text/TextError';

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  register?: UseFormRegisterReturn;
  error?: string;
}

export const CustomOutlineSelect: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  error,
  register,
  defaultValue,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col items-start">
      <select
        {...(register ? register : {})}
        className="text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 block h-11.5 rounded border-[1.5px] border-stroke bg-transparent  p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500 "
        defaultValue={defaultValue}
        {...props}
      >
        {children}
      </select>
      {error && <TextError error={error} />}
    </div>
  );
};
