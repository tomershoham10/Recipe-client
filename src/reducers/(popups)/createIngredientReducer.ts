
// export enum newIngredientAction {
//     SET_INGREDIENT_NAME = 'setIngredientName',
//     SET_AVERAGED_PRICE = 'setAveragedPrice',
//     SET_CATEGORIES = 'setCategories',
//     ADD_CATEGORY = 'addCategory',
//     SET_SHOPS = 'setShops',
//     ADD_SHOP = 'addShop'
// }

// type Action =
//     | { type: newIngredientAction.SET_INGREDIENT_NAME, payload: string }
//     | { type: newIngredientAction.SET_AVERAGED_PRICE, payload: number }
//     | { type: newIngredientAction.SET_CATEGORIES, payload: IngredientCategories[] }
//     | { type: newIngredientAction.ADD_CATEGORY, payload: IngredientCategories }
//     | { type: newIngredientAction.SET_SHOPS, payload: Shops[] }
//     | { type: newIngredientAction.ADD_SHOP, payload: Shops }


// export interface newIngredientType {
//     name: string | undefined;
//     averagedPrice: number;
//     categories: IngredientCategories[];
//     whereToFind: Shops[];
// }

// export const newIngredientReducer = (
//     state: newIngredientType,
//     action: Action
// ): newIngredientType => {
//     switch (action.type) {
//         case newIngredientAction.SET_INGREDIENT_NAME:
//             return { ...state, name: action.payload };
//         case newIngredientAction.SET_AVERAGED_PRICE:
//             return { ...state, averagedPrice: action.payload };
//         case newIngredientAction.SET_CATEGORIES:
//             return { ...state, categories: action.payload };
//         case newIngredientAction.ADD_CATEGORY:
//             return { ...state, categories: [...state.categories, action.payload] };
//         case newIngredientAction.SET_SHOPS:
//             return { ...state, whereToFind: action.payload };
//         case newIngredientAction.ADD_SHOP:
//             return { ...state, whereToFind: [...state.whereToFind, action.payload] };

//         default:
//             return state;
//     }
// };
