'use client';
import { useTranslations } from 'next-intl';
import Chips from '@/components/Chip';
import Dropzone from '@/components/Dropzone/page';
import { RecipeSectionsProps } from '../RecipeName';
import { RecipeActionsList } from '@/reducers/createRecipeReducer';

const RecipePictureSection: React.FC<RecipeSectionsProps> = (props) => {
  const { createRecipeState, createRecipeDispatch } = props;
  const t = useTranslations('createRecipe');

  return (
    <section className='mr-4 w-4/5 rounded-2xl bg-recipeGray-lightest px-4 py-2'>
      <p className='mb-1 text-xl font-semibold opacity-80'>
        {t('uploadRecipePictue')}
      </p>
      <Dropzone
        isMultiple={false}
        onFilesChanged={(files: File[]) => {
          createRecipeDispatch({
            type: RecipeActionsList.SET_RECIPE_PICTURE,
            payload: files[0],
          });
        }}
      />

      {createRecipeState.picture && (
        <section className='mt-2'>
          <Chips
            editMode={true}
            values={[createRecipeState.picture.name]}
            onRemove={() => {
              createRecipeDispatch({
                type: RecipeActionsList.REMOVE_RECIPE_PICTURE,
              });
            }}
          />
        </section>
      )}
    </section>
  );
};

export default RecipePictureSection;
