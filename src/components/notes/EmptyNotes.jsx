import { GrNotes } from "react-icons/gr";
import { NavLink } from "react-router";

export const EmptyNotes = () => {
  return (
    <div className="text-center py-12 px-2 bg-white rounded-2xl shadow-lg max-w-2xl mx-auto transform transition-all duration-500 hover:scale-105">
      <div className="text-6xl mb-4 animate-bounce flex justify-center">
        <GrNotes />
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-2">
        No tienes notas aún
      </h3>

      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        ¡Crea tu primera nota para comenzar tu diario!
      </p>
      
      <NavLink
        to="/notes/new"
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-lg"
      >
        Crear primera nota
      </NavLink>
    </div>
  );
};
