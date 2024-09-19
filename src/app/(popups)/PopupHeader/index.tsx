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
          className={`relative m-5 flex justify-center rounded-md bg-white p-5 ${widthClass} ${heightClass}`}
        >
          <button
            onClick={() => {
              onClose();
              updateSelectedPopup(PopupsTypes.CLOSED);
            }}
            className='absolute right-4 z-50 flex h-6 w-6 flex-none items-center justify-center rounded-full transition duration-75 ease-in hover:bg-recipeGray-default'
          >
            <FaXmark />
          </button>
          <div className='w-full items-start justify-start'>
            <div className='absolute left-0 flex h-10 w-full justify-center border-b-2 text-xl font-extrabold 3xl:h-12 3xl:text-2xl'>
              {header}
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PopupHeader;
