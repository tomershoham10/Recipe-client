////////////////////////////////

// ~~~~~~~ API ~~~~~~~ //

// // recipe service // //

// ------ recipes ------- //

enum RecipeCategories {
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

enum DifficultyLevels {
    EASY = "קל",
    MEDIUM = "בינוני",
    ADVANCED = "למתקדמים",
}

enum Units {
    UNITS = "יח'",
    GRAMS = "גרם",
    KGS = "ק\"ג",
    ML = "מ\"ל",
    LITERS = "ליטר",
    TBLS = "כפות",
    SPOONS = "כפיות",
    CUPS = "כוסות",
    PINCH = "קמצוץ",
    BUNCH = "צרור",
    HANDFUL = 'חופן',
    SLICES = 'פרוסות',
    PACKS = 'חבילות',
    CONE = 'גביע',
    FEW = 'מעט',
    SCRAPING = 'גרידה'
}

interface QuantifiedIngredient {
    ingredientId: string;
    quantity: number;
    unit: Units;
    index: number;
    comment?: string;
}

interface IngredientsSection {
    header: string;
    quantifiedIngredients: QuantifiedIngredient[];
    index: number;
}

interface StepsType {
    info: string;
    index: number
}

interface StepsSection {
    header: string;
    index: number;
    steps: StepsType[];
}

interface RecipeType {
    _id: string;
    name: string;
    description: string;
    picture: string;
    categories: RecipeCategories[];
    difficultyLevel: DifficultyLevels;
    source?: string;
    ingredientsSections: IngredientsSection[];
    stepsSections: StepsSection[];
    createdAt: Date;
}

// ------ ingredients ------- //

enum IngredientCategories {
    CHICKEN = 'עוף',
    MEAT = 'בשרי',
    VEGAN = 'טבעוני',
    VEGETERIAN = 'צמחוני',
    VEGETABLES = 'ירקות',
    FRUITS = 'פירות',
    DAIRY = 'חלבי',
    CHEESE = 'גבינה',
    SEAFOOD = 'מאכלי ים',
    GRAINS = 'דגנים',
    SPICES = 'תבלינים',
    SAUCES = 'רטבים',
    HERBS = 'עשבי תיבול',
    ALCOHOL = 'אלכוהול',
    TOOLS = 'כלי עזר',
    SPREADS = 'ממרחים',
    SOFT_DRINKS = 'משקאות קלים',
    ASAIAN = 'אסייתי',
    NUTS = 'אגוזים',
    BAKING = 'אפייה'
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

// // RoundButton // //

interface RoundButtonProps {
    type?: "submit" | "reset" | "button";
    label?: string;
    Icon: IconType;
    className?: string;
    onClick: () => void;
}

// // Dropdown // //

enum DropdownSizes {
    SMALL = 'small',
    DEFAULT = 'default',
    LARGE = 'large',
}

interface DropdownProps {
    id?: string;
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
    id?: string;
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

enum Shops {
    GROCERY = "grocery",
    DELI = "deli",
    FARMERS_MARKET = "farmersMarket",
    SUPERMARKET = "supermarket",
    BUTCHER_SHOP = "butcherShop",
    FISH_MARKET = "fishMarket",
    HEALTH_STORE = "healthStore",
}
