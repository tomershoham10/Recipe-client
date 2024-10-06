'use client';
import { useCallback, useEffect } from 'react';
import pRetry from 'p-retry';
import { useStore } from 'zustand';
import { useIngredientsStore } from '@/app/store/stores/useIngredientsStore';
import { getAllIngredients } from '@/app/API/recipe-service/ingredients/functions';

export const useFetchIngredients = () => {
  const ingredientsList = useStore(
    useIngredientsStore,
    (state) => state.ingredients
  );
  const setIngredients = useIngredientsStore.getState().setIngredients;
  //   console.log('usefetchIngredients ingredientsList', ingredientsList);
  const fetchIngredients = useCallback(async () => {
    try {
      const response = await pRetry(getAllIngredients, {
        retries: 5,
        onFailedAttempt: (error) =>
          console.error(
            `getAllIngredients Attempt ${error.attemptNumber} failed. Retrying...`
          ),
      });
      // console.log('usefetchIngredients response', response);
      response && setIngredients(response);
    } catch (err) {
      console.error('fetchIngredients error:', err);
    }
  }, [setIngredients]);

  useEffect(() => {
    // console.log(
    //   'usefetchIngredients check',
    //   ingredientsList,
    //   ingredientsList !== null && ingredientsList.length === 0
    // );
    if (ingredientsList !== null && ingredientsList.length === 0) {
      fetchIngredients();
    }
  }, [fetchIngredients, ingredientsList]);

  return ingredientsList?.sort((a, b) => a.name.localeCompare(b.name)) || null;
};
