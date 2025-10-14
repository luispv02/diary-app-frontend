import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router";
import { UserMenu } from "../ui/UserMenu";
import { MenuMobile } from "../ui/MenuMobile";

export const NotesHeader = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="flex justify-between items-center h-14">
        <div className="flex gap-3 md:gap-6 font-medium">
          <button
            className="cursor-pointer hover:text-gray-600 transition-colors p-1 -m-1"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack size={24} />
          </button>
          {title}
        </div>

        <div className="hidden sm:flex md:items-center">
          <UserMenu />
        </div>

        <div className="sm:hidden relative">
          <MenuMobile />
        </div>
      </div>
    </header>
  );
};
