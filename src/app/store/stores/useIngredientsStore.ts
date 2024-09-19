"use client"
import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

type IngredientsState = {
    ingredients: IngredientType[] | null;
}

type Action = {
    setIngredients: (ingredients: IngredientType[]) => void;
    addIngredients: (ingredients: IngredientType) => void;
    removeIngredients: (ingredientId: string) => void;
}

export const useIngredientsStore = create<IngredientsState & Action>(
    (set) => ({
        ingredients: null,
        setIngredients: (ingredients: IngredientType[] | null) => set(() => ({ ingredients: ingredients })),
        addIngredients: (ingredient: IngredientType) => set((state) => ({
            ingredients: state.ingredients ? [...state.ingredients, ingredient]
                : [ingredient]
        })),
        removeIngredients: (ingredientId: string) => set((state) => ({
            ingredients: state.ingredients ?
                state.ingredients.filter(t => t._id !== ingredientId)
                : state.ingredients
        })),
    })
);

if (typeof window !== 'undefined' && localStorage) {
    const ingredientsData = localStorage.getItem("ingredientsList");
    // console.log("ingredientsData - store", ingredientsData);
    if (ingredientsData) {
        const parsedData = JSON.parse(ingredientsData) as IngredientType[];
        // console.log("useIngredientsStore parsedData", parsedData);
        useIngredientsStore.getState().setIngredients(Object.values(parsedData));
        // console.log("useIngredientsStore useIngredientsStore.getState().ingredients", useIngredientsStore.getState().ingredients, typeof parsedData);
    } else {
        useIngredientsStore.getState().setIngredients([]);
    }
} else {
    useIngredientsStore.getState().setIngredients([]);
}


if (process.env.NODE_ENV === 'development') {
    mountStoreDevtool('IngredientsStore', useIngredientsStore);
}