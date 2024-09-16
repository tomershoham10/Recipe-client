import { BiSearchAlt } from 'react-icons/bi';

interface SearchButtonProps {
  isSearchClicked: boolean;
  searchClick: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = (props) => {
  const { isSearchClicked, searchClick } = props;
  return (
    <div
      className={`${
        !isSearchClicked
          ? 'flex items-center justify-start rounded-md bg-transparent transition-all duration-500 ease-out'
          : 'flex items-center justify-start rounded-md bg-white pb-2 pr-2 pt-2 transition-all duration-700 ease-in-out'
      }`}
    >
      <input
        type='text'
        className={`${
          !isSearchClicked
            ? 'invisible w-0 max-w-none bg-transparent outline-none transition-all duration-700 ease-in'
            : 'w-24 bg-transparent text-recipeBrown-dark outline-none transition-all duration-700 ease-in-out'
        }`}
      />
      <button
        className={`${!isSearchClicked ? 'nav-items' : 'search-button'}`}
        onClick={() => {
          searchClick();
        }}
      >
        <BiSearchAlt />
      </button>
    </div>
  );
};

export default SearchButton;
