const RoundButton: React.FC<RoundButtonProps> = (props) => {
  const { label, Icon, className, onClick } = props;
  return (
    <div
      className={`${className} group mx-auto flex w-fit h-fit cursor-pointer flex-row items-center justify-start rounded-full`}
    >
      <button
        className={`flex h-8 min-w-8 items-center justify-center rounded-full text-2xl text-recipeBrown-dark transition-all duration-300 ease-in-out ${
          label
            ? 'group-hover:rounded-2xl group-hover:px-2 group-hover:bg-recipeGray-light'
            : 'hover:bg-recipeGray-light'
        }`}
        onClick={onClick}
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
