import { Outlet, useLocation, useNavigate, useParams } from "react-router";
import { HomeHeader } from "../components/layouts/HomeHeader";
import { NotesHeader } from "../components/layouts/NotesHeader";

export const NotesLayout = () => {
  const { pathname } = useLocation();

  let title = "";

  if(pathname.includes("/notes/new")){
    title = "Nueva nota";
  }else if(pathname.includes("/notes/edit")){
    title = "Editar nota";
  }else if(pathname.includes("/notes/view")){
    title = "Detalles";
  }

  return (
    <div className="bg-blue-200">
      <div className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6">
          {pathname.startsWith("/notes") 
          ? ( <NotesHeader title={title} />) 
          : ( <HomeHeader /> )}
        </div>
      </div>

      <div className="min-h-screen max-w-5xl mx-auto py-6 px-6 ">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
