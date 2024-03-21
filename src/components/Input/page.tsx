"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export enum InputTypes {
  text = "text",
  password = "password",
}

interface InputProps {
  type: InputTypes;
  placeholder?: string;
  value: string | undefined;
  onChange: (value: string) => void;
  className?: string;
  failed?: boolean;
}
const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className={`relative ${props.className} w-full`}>
      <input
        type={props.type}
        className={`text:sm w-full rounded-xl border-2 h-10 lg:h-14 bg-white px-1 py-2 font-bold text-black focus:outline-none lg:p-3 lg:text-xl ${
          props.failed ? "border-red-700" : "border-black"
        }`}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
      {props.failed && (
        <FontAwesomeIcon
          icon={faExclamation}
          className="absolute right-3 top-1/2 w-4 -translate-y-1/2 transform rounded-full border-2 border-red p-[0.1rem] text-black"
        />
      )}
    </div>
  );
};
export default Input;
