import { useRef } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import { MdOutlineFileUpload } from "react-icons/md";

export const NoteImagesUploader = ({ formNote }) => {

  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const newImages = [...files].map((file) => {
      return {
        file,
        url: URL.createObjectURL(file),
      };
    });
    
    formNote.setOptionalData((prev) => {
      return {
        ...prev,
        images: [...prev.images, ...newImages],
      };
    });
  };

  const onSelectFiles = (e) => {
    handleFiles(e.target.files || []);
    e.target.value = "";
  };

  const removeImage = (index) => {

    formNote.setOptionalData((prev) => {
      const imageToRemove = prev.images[index];
      const updatedImages = prev.images.filter((_, i) => i !== index)

      try{
        if(imageToRemove?.url?.startsWith("blob:")) {
          URL.revokeObjectURL(imageToRemove.url);
        }
      }catch (error) {
        console.log('Error revoke url', error)
      }
      
      return {
        ...prev,
        images: updatedImages
      };
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium text-gray-700">
          Imágenes ({formNote.optionalData.images.length}){" "}
        </div>
        <button
          type="button"
          className="flex items-center font-medium text-xs md:text-md gap-1 bg-gray-300 text-gray-600 py-1 px-2 rounded-md cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <MdOutlineFileUpload size={18} />
          Agregar imagenes
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={onSelectFiles}
            className="hidden"
          />
        </button>
      </div>

      {formNote.optionalData.images.length !== 0 
      ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {formNote.optionalData.images.map((img, id) => (
            <div
              key={id}
              className="relative group rounded-md overflow-hidden border border-gray-200"
            >
              <img
                src={img.url ? img.url : img}
                alt={`imagen-${id + 1}`}
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(id)}
                className="absolute top-1 right-1 bg-white/90 text-red-600 hover:bg-white rounded-full p-2 shadow-md transition cursor-pointer"
                aria-label="Eliminar imagen"
              >
                <FaTrashAlt size={14} />
              </button>
            </div>
          ))}
        </div>
      ) 
      : (
        <div
          className="border-2 flex flex-col items-center text-center border-dashed border-gray-300 rounded-md p-4 md:p-6  text-gray-500 mb-3 cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          <CiImageOn size={50} />
          <p className="text-sm md:text-md">
            Sube o agrega fotos para esta nota
          </p>
        </div>
      )}
    </>
  );
};
