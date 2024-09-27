interface ButtonsGroupProps<T> {
  values: T[];
  handleClicked: (value: T) => void;
  selectedValue: T;
}

export const ButtonsGroup = <T,>({ values, handleClicked, selectedValue }: ButtonsGroupProps<T>) => {
  return (
    <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
      {values.map(value => (
        <button
          key={value as string}
          onClick={() => handleClicked(value)}
          className={`rounded px-3 py-1 text-xs font-medium ${
            selectedValue === value ? 'bg-primary text-white' : 'text-black'
          }`}
        >
          {value as string}
        </button>
      ))}
    </div>
  );
};