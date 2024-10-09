'use client';
import { useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { TiPlus, TiCamera } from 'react-icons/ti';

import { RecipeSectionsProps } from '../RecipeName';
import RoundButton from '@/components/(buttons)/RoundButton';
import Textbox, { FontSizes } from '@/components/Textbox/page';
import BorderedInput from '@/components/(inputs)/BorderedInput';
import { RecipeActionsList } from '@/reducers/createRecipeReducer';

const RecipeStepsSection: React.FC<RecipeSectionsProps> = (props) => {
  const { createRecipeState, createRecipeDispatch } = props;
  const t = useTranslations('createRecipe');

  const handleAddingStep = useCallback(
    (sectionIndex: number) => {
      const newStep = createRecipeState.newStepsBySection[sectionIndex];

      console.log('handleAddingStep', newStep);

      createRecipeDispatch({
        type: RecipeActionsList.ADD_STEP_TO_SECTION,
        payload: {
          sectionIndex: sectionIndex,
          step: newStep,
        },
      });
    },
    [createRecipeDispatch, createRecipeState.newStepsBySection]
  );

  const handleAddingImage = useCallback((sectionIndex: number) => {
    console.log('handleAddingImage');
    alert('not functional');
  }, []);

  return (
    <section className='relative lg:mr-4 h-fit w-4/5 rounded-2xl bg-recipeGray-lightest px-4 pb-7 pt-2'>
      <p className='mb-1 text-3xl font-bold'>{t('addRecipeSteps')}</p>
      {createRecipeState.stepsSections.map((stepsSection) => (
        <div
          className='group relative mb-3 rounded-xl bg-recipeGray-default px-4 py-2'
          key={stepsSection.index}
        >
          <div className='mb-1 text-xl font-semibold opacity-80'>
            <BorderedInput
              placeholder={t('sectionName')}
              onChange={(event) => {
                const inputValue = event.target.value;
                createRecipeDispatch({
                  type: RecipeActionsList.SET_STEP_SECTION_HEADER,
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
                  createRecipeState.newStepsBySection[stepsSection.index].info
                }
                onChange={(text) => {
                  console.log(text);
                  createRecipeDispatch({
                    type: RecipeActionsList.UPDATE_NEW_STEP_FIELD,
                    payload: {
                      sectionIndex: stepsSection.index,
                      field: 'info',
                      value: text,
                    },
                  });
                }}
              />
              <section className='flex h-full flex-col gap-3'>
                <RoundButton
                  Icon={TiPlus}
                  onClick={() => {
                    handleAddingStep(stepsSection.index);
                  }}
                  className='h-fit bg-recipeGray-light'
                />

                <RoundButton
                  Icon={TiCamera}
                  onClick={() => {
                    handleAddingImage(stepsSection.index);
                  }}
                  className='h-fit bg-recipeGray-light'
                />
              </section>
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
      <RoundButton
        Icon={TiPlus}
        onClick={() => {
          createRecipeDispatch({
            type: RecipeActionsList.ADD_STEP_SECTION,
          });
        }}
        className='absolute bottom-1 left-1/2 -translate-x-1/2 transform'
      />
    </section>
  );
};

export default RecipeStepsSection;
