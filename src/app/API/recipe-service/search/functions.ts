import { RECIPES_SERVICE_ENDPOINTS } from "../apis";

export interface SearchResults {
    recipes: RecipeType[];
    ingredients: IngredientType[];
}

export const getSearchResults = async (searchQuery: string): Promise<SearchResults | null> => {
    try {
        console.log('getSearchResults', searchQuery);

        const encodedQuery = encodeURIComponent(searchQuery);

        const response = await fetch(
            `${RECIPES_SERVICE_ENDPOINTS.SEARCH}?q=${encodedQuery}`,
            {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

        console.log('getSearchResults 1', response.status);
        if (response.status === 200) {
            const data = await response.json();
            console.log('getSearchResults 2', data);
            return data;

        } else {
            return null;
        }

    } catch (error) {
        console.error("Error getSearchResults:", error);
        return null;
    }
}
