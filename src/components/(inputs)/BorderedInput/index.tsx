import React from 'react';

interface BorderedInputProps {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const BorderedInput: React.FC<BorderedInputProps> = (props) => {
  const { type = 'text', value, onChange, placeholder, className = '' } = props;
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`rounded-t-sm border-0 border-b-2 border-recipeBrown-dark bg-transparent transition-colors duration-300 ease-in-out placeholder:text-recipeBrown-dark placeholder:opacity-80 focus:border-recipeBrown-dark focus:bg-recipeBrown-default focus:bg-opacity-30 focus:outline-none ${className}`}
    />
  );
};

export default BorderedInput;
