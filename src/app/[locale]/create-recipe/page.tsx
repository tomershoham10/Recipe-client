'use client';
import { useCallback, useEffect, useReducer } from 'react';
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

const CreateRecipe: React.FC = () => {
  const t = useTranslations('createRecipe');

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
        <p className='pr-4 text-5xl font-bold'>{t('createRecipe')}</p>
        <section className='mr-4 w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('addRecipeName')}
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

        <section className='mr-4 w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('addRecipeDescription')}
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

        <section className='mr-4 w-4/5 rounded-2xl bg-white px-4 py-2'>
          <p className='mb-1 text-xl font-semibold opacity-80'>
            {t('uploadRecipePictue')}
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
      <section className='h-full w-full basis-1/2 overflow-y-auto py-4 pr-3'>
        <section className='relative mr-4 h-fit w-4/5 rounded-2xl bg-white px-4 pb-7 pt-2'>
          <p className='mb-1 text-3xl font-bold'>{t('addRecipeIngredients')}</p>

          {createRecipeState.ingredientsSections.map(
            (section, sectionIndex) => (
              <div
                className='bg-recipeGray-default group relative mb-3 rounded-xl px-4 py-2'
                key={sectionIndex}
              >
                <p className='mb-1 text-xl font-semibold opacity-80'>
                  {section.header.length > 0
                    ? section.header
                    : t('sectionName')}
                </p>

                <section className='flex flex-row items-center justify-between'>
                  <section className='w-[40%]'>
                    <p className='text-lg font-semibold opacity-60'>
                      ingredients list
                    </p>
                    <Dropdown
                      isSearchable={true}
                      placeholder={'Mitzrachim'}
                      items={[]}
                      onChange={() => {}}
                      size={DropdownSizes.SMALL}
                    />
                  </section>
                  <section className='w-[25%]'>
                    <p className='text-lg font-semibold opacity-60'>
                      units list
                    </p>
                    <Dropdown
                      isSearchable={true}
                      placeholder={'Units'}
                      items={[]}
                      onChange={() => {}}
                      size={DropdownSizes.SMALL}
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
                        `${ingredient.quantity} ${ingredient.unit} ${ingredient.ingredientId}`
                    )}
                    onRemove={() => {}}
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
      </section>
    </section>
  );
};

export default CreateRecipe;
