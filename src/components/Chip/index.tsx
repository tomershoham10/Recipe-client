'use client';
import { ReactNode } from 'react';
import { FaPen, FaXmark } from 'react-icons/fa6';

interface ChipsProps {
  values: string[] | ReactNode[];
  editMode: boolean;
  onEdit?: (index: number) => void;
  onRemove?: (index: number) => void;
}

const Chips: React.FC<ChipsProps> = (props) => {
  const { values, editMode, onEdit, onRemove } = props;
  return (
    <>
      {values.map((label, index) => (
        <div
          key={index}
          className={`flex w-fit cursor-default select-none flex-row gap-2 rounded-3xl bg-recipeBlue-default py-1 pl-3 text-lg text-recipeGray-lightest ${editMode && onRemove ? 'pr-2' : 'pr-3'}`}
        >
          {editMode && onRemove && (
            <button className='cursor-pointer' onClick={() => onRemove(index)}>
              <FaXmark />
            </button>
          )}
          {label}
          {editMode && onEdit && (
            <button
              className='cursor-pointer text-sm'
              onClick={() => {
                onEdit(index);
              }}
            >
              <FaPen />
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default Chips;
