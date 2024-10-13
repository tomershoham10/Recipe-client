import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import Button from '@/components/(buttons)/Button';
import PopupHeader, { PopupSizes } from '../../../PopupHeader';

import { PopupsTypes } from '@/app/store/stores/usePopupStore';
import {
  CreateRecipeAction,
  CreateRecipeType,
} from '@/reducers/createRecipeReducer';
import Dropdown, { DropdownSizes } from '@/components/Dropdown/page';
import { Units } from '@/app/API/recipe-service/ingredients/functions';
import Input, { InputTypes } from '@/components/Input/page';

interface CreateRecipeEditIngredientProps {
  sectionIndex: number | null;
  ingredientIndex: number | null;
  createRecipeState: CreateRecipeType;
  ingredientsList: IngredientType[] | null;
  createRecipeDispatch: (value: CreateRecipeAction) => void;
  onClose: () => void;
}

const CreateRecipeEditIngredient: React.FC<CreateRecipeEditIngredientProps> = (
  props
) => {
  const {
    sectionIndex,
    ingredientIndex,
    ingredientsList,
    createRecipeState,
    createRecipeDispatch,
    onClose,
  } = props;
  const t = useTranslations('createRecipe.editIngrediet');
  const tButtons = useTranslations('buttons');

  const quantifiedIngredient = useMemo(() => {
    if (sectionIndex !== null && ingredientIndex !== null) {
      return createRecipeState.ingredientsSections[sectionIndex]
        .quantifiedIngredients[ingredientIndex];
    } else return null;
  }, [createRecipeState, sectionIndex, ingredientIndex]);

  const ingredientObject = useMemo(() => {
    if (ingredientsList && quantifiedIngredient) {
      const ingOnj = ingredientsList.find(
        (ing) => ing._id === quantifiedIngredient.ingredientId
      );
      return ingOnj || null;
    } else return null;
  }, [ingredientsList, quantifiedIngredient]);

  if (ingredientObject === null) {
    // alert('server error');
    return null;
  }

  return (
    <PopupHeader
      popupType={PopupsTypes.CREATE_RECIPE_EDIT_INGREDIENT}
      header={`${t('editIngrediet')} - ${ingredientObject.name}`}
      size={PopupSizes.SMALL}
      onClose={onClose}
    >
      <div className='flex h-full w-full flex-col gap-6'>
        <section className='flex h-full flex-row items-center gap-3'>
          <Input
            type={InputTypes.NUMBER}
            value={10}
            onChange={(quantity) => {
              console.log(quantity);
            }}
            className='max-w-[5rem]'
          />
          <Dropdown
            isSearchable={true}
            value={undefined}
            placeholder={t('units')}
            items={
              Object.values(Units).sort((a, b) => a.localeCompare(b)) || []
            }
            onChange={(val) => {
              console.log(val);
            }}
            size={DropdownSizes.DEFAULT}
          />
        </section>

        <Button
          label={tButtons('save')}
          onClick={() => {}}
          className=''
        />
      </div>
    </PopupHeader>
  );
};

export default CreateRecipeEditIngredient;
