"use client";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import useClickOutside from "@/app/utils/hooks/useClickOutside";

export enum DropdownSizes {
  SMALL = "small",
  DEFAULT = "default",
  LARGE = "large",
}

const Dropdown: React.FC<DropdownProps> = (props: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [maxHight, setMaxHight] = useState<string>(props.size);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    props.value?.toString() || ""
  );
  const [dropdownItems, setDropdownItems] = useState<string[]>(props.items);
  //   const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const searchRef = useRef<HTMLInputElement | null>(null);

  const [isFailed, setIsFailed] = useState<boolean>(
    props.isFailed ? props.isFailed : false
  );

  useEffect(() => {
    setSelectedValue(props.value?.toString());
  }, [props.value]);

  useEffect(() => {
    if (isOpen && searchRef && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isOpen, searchRef]);

  useEffect(() => {
    const originalItems = props.items;

    if (selectedValue) {
      const filteredItems = originalItems.filter((item) =>
        item
          .toLocaleLowerCase()
          .includes(selectedValue.toString().toLocaleLowerCase())
      );
      filteredItems.length === 0 ? setIsFailed(true) : setIsFailed(false);
    } else {
      setIsFailed(false);
    }
  }, [props.items, selectedValue]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const originalItems = props.items;
    setSelectedValue(event.target.value);

    const filteredItems: string[] = originalItems.filter((item) =>
      item.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    );
    setDropdownItems(filteredItems);
  };

  const handleItemClick = (item: string) => {
    setSelectedValue(item);
    props.onChange && props.onChange(item);
    setIsFailed(false);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={`relative ${props.className} w-full`}>
      <div
        className={`flex h-10 w-full items-center justify-between rounded-xl border-2 font-bold uppercase md:h-12 lg:h-14
   ${
     props.isDisabled
       ? "cursor-default border-recipeGray-darker p-3 opacity-50"
       : isFailed
       ? "cursor-pointer border-red-700 bg-red-300 p-3 text-red-600"
       : props.isSearchable && isOpen
       ? "cursor-pointer border-recipeGray-darker px-3"
       : "cursor-pointer border-recipeGray-darker p-3"
   }`}
        onClick={() => setIsOpen(true)}
      >
        <div className="mx-2 flex h-full items-center justify-start text-sm md:text-base lg:text-lg">
          {props.isSearchable && isOpen ? (
            <input
              type="text"
              value={selectedValue}
              onChange={handleSearch}
              ref={searchRef}
              className={`h-full w-[100%] bg-transparent text-sm focus:outline-none md:text-base lg:text-lg ${
                isFailed ? "" : ""
              }`}
            />
          ) : (
            <span className={` ${isFailed ? "normal-case" : "uppercase"}`}>
              {selectedValue || props.placeholder}
            </span>
          )}
        </div>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${isFailed ? "" : ""}`}
        />
      </div>
      {isOpen && !props.isDisabled && (
        <ul
          className={`absolute z-50 flex flex-col items-start justify-start ${maxHight} mt-2 w-full overflow-auto rounded-xl border-2 border-recipeGray-darker font-bold uppercase`}
        >
          {dropdownItems.length > 0 ? (
            dropdownItems.map((item, index) => (
              <li
                key={index}
                className={`w-full cursor-pointer bg-white p-2 hover:recipeGray-light
                  ${
                    index === 0
                      ? "rounded-t-md"
                      : index === dropdownItems.length - 1
                      ? "rounded-b-md"
                      : ""
                  }  `}
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <div className="w-full cursor-pointer rounded-t-md p-2 bg-white hover:bg-recipeGray-light">
              Not found.
            </div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
