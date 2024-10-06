import { BucketsNames, getFileByName } from '@/app/API/files-service/functions';
import Image from 'next/image';
import pRetry from 'p-retry';
import React, { useCallback, useEffect, useState } from 'react';
import Chips from '../Chip';
import { FaRegHeart } from 'react-icons/fa6';

interface RecipeCardProps {
  recipe: RecipeType;
  onClick: (recipeId: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  const { recipe, onClick } = props;

  const [url, setUrl] = useState<string | null>(null);

  const getFile = useCallback(async () => {
    try {
      if (recipe.picture) {
        const responseUrl = await pRetry(
          () => getFileByName(BucketsNames.RECIPES, recipe._id, recipe.picture),
          {
            retries: 5,
            onFailedAttempt: (error) =>
              console.error(
                `getFileByName Attempt ${error.attemptNumber} failed. Retrying...`
              ),
          }
        );
        setUrl(responseUrl);
      }
    } catch (err) {
      console.error('getFile error:', err);
    }
  }, [recipe._id, recipe.picture]);

  useEffect(() => {
    if (recipe) {
      getFile();
    }
  }, [getFile, recipe]);
  return (
    <div
      className='relative h-[370px] w-[375px] cursor-pointer rounded-xl bg-recipeGray-default px-3 py-2 shadow-xl transition-all duration-200 ease-in-out hover:scale-[102.5%]'
      onClick={() => onClick(recipe._id)}
    >
      <button
        className='absolute left-5 top-6 rounded-full bg-recipeGray-lightest p-[0.375rem] text-base text-recipeBlue-darker'
        onClick={() => {}}
      >
        <FaRegHeart />
      </button>

      {recipe.picture && url && (
        <Image
          src={url}
          alt='recipimage'
          width={350}
          height={350}
          className='rounded-3xl py-2'
        />
      )}
      <div className='mb-[3px] flex flex-col gap-[3px]'>
        <h2 className='text-xl font-bold'>{recipe.name}</h2>
        <p className='line-clamp-2 font-semibold'>{recipe.description}</p>
      </div>
      <section className='flex flex-wrap gap-2 py-1'>
        <Chips values={[...recipe.categories]} editMode={false} />
      </section>
      <span className='absolute bottom-2 left-1/2 -translate-x-1/2 font-semibold opacity-90'>
        - {recipe.difficultyLevel} | 1.5 hours -
      </span>
    </div>
  );
};

export default RecipeCard;
