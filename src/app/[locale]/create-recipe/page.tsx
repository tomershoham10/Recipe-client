'use client';
import { useEffect, useReducer } from 'react';
import { useTranslations } from 'next-intl';
import { createRecipeReducer } from '@/reducers/createRecipeReducer';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import RecipeNameSection from './(sections)/RecipeName';
import RecipeDescriptionSection from './(sections)/RecipeDescription';
import RecipePictureSection from './(sections)/RecipePicture';
import RecipeIngredientsSection from './(sections)/RecipeIngredients';
import RecipeStepsSection from './(sections)/RecipeSteps';

const CreateRecipe: React.FC = () => {
  const tCreateRecipe = useTranslations('createRecipe');

  const initialCreateRecipeState = {
    name: '',
    description: '',
    picture: null,

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

  return (
    <section className='flex h-full w-full flex-row'>
      <section className='flex w-full basis-1/2 flex-col gap-3 border-l-2 pr-3 pt-4'>
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
