'use client';
import { ReactNode } from 'react';
import { useStore } from 'zustand';
import { FaXmark } from 'react-icons/fa6';

import { PopupsTypes, usePopupStore } from '@/app/store/stores/usePopupStore';

export enum PopupSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

interface PopupHeaderProps {
  children: ReactNode;
  popupType: PopupsTypes;
  header: string;
  size?: PopupSizes;
  onClose: () => void;
}
const PopupHeader: React.FC<PopupHeaderProps> = (props) => {
  const { children, popupType, header, size, onClose } = props;
  const selectedPopup = useStore(usePopupStore, (state) => state.selectedPopup);
  //   console.log('PopupHeader selectedPopup', selectedPopup);
  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  let widthClass: string;
  let heightClass: string;

  switch (size) {
    case PopupSizes.SMALL:
      widthClass = 'w-[40rem] xl:w-[55rem] 2xl:w-[57.5rem] 3xl:w-[70rem]';
      heightClass = 'min-h-[17.5rem] md:h-[17.5rem] xl:h-[20rem]';

      break;
    case PopupSizes.MEDIUM:
      widthClass = 'w-[40rem] xl:w-[55rem] 2xl:w-[57.5rem] 3xl:w-[70rem]';
      heightClass = 'h-[35rem] md:h-[35rem] xl:h-[35rem]';

      break;
    case PopupSizes.LARGE:
      widthClass = 'w-[40rem] xl:w-[55rem] 2xl:w-[57.5rem] 3xl:w-[70rem]';
      heightClass = 'h-[35rem] md:h-[35rem] xl:h-[35rem]';

      break;
    default:
      widthClass = 'w-[40rem] xl:w-[55rem] 2xl:w-[57.5rem] 3xl:w-[70rem]';
      heightClass = 'h-[35rem] md:h-[35rem] xl:h-[35rem]';
      break;
  }

  return (
    <div
      className={
        selectedPopup === popupType
          ? 'fixed left-0 top-0 z-[1000] flex h-full w-screen items-center justify-center overflow-hidden bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.4)] transition duration-200 ease-out'
          : 'z-0 opacity-0 transition duration-200 ease-in'
      }
    >
      {selectedPopup === popupType ? (
        <div
          className={`flex flex-col justify-start rounded-md bg-recipeGray-lightest ${widthClass} ${heightClass}`}
        >
          <header className='relative flex h-12 min-h-12 w-full items-center justify-center border-b-2 text-xl font-extrabold'>
            <button
              onClick={() => {
                onClose();
                updateSelectedPopup(PopupsTypes.CLOSED);
              }}
              className='absolute right-3 flex h-8 w-8 items-center justify-center rounded-full transition duration-75 ease-in hover:bg-recipeGray-default'
            >
              <FaXmark />
            </button>
            <span>{header}</span>
          </header>
          <section className='h-full px-3 pb-4'>{children}</section>
        </div>
      ) : null}
    </div>
  );
};

export default PopupHeader;
