'use client';

import { useState } from 'react';
import Link from 'next/link';

import { BiSearchAlt, BiHomeAlt2 } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';

import { PopupsTypes, usePopupStore } from '@/app/store/stores/usePopupStore';

const NavBar: React.FC = () => {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const searchClick = () => {
    setIsSearchClicked(!isSearchClicked);
    console.log(isSearchClicked);
  };

  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  return (
    <nav className='flex h-16 max-h-16 flex-row items-center justify-start gap-5 bg-recipeGreen-default px-5 text-recipeGray-lightest'>
      <Link href={'/'} className='nav-items'>
        <BiHomeAlt2 />
      </Link>

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
              : 'text-recipeBrown-dark w-24 bg-transparent outline-none transition-all duration-700 ease-in-out'
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

      <div className='group relative'>
        <Link
          href={'/he/create-recipe'}
          className='mx-auto flex w-10 items-center justify-center rounded-md p-1 text-2xl transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-recipeRed-default group-hover:shadow-md'
        >
          <FaPlus />
        </Link>
        <ul className='absolute inset-x-0 top-[2.5rem] hidden w-[10rem] rounded-md bg-recipeRed-default text-center text-white group-hover:block'>
          <li>create recipe</li>
          <li onClick={() => updateSelectedPopup(PopupsTypes.NEW_INGREDIENT)}>
            create ingredient
          </li>
          <li>create ingredient</li>
        </ul>
      </div>

      <Link href={'/he/management'} className='nav-items'>
        <IoMdSettings />
      </Link>
    </nav>
  );
};

export default NavBar;
