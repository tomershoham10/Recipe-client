'use client';
import { FaXmark } from 'react-icons/fa6';

interface ChipsProps {
  values: string[];
  onRemove: (index: number) => void;
}

const Chips: React.FC<ChipsProps> = (props) => {
  const { values, onRemove } = props;
  return (
    <>
      {values.map((label, index) => (
        <div
          key={index}
          className='flex w-fit flex-row gap-2 rounded-3xl bg-recipeBlue-default pr-2 pl-3 py-1 text-lg text-recipeGray-lightest'
        >
          <button onClick={() => onRemove(index)}>
            <FaXmark />
          </button>
          {label}
        </div>
      ))}
    </>
  );
};

export default Chips;
