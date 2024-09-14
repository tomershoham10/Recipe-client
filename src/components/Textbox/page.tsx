'use client';
import React, { useState, useEffect } from 'react';

export enum FontSizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
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
        setFontSize('text-sm font-normal');
        break;
      case FontSizes.MEDIUM:
        setFontSize('text-lg font-medium');
        break;
      case FontSizes.LARGE:
        setFontSize('text-xl font-semibold');
        break;
      default:
        setFontSize('text-md font-medium');
        break;
    }
  }, [fontSizeProps]);

  return (
    <form className={`${fontSize} h-24`}>
      <div className='overflow-hiddenf relative h-full'>
        <textarea
          style={isEditMode ? {} : { resize: 'none' }}
          value={propsVal}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            onChange(event.target.value);
          }}
          className={`h-full w-full rounded-xl border-2 bg-recipeGray-light px-3 py-2 focus:outline-none ${
            errorMode
              ? 'border-red-700 bg-red-300 text-red-600'
              : 'textarea-dark-placeholder border-recipeBrown-dark'
          } `}
          placeholder={placeHolder}
        />
      </div>
    </form>
  );
};

export default Textbox;
