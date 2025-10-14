import { FaRegImage } from "react-icons/fa";
import { ImageCarouselModal } from "../ui/ImageCarouselModal";
import { useModalStore } from "../../stores/useModalStore";

export const ImageGallery = ({ images }) => {

  const isModalGalleryOpen = useModalStore((state) => state.isModalGalleryOpen);
  const openModalGallery = useModalStore((state) => state.openModalGallery);


  const showModalImage = (index) => {
    const dataImages = {
      images,
      selectedImgIndex: index
    }
    openModalGallery(dataImages)
  }

  return (
    <>
      {
        images.length > 0 &&
        <div>
          <div className="flex items-center gap-2 mb-4">
            <FaRegImage className="text-gray-600" size={20} />
            <h2 className="text-xl font-semibold text-gray-800">
              Imágenes ({images.length})
            </h2>
          </div>
        
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                onClick={() => showModalImage(index)}
                className="relative group rounded-lg overflow-hidden border border-gray-200 cursor-pointer transition duration-200 hover:scale-104"
              >
                <img
                  src={image}
                  alt="imagen  de la nota"
                  className="w-full h-38 md:h-50 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      }
      
      {
        isModalGalleryOpen && <ImageCarouselModal />
      }
    </>
  );
};
