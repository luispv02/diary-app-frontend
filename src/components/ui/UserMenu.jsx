import { FaRegUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { useAuthStore } from "../../stores/useAuthStore";

export const UserMenu = () => {

  const setLogout = useAuthStore((state) => state.setLogout)
  const user = useAuthStore((state) => state.user)
  
  const handleLogout = () => {
    setLogout()
    localStorage.removeItem('token');
  }

  return (
    <div className="flex">
        <div className="flex items-center gap-2 font-medium  text-gray-700 mr-1 text-sm">
            <FaRegUser />
            { user?.name }
        </div>

        <button onClick={handleLogout} className="font-medium text-red-600 hover:text-red-700 hover:bg-red-100 rounded-md transition-colors duration-150 flex items-center cursor-pointer gap-1 text-sm px-2 py-1">
            Cerrar Sesión
            <LuLogOut />
        </button>
    </div>
  );
};