'use client';
import { useTranslations } from 'next-intl';
import Input, { InputTypes } from '@/components/Input/page';
import {
  CreateRecipeAction,
  CreateRecipeType,
  RecipeActionsList,
} from '@/reducers/createRecipeReducer';

export interface RecipeSectionsProps {
  createRecipeState: CreateRecipeType;
  createRecipeDispatch: (value: CreateRecipeAction) => void;
}

const RecipeNameSection: React.FC<RecipeSectionsProps> = (props) => {
  const { createRecipeState, createRecipeDispatch } = props;
  const t = useTranslations('createRecipe');

  return (
    <section className='lg:mr-4 w-4/5 rounded-2xl bg-recipeGray-lightest px-4 py-2'>
      <p className='mb-1 text-xl font-semibold opacity-80'>
        {t('addRecipeName')}
      </p>
      <Input
        type={InputTypes.TEXT}
        value={createRecipeState.name || ''}
        onChange={(text) =>
          createRecipeDispatch({
            type: RecipeActionsList.SET_RECIPE_NAME,
            payload: String(text),
          })
        }
      />
    </section>
  );
};

export default RecipeNameSection;
