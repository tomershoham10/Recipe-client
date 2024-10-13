import { Units } from "@/app/API/recipe-service/ingredients/functions";
import { DifficultyLevels } from "@/app/API/recipe-service/recipes/functions";

export enum RecipeActionsList {
    SET_RECIPE_NAME = 'setRecipeName',

    SET_RECIPE_DESCRIPTION = 'setRecipeDescription',

    SET_RECIPE_PICTURE = "setRecipePicture",
    REMOVE_RECIPE_PICTURE = "removeRecipePicture",

    SET_RECIPE_DIFFICULTY_LEVEL = 'setRecipeDifficultyLevel',
    ADD_RECIPE_CATEGORY = 'addRecipeCategory',
    REMOVE_RECIPE_CATEGORY = 'removeRecipeCategory',
    SET_RECIPE_SOURCE = 'setRecipeSource',

    ADD_INGREDIENT_SECTION = "addIngredientSection",
    REMOVE_INGREDIENT_SECTION = "removeIngredientSection",
    SET_INGREDIENT_SECTION_HEADER = "setIngredientSectionHeader",
    ADD_INGREDIENT_TO_SECTION = "addIngredientToSection",
    REMOVE_INGREDIENT_FROM_SECTION = "removeIngredientFromSection",

    UPDATE_INGREDIENT = "updateIngredient",

    UPDATE_NEW_INGREDIENT_FIELD = "updateNewIngredientField",

    ADD_STEP_SECTION = "addStepSection",
    REMOVE_STEP_SECTION = "removeStepSection",
    SET_STEP_SECTION_HEADER = "setStepSectionHeader",
    ADD_STEP_TO_SECTION = "addStepToSection",
    REMOVE_STEP_FROM_SECTION = "removeStepFromSection",
    UPDATE_NEW_STEP_FIELD = "updateNewStepField",
}


export type CreateRecipeAction =
    | { type: RecipeActionsList.SET_RECIPE_NAME, payload: string }

    | { type: RecipeActionsList.SET_RECIPE_DESCRIPTION, payload: string }

    | { type: RecipeActionsList.SET_RECIPE_PICTURE, payload: File | null }
    | { type: RecipeActionsList.REMOVE_RECIPE_PICTURE }

    | { type: RecipeActionsList.SET_RECIPE_DIFFICULTY_LEVEL, payload: DifficultyLevels }
    | { type: RecipeActionsList.ADD_RECIPE_CATEGORY, payload: RecipeCategories }
    | { type: RecipeActionsList.REMOVE_RECIPE_CATEGORY, payload: RecipeCategories }
    | { type: RecipeActionsList.SET_RECIPE_SOURCE, payload: string | null }

    | { type: RecipeActionsList.ADD_INGREDIENT_SECTION }
    | { type: RecipeActionsList.REMOVE_INGREDIENT_SECTION, payload: number }
    | { type: RecipeActionsList.SET_INGREDIENT_SECTION_HEADER, payload: { sectionIndex: number, sectionHeader: string } }
    | { type: RecipeActionsList.ADD_INGREDIENT_TO_SECTION, payload: { sectionIndex: number, ingredient: QuantifiedIngredient } }
    | { type: RecipeActionsList.REMOVE_INGREDIENT_FROM_SECTION, payload: { sectionIndex: number, ingredientIndex: number } }

    | { type: RecipeActionsList.UPDATE_INGREDIENT, payload: { sectionIndex: number, ingredientIndex: number, updatedIngredient: QuantifiedIngredient } }

    | { type: RecipeActionsList.UPDATE_NEW_INGREDIENT_FIELD, payload: { sectionIndex: number, field: keyof QuantifiedIngredient, value: string | number } }

    | { type: RecipeActionsList.ADD_STEP_SECTION }
    | { type: RecipeActionsList.REMOVE_STEP_SECTION, payload: number }
    | { type: RecipeActionsList.SET_STEP_SECTION_HEADER, payload: { sectionIndex: number, sectionHeader: string } }
    | { type: RecipeActionsList.ADD_STEP_TO_SECTION, payload: { sectionIndex: number, step: StepsType } }
    | { type: RecipeActionsList.REMOVE_STEP_FROM_SECTION, payload: { sectionIndex: number, stepIndex: number } }
    | { type: RecipeActionsList.UPDATE_NEW_STEP_FIELD, payload: { sectionIndex: number, field: keyof StepsType, value: string | number } };

export interface CreateRecipeType {
    name: string;
    description: string;
    picture: File | null;

    categories: RecipeCategories[];
    difficultyLevel: DifficultyLevels | null;
    source: string | null;

    ingredientsSections: IngredientsSection[];
    newIngredientsBySection: {
        [sectionIndex: number]: QuantifiedIngredient;
    };

    stepsSections: StepsSection[];
    newStepsBySection: {
        [sectionIndex: number]: StepsType;
    };
}

