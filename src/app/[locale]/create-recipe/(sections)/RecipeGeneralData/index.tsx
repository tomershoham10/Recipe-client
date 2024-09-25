'use client';
import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  CreateRecipeAction,
  CreateRecipeType,
  RecipeActionsList,
} from '@/reducers/createRecipeReducer';
import {
  DifficultyLevels,
  RecipeCategories,
} from '@/app/API/recipe-service/recipes/functions';
import Chips from '@/components/Chip';
import PlusButton from '@/components/(buttons)/PlusButton';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';

export interface RecipeSectionsProps {
  createRecipeState: CreateRecipeType;
  createRecipeDispatch: (value: CreateRecipeAction) => void;
}

const RecipeGeneralDataSection: React.FC<RecipeSectionsProps> = (props) => {
  const { createRecipeState, createRecipeDispatch } = props;
  const t = useTranslations('createRecipe');

  const [newCategory, setNewCategory] = useState<RecipeCategories | undefined>(
    undefined
  );

  const addCategory = useCallback(() => {
    if (newCategory) {
      createRecipeDispatch({
        type: RecipeActionsList.ADD_RECIPE_CATEGORY,
        payload: newCategory,
      });
      setNewCategory(undefined);
    }
  }, [createRecipeDispatch, newCategory]);

  const handleRemovingCategory = useCallback(
    (index: number) => {
      const currentCategory = createRecipeState.categories[index];
      createRecipeDispatch({
        type: RecipeActionsList.REMOVE_RECIPE_CATEGORY,
        payload: currentCategory,
      });
    },
    [createRecipeDispatch, createRecipeState.categories]
  );

  return (
    <section className='mr-4 w-4/5 rounded-2xl bg-recipeGray-lightest px-4 py-2'>
      <p className='mb-1 text-3xl font-bold'>{t('generalData')}</p>
      <section className='flex w-full flex-row justify-between'>
        <section className='relative mb-3 h-fit basis-[35%] rounded-xl bg-recipeGray-default px-4 pb-4 pt-2'>
          <p className='mb-1 text-lg font-semibold opacity-60'>
            {t('chooseDifficultyLevel')}
          </p>
          <Dropdown
            isSearchable={true}
            placeholder={t('chooseDifficultyLevel')}
            items={Object.values(DifficultyLevels)}
            onChange={(val) => {
              createRecipeDispatch({
                type: RecipeActionsList.SET_RECIPE_DIFFICULTY_LEVEL,
                payload: val as DifficultyLevels,
              });
            }}
            size={DropdownSizes.DEFAULT}
          />
        </section>
        <section className='mb-3 flex basis-[60%] flex-col items-start rounded-xl bg-recipeGray-default px-4 py-2'>
          <p className='mb-1 text-lg font-semibold opacity-60'>
            {t('selectCategory')}
          </p>
          <section className='flex-center flex w-full flex-row items-center gap-3'>
            <Dropdown
              isSearchable={true}
              value={newCategory}
              placeholder={t('selectCategory')}
              items={Object.values(RecipeCategories).sort((a, b) => {
                return a.localeCompare(b);
              })}
              onChange={(val) => {
                setNewCategory(val as RecipeCategories);
              }}
              size={DropdownSizes.DEFAULT}
            />
            <PlusButton
              onClick={addCategory}
              className='h-fit bg-recipeGray-light'
            />
          </section>
          {createRecipeState.categories.length > 0 && (
            <section className='mt-3 flex w-full flex-row flex-wrap gap-2 pb-1'>
              <Chips
                values={createRecipeState.categories}
                onRemove={handleRemovingCategory}
              />
            </section>
          )}
        </section>
      </section>
    </section>
  );
};

export default RecipeGeneralDataSection;
