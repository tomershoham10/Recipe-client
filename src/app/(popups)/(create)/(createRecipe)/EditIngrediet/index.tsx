import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

import Button from '@/components/(buttons)/Button';
import PopupHeader, { PopupSizes } from '../../../PopupHeader';

import { PopupsTypes } from '@/app/store/stores/usePopupStore';
import {
  CreateRecipeAction,
  CreateRecipeType,
  RecipeActionsList,
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

  const [updatedIngredient, setUpdatedIngredient] =
    useState<QuantifiedIngredient | null>(null);

  const quantifiedIngredient = useMemo(() => {
    if (sectionIndex !== null && ingredientIndex !== null) {
      const quantIng =
        createRecipeState.ingredientsSections[sectionIndex]
          .quantifiedIngredients[ingredientIndex];
      setUpdatedIngredient(quantIng);
      return quantIng;
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

  // useEffect(() => {
  //   console.log('updatedIngredient', updatedIngredient);
  // }, [updatedIngredient]);

  const updateIngredient = useCallback(() => {
    if (
      sectionIndex !== null &&
      ingredientIndex !== null &&
      updatedIngredient !== null
    ) {
      createRecipeDispatch({
        type: RecipeActionsList.UPDATE_INGREDIENT,
        payload: {
          sectionIndex: sectionIndex,
          ingredientIndex: ingredientIndex,
          updatedIngredient: updatedIngredient,
        },
      });
      console.log('updateIngredient func', updatedIngredient);
      onClose();
    }
  }, [
    createRecipeDispatch,
    ingredientIndex,
    onClose,
    sectionIndex,
    updatedIngredient,
  ]);

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
            value={updatedIngredient?.quantity}
            onChange={(quantity) => {
              console.log(quantity);
              setUpdatedIngredient((prev) => {
                if (prev === null) return prev;

                return {
                  ...prev,
                  quantity: Number(quantity),
                };
              });
            }}
            className='max-w-[5rem]'
          />
          <Dropdown
            isSearchable={true}
            value={updatedIngredient?.unit}
            placeholder={t('units')}
            items={
              Object.values(Units).sort((a, b) => a.localeCompare(b)) || []
            }
            onChange={(val) => {
              console.log('unit', val);
              setUpdatedIngredient((prev) => {
                if (prev === null) return prev;

                return {
                  ...prev,
                  unit: val as Units,
                };
              });
            }}
            size={DropdownSizes.DEFAULT}
          />

          <Input
            type={InputTypes.TEXT}
            placeholder={t('addComment')}
            value={updatedIngredient?.comment}
            onChange={(comment) => {
              console.log('comment', comment);
              setUpdatedIngredient((prev) => {
                if (prev === null) return prev;

                return {
                  ...prev,
                  comment: String(comment),
                };
              });
            }}
            className='w-[40%]'
          />
        </section>

        <Button
          label={tButtons('save')}
          onClick={updateIngredient}
          className=''
        />
      </div>
    </PopupHeader>
  );
};

export default CreateRecipeEditIngredient;
