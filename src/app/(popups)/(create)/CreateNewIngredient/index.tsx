'use client';
import { useReducer, useState } from 'react';
import Input, { InputTypes } from '@/components/Input/page';
import { PopupsTypes } from '@/app/store/stores/usePopupStore';
// import {
//   newIngredientAction,
//   newIngredientReducer,
// } from '@/reducers/(popups)/createIngredientReducer';
import { useTranslations } from 'next-intl';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import PopupHeader, { PopupSizes } from '../../PopupHeader';
import Button from '@/components/(buttons)/Button';

enum IngredientCategories {
  CHICKEN = 'chicken',
  MEAT = 'meat',
  VEGAN = 'vegan',
  VEGETABLE = 'vegetable',
  DAIRY = 'dairy',
  SEAFOOD = 'seafood',
  FRUIT = 'fruit',
  GRAINS = 'grains',
  SPICES = 'spices',
  SAUCES = 'sauces',
}

const CreateNewIngredient: React.FC = () => {
  const tIng = useTranslations('createIngredient');
  const tButtons = useTranslations('buttons');

  const [ingredientName, setIngredientName] = useState<string | null>(null);
  const [pluralName, setPluralName] = useState<string | null>(null);

  return (
    <PopupHeader
      popupType={PopupsTypes.NEW_INGREDIENT}
      header={tIng('createIngredient')}
      size={PopupSizes.SMALL}
    >
      <div className='mt-12 flex w-full flex-row gap-6 px-2 py-4'>
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
            placeholder={'catagories'}
            items={Object.values(IngredientCategories)}
            onChange={() => {}}
            size={DropdownSizes.DEFAULT}
          />
        </section>

        <Button
          label={tButtons('create')}
          onClick={() => {}}
          className='absolute bottom-6'
        />
      </div>
    </PopupHeader>
  );
};

export default CreateNewIngredient;
