import { BucketsNames, getFileByName } from '@/app/API/files-service/functions';
import Image from 'next/image';
import pRetry from 'p-retry';
import React, { useCallback, useEffect, useState } from 'react';
import Chips from '../Chip';

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
      className='h-[370px] w-[375px] cursor-pointer rounded-xl bg-recipeGray-default px-3 py-2 shadow-xl transition-all duration-200 ease-in-out hover:scale-[102.5%]'
      onClick={() => onClick(recipe._id)}
    >
      {recipe.picture && url && (
        <Image
          src={url}
          alt='Blob image'
          width={350}
          height={350}
          className='rounded-3xl py-2'
        />
      )}
      <div>
        <h2 className='text-xl font-bold'>{recipe.name}</h2>
        <p>{recipe.description}</p>
      </div>
      <section className='flex flex-wrap gap-2 py-1'>
        <Chips
          values={[...recipe.categories, recipe.difficultyLevel]}
          editMode={false}
        />
      </section>
    </div>
  );
};

export default RecipeCard;
