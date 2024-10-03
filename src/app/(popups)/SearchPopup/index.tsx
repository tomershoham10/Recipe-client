'use client';
import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import pRetry from 'p-retry';

import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineNumber } from 'react-icons/ai';

import { PopupsTypes, usePopupStore } from '@/app/store/stores/usePopupStore';
import { useStore } from 'zustand';
import { MdKeyboardArrowLeft } from 'react-icons/md';

const SeachPopup: React.FC = () => {
  const t = useTranslations('seatchPopup');
  const selectedPopup = useStore(usePopupStore, (state) => state.selectedPopup);
  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  return (
    <div
      className={
        selectedPopup === PopupsTypes.SEARCH
          ? 'fixed left-0 z-[200] flex h-full w-screen items-start justify-center overflow-hidden bg-[rgb(0,0,0)] bg-[rgba(0,0,0,0.4)] p-[10vh] transition duration-200 ease-out'
          : 'z-0 opacity-0 transition duration-200 ease-in'
      }
    >
      {selectedPopup === PopupsTypes.SEARCH && (
        <div className='relative flex h-fit max-h-full w-full max-w-[47.375rem] flex-col justify-start overflow-hidden rounded-md bg-white'>
          <header className='flex min-h-[3.5rem] w-full items-center border-b-2 px-4'>
            <BiSearchAlt className='cursor-default text-2xl' />
            <input
              className='mx-4 h-full w-full appearance-none text-lg font-semibold outline-none [&::-webkit-search-cancel-button]:appearance-none'
              placeholder='seach'
              type='search'
            />
            <button
              type='reset'
              onClick={() => {
                updateSelectedPopup(PopupsTypes.CLOSED);
              }}
              className='h-[1.8rem] w-[2.1rem] flex-none appearance-none rounded-md border-2 text-[0.65rem] font-extrabold opacity-90 hover:border-recipeGray-default'
            >
              ESC
            </button>
          </header>
          <div className='overflow-y-auto px-4 pb-6'>
            <section className='pt-6'>
              <h1 className='mb-4 text-lg font-bold'>RECIPES</h1>
              <ul className='flex select-none flex-col gap-3'>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
              </ul>
            </section>

            <section className='pt-6'>
              <h1 className='mb-4 text-lg font-bold'>RECIPES</h1>
              <ul className='flex select-none flex-col gap-3'>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
              </ul>
            </section>

            <section className='pt-6'>
              <h1 className='mb-4 text-lg font-bold'>RECIPES</h1>
              <ul className='flex select-none flex-col gap-3'>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
                <li className='flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold hover:bg-recipeGray-default'>
                  <div className='flex flex-row'>
                    <section className='ml-2 rounded-md bg-recipeBlue-default p-1 text-white'>
                      <AiOutlineNumber />
                    </section>
                    abc
                  </div>
                  <section className='text-lg'>
                    <MdKeyboardArrowLeft />
                  </section>
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeachPopup;