export const createRecipeReducer = (
    state: CreateRecipeType,
    action: CreateRecipeAction
): CreateRecipeType => {
    switch (action.type) {
        case RecipeActionsList.SET_RECIPE_NAME:
            return { ...state, name: action.payload };

        case RecipeActionsList.SET_RECIPE_DESCRIPTION:
            return { ...state, description: action.payload };

        case RecipeActionsList.SET_RECIPE_PICTURE:
            return { ...state, picture: action.payload };
        case RecipeActionsList.REMOVE_RECIPE_PICTURE:
            return {
                ...state,
                picture: null,
            };

        case RecipeActionsList.SET_RECIPE_DIFFICULTY_LEVEL:
            return { ...state, difficultyLevel: action.payload };
        case RecipeActionsList.ADD_RECIPE_CATEGORY:
            if (!state.categories.includes(action.payload)) {
                return {
                    ...state,
                    categories: [...state.categories, action.payload],
                };
            }
            return state;
        case RecipeActionsList.REMOVE_RECIPE_CATEGORY:
            return {
                ...state,
                categories: state.categories.filter(category => category !== action.payload),
            };
        case RecipeActionsList.SET_RECIPE_SOURCE:
            return { ...state, source: action.payload };

        case RecipeActionsList.ADD_INGREDIENT_SECTION:
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
        case RecipeActionsList.REMOVE_INGREDIENT_SECTION:
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

        case RecipeActionsList.SET_INGREDIENT_SECTION_HEADER:
            return {
                ...state,
                ingredientsSections: state.ingredientsSections.map((section, index) =>
                    index === action.payload.sectionIndex
                        ? { ...section, header: action.payload.sectionHeader }
                        : section
                ),
            };

        case RecipeActionsList.ADD_INGREDIENT_TO_SECTION:
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
        case RecipeActionsList.REMOVE_INGREDIENT_FROM_SECTION:
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
            updatedNewIngredientsBySection[action.payload.sectionIndex] = { ingredientId: '', unit: Units.UNITS, index: 0, quantity: 0 };

            return {
                ...state,
                ingredientsSections: updatedIngredientsSections,
                newIngredientsBySection: updatedNewIngredientsBySection,
            };

        case RecipeActionsList.UPDATE_INGREDIENT:
            return {
                ...state,
                ingredientsSections: state.ingredientsSections.map((section, sectionIndex) =>
                    sectionIndex === action.payload.sectionIndex
                        ? {
                            ...section,
                            quantifiedIngredients: section.quantifiedIngredients.map((ingredient, ingredientIndex) =>
                                ingredientIndex === action.payload.ingredientIndex
                                    ? { ...action.payload.updatedIngredient }
                                    : ingredient
                            ),
                        }
                        : section
                ),
            };

        case RecipeActionsList.UPDATE_NEW_INGREDIENT_FIELD:
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


        case RecipeActionsList.ADD_STEP_SECTION:
            return {
                ...state,
                stepsSections: [
                    ...state.stepsSections,
                    { header: '', steps: [], index: state.stepsSections.length },
                ],
                newStepsBySection: {
                    ...state.newStepsBySection,
                    [state.stepsSections.length]: { info: '', index: 0 },
                },
            };

        case RecipeActionsList.REMOVE_STEP_SECTION:
            if (state.stepsSections.length === 1) {
                return state;
            }
            return {
                ...state,
                stepsSections: state.stepsSections
                    .filter((_, index) => index !== action.payload)
                    .map((section, index) => ({
                        ...section,
                        index,
                    })),
            };

        case RecipeActionsList.SET_STEP_SECTION_HEADER:
            return {
                ...state,
                stepsSections: state.stepsSections.map((section, index) =>
                    index === action.payload.sectionIndex
                        ? { ...section, header: action.payload.sectionHeader }
                        : section
                ),
            };

        case RecipeActionsList.ADD_STEP_TO_SECTION:
            return {
                ...state,
                newStepsBySection: {
                    ...state.newStepsBySection,
                    [action.payload.sectionIndex]: {
                        info: '',
                        index: (state.newStepsBySection[action.payload.sectionIndex]?.index || 0) + 1,
                    },
                },
                stepsSections: state.stepsSections.map((section, index) =>
                    index === action.payload.sectionIndex
                        ? { ...section, steps: [...section.steps, action.payload.step] }
                        : section
                ),
            };

        case RecipeActionsList.REMOVE_STEP_FROM_SECTION:
            return {
                ...state,
                stepsSections: state.stepsSections.map((section, index) =>
                    index === action.payload.sectionIndex
                        ? {
                            ...section,
                            steps: section.steps.filter(
                                (_, i) => i !== action.payload.stepIndex
                            ),
                        }
                        : section
                ),
                newStepsBySection: {
                    ...state.newStepsBySection,
                    [action.payload.sectionIndex]: { info: '', index: 0 },
                },
            };

        case RecipeActionsList.UPDATE_NEW_STEP_FIELD:
            return {
                ...state,
                newStepsBySection: {
                    ...state.newStepsBySection,
                    [action.payload.sectionIndex]: {
                        ...state.newStepsBySection[action.payload.sectionIndex],
                        [action.payload.field]: action.payload.value,
                    },
                },
            };

        default:
            return state;
    };
}