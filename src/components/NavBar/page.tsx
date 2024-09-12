"use client";

import { useState } from "react";
import Link from "next/link";

import { BiSearchAlt, BiHomeAlt2 } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";

import { PopupsTypes, usePopupStore } from "@/app/store/stores/usePopupStore";

const NavBar: React.FC = () => {
  const [isSearchClicked, setIsSearchClicked] = useState<boolean>(false);
  const searchClick = () => {
    setIsSearchClicked(!isSearchClicked);
    console.log(isSearchClicked);
  };

  const updateSelectedPopup = usePopupStore.getState().updateSelectedPopup;

  return (
    <nav className="bg-recipeGreen-default px-5 flex flex-row gap-5 justify-start items-center text-recipeGray-lightest h-16 max-h-16">
      <Link href={"/"} className="nav-items">
        <BiHomeAlt2 />
      </Link>

      <div
        className={`${
          !isSearchClicked
            ? "flex justify-start items-center rounded-md transition-all ease-out bg-transparent duration-500"
            : "flex justify-start items-center pt-2 pr-2 pb-2 rounded-md bg-white transition-all ease-in-out duration-700"
        }`}
      >
        <input
          type="text"
          className={`${
            !isSearchClicked
              ? "invisible bg-transparent max-w-none w-0 transition-all ease-in duration-700 outline-none"
              : "w-24 bg-transparent text-recipeGray-dark transition-all ease-in-out duration-700 outline-none"
          }`}
        />
        <button
          className={`${!isSearchClicked ? "nav-items" : "search-button"}`}
          onClick={() => {
            searchClick();
          }}
        >
          <BiSearchAlt />
        </button>
      </div>

      <div className="relative group">
        <Link
          href={"/he/create-recipe"}
          className="rounded-md p-1 w-10 mx-auto flex justify-center text-2xl	items-center group-hover:shadow-md group-hover:scale-125 group-hover:bg-[#C0272D] transition-all ease-in-out duration-300"
        >
          <FaPlus />
        </Link>
        <ul className="hidden w-[10rem] group-hover:block absolute bg-[#C0272D] inset-x-0 top-[2.5rem] text-center text-white rounded-md">
          <li>create recipe</li>
          <li onClick={() => updateSelectedPopup(PopupsTypes.NEW_INGREDIENT)}>
            create ingredient
          </li>
          <li>create ingredient</li>
        </ul>
      </div>

      <Link href={"/he/management"} className="nav-items">
      <IoMdSettings />
      </Link>
    </nav>
  );
};

export default NavBar;
