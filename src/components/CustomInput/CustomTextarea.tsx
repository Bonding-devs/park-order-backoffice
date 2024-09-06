import { UseFormRegisterReturn } from 'react-hook-form';
import { TextError } from '../Text/TextError';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  register?: UseFormRegisterReturn;
  error?: string;
}

export const CustomTextarea: React.FC<Props> = ({
  error,
  register,
  ...props
}) => {
  return (
    <div className="flex flex-col items-end">
      <textarea
        {...(register ? register : {})}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-normal text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...props}
      />
      {error && <TextError error={error} />}
    </div>
  );
};
