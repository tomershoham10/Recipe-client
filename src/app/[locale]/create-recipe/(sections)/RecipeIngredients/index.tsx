'use client';
import { useCallback, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import { FaXmark } from 'react-icons/fa6';

import Chips from '@/components/Chip';
import { RecipeSectionsProps } from '../RecipeName';
import PlusButton from '@/components/(buttons)/PlusButton';
import Input, { InputTypes } from '@/components/Input/page';
import BorderedInput from '@/components/(inputs)/BorderedInput';
import { RecipeActionsList } from '@/reducers/createRecipeReducer';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import { useFetchIngredients } from '@/app/utils/hooks/useFetchIngredients';

const RecipeIngredientsSection: React.FC<RecipeSectionsProps> = (props) => {
  const { createRecipeState, createRecipeDispatch } = props;
  const t = useTranslations('createRecipe');

  const ingredientsList = useFetchIngredients();

  const sortedIngredientsList = useMemo(() => {
    return ingredientsList?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  }, [ingredientsList]);

  const handleAddingIngredient = useCallback(
    (sectionIndex: number) => {
      const newIngredient =
        createRecipeState.newIngredientsBySection[sectionIndex];

      console.log('handleAddingIngredient', newIngredient);

      createRecipeDispatch({
        type: RecipeActionsList.ADD_INGREDIENT_TO_SECTION,
        payload: {
          sectionIndex: sectionIndex,
          ingredient: newIngredient,
        },
      });
    },
    [createRecipeDispatch, createRecipeState.newIngredientsBySection]
  );

  return (
    <section className='relative mr-4 h-fit w-4/5 rounded-2xl bg-recipeGray-lightest px-4 pb-7 pt-2'>
      <p className='mb-1 text-3xl font-bold'>{t('addRecipeIngredients')}</p>

      {createRecipeState.ingredientsSections.map((ingredientSection) => (
        <div
          className='group relative mb-3 rounded-xl bg-recipeGray-default px-4 py-2'
          key={ingredientSection.index}
        >
          <div className='mb-1 text-xl font-semibold opacity-80'>
            <BorderedInput
              placeholder={t('sectionName')}
              onChange={(event) => {
                const inputValue = event.target.value;
                createRecipeDispatch({
                  type: RecipeActionsList.SET_INGREDIENT_SECTION_HEADER,
                  payload: {
                    sectionIndex: ingredientSection.index,
                    sectionHeader: inputValue,
                  },
                });
              }}
              className='mb-1 w-[6.5rem] text-xl font-semibold'
            />
          </div>

          <section className='flex flex-row items-center justify-between'>
            <section className='w-[40%]'>
              <p className='text-lg font-semibold opacity-60'>
                ingredients list
              </p>
              <Dropdown
                isSearchable={true}
                placeholder={t('selectIngredient')}
                items={sortedIngredientsList.map((ing) => ing.name)}
                onChange={(val) => {
                  const ingObj = sortedIngredientsList.find(
                    (ing) => ing.name === val
                  );
                  console.log(
                    'ingredientId',
                    val,
                    ingObj,
                    sortedIngredientsList
                  );
                  if (ingObj) {
                    createRecipeDispatch({
                      type: RecipeActionsList.UPDATE_NEW_INGREDIENT_FIELD,
                      payload: {
                        sectionIndex: ingredientSection.index,
                        field: 'ingredientId',
                        value: ingObj._id,
                      },
                    });
                  }
                }}
                size={DropdownSizes.DEFAULT}
              />
            </section>
            <section className='w-[25%]'>
              <p className='text-lg font-semibold opacity-60'>units list</p>
              <Dropdown
                isSearchable={true}
                placeholder={t('units')}
                items={
                  Object.values(Units).sort((a, b) => a.localeCompare(b)) || []
                }
                onChange={(val) => {
                  console.log(val);
                  createRecipeDispatch({
                    type: RecipeActionsList.UPDATE_NEW_INGREDIENT_FIELD,
                    payload: {
                      sectionIndex: ingredientSection.index,
                      field: 'unit',
                      value: val,
                    },
                  });
                }}
                size={DropdownSizes.DEFAULT}
              />
            </section>
            <section className='w-[20%]'>
              <p className='text-lg font-semibold opacity-60'>quantity</p>
              <Input
                type={InputTypes.NUMBER}
                value={
                  createRecipeState.newIngredientsBySection[
                    ingredientSection.index
                  ].quantity
                }
                onChange={(quantity) => {
                  console.log(quantity);
                  createRecipeDispatch({
                    type: RecipeActionsList.UPDATE_NEW_INGREDIENT_FIELD,
                    payload: {
                      sectionIndex: ingredientSection.index,
                      field: 'quantity',
                      value: Number(quantity),
                    },
                  });
                }}
              />
            </section>
            <PlusButton
              onClick={() => handleAddingIngredient(ingredientSection.index)}
              className='mt-6 bg-recipeGray-light'
            />
          </section>

          <section className='mt-2 flex flex-row flex-wrap gap-3'>
            <Chips
              editMode={true}
              values={ingredientSection.quantifiedIngredients.map(
                (ingredient) =>
                  `${ingredient.quantity} ${ingredient.unit} ${sortedIngredientsList.find((ing) => ing._id === ingredient.ingredientId)?.name}`
              )}
              onRemove={(index) => {
                createRecipeDispatch({
                  type: RecipeActionsList.REMOVE_INGREDIENT_FROM_SECTION,
                  payload: {
                    sectionIndex: ingredientSection.index,
                    ingredientIndex: index,
                  },
                });
              }}
            />
          </section>
          <button
            onClick={() => {
              createRecipeDispatch({
                type: RecipeActionsList.REMOVE_INGREDIENT_SECTION,
                payload: ingredientSection.index,
              });
            }}
            className='absolute left-4 top-3 hidden h-6 w-6 items-center justify-center rounded-full bg-black text-recipeGray-lightest group-hover:flex'
          >
            <FaXmark />
          </button>
        </div>
      ))}

      <PlusButton
        onClick={() => {
          createRecipeDispatch({
            type: RecipeActionsList.ADD_INGREDIENT_SECTION,
          });
        }}
        className='absolute bottom-1 left-1/2 -translate-x-1/2 transform'
      />
    </section>
  );
};

export default RecipeIngredientsSection;
