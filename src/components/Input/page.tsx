"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";

export enum InputTypes {
  text = "text",
  password = "password",
}

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className={`relative ${props.className} w-full`}>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        className={`text:sm w-full rounded-xl border-2 h-10 lg:h-14 bg-white px-1 py-2 font-bold focus:outline-none lg:p-3 lg:text-xl ${
          props.failed ? "border-red-700" : "border-recipeGray-darker"
        }`}
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
