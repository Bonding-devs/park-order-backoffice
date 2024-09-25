interface InitialNameProps {
  initial?: string;
  photo?: string;
  color?: string;
  textColor?: string;
}
export const InitialName: React.FC<InitialNameProps> = ({
  initial,
  photo,
  color = 'bg-slate-100',
  textColor = 'text-slate-500',
}) => {
  return (
    <div
      className={`flex h-10 w-10 items-center justify-center rounded-full ${color} text-[20px]`}
    >
      {photo ? (
        <img src={photo} alt="photo" className="h-10 w-10 rounded-full" />
      ) : (
        <span className={`${textColor}`}>{initial}</span>
      )}
    </div>
  );
};
