'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { BiSearchAlt, BiHomeAlt2 } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';

import { usePopupStore } from '@/app/store/stores/usePopupStore';

const NavBar: React.FC = () => {
  const t = useTranslations('navBar');

  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const searchClick = () => {
    setIsSearchClicked(!isSearchClicked);
    console.log(isSearchClicked);
  };

  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  const buttonsData = useMemo(() => {
    return [
      {
        type: 'link',
        icon: <BiHomeAlt2 />,
        href: '/',
        style: 'nav-items',
      },
      {
        type: 'search',
        icon: <BiSearchAlt />,
        style: !isSearchClicked ? 'nav-items' : 'search-button',
      },
      {
        type: 'dropdown',
        icon: <FaPlus />,
        dropdownItems: [
          { text: t('createRecipe'), href: '/he/create-recipe' },
          {
            text: t('createIngredient'),
            action: () => {},
          },
        ],
        style: 'nav-items',

        // style: 'mx-auto flex w-10 items-center justify-center rounded-md p-1 text-2xl transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:bg-recipeBrown-default group-hover:shadow-md',
      },
      {
        type: 'link',
        icon: <IoMdSettings />,
        href: '/he/management',
        style: 'nav-items',
      },
    ];
  }, [isSearchClicked, t]);

  return (
    <nav className='flex h-16 max-h-16 flex-row items-center justify-start gap-5 bg-recipeBlue-default px-5 text-recipeGray-lightest'>
      {buttonsData.map((buttonData, index) => (
        <div
          key={index}
          className={
            !buttonData.dropdownItems ? buttonData.style : 'group relative'
          }
        >
          <section
            className={
              buttonData.dropdownItems
                ? `${buttonData.style} group-hover:bg-recipeBrown-default group-hover:scale-125`
                : undefined
            }
          >
            {buttonData.href && <Link href={buttonData.href}></Link>}
            {buttonData.icon}
          </section>
          {buttonData.dropdownItems && (
            <>
              <div className='absolute -bottom-[1.25rem] left-1/2 hidden h-[1.25rem] w-[6rem] -translate-x-1/2 transform group-hover:visible group-hover:flex' />
              <section className='absolute -bottom-[5.25rem] left-1/2 z-[999] hidden -translate-x-1/2 transform flex-col rounded-lg bg-recipeBrown-default group-hover:flex'>
                {buttonData.dropdownItems.map((item, itemIndex) => (
                  <button
                    key={itemIndex}
                    className='whitespace-nowrap px-2 py-1'
                  >
                    {item.text}
                  </button>
                ))}
              </section>
            </>
          )}
        </div>
      ))}
      {/* <Link href={'/'} className='nav-items'>
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
          className='group-hover:bg-recipeBrown-default mx-auto flex w-10 items-center justify-center rounded-md p-1 text-2xl transition-all duration-300 ease-in-out group-hover:scale-125 group-hover:shadow-md'
        >
          <FaPlus />
        </Link>
        <ul className='bg-recipeBrown-default absolute inset-x-0 top-[2.5rem] hidden w-[10rem] rounded-md text-center text-white group-hover:block'>
          <li>create recipe</li>
          <li onClick={() => updateSelectedPopup(PopupsTypes.NEW_INGREDIENT)}>
            create ingredient
          </li>
          <li>create ingredient</li>
        </ul>
      </div>

      <Link href={'/he/management'} className='nav-items'>
        <IoMdSettings />
      </Link> */}
    </nav>
  );
};

export default NavBar;
