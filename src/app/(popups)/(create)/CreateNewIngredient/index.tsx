'use client';
import { useCallback, useReducer, useState } from 'react';
import { useTranslations } from 'next-intl';
import pRetry from 'p-retry';

import {
  createIngredient,
  IngredientCategories,
} from '@/app/API/recipe-service/ingredients/functions';

import Chips from '@/components/Chip';
import Button from '@/components/(buttons)/Button';
import PlusButton from '@/components/(buttons)/PlusButton';
import Input, { InputTypes } from '@/components/Input/page';
import PopupHeader, { PopupSizes } from '../../PopupHeader';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';

import { PopupsTypes } from '@/app/store/stores/usePopupStore';

const CreateNewIngredient: React.FC = () => {
  const tIng = useTranslations('createIngredient');
  const tButtons = useTranslations('buttons');

  const [ingredientName, setIngredientName] = useState<string | null>(null);
  const [pluralName, setPluralName] = useState<string | null>(null);
  const [newIngredient, setNewIngredient] = useState<
    IngredientCategories | undefined
  >(undefined);
  const [ingredientsList, setIngredientsList] = useState<
    IngredientCategories[]
  >([]);

  const handleIngredientsList = useCallback(() => {
    if (newIngredient) {
      setIngredientsList((prev) =>
        !prev.includes(newIngredient) ? [...prev, newIngredient] : [...prev]
      );
      setNewIngredient(undefined);
    }
  }, [newIngredient]);

  const removeIngredient = useCallback(
    (ingrentIndex: number) => {
      const ingredient = ingredientsList[ingrentIndex];
      setIngredientsList((prev) => [
        ...prev.filter((ing) => ing !== ingredient),
      ]);
    },
    [ingredientsList]
  );

  const submitIngredient = useCallback(async () => {
    try {
      const response = await pRetry(
        () =>
          ingredientName
            ? createIngredient({
                name: ingredientName,
                categories: ingredientsList,
                pluralName: pluralName || undefined,
              })
            : null,
        {
          retries: 5,
        }
      );
    } catch (e) {
      console.error('submitIngredient error', e);
    }
  }, [ingredientName, ingredientsList, pluralName]);

  const resetState = () => {
    setIngredientName(null);
    setPluralName(null);
    setNewIngredient(undefined);
    setIngredientsList([]);
  };

  return (
    <PopupHeader
      popupType={PopupsTypes.NEW_INGREDIENT}
      header={tIng('createIngredient')}
      size={PopupSizes.SMALL}
      onClose={resetState}
    >
      <div className='mt-12 flex w-full flex-col gap-6 px-2 py-4'>
        <section className='flex w-full flex-row gap-4'>
          <section>
            <p className='col-span-1 flex-none text-lg font-bold'>
              {tIng('ingredientName')}
            </p>

            <Input
              type={InputTypes.TEXT}
              placeholder={tIng('ingredientName')}
              value={ingredientName || ''}
              onChange={(value) => setIngredientName(String(value))}
            />
          </section>

          <section>
            <p className='col-span-1 flex-none text-lg font-bold'>
              {tIng('pluralName')}
            </p>

            <Input
              type={InputTypes.TEXT}
              placeholder={tIng('pluralName')}
              value={pluralName || ''}
              onChange={(value) => setPluralName(String(value))}
            />
          </section>

          <section>
            <p className='col-span-1 flex-none text-lg font-bold'>
              {tIng('addCategory')}
            </p>

            <Dropdown
              isSearchable={true}
              value={newIngredient}
              placeholder={'catagories'}
              items={Object.values(IngredientCategories).sort((a, b) => {
                return a.localeCompare(b);
              })}
              onChange={(val) => {
                setNewIngredient(val as IngredientCategories);
              }}
              size={DropdownSizes.DEFAULT}
            />
          </section>
          <PlusButton
            onClick={handleIngredientsList}
            className='mt-10 h-8 w-8 bg-recipeGray-light'
          />
        </section>
        <section className='flex w-full flex-row flex-wrap gap-2'>
          <Chips values={ingredientsList} onRemove={removeIngredient} />
        </section>

        <Button
          label={tButtons('create')}
          onClick={submitIngredient}
          className='absolute bottom-6'
        />
      </div>
    </PopupHeader>
  );
};

export default CreateNewIngredient;
