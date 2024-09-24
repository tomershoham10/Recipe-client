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
import BorderedInput from '@/components/(inputs)/BorderedInput';

const CreateRecipe: React.FC = () => {
  const tCreateRecipe = useTranslations('createRecipe');

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

  const handleAddingStep = useCallback(
    (sectionIndex: number) => {
      const newStep = createRecipeState.newStepsBySection[sectionIndex];

      console.log('handleAddingStep', newStep);

      createRecipeDispatch({
        type: createRecipeAction.ADD_STEP_TO_SECTION,
        payload: {
          sectionIndex: sectionIndex,
          step: newStep,
        },
      });
    },
    [createRecipeState.newStepsBySection]
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

          {createRecipeState.ingredientsSections.map((ingredientSection) => (
            <div
              className='group relative mb-3 rounded-xl bg-recipeGray-default px-4 py-2'
              key={ingredientSection.index}
            >
              <div className='mb-1 text-xl font-semibold opacity-80'>
                <BorderedInput
                  placeholder={tCreateRecipe('sectionName')}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    createRecipeDispatch({
                      type: createRecipeAction.SET_INGREDIENT_SECTION_HEADER,
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
                    placeholder={tCreateRecipe('selectIngredient')}
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
                    placeholder={tCreateRecipe('units')}
                    items={
                      Object.values(Units).sort((a, b) => a.localeCompare(b)) ||
                      []
                    }
                    onChange={(val) => {
                      console.log(val);
                      createRecipeDispatch({
                        type: createRecipeAction.UPDATE_NEW_INGREDIENT_FIELD,
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
                        type: createRecipeAction.UPDATE_NEW_INGREDIENT_FIELD,
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
                  onClick={() =>
                    handleAddingIngredient(ingredientSection.index)
                  }
                  className='mt-6 bg-recipeGray-light'
                />
              </section>

              <section className='mt-2 flex flex-row flex-wrap gap-3'>
                <Chips
                  values={ingredientSection.quantifiedIngredients.map(
                    (ingredient) =>
                      `${ingredient.quantity} ${ingredient.unit} ${sortedIngredientsList.find((ing) => ing._id === ingredient.ingredientId)?.name}`
                  )}
                  onRemove={(index) => {
                    createRecipeDispatch({
                      type: createRecipeAction.REMOVE_INGREDIENT_FROM_SECTION,
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
                    type: createRecipeAction.REMOVE_INGREDIENT_SECTION,
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
          {createRecipeState.stepsSections.map((stepsSection) => (
            <div
              className='group relative mb-3 rounded-xl bg-recipeGray-default px-4 py-2'
              key={stepsSection.index}
            >
              <div className='mb-1 text-xl font-semibold opacity-80'>
                <BorderedInput
                  placeholder={tCreateRecipe('sectionName')}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    createRecipeDispatch({
                      type: createRecipeAction.SET_STEP_SECTION_HEADER,
                      payload: {
                        sectionIndex: stepsSection.index,
                        sectionHeader: inputValue,
                      },
                    });
                  }}
                  className='mb-1 w-[6.5rem] text-xl font-semibold'
                />
              </div>
              <section className='flex flex-col items-center justify-between'>
                <section className='mb-1 mt-2 flex w-full flex-row items-center justify-center gap-3'>
                  <Textbox
                    isEditMode={false}
                    fontSizeProps={FontSizes.LARGE}
                    value={
                      createRecipeState.newStepsBySection[stepsSection.index]
                        .info
                    }
                    onChange={(text) => {
                      console.log(text);
                      createRecipeDispatch({
                        type: createRecipeAction.UPDATE_NEW_STEP_FIELD,
                        payload: {
                          sectionIndex: stepsSection.index,
                          field: 'info',
                          value: text,
                        },
                      });
                    }}
                  />
                  <PlusButton
                    onClick={() => {
                      handleAddingStep(stepsSection.index);
                    }}
                    className='h-fit bg-recipeGray-light'
                  />
                </section>
                <ul className='w-full text-xl'>
                  {stepsSection.steps.map((step) => (
                    <li key={step.index} className='flex flex-row gap-1'>
                      <span>{step.index + 1}.</span>
                      <span className='w-[95%] break-words'>{step.info}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          ))}
          <PlusButton
            onClick={() => {
              createRecipeDispatch({
                type: createRecipeAction.ADD_STEP_SECTION,
              });
            }}
            className='absolute bottom-1 left-1/2 -translate-x-1/2 transform'
          />
        </section>
      </section>
    </section>
  );
};

export default CreateRecipe;
