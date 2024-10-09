'use client';
import { useTranslations } from 'next-intl';
import { RecipeSectionsProps } from '../RecipeName';
import Textbox, { FontSizes } from '@/components/Textbox/page';
import { RecipeActionsList } from '@/reducers/createRecipeReducer';

const RecipeDescriptionSection: React.FC<RecipeSectionsProps> = (props) => {
  const { createRecipeState, createRecipeDispatch } = props;
  const t = useTranslations('createRecipe');

  return (
    <section className='lg:mr-4 w-4/5 rounded-2xl bg-recipeGray-lightest px-4 py-2'>
      <p className='mb-1 text-xl font-semibold opacity-80'>
        {t('addRecipeDescription')}
      </p>
      <Textbox
        isEditMode={false}
        fontSizeProps={FontSizes.MEDIUM}
        value={createRecipeState.description || ''}
        onChange={(text: string) => {
          createRecipeDispatch({
            type: RecipeActionsList.SET_RECIPE_DESCRIPTION,
            payload: text,
          });
        }}
      />
    </section>
  );
};

export default RecipeDescriptionSection;
