interface TitleTextProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const TitleText: React.FC<TitleTextProps> = ({ children, ...props }) => {
  return (
    <h1
      className="text-3xl font-semibold  leading-7 text-black dark:text-white"
      {...props}
    >
      {children}
    </h1>
  );
};
