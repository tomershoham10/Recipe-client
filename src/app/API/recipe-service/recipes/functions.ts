import { RECIPES_API, RECIPES_SERVICE_ENDPOINTS } from "../apis";

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
    MEAT = 'בשרי',
}

export const getRecipeById = async (recipeId: string): Promise<RecipeType | null> => {
    try {
        console.log('getRecipeById', recipeId);


        const response = await fetch(
            `${RECIPES_SERVICE_ENDPOINTS.RECIPES}/${recipeId}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

        console.log('getRecipeById 1', response.status);
        if (response.status === 200) {
            const data = await response.json();
            console.log('getRecipeById 2', data);
            const resRecipe = data.recipe;
            return resRecipe;

        } else {
            return null;
        }

    } catch (error) {
        console.error("Error getRecipeById:", error);
        return null;
    }
}

export const createRecipe = async (recipe: Partial<RecipeType>): Promise<RecipeType | null> => {
    try {
        console.log('createRecipe', recipe);


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
        console.error("Error creating an recipe:", error);
        return null;
    }
}

export const loadRecipes = async (page: number, limit: number): Promise<RecipeType[] | null> => {
    try {
        console.log('loadRecipes', page, limit);


        const response = await fetch(
            `${RECIPES_API.LOAD_RECIPES}?page=${page}&limit=${limit}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

        if (response.status === 200) {
            const data = await response.json();
            const resRecipes = data.recipes;
            console.log('data', data);
            return resRecipes;

        } else {
            return null;
        }

    } catch (error) {
        console.error("Error loadRecipes:", error);
        return null;
    }
}