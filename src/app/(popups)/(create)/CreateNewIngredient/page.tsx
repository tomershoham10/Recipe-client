'use client';
import { useReducer } from 'react';
import Input, { InputTypes } from '@/components/Input/page';
import { PopupsTypes } from '@/app/store/stores/usePopupStore';
import {
  newIngredientAction,
  newIngredientReducer,
} from '@/reducers/popups/createIngredientReducer';
import { useTranslations } from 'next-intl';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import PopupHeader, { PopupSizes } from '../../PopupHeader/page';
import Button from '@/components/Button';

const CreateNewIngredient: React.FC = () => {
  const tIng = useTranslations('createIngredient');
  const tButtons = useTranslations('buttons');

  const initialIngredientState = {
    name: undefined,
    averagedPrice: 0,
    categories: [],
    whereToFind: [],
  };

  const [newIngredientState, newIngredientDispatch] = useReducer(
    newIngredientReducer,
    initialIngredientState
  );

  return (
    <PopupHeader
      popupType={PopupsTypes.NEW_INGREDIENT}
      header={tIng('createIngredient')}
      size={PopupSizes.SMALL}
    >
      <div className='mt-12 flex w-full flex-row gap-6 px-2 py-4'>
        <section>
          <p className='text-duoGray-darkest dark:text-duoGrayDark-lightest col-span-1 flex-none text-lg font-bold'>
            {tIng('ingredientName')}
          </p>

          <Input
            type={InputTypes.TEXT}
            placeholder={'Course Name'}
            value={newIngredientState.name}
            onChange={(value) =>
              newIngredientDispatch({
                type: newIngredientAction.SET_INGREDIENT_NAME,
                payload: value as string,
              })
            }
          />
        </section>

        <section>
          <p className='text-duoGray-darkest dark:text-duoGrayDark-lightest col-span-1 flex-none text-lg font-bold'>
            {tIng('addPrice')}
          </p>

          <Input
            type={InputTypes.NUMBER}
            placeholder={'Course Name'}
            value={newIngredientState.averagedPrice}
            onChange={(value) =>
              newIngredientDispatch({
                type: newIngredientAction.SET_AVERAGED_PRICE,
                payload: value as number,
              })
            }
          />
        </section>

        <section>
          <p className='text-duoGray-darkest dark:text-duoGrayDark-lightest col-span-1 flex-none text-lg font-bold'>
            {tIng('addCategory')}
          </p>

          <Dropdown
            isSearchable={false}
            placeholder={''}
            items={[]}
            onChange={() => {}}
            size={DropdownSizes.SMALL}
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
