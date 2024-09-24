'use client';
import { useCallback, useEffect, useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { createRecipeReducer } from '@/reducers/createRecipeReducer';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import RecipeNameSection from './(sections)/RecipeName';
import RecipeDescriptionSection from './(sections)/RecipeDescription';
import RecipePictureSection from './(sections)/RecipePicture';
import RecipeIngredientsSection from './(sections)/RecipeIngredients';
import RecipeStepsSection from './(sections)/RecipeSteps';
import Button from '@/components/(buttons)/Button';
import {
  createRecipe,
  DifficultyLevels,
} from '@/app/API/recipe-service/recipes/functions';
import pRetry from 'p-retry';

const CreateRecipe: React.FC = () => {
  const tCreateRecipe = useTranslations('createRecipe');
  const tButtons = useTranslations('buttons');

  const initialCreateRecipeState = {
    name: '',
    description: '',
    picture: null,
    categories: [],
    difficultyLevel: DifficultyLevels.EASY,

    ingredientsSections: [
      {
        header: '',
        quantifiedIngredients: [],
        index: 0,
      },
    ],
    newIngredientsBySection: {
      0: { ingredientId: '', unit: Units.UNITS, index: 0, quantity: 0 },
    },

    stepsSections: [
      {
        header: '',
        index: 0,
        steps: [],
      },
    ],
    newStepsBySection: {
      0: { info: '', index: 0 },
    },
  };

  const [createRecipeState, createRecipeDispatch] = useReducer(
    createRecipeReducer,
    initialCreateRecipeState
  );

  useEffect(() => {
    console.log(createRecipeState);
  }, [createRecipeState]);

  const submitRecipe = useCallback(async () => {
    try {
      await pRetry(
        () =>
          createRecipeState.picture && createRecipeState.name.length > 0
            ? createRecipe({
                name: createRecipeState.name,
                description: createRecipeState.description,
                picture: createRecipeState.picture.name,
                categories: createRecipeState.categories,
                difficultyLevel: createRecipeState.difficultyLevel,
                ingredientsSections: createRecipeState.ingredientsSections,
                stepsSections: createRecipeState.stepsSections,
              })
            : null,
        {
          retries: 5,
        }
      );
    } catch (error) {
      console.error('Error submitRecipe:', error);
    }
  }, [createRecipeState]);

  return (
    <section className='flex h-full w-full flex-row'>
      <section className='flex h-full w-full basis-1/2 flex-col gap-3 overflow-y-auto py-4 pr-3'>
        <p className='pr-4 text-5xl font-bold'>
          {tCreateRecipe('createRecipe')}
        </p>

        <RecipeNameSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />

        <RecipeDescriptionSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />

        <RecipePictureSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />
        <Button
          label={tButtons('create')}
          onClick={submitRecipe}
          className='mr-4 mt-2'
        />
      </section>
      <section className='flex h-full w-full basis-1/2 flex-col gap-3 overflow-y-auto py-4 pr-3'>
        <RecipeIngredientsSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />

        <RecipeStepsSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />
      </section>
    </section>
  );
};

export default CreateRecipe;
