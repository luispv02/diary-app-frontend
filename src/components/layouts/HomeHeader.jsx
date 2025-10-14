import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { NavLink } from "react-router";
import { UserMenu } from "../ui/UserMenu";
import { MenuMobile } from "../ui/MenuMobile";

export const HomeHeader = () => {
  
  return (
    <header>
      <div className="flex justify-between items-center h-14">
        <div>
          <h2 className="text-xl font-bold text-gray-700">DiaryApp</h2>
        </div>

        <div className="hidden sm:flex items-center">
          <NavLink
            to="/notes/new"
            className="flex items-center gap-1 bg-blue-500 hover:bg-blue-700 transition-colors duration-150 text-white sm:py-1 sm:px-2 rounded-md sm:text-sm"
          >
            <FaPlus />
            Nueva Nota
          </NavLink>

          <div className="separator h-8 border border-gray-300 mx-4"></div>
          <UserMenu />
        </div>

        <div className="sm:hidden relative">
          <MenuMobile />
        </div>
      </div>
    </header>
  );
};
