'use client';
import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useTranslations } from 'next-intl';

import { FaXmark } from 'react-icons/fa6';

import PlusButton from '@/components/(buttons)/PlusButton';
import Chips from '@/components/Chip';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import Dropzone from '@/components/Dropzone/page';
import Input, { InputTypes } from '@/components/Input/page';
import Textbox, { FontSizes } from '@/components/Textbox/page';
import {
  createRecipeAction,
  createRecipeReducer,
} from '@/reducers/createRecipeReducer';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import { useFetchIngredients } from '@/app/utils/hooks/useFetchIngredients';

const CreateRecipe: React.FC = () => {
  const tCreateRecipe = useTranslations('createRecipe');
  const tUnits = useTranslations('units');

  const ingredientsList = useFetchIngredients();

  const sortedIngredientsList = useMemo(() => {
    return ingredientsList?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  }, [ingredientsList]);

  console.log('ingredientsListingredientsList', ingredientsList);

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
      0: { ingredientId: '', unit: tUnits(Units.UNITS), index: 0, quantity: 0 },
    },

    steps: [],
  };

  const [createRecipeState, createRecipeDispatch] = useReducer(
    createRecipeReducer,
    initialCreateRecipeState
  );

  useEffect(() => {
    console.log(createRecipeState);
  }, [createRecipeState]);

  const handleAddingIngredient = useCallback(
    (sectionIndex: number) => {
      const newIngredient =
        createRecipeState.newIngredientsBySection[sectionIndex];

      console.log('handleAddingIngredient', newIngredient);

      createRecipeDispatch({
        type: createRecipeAction.ADD_INGREDIENT_TO_SECTION,
        payload: {
          sectionIndex: sectionIndex,
          ingredient: newIngredient,
        },
      });
    },
    [createRecipeState.newIngredientsBySection]
  );

  return (
    <section className='flex h-full w-full flex-row'>
      <section className='flex w-full basis-1/2 flex-col gap-3 border-l-2 pr-3 pt-4'>
        <p className='pr-4 text-5xl font-bold'>
          {tCreateRecipe('createRecipe')}
        </p>
        <section className='mr-4 w-4/5 rounded-2xl bg-recipeGray-lightest px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {tCreateRecipe('addRecipeName')}
          </p>
          <Input
            type={InputTypes.TEXT}
            value={createRecipeState.name || ''}
            onChange={(text) =>
              createRecipeDispatch({
                type: createRecipeAction.SET_RECIPE_NAME,
                payload: String(text),
              })
            }
          />
        </section>

        <section className='mr-4 w-4/5 rounded-2xl bg-recipeGray-lightest px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {tCreateRecipe('addRecipeDescription')}
          </p>
          <Textbox
            isEditMode={false}
            fontSizeProps={FontSizes.MEDIUM}
            value={createRecipeState.description || ''}
            onChange={(text: string) => {
              createRecipeDispatch({
                type: createRecipeAction.SET_RECIPE_DESCRIPTION,
                payload: text,
              });
            }}
          />
        </section>

        <section className='mr-4 w-4/5 rounded-2xl bg-recipeGray-lightest px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {tCreateRecipe('uploadRecipePictue')}
          </p>
          <Dropzone
            isMultiple={false}
            onFilesChanged={(files: File[]) => {
              createRecipeDispatch({
                type: createRecipeAction.SET_RECIPE_PICTURE,
                payload: files[0],
              });
            }}
          />

          {createRecipeState.picture && (
            <section className='mt-2'>
              <Chips
                values={[createRecipeState.picture.name]}
                onRemove={() => {}}
              />
            </section>
          )}
        </section>
      </section>
      <section className='flex h-full w-full basis-1/2 flex-col gap-3 overflow-y-auto py-4 pr-3'>
        <section className='relative mr-4 h-fit w-4/5 rounded-2xl bg-recipeGray-lightest px-4 pb-7 pt-2'>
          <p className='mb-1 text-3xl font-bold'>
            {tCreateRecipe('addRecipeIngredients')}
          </p>

          {createRecipeState.ingredientsSections.map(
            (section, sectionIndex) => (
              <div
                className='group relative mb-3 rounded-xl bg-recipeGray-default px-4 py-2'
                key={sectionIndex}
              >
                <p className='mb-1 text-xl font-semibold opacity-80'>
                  {section.header.length > 0
                    ? section.header
                    : tCreateRecipe('sectionName')}
                </p>

                <section className='flex flex-row items-center justify-between'>
                  <section className='w-[40%]'>
                    <p className='text-lg font-semibold opacity-60'>
                      ingredients list
                    </p>
                    <Dropdown
                      isSearchable={true}
                      placeholder={'Select ingredient'}
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
                            type: createRecipeAction.UPDATE_NEW_INGREDIENT_FIELD,
                            payload: {
                              sectionIndex: section.index,
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
                    <p className='text-lg font-semibold opacity-60'>
                      units list
                    </p>
                    <Dropdown
                      isSearchable={true}
                      placeholder={'Units'}
                      items={
                        Object.values(Units)
                          .map((unit) => tUnits(unit))
                          .sort((a, b) => a.localeCompare(b)) || []
                      }
                      onChange={(val) => {
                        console.log(val);
                        createRecipeDispatch({
                          type: createRecipeAction.UPDATE_NEW_INGREDIENT_FIELD,
                          payload: {
                            sectionIndex: section.index,
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
                        createRecipeState.newIngredientsBySection[section.index]
                          .quantity
                      }
                      onChange={(quantity) => {
                        console.log(quantity);
                        createRecipeDispatch({
                          type: createRecipeAction.UPDATE_NEW_INGREDIENT_FIELD,
                          payload: {
                            sectionIndex: section.index,
                            field: 'quantity',
                            value: Number(quantity),
                          },
                        });
                      }}
                    />
                  </section>
                  <PlusButton
                    onClick={() => handleAddingIngredient(section.index)}
                    className='mt-6 bg-recipeGray-light'
                  />
                </section>

                <section className='mt-2 flex flex-row flex-wrap gap-3'>
                  <Chips
                    values={section.quantifiedIngredients.map(
                      (ingredient) =>
                        `${ingredient.quantity} ${ingredient.unit} ${sortedIngredientsList.find((ing) => ing._id === ingredient.ingredientId)?.name}`
                    )}
                    onRemove={(index) => {
                      createRecipeDispatch({
                        type: createRecipeAction.REMOVE_INGREDIENT_FROM_SECTION,
                        payload: {
                          sectionIndex: section.index,
                          ingredientIndex: index,
                        },
                      });
                    }}
                  />
                </section>
                <button
                  className='absolute left-4 top-3 hidden h-6 w-6 items-center justify-center rounded-full bg-black text-recipeGray-lightest group-hover:flex'
                  onClick={() => {
                    createRecipeDispatch({
                      type: createRecipeAction.REMOVE_INGREDIENT_SECTION,
                      payload: section.index,
                    });
                  }}
                >
                  <FaXmark />
                </button>
              </div>
            )
          )}

          <PlusButton
            onClick={() => {
              createRecipeDispatch({
                type: createRecipeAction.ADD_INGREDIENT_SECTION,
              });
            }}
            className='absolute bottom-1 left-1/2 -translate-x-1/2 transform'
          />
        </section>

        <section className='relative mr-4 h-fit w-4/5 rounded-2xl bg-recipeGray-lightest px-4 pb-7 pt-2'>
          <p className='mb-1 text-3xl font-bold'>
            {tCreateRecipe('addRecipeSteps')}
          </p>
          <div className='group relative mb-3 rounded-xl bg-recipeGray-default px-4 py-2'>
            <p className='mb-1 text-xl font-semibold opacity-80'>
              {tCreateRecipe('sectionName')}
            </p>
            <section className='flex flex-row items-center justify-between'>
              <section className='w-[40%]'>
                <ol type='A'>
                  <li>
                    <input
                      type='text'
                      className='w-full border-b-black bg-transparent px-3 py-2 focus:outline-none border-2'
                    />
                  </li>
                  <li>abc</li>
                  <li>abc</li>
                </ol>
              </section>
            </section>
          </div>

          <PlusButton
            onClick={() => {}}
            className='absolute bottom-1 left-1/2 -translate-x-1/2 transform'
          />
        </section>
      </section>
    </section>
  );
};

export default CreateRecipe;
