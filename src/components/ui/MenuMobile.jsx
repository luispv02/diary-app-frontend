import { useState } from "react";
import { FaPlus, FaRegUser } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { NavLink, useLocation } from "react-router";
import { useAuthStore } from "../../stores/useAuthStore";

export const MenuMobile = () => {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setLogout = useAuthStore((state) => state.setLogout)
  const user = useAuthStore((state) => state.user)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setLogout()
    localStorage.removeItem('token');
  }

  return (
    <>
      <button onClick={toggleMenu} className="cursor-pointer">
        <div className={`${isMenuOpen ? "hidden" : "block"}`}>
          <LuMenu size={25} />
        </div>

        <div className={`${isMenuOpen ? "block" : "hidden"}`}>
          <IoMdClose size={25} />
        </div>
      </button>

      <div
        className={`absolute right-0 w-48 bg-white rounded-md ring ring-gray-300 shadow-md transition-all duration-200 ease-in-out transform origin-top-right ${ isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none" }`}
      >
        <div>
          { 
            !pathname.startsWith("/notes") && 
            <NavLink
              to="/notes/new"
              className="flex items-center px-4 py-2 text-white text-sm bg-blue-500 hover:bg-blue-700 transition-colors duration-150 gap-3 rounded-t-md rounded-rmd"
            >
              <FaPlus />
              Nueva Nota
            </NavLink> 
          }
          

          <div>
            <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150 gap-3">
              <FaRegUser />
              { user?.name }
            </div>

            <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-100 transition-colors duration-150 gap-3 cursor-pointer border-t border-red-200">
              <LuLogOut />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
