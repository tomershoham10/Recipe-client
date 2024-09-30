const host = process.env.NEXT_PUBLIC_HOST;

const ROUT = `http://${host}:5000`;

export const RECIPES_SERVICE_ENDPOINTS = {
    INGREDIENTS: `${ROUT}/api/ingredients`,
    RECIPES: `${ROUT}/api/recipes`,
};

export const INGREDIENTS_API = {
};

export const RECIPES_API = {
    LOAD_RECIPES: `${RECIPES_SERVICE_ENDPOINTS.RECIPES}/infinite-scroll`
};

