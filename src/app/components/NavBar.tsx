"use client";

import { BiSearchAlt, BiHomeAlt2 } from "react-icons/bi";

import Link from "next/link";
import { useState } from "react";

const NavBar = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const searchClick = () => {
    setIsClicked(!isClicked);
    console.log(isClicked);
  };
  return (
    <nav className="bg-[#98AB85] pl-2 pr-2 flex justify-start items-center text-white h-16 max-h-16">
      <Link href={"/"} className="nav-items">
        <BiHomeAlt2 />
      </Link>

      <div
        className={`${
          !isClicked
            ? "flex justify-start items-center rounded-md transition-all ease-out bg-transparent duration-700"
            : "flex justify-start items-center pt-2 pr-2 pb-2 rounded-md bg-white transition-all ease-in-out duration-700"
        }`}
      >
        <input
          type="text"
          className={`${
            !isClicked
              ? "invisible bg-transparent max-w-none w-0 transition-all ease-in duration-500 outline-none"
              : "w-24 bg-transparent text-[#5A4A42] transition-all ease-in-out duration-700 outline-none"
          }`}
        />
        <button
          className={`${
            !isClicked ? "hover:delay-300 nav-items" : "search-button"
          }`}
          onClick={() => searchClick()}
        >
          <BiSearchAlt />
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
