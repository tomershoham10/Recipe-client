'use client';
import { useCallback, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import { TiPlus } from 'react-icons/ti';
import { FaXmark } from 'react-icons/fa6';

import Chips from '@/components/Chip';
import { RecipeSectionsProps } from '../RecipeName';
import RoundButton from '@/components/(buttons)/RoundButton';
import Input, { InputTypes } from '@/components/Input/page';
import BorderedInput from '@/components/(inputs)/BorderedInput';
import { decimalToFraction } from '@/app/utils/decimalToFraction';
import { RecipeActionsList } from '@/reducers/createRecipeReducer';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import { useFetchIngredients } from '@/app/utils/hooks/useFetchIngredients';
import { PopupsTypes, usePopupStore } from '@/app/store/stores/usePopupStore';
import CreateRecipeEditIngredient from '@/app/(popups)/(create)/(createRecipe)/EditIngrediet';

const RecipeIngredientsSection: React.FC<RecipeSectionsProps> = (props) => {
  const { createRecipeState, createRecipeDispatch } = props;
  const t = useTranslations('createRecipe');

  const ingredientsList = useFetchIngredients();
  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  const [unitsDropdownValue, setUnitsDropdownValue] = useState<Units | null>(
    null
  );

  const [editIngredientSectionIndex, setEditIngredientSectionIndex] = useState<
    number | null
  >(null);

  const [editIngredientIndex, setEditIngredientIndex] = useState<number | null>(
    null
  );

  const sortedIngredientsList = useMemo(() => {
    return ingredientsList?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  }, [ingredientsList]);

  const handleAddingIngredient = useCallback(
    (sectionIndex: number) => {
      const newIngredient =
        createRecipeState.newIngredientsBySection[sectionIndex];
      if (newIngredient.ingredientId.length > 0) {
        console.log('handleAddingIngredient', newIngredient);

        setUnitsDropdownValue(null);

        createRecipeDispatch({
          type: RecipeActionsList.ADD_INGREDIENT_TO_SECTION,
          payload: {
            sectionIndex: sectionIndex,
            ingredient: newIngredient,
          },
        });
      }
    },
    [createRecipeDispatch, createRecipeState.newIngredientsBySection]
  );

  const handleEditIngredient = useCallback(
    (sectionIndex: number, ingredientIndex: number) => {
      setEditIngredientSectionIndex(sectionIndex);
      setEditIngredientIndex(ingredientIndex);
      updateSelectedPopup(PopupsTypes.CREATE_RECIPE_EDIT_INGREDIENT);
    },
    [updateSelectedPopup]
  );

  const resetEditIngredient = useCallback(() => {
    setEditIngredientSectionIndex(null);
    setEditIngredientIndex(null);
    updateSelectedPopup(PopupsTypes.CLOSED);
  }, [updateSelectedPopup]);

  return (
    <section className='relative h-fit w-4/5 rounded-2xl bg-recipeGray-lightest px-4 pb-7 pt-2 lg:mr-4'>
      <CreateRecipeEditIngredient
        sectionIndex={editIngredientSectionIndex}
        ingredientIndex={editIngredientIndex}
        createRecipeState={createRecipeState}
        ingredientsList={ingredientsList}
        createRecipeDispatch={createRecipeDispatch}
        onClose={resetEditIngredient}
      />
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
                value={
                  sortedIngredientsList?.find(
                    (ing) =>
                      ing._id ===
                      createRecipeState.newIngredientsBySection[
                        ingredientSection.index
                      ].ingredientId
                  )?.name
                }
                items={sortedIngredientsList.map((ing) => ing.name)}
                onChange={(val) => {
                  const ingObj = sortedIngredientsList.find(
                    (ing) => ing.name === val
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
                value={
                  createRecipeState.newIngredientsBySection[
                    ingredientSection.index
                  ].unit
                }
                placeholder={t('units')}
                items={
                  Object.values(Units).sort((a, b) => a.localeCompare(b)) || []
                }
                onChange={(val) => {
                  console.log(val);
                  setUnitsDropdownValue(val as Units);
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
            <section className='mt-[1.75rem]'>
              <RoundButton
                Icon={TiPlus}
                onClick={() => handleAddingIngredient(ingredientSection.index)}
                className='bg-recipeGray-light'
              />
            </section>
          </section>

          <section className='mt-2 flex flex-row flex-wrap gap-3'>
            <Chips
              editMode={true}
              values={ingredientSection.quantifiedIngredients.map(
                (ingredient) => (
                  <span
                    key={ingredient.ingredientId}
                    className='flex flex-row gap-1'
                  >
                    <p
                      className='inline-block'
                      style={{
                        unicodeBidi: 'isolate',
                        direction: 'ltr',
                      }}
                    >
                      {`${decimalToFraction(ingredient.quantity)}`}
                    </p>
                    <p>{ingredient.unit}</p>
                    <span className='flex flex-row'>
                      {
                        sortedIngredientsList.find(
                          (ing) => ing._id === ingredient.ingredientId
                        )?.name
                      }
                      {ingredient.comment && <p>{`, ${ingredient.comment}`}</p>}
                    </span>
                  </span>
                )
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
              onEdit={(index) =>
                handleEditIngredient(ingredientSection.index, index)
              }
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

      <RoundButton
        Icon={TiPlus}
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
