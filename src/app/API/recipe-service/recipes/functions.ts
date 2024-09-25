import { RECIPES_SERVICE_ENDPOINTS } from "../apis";

export enum DifficultyLevels {
    EASY = "קל",
    MEDIUM = "בינוני",
    ADVANCED = "למתקדמים",
}

export enum RecipeCategories {
    ITALIAN = "איטלקי",
    ASAIN = "אסייתי",
    INDIAN = "הודי",
    VEGAN = "טבעוני",
    VEGETERIAN = "צמחוני",
    SEAFOOD = "דגים",
    SALAD = "סלט",
    DINNER = "ארוחת ערב",
    DESSERT = "קינוח",
    COCKTAIL = "קוקטייל",
    SOUP = "מרק",
    BAKING = "אפייה",
}

export const createRecipe = async (recipe: Partial<RecipeType>): Promise<RecipeType | null> => {
    try {
        console.log('createIngredient', recipe);


        const response = await fetch(
            RECIPES_SERVICE_ENDPOINTS.RECIPES,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recipe)
            });

        if (response.status === 201) {
            const data = await response.json();
            const resRecipe = data.recipe;
            return resRecipe;

        } else {
            return null;
        }

    } catch (error) {
        console.error("Error creating an ingredient:", error);
        return null;
    }
}
