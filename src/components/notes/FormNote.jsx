import { NoteImagesUploader } from "./NoteImagesUploader";
import { NoteEmojisSelector } from "./NoteEmojisSelector";
import { Loading } from "../ui/Loading";
import { useNoteStore } from "../../stores/useNoteStore";

export const FormNote = ({ onSubmit, formNote }) => {
  
  const { userData, handleInputChange, errors } = formNote;
  const loading = useNoteStore((state) => state.loading)

  console.log(formNote)

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4"
    >
      {/* Title */}
      <div className="flex items-end gap-3">
        <div className="w-full">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Título de la nota
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Titulo de la nota"
            value={userData.title}
            onChange={handleInputChange}
            className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y ${
              errors.title ? "border-red-500" : ""
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
      </div>

      {/* Emojis  */}
      <NoteEmojisSelector formNote={formNote} />

      {/* Date */}
      <div className="flex flex-col md:flex-row md:items-end  gap-3">
        <div className="w-full md:w-50">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Fecha
          </label>

          <input
            id="date"
            type="date"
            name="date"
            value={userData.date ? userData.date.split('T')[0] : ''}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Content */}
      <div>
        <label
          htmlFor="content"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Contenido de la nota
        </label>

        <textarea
          id="content"
          name="content"
          rows={10}
          placeholder="Escribe el contenido de tu nota"
          value={userData.content}
          onChange={handleInputChange}
          className={`w-full border border-gray-300 rounded-md px-3 py-2 focus:border-transparent focus:outline-none focus:ring-1 focus:ring-blue-400 resize-y ${
            errors.content ? "border-red-500" : ""
          }`}
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content}</p>
        )}
      </div>

      {/* Images */}
      <NoteImagesUploader formNote={formNote} />

      {/* Btn save note */}
      {
        loading 
        ? <Loading />
        :<div className="flex justify-start pt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 outline-0 cursor-pointer"
          >
          Guardar Nota
          </button>
        </div>
      }

      
    </form>
  );
};
