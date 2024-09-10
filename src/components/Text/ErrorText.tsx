interface ErrorTextParams {
    error: string
}

export const ErrorText: React.FC<ErrorTextParams> = ({error}) => {
  return <div className="text-red">{error}</div>;
};
