'use client';
import { useCallback, useEffect, useReducer } from 'react';
import pRetry from 'p-retry';
import { useTranslations } from 'next-intl';
import { createRecipeReducer } from '@/reducers/createRecipeReducer';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import RecipeNameSection from './(sections)/RecipeName';
import RecipeDescriptionSection from './(sections)/RecipeDescription';
import RecipePictureSection from './(sections)/RecipePicture';
import RecipeIngredientsSection from './(sections)/RecipeIngredients';
import RecipeStepsSection from './(sections)/RecipeSteps';
import Button from '@/components/(buttons)/Button';
import { createRecipe } from '@/app/API/recipe-service/recipes/functions';
import RecipeGeneralDataSection from './(sections)/RecipeGeneralData';
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
    console.log(createRecipeState);
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
          }
        );
      }
    } catch (error) {
      console.error('Error submitRecipe:', error);
    }
  }, [createRecipeState]);

  return (
    <section className='flex h-full w-full flex-row'>
      <section className='flex h-full w-full basis-1/2 flex-col gap-3 overflow-y-auto border-l-2 border-recipeGray-default py-4 pr-3'>
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
      </section>
    </section>
  );
};

export default CreateRecipe;
