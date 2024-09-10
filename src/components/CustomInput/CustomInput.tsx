import { UseFormRegisterReturn } from 'react-hook-form';
import { ErrorText } from '../Text/ErrorText';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  error?: string;
}

export const CustomInput: React.FC<Props> = ({ error, register, ...props }) => {
  return (
    <div className="flex flex-col items-end">
      <input
        {...(register ? register : {})}
        {...props}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
      {error && <ErrorText error={error} />}
    </div>
  );
};
