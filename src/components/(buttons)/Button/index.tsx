interface ButtonProps {
  label: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ label, className, type, onClick }) => {
  return (
    <button
      type={type}
      className={`w-24 rounded-lg bg-recipeBlue-default py-[0.4rem] text-xl font-bold text-recipeGray-lightest ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
