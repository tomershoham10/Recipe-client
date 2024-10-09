'use client';
import { useCallback, useEffect, useReducer } from 'react';
import pRetry from 'p-retry';
import { useTranslations } from 'next-intl';

import Button from '@/components/(buttons)/Button';
import RecipeNameSection from './(sections)/RecipeName';
import RecipeStepsSection from './(sections)/RecipeSteps';
import RecipePictureSection from './(sections)/RecipePicture';
import { createRecipeReducer } from '@/reducers/createRecipeReducer';
import RecipeDescriptionSection from './(sections)/RecipeDescription';
import RecipeIngredientsSection from './(sections)/RecipeIngredients';
import RecipeGeneralDataSection from './(sections)/RecipeGeneralData';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import { createRecipe } from '@/app/API/recipe-service/recipes/functions';
import { BucketsNames, uploadFile } from '@/app/API/files-service/functions';

const CreateRecipe: React.FC = () => {
  const tCreateRecipe = useTranslations('createRecipe');
  const tButtons = useTranslations('buttons');

  const initialCreateRecipeState = {
    name: '',
    description: '',
    picture: null,
    categories: [],
    difficultyLevel: null,

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
    console.log('createRecipeState', createRecipeState);
  }, [createRecipeState]);

  const submitRecipe = useCallback(async () => {
    try {
      console.log({
        name: createRecipeState.name,
        description: createRecipeState.description,
        picture: createRecipeState.picture,
        categories: createRecipeState.categories,
        difficultyLevel: createRecipeState.difficultyLevel || undefined,
        ingredientsSections: createRecipeState.ingredientsSections,
        stepsSections: createRecipeState.stepsSections,
      });
      const newRecipe = await pRetry(
        () =>
          createRecipeState.picture && createRecipeState.name.length > 0
            ? createRecipe({
                name: createRecipeState.name,
                description: createRecipeState.description,
                categories: createRecipeState.categories,
                picture: createRecipeState.picture.name,
                difficultyLevel: createRecipeState.difficultyLevel || undefined,
                ingredientsSections: createRecipeState.ingredientsSections,
                stepsSections: createRecipeState.stepsSections,
              })
            : null,
        {
          retries: 5,
          onFailedAttempt: (error) =>
            console.error(
              `createRecipe Attempt ${error.attemptNumber} failed. Retrying...`
            ),
        }
      );

      if (newRecipe) {
        const newRecipeId = newRecipe._id;
        const status = await pRetry(
          () =>
            createRecipeState.picture
              ? uploadFile(
                  BucketsNames.RECIPES,
                  newRecipeId,
                  createRecipeState.picture
                )
              : null,
          {
            retries: 5,
            onFailedAttempt: (error) =>
              console.error(
                `uploadFile Attempt ${error.attemptNumber} failed. Retrying...`
              ),
          }
        );
      }
    } catch (error) {
      console.error('Error submitRecipe:', error);
    }
  }, [createRecipeState]);

  return (
    <section className='flex h-full w-full flex-col overflow-y-auto py-3 lg:flex-row lg:overflow-hidden lg:py-0'>
      <section className='flex h-full w-full flex-col items-center gap-3 lg:basis-1/2 lg:items-start lg:overflow-y-auto lg:border-l-2 lg:border-recipeGray-default lg:py-4 lg:pr-3'>
        <p className='w-4/5 text-5xl font-bold lg:w-fit lg:pr-4'>
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
          className='mr-4 mt-2 hidden lg:block'
        />
      </section>
      <section className='flex h-full w-full flex-col items-center gap-3 py-4 lg:basis-1/2 lg:items-start lg:overflow-y-auto lg:pr-3'>
        <RecipeGeneralDataSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />

        <RecipeIngredientsSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />

        <RecipeStepsSection
          createRecipeState={createRecipeState}
          createRecipeDispatch={createRecipeDispatch}
        />
        <section className='mb-2 w-4/5 lg:hidden'>
          <Button label={tButtons('create')} onClick={submitRecipe} />
        </section>
      </section>
    </section>
  );
};

export default CreateRecipe;
