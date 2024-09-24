interface CustomCheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ ...props }) => {
  return (
    <input
      type="checkbox"
      className="bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600"
      {...props}
    />
  );
};
