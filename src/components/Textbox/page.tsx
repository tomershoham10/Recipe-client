"use client";
import React, { useState, useEffect } from "react";

export enum FontSizes {
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
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

const Textbox: React.FC<TextboxProps> = (props) => {
  const prevData = props.prevData;
  const isEditMode = props.isEditMode;
  const fontSizeProps = props.fontSizeProps;
  const placeHolder = props.placeHolder;
  const propsVal = props.value;
  const onChange = props.onChange;
  const errorMode = props.errorMode;

  const [fontSize, setFontSize] = useState<string>();

  useEffect(() => {
    switch (fontSizeProps) {
      case FontSizes.SMALL:
        setFontSize("text-sm font-normal");
        break;
      case FontSizes.MEDIUM:
        setFontSize("text-lg font-medium");
        break;
      case FontSizes.LARGE:
        setFontSize("text-xl font-semibold");
        break;
      default:
        setFontSize("text-md font-medium");
        break;
    }
  }, [fontSizeProps]);

  return (
    <form className={`${fontSize} h-full`}>
      <div className="relative overflow-hidden h-full">
        <textarea
          style={isEditMode ? {} : { resize: "none" }}
          value={propsVal}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange(event.target.value);
          }}
          className={`h-full w-full rounded-md border-2 px-3 py-2 focus:outline-none
          ${
            errorMode
              ? "border-red-700 bg-red-300 text-red-600"
              : "textarea-dark-placeholder border-recipeGray-darker text-recipeGray-dark"
          }
          `}
          placeholder={placeHolder}
        />
      </div>
    </form>
  );
};

export default Textbox;
