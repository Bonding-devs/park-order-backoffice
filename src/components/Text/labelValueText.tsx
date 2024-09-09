interface LabelValueTextProps {
  label: string;
  value: string;
}

export const LabelValueText: React.FC<LabelValueTextProps> = ({
  label,
  value,
}) => {
  return (
    <>
      <div className="w-full xl:w-1/2">
        <label className="text-gray-900 block text-sm font-medium leading-6 ">
          {label}
        </label>
        <span className="text-gray-700 mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
          {value}
        </span>
      </div>
    </>
  );
};
