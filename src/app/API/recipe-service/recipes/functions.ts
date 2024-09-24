import { RECIPES_SERVICE_ENDPOINTS } from "../apis";

export enum DifficultyLevels {
    EASY = "easy",
    MEDIUM = "medium",
    ADVANCED = "advanced",
}

export const createRecipe = async (newIngredient: Partial<RecipeType>): Promise<number | null> => {
    try {
        console.log('createIngredient', newIngredient);
        const response = await fetch(
            RECIPES_SERVICE_ENDPOINTS.RECIPES,
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
