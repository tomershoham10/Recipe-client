import { RECIPES_SERVICE_ENDPOINTS } from "../apis";

export const createIngredient = async (newIngredient: Partial<IngredientType>): Promise<number | null> => {
    try {
        console.log('createIngredient', newIngredient);
        const response = await fetch(
            RECIPES_SERVICE_ENDPOINTS.INGREDIENTS,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newIngredient)
            });

        return response.status;

    } catch (error) {
        console.error("Error creating an ingredient:", error);
        return null;
    }
}

export const getIngredientById = async (ingredientId: string): Promise<IngredientType | null> => {
    try {
        const response = await fetch(
            `${RECIPES_SERVICE_ENDPOINTS.INGREDIENTS}/${ingredientId}`,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const ingredientData = data.ingredient;
            return ingredientData;
        } else {
            console.error("Failed to fetch ingredient by id.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching ingredient by id:", error);
        return null;
    }
};

export const getAllIngredients = async (): Promise<IngredientType[] | null> => {
    try {
        const response = await fetch(
            RECIPES_SERVICE_ENDPOINTS.INGREDIENTS,
            {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.ok) {
            const data = await response.json();
            const ingredientData = data.ingredients;
            return ingredientData;
        } else {
            console.error("Failed to fetch all ingredients.");
            return null;
        }
    } catch (error) {
        console.error("Error fetching all ingredients:", error);
        return null;
    }
};
