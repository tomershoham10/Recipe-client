'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';

import pRetry from 'p-retry';
import Image from 'next/image';
import { useStore } from 'zustand';
import { useTranslations } from 'next-intl';

import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineNumber } from 'react-icons/ai';
import { MdKeyboardArrowLeft } from 'react-icons/md';

import Chips from '@/components/Chip';
import { useKeyDown } from '@/app/utils/hooks/useKeyDown';
import background from '../../../../public/background.png';
import { PopupsTypes, usePopupStore } from '@/app/store/stores/usePopupStore';
import { BucketsNames, getFileByName } from '@/app/API/files-service/functions';

import {
  getSearchResults,
  SearchResults,
} from '@/app/API/recipe-service/search/functions';

const getFile = async (recipeId: string, objectName: string) => {
  try {
    const responseUrl = await pRetry(
      () => getFileByName(BucketsNames.RECIPES, recipeId, objectName),
      { retries: 5 }
    );
    return responseUrl;
  } catch (err) {
    console.error('getFile error:', err);
    return null;
  }
};

const SeachPopup: React.FC = () => {
  const t = useTranslations('searchPopup');
  const selectedPopup = useStore(usePopupStore, (state) => state.selectedPopup);
  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );

  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (searchQuery.length > 0) {
        try {
          const data = await getSearchResults(searchQuery);
          console.log('searchQuery', data);
          setSearchResults(data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        }
      } else {
        setSearchResults(null);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const memoizedSearchResults = useMemo(() => searchResults, [searchResults]);

  useEffect(() => {
    if (memoizedSearchResults && memoizedSearchResults.recipes) {
      memoizedSearchResults.recipes.forEach((recipe: RecipeType) => {
        if (!imageUrls[recipe._id]) {
          getFile(recipe._id, recipe.picture).then((url) => {
            if (url) {
              setImageUrls((prev) => ({ ...prev, [recipe._id]: url }));
            }
          });
        }
      });
    }
  }, [memoizedSearchResults, imageUrls]);

  const handleSearchClosed = () => {
    setSearchQuery('');
    setSearchResults(null);
    setImageUrls({});
    updateSelectedPopup(PopupsTypes.CLOSED);
  };

  useKeyDown(handleSearchClosed, ['Escape']);

  if (selectedPopup !== PopupsTypes.SEARCH) {
    return null;
  }

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
              value={searchQuery}
              onChange={handleSearchChange}
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
            {memoizedSearchResults && (
              <>
                {Object.entries(memoizedSearchResults).map(
                  ([category, items]) => (
                    <section className='pt-6' key={category}>
                      <h1 className='mb-4 text-lg font-bold'> {category}</h1>
                      <ul className='flex select-none flex-col gap-3'>
                        {items.map((item: RecipeType | IngredientType) => (
                          <li
                            className='group flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-recipeGray-light px-4 py-3 font-semibold transition-all duration-200 hover:bg-recipeGray-default'
                            key={item._id}
                          >
                            <div className='flex flex-row'>
                              <section
                                className={`${category === 'recipes' && 'group-hover:hidden'} ml-2 h-fit rounded-md bg-recipeBlue-default p-1 text-white`}
                              >
                                <AiOutlineNumber />
                              </section>
                              {category === 'recipes' && (
                                <div className='relative ml-2 h-0 w-0 overflow-hidden transition-all duration-200 ease-in group-hover:h-[148px] group-hover:w-[150px]'>
                                  {' '}
                                  <Image
                                    src={imageUrls[item._id] || background}
                                    alt='recipe image'
                                    fill
                                    className='rounded-3xl py-2'
                                  />
                                </div>
                              )}
                              <span className='ml-2'>
                                <p
                                  className={`${category === 'recipes' && 'transition-all duration-200 group-hover:font-bold'}`}
                                >
                                  {item.name}
                                </p>
                                {category === 'recipes' && (
                                  <section className='max-h-0 overflow-hidden transition-all duration-200 group-hover:max-h-[100px]'>
                                    <p>{(item as RecipeType).description}</p>
                                    <Chips
                                      values={(item as RecipeType).categories}
                                      editMode={false}
                                    />
                                  </section>
                                )}
                              </span>
                            </div>
                            <section className='text-lg'>
                              <MdKeyboardArrowLeft />
                            </section>
                          </li>
                        ))}
                      </ul>
                    </section>
                  )
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeachPopup;
