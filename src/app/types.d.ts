////////////////////////////////

// ~~~~~~~ API ~~~~~~~ //

// // recipe service // //

// ------ recipes ------- //

enum RecipeCategories {
    "ITALIAN",
    "ASAIN",
    "INDIAN",
    "VEGAN",
    "SEAFOOD",
    "SALAD",
    "DINNER",
    "DESSERT",
}

enum difficultyLevels {
    "Easy",
    "Medium",
    "Advanced",
}

enum Units {
    UNITS = "units",
    GRAMS = "grams",
    KGS = "kgs",
    ML = "ml",
    LITERS = "liters",
    TBLS = "tbls",
    SPOONS = "spoons",
    CUPS = "cups",
    PINCH = "pinch",
}

interface QuantifiedIngredient {
    ingredientId: string;
    quantity: number;
    unit: Units;
    index: number;
}

interface ingredientsSection {
    header: string;
    quantifiedIngredients: QuantifiedIngredient[];
    index: number;
}

interface RecipeType {
    _id: string;
    name: string;
    description: string;
    img: string;
    categories: RecipeCategories[];
    difficultyLevel: difficultyLevels;
    ingredientsSections: ingredientsSection[];
    steps: string[];
}

// ------ steps ------- //

interface StepType {
    _id: string;
    duration: number;
    data: string;
    img: string;
}

// ------ ingredients ------- //

enum IngredientCategories {
    CHICKEN = 'chicken',
    MEAT = 'meat',
    VEGAN = 'vegan',
    VEGETERIAN = 'vegeterian',
    VEGETABLES = 'vegetables',
    FRUITS = 'fruits',
    DAIRY = 'dairy',
    SEAFOOD = 'seafood',
    GRAINS = 'grains',
    SPICES = 'spices',
    SAUCES = 'sauces',
    ALCOHOL = 'alcohol',
}

interface IngredientType {
    _id: string;
    name: string;
    pluralName?: string;
    categories: IngredientCategories[];
};

// // files service // //

// // users service // //

////////////////////////////////

// ~~~~~~~ STORES ~~~~~~~ //

// // useAlertStore // //

// // useContextMenuStore // //

interface CoordinatesType {
    pageX: number;
    pageY: number;
}

interface ContentType {
    placeHolder?: string;
    icon?: IconDefinition;
    onClick: () => void;
}

// // usePopupStore // //

enum PopupsTypes {
    CLOSED = "closed",
    NEW_INGREDIENT = "newIngredient",
    NEW_RECIPE_CATEGORY = "newRecipeCategory",
}

// // useThemeStore // //

enum Themes {
    LIGHT = "light",
    DARK = "dark",
}

// // useUserStore // //

//*** if changed - also change on file  ***//

enum TypesOfUser {
    LOGGEDOUT = "loggedOut",
    ADMIN = "admin",
    USER = "user",
}

////////////////////////////////

// ~~~~~~~ PAGES ~~~~~~~ //

// // [locale] // //
// // --> create-recipe <-- // //
// // // --> /example/ <-- // // //


////////////////////////////////

// ~~~~~~~ COMPONENTS ~~~~~~~ //

// // Button // //



// // Dropdown // //

enum DropdownSizes {
    SMALL = 'small',
    DEFAULT = 'default',
    LARGE = 'large',
}

interface DropdownProps {
    isSearchable: boolean;
    placeholder: string;
    items: string[];
    value?: string | number | undefined;
    onChange: (value: string) => void;
    className?: string;
    isFailed?: boolean;
    isDisabled?: boolean;
    size: DropdownSizes;
}

// // Input // //

interface InputProps {
    type: InputTypes;
    placeholder?: string;
    value: string | number | undefined;
    onChange: (value: string | number) => void;
    className?: string;
    failed?: boolean;
}

// // SortableItem // //

interface SortableItemProps {
    id: string;
    name: string;
    isGrabbed: boolean;
    isDisabled: boolean;
    addedStyle?: string;
}

// // SwitchButton // //

interface SwitchButtonProps {
    onSwitch: (isChecked: boolean) => void;
}

// // Table // //

type TableProps<T> = {
    headers: string[];
    data: T[];
    isSelectable: boolean;
    onSelect?: (row: any) => void;
    selectedRowIndex?: number;
};

type TableRowProps<T> = {
    isSelected?: boolean;
    rowIndex: number;
    item: T;
    keysValues: (keyof T)[];
    isSelectable: boolean;
    onSelect?: (row: any) => void;
    //   selectRowFunc?: (rowIndex: number) => void;
};

// // Textbox // //

enum FontSizes {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}

interface TextboxProps {
    prevData?: string;
    isEditMode: boolean;
    fontSizeProps: FontSizes;
    placeHolder?: string;
    value: string;
    onChange: (text: string) => void;
    errorMode?: boolean;
}

// // Upload // //

interface UploadProps {
    label: string;
    inputName?: string;
    isMultiple: boolean;
    errorMode?: boolean;
    filesTypes: string;
    files: RecordType | SonogramType[] | undefined;
    // onFileChange: (files: File | FileList | null) => void;
    onFileChange: (files: File | File[] | null) => void;
    onFileRemoved: (fileIndex: number | undefined) => void;
    fileLength?: (size: number | null) => void;
}

interface UploadRef {
    focus: () => void;
    clear: () => void;
}





////////// ingredients reducer

enum IngredientCategories {
    CHICKEN = "chicken",
    MEAT = "meat",
    VEGAN = "vegan",
    VEGETABLE = "vegetable",
    DAIRY = "dairy",
    SEAFOOD = "seafood",
    FRUIT = "fruit",
    GRAINS = "grains",
    SPICES = "spices",
    SAUCES = "sauces",
}

enum Shops {
    GROCERY = "grocery",
    DELI = "deli",
    FARMERS_MARKET = "farmersMarket",
    SUPERMARKET = "supermarket",
    BUTCHER_SHOP = "butcherShop",
    FISH_MARKET = "fishMarket",
    HEALTH_STORE = "healthStore",
}
