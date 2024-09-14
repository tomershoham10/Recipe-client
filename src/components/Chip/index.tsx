'use client';
import { FaXmark } from 'react-icons/fa6';

interface ChipsProps {
  values: string[];
  onClick: (index: number) => void;
}

const Chips: React.FC<ChipsProps> = (props) => {
  const { values, onClick } = props;
  return (
    <>
      {values.map((label, index) => (
        <div
          key={index}
          className='flex w-fit flex-row gap-2 rounded-3xl bg-recipeGreen-default pr-2 pl-3 py-1 text-lg text-recipeGray-lightest'
        >
          <button onClick={() => onClick(index)}>
            <FaXmark />
          </button>
          {label}
        </div>
      ))}
    </>
  );
};

export default Chips;
