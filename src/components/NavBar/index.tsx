'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { BiHomeAlt2, BiSearchAlt } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { PopupsTypes, usePopupStore } from '@/app/store/stores/usePopupStore';

enum NavButtonsTypes {
  LINK = 'link',
  COMPONENT = 'component',
  DROPDOWN = 'dropdown',
  BUTTON = 'button',
}

interface ButtonData {
  type: NavButtonsTypes;
  icon: JSX.Element;
  href?: string;
  style: string;
  action?: () => void;
  dropdownItems?: { text: string; href: string }[];
}

const NavBar: React.FC = () => {
  const t = useTranslations('navBar');
  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  const handleSearchClick = useCallback(() => {
    updateSelectedPopup(PopupsTypes.SEARCH);
  }, [updateSelectedPopup]);

  const buttonsData: ButtonData[] = useMemo(
    () => [
      {
        type: NavButtonsTypes.LINK,
        icon: <BiHomeAlt2 />,
        href: '/',
        style: 'nav-items',
      },
      {
        type: NavButtonsTypes.BUTTON,
        icon: <BiSearchAlt />,
        style: 'nav-items',
        action: handleSearchClick,
      },
      {
        type: NavButtonsTypes.LINK,
        icon: <FaPlus />,
        href: '/he/create-recipe',
        style: 'nav-items',
      },
      {
        type: NavButtonsTypes.DROPDOWN,
        icon: <IoMdSettings />,
        dropdownItems: [
          { text: t('manageIngredients'), href: '/he/managment/ingredients' },
        ],
        style: 'nav-items',
      },
    ],
    [t, handleSearchClick]
  );

  const renderButton = useCallback((buttonData: ButtonData, index: number) => {
    switch (buttonData.type) {
      case NavButtonsTypes.LINK:
        return (
          <Link
            key={index}
            href={buttonData.href!}
            className={buttonData.style}
          >
            {buttonData.icon}
          </Link>
        );

      case NavButtonsTypes.BUTTON:
        return (
          <button
            key={index}
            className={buttonData.style}
            onClick={buttonData.action}
          >
            {buttonData.icon}
          </button>
        );

      case NavButtonsTypes.DROPDOWN:
        return (
          <div key={index} className='group relative'>
            <div
              className={`${buttonData.style} group-hover:scale-125 group-hover:bg-recipeBrown-default`}
            >
              {buttonData.icon}
            </div>
            {buttonData.dropdownItems && (
              <>
                <div className='absolute left-1/2 top-0 hidden h-[3rem] w-[6rem] -translate-x-1/2 transform group-hover:visible group-hover:flex' />
                <ul className='absolute left-1/2 top-[3rem] hidden h-fit -translate-x-1/2 flex-col gap-1 rounded-lg bg-recipeBrown-default py-1 group-hover:flex'>
                  {buttonData.dropdownItems.map((item, itemIndex) => (
                    <li>
                      <Link
                        key={itemIndex}
                        href={item.href}
                        className='whitespace-nowrap px-3 text-xl'
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        );

      default:
        return null;
    }
  }, []);

  return (
    <nav className='flex h-16 max-h-16 flex-row items-center justify-start gap-5 bg-recipeBlue-default px-5 text-recipeGray-lightest'>
      {buttonsData.map(renderButton)}
    </nav>
  );
};

export default NavBar;
