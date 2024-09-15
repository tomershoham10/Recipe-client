import { Units } from "@/app/API/recipe-service/ingredients/functions";

export enum createRecipeAction {
    SET_RECIPE_NAME = 'setRecipeName',
    SET_RECIPE_DESCRIPTION = 'setRecipeDescription',
    SET_RECIPE_PICTURE = "setRecipePicture",
    ADD_INGREDIENT_SECTION = "addIngredientSection",
    REMOVE_INGREDIENT_SECTION = "removeIngredientSection",
    SET_INGREDIENT_SECTION_HEADER = "setIngredientSectionHeader",
    ADD_INGREDIENT_TO_SECTION = "addIngredientToSection",
    REMOVE_INGREDIENT_FROM_SECTION = "removeIngredientFromSection",

    UPDATE_NEW_INGREDIENT_FIELD = "updateNewIngredientField",
}


type Action =
    | { type: createRecipeAction.SET_RECIPE_NAME, payload: string }
    | { type: createRecipeAction.SET_RECIPE_DESCRIPTION, payload: string }
    | { type: createRecipeAction.SET_RECIPE_PICTURE, payload: File | null }

    | { type: createRecipeAction.ADD_INGREDIENT_SECTION }
    | { type: createRecipeAction.REMOVE_INGREDIENT_SECTION, payload: number }

    | { type: createRecipeAction.SET_INGREDIENT_SECTION_HEADER, payload: { sectionIndex: number, sectionHeader: string } }

    | { type: createRecipeAction.ADD_INGREDIENT_TO_SECTION, payload: { sectionIndex: number, ingredient: QuantifiedIngredient } }
    | { type: createRecipeAction.REMOVE_INGREDIENT_FROM_SECTION, payload: { sectionIndex: number, ingredientIndex: number } }

    | { type: createRecipeAction.UPDATE_NEW_INGREDIENT_FIELD, payload: { sectionIndex: number, field: keyof QuantifiedIngredient, value: string | number } };

export interface createRecipeType {
    name: string;
    description: string;
    picture: File | null;
    ingredientsSections: ingredientsSection[];

    newIngredientsBySection: {
        [sectionIndex: number]: QuantifiedIngredient;
    };

    steps: string[];
}

export const createRecipeReducer = (
    state: createRecipeType,
    action: Action
): createRecipeType => {
    switch (action.type) {
        case createRecipeAction.SET_RECIPE_NAME:
            return { ...state, name: action.payload };
        case createRecipeAction.SET_RECIPE_DESCRIPTION:
            return { ...state, description: action.payload };
        case createRecipeAction.SET_RECIPE_PICTURE:
            return { ...state, picture: action.payload };

        case createRecipeAction.ADD_INGREDIENT_SECTION:
            return {
                ...state, ingredientsSections: [...state.ingredientsSections, {
                    header: '',
                    quantifiedIngredients: [],
                    index: state.ingredientsSections.length,
                }],
                newIngredientsBySection: {
                    ...state.newIngredientsBySection,
                    [state.ingredientsSections.length]: { ingredientId: '', unit: Units.UNITS, index: 0, quantity: 0 }
                }
            };
        case createRecipeAction.REMOVE_INGREDIENT_SECTION:
            if (state.ingredientsSections.length === 1) {
                return state;
            }
            return {
                ...state,
                ingredientsSections: state.ingredientsSections
                    .filter((_, index) => index !== action.payload)
                    .map((section, index) => ({
                        ...section,
                        index,
                    })),
            };

        case createRecipeAction.SET_INGREDIENT_SECTION_HEADER:
            return {
                ...state,
                ingredientsSections: state.ingredientsSections.map((section, index) =>
                    index === action.payload.sectionIndex
                        ? { ...section, header: action.payload.sectionHeader }
                        : section
                ),
            };

        case createRecipeAction.ADD_INGREDIENT_TO_SECTION:
            const currentIndex = state.newIngredientsBySection[action.payload.sectionIndex]?.index || 0;
            const newIndex = currentIndex + 1;
            return {
                ...state,
                newIngredientsBySection: {
                    ...state.newIngredientsBySection,
                    [action.payload.sectionIndex]: {
                        ingredientId: '',
                        unit: Units.UNITS,
                        index: newIndex,
                        quantity: 0
                    },
                },
                ingredientsSections: state.ingredientsSections.map((section, index) =>
                    index === action.payload.sectionIndex
                        ? { ...section, quantifiedIngredients: [...section.quantifiedIngredients, action.payload.ingredient] }
                        : section
                ),
            };
        case createRecipeAction.REMOVE_INGREDIENT_FROM_SECTION:
            const updatedIngredientsSections = state.ingredientsSections.map((section, index) =>
                index === action.payload.sectionIndex
                    ? {
                        ...section,
                        quantifiedIngredients: section.quantifiedIngredients.filter(
                            (_, i) => i !== action.payload.ingredientIndex
                        ),
                    }
                    : section
            );

            const updatedNewIngredientsBySection = { ...state.newIngredientsBySection };
            delete updatedNewIngredientsBySection[action.payload.sectionIndex];

            return {
                ...state,
                ingredientsSections: updatedIngredientsSections,
                newIngredientsBySection: updatedNewIngredientsBySection,
            };

        case createRecipeAction.UPDATE_NEW_INGREDIENT_FIELD:
            return {
                ...state,
                newIngredientsBySection: {
                    ...state.newIngredientsBySection,
                    [action.payload.sectionIndex]: {
                        ...state.newIngredientsBySection[action.payload.sectionIndex],
                        [action.payload.field]: action.payload.value,
                    },
                },
            };
        default:
            return state;
    };
}