'use client';
import { useCallback, useState } from 'react';
import Button from '@/components/(buttons)/Button';
import PlusButton from '@/components/(buttons)/PlusButton';
import { useFetchIngredients } from '@/app/utils/hooks/useFetchIngredients';
import { PopupsTypes, usePopupStore } from '@/app/store/stores/usePopupStore';

const Ingredients = () => {
  const ingredientsList = useFetchIngredients();

  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  const [selectedIngredient, setSelectedIngredient] =
    useState<IngredientType | null>(null);

  const handleIngredientSelected = useCallback(
    (ingredientId: string) => {
      const ingredient = ingredientsList!.find(
        (ing) => ing._id === ingredientId
      );
      setSelectedIngredient(ingredient || null);
    },
    [ingredientsList]
  );

  return (
    <section className='flex h-full w-full flex-row'>
      <section className='flex basis-1/2 flex-col border-l-2 px-6 pt-8'>
        {ingredientsList && (
          <ul className='flex max-h-[90%] flex-col justify-between gap-3 overflow-y-auto rounded-lg bg-white p-3 text-xl'>
            {ingredientsList.map((ing) => (
              <li
                key={ing._id}
                onClick={() => handleIngredientSelected(ing._id)}
                className={`w-full cursor-pointer rounded-lg px-3 py-2 ${
                  ing._id !== selectedIngredient?._id
                    ? 'bg-recipeGray-light hover:bg-recipeGray-default hover:font-semibold'
                    : 'bg-recipeGray-default font-semibold'
                }`}
              >
                {ing.name}
              </li>
            ))}
          </ul>
        )}
        <PlusButton
          onClick={() => {
            updateSelectedPopup(PopupsTypes.NEW_INGREDIENT);
          }}
          className='mx-auto mt-3 h-8 w-8 bg-recipeGray-lightest'
        />
      </section>

      <section className='basis-1/2 px-6 pt-8'>
        {selectedIngredient && (
          <section className='flex flex-col gap-3 rounded-lg bg-white p-3 text-xl'>
            <span className='flex flex-row gap-1'>
              <p className='font-bold'>{selectedIngredient.name}</p>
              {selectedIngredient.pluralName && (
                <p>({selectedIngredient.pluralName})</p>
              )}
            </span>
            <Button label={'delete'} onClick={() => {}} />
          </section>
        )}
      </section>
    </section>
  );
};

export default Ingredients;
