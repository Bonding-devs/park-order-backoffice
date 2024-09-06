interface Props extends React.LabelHTMLAttributes<HTMLLabelElement>{}

export const CustomLabel: React.FC<Props> = ({children, ...props}: Props) => {
  return (
    <label className="mb-3 block text-sm font-medium text-black dark:text-white"
        {...props}
    >
      {children}
    </label>
  );
};
