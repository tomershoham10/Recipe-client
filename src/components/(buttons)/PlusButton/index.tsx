import { FaPlus } from 'react-icons/fa';

interface PlusButtonProps {
  label?: string;
  className?: string;
  onClick: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = (props) => {
  const { label, className, onClick } = props;
  return (
    <button className={`${className} hover:bg-recipeGray-light p-2 rounded-full`} onClick={onClick}>
      <FaPlus />
    </button>
  );
};

export default PlusButton;
