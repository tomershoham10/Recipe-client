'use client';
import { useState, useEffect, useRef } from 'react';
import useClickOutside from '@/app/utils/hooks/useClickOutside';
import { FaChevronDown } from 'react-icons/fa';

export enum DropdownSizes {
  SMALL = 'small',
  DEFAULT = 'default',
  LARGE = 'large',
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const {
    isSearchable,
    placeholder,
    items,
    value,
    onChange,
    className,
    isFailed,
    isDisabled,
    size,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value?.toString() || ''
  );
  const [dropdownItems, setDropdownItems] = useState<string[]>(items);
  //   const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [searchFailed, setSearchFailed] = useState<boolean>(
    isFailed ? isFailed : false
  );

  let maxHight: string = '';

  switch (size) {
    case DropdownSizes.SMALL:
      maxHight = 'h-[5rem]';
      break;
    case DropdownSizes.DEFAULT:
      maxHight = 'h-[10rem]';
      break;
    case DropdownSizes.LARGE:
      maxHight = 'h-[15rem]';
      break;
  }

  useEffect(() => {
    setSelectedValue(value?.toString());
  }, [value]);

  useEffect(() => {
    if (isOpen && searchRef && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchRef]);

  useEffect(() => {
    const originalItems = items;

    if (selectedValue) {
      const filteredItems = originalItems.filter((item) =>
        item
          .toLocaleLowerCase()
          .includes(selectedValue.toString().toLocaleLowerCase())
      );
      filteredItems.length === 0
        ? setSearchFailed(true)
        : setSearchFailed(false);
    } else {
      setSearchFailed(false);
    }
  }, [items, selectedValue]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const originalItems = items;
    setSelectedValue(event.target.value);

    const filteredItems: string[] = originalItems.filter((item) =>
      item.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    );
    setDropdownItems(filteredItems);
  };

  const handleItemClick = (item: string) => {
    setSelectedValue(item);
    onChange(item);
    setSearchFailed(false);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${className} w-full`}>
      <div
        className={`flex h-10 w-full items-center justify-between rounded-xl border-2 bg-recipeGray-light font-bold uppercase md:h-12 lg:h-14 ${
          isDisabled
            ? 'cursor-default border-recipeGray-darker p-3 opacity-50'
            : searchFailed
              ? 'cursor-pointer border-red-700 bg-red-300 p-3 text-red-600'
              : isSearchable && isOpen
                ? 'cursor-pointer border-recipeGray-darker px-3'
                : 'cursor-pointer border-recipeGray-darker p-3'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <div className='mx-2 flex h-full items-center justify-start text-sm md:text-base lg:text-lg'>
          {isSearchable && isOpen ? (
            <input
              type='text'
              value={selectedValue}
              onChange={handleSearch}
              ref={searchRef}
              className={`h-full w-[100%] bg-transparent text-sm focus:outline-none md:text-base lg:text-lg ${
                searchFailed ? '' : ''
              }`}
            />
          ) : (
            <span className={` ${searchFailed ? 'normal-case' : 'uppercase'}`}>
              {selectedValue || placeholder}
            </span>
          )}
        </div>
        <FaChevronDown />
      </div>
      {isOpen && !isDisabled && (
        <ul
          className={`absolute z-50 flex flex-col items-start justify-start ${maxHight} mt-2 w-full overflow-auto rounded-xl border-2 border-recipeGray-darker font-bold uppercase`}
        >
          {dropdownItems && dropdownItems.length > 0 ? (
            dropdownItems.map((item, index) => (
              <li
                key={index}
                className={`hover:recipeGray-dark w-full cursor-pointer bg-recipeGray-light p-2 ${
                  index === 0
                    ? 'rounded-t-md'
                    : index === dropdownItems.length - 1
                      ? 'rounded-b-md'
                      : ''
                } `}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <div className='w-full cursor-pointer rounded-t-md bg-recipeGray-light p-2 hover:bg-recipeGray-dark'>
              Not found.
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
