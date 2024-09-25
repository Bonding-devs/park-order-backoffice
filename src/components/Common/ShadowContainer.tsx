interface ShadowContainerProps {
  children: React.ReactNode;
}

export const ShadowContainer: React.FC<ShadowContainerProps> = ({
  children,
}) => {
  return (
    <div className="custom-border rounded-sm border shadow-default">
      <div className="flex h-[calc(100vh-186px)] w-full rounded-sm bg-white transition-all duration-1000 sm:h-[calc(100vh-174px)]">
        {children}
      </div>
    </div>
  );
};
