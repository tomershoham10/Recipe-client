const RoundButton: React.FC<RoundButtonProps> = ({
  type,
  label,
  Icon,
  className,
  onClick,
}) => {
  return (
    <div
      className={`${className} group mx-auto flex h-fit w-fit cursor-pointer flex-row items-center justify-start rounded-full`}
    >
      <button
        type={type}
        onClick={onClick}
        className={`flex h-8 min-w-8 items-center justify-center rounded-full text-2xl text-recipeBrown-dark transition-all duration-300 ease-in-out ${
          label
            ? 'group-hover:rounded-2xl group-hover:bg-recipeGray-light group-hover:px-2'
            : 'hover:bg-recipeGray-light'
        }`}
      >
        <Icon className='flex-shrink-0' />
        {label && (
          <span className='max-w-0 overflow-hidden whitespace-nowrap text-sm font-bold transition-all duration-300 ease-in-out group-hover:ml-2 group-hover:max-w-[200px] lg:text-base lg:font-extrabold'>
            {label}
          </span>
        )}
      </button>
    </div>
  );
};

export default RoundButton;
