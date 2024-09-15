interface ButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}
const Button: React.FC<ButtonProps> = (props) => {
  const { label, className, onClick } = props;
  return (
    <button
      className={`h-12 w-24 rounded-lg bg-recipeBlue-default text-xl font-bold text-recipeGray-lightest ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
