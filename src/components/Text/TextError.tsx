

interface TextErrorParams {
    error: string
}

export const TextError: React.FC<TextErrorParams> = ({error}) => {
  return <div className="text-red">{error}</div>;
};
