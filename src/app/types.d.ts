////////////////////////////////

// ~~~~~~~ API ~~~~~~~ //

// // recipe service // //

// ------ recipes ------- //

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

enum ButtonColors {
}

enum ButtonTypes {
    SUBMIT = 'submit',
    BUTTON = 'button',
}

interface ButtonProps {
    label: string;
    icon?: IconDefinition;
    color: ButtonColors;
    onClick?: () => void;
    href?: string;
    style?: string;
    isDisabled?: boolean;
    buttonType?: ButtonTypes;
    loadingLabel?: string;
    isLoading?: boolean;
}

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
    value: string | undefined;
    onChange: (value: string) => void;
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
    value: string | undefined;
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