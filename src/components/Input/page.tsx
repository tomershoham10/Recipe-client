'use client';
import { FaExclamation } from 'react-icons/fa6';

export enum InputTypes {
  TEXT = 'text',
  NUMBER = 'number',
  PASSWORD = 'password',
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className={`relative ${props.className} w-full`}>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        className={`text:sm h-10 w-full rounded-xl border-2 bg-recipeGray-light px-1 py-2 font-bold focus:border-red-200 focus:outline-none lg:h-14 lg:p-3 lg:text-xl ${
          props.failed ? 'border-red-700' : 'border-recipeGray-darker'
        }`}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {props.failed && (
        <section className='border-red absolute right-3 top-1/2 w-4 -translate-y-1/2 transform rounded-full border-2 p-[0.1rem] text-black'>
          <FaExclamation />
        </section>
      )}
    </div>
  );
};
export default Input;
