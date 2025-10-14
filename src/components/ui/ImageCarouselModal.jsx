import { IoClose } from "react-icons/io5";
import { useModalStore } from "../../stores/useModalStore";
import { useEffect, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

export const ImageCarouselModal = () => {

    const closeModalGallery = useModalStore(state => state.closeModalGallery)
    const isModalGalleryOpen = useModalStore((state) => state.isModalGalleryOpen);
    const modalData = useModalStore((state) => state.modalData);
    const [showAnimationOpenModal, setShowAnimationOpenModal] = useState(false)

    const images = modalData.images;
    const [currentIndex, setCurrentIndex] = useState(modalData?.selectedImgIndex || 0);
    const [animationChangeImg, setAnimationChangeImg] = useState(false);

    useEffect(() => {
        if (isModalGalleryOpen) {
            setShowAnimationOpenModal(true)
        }
    }, [isModalGalleryOpen])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal()
        }
    }

    const handleCloseModal = () => {
        setShowAnimationOpenModal(false)
        setTimeout(() => {
            closeModalGallery()
        }, 200)
    }

    const prevImage = () => {
        setAnimationChangeImg(true);
        setTimeout(() => {
            setCurrentIndex((prev) => prev === 0 ? images.length - 1 : prev - 1);
            setAnimationChangeImg(false);
        }, 200);
    };

    const nextImage = () => {
        setAnimationChangeImg(true);
        setTimeout(() => {
            setCurrentIndex((prev) => prev === images.length - 1 ? 0 : prev + 1)
            setAnimationChangeImg(false);
        }, 200);
    };

    return (
        <div className={`bg-black/60 w-full h-full fixed top-0 left-0 flex justify-center items-center transition duration-400 px-6 ${showAnimationOpenModal ? 'opacity-100' : 'opacity-0'}`} onClick={handleOverlayClick}>

            <div className="w-110 relative">
                <button className="absolute right-3 top-3 cursor-pointer bg-white rounded-full shadow-xl ring ring-slate-400 z-10" onClick={handleCloseModal}>
                    <IoClose size={18}/>
                </button>
            
                <div className="rounded-2xl">
                    <div className="relative">
                        <img
                            src={images[currentIndex]}
                            alt={`imagen ${currentIndex + 1}`}
                            loading="lazy"
                            className={`w-full rounded-lg transition-opacity duration-400 border-3 border-slate-300 ${animationChangeImg ? "opacity-0" : "opacity-100"}`}
                        />

                        {
                            images.length > 1 &&
                           <>
                            <button onClick={prevImage} className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer bg-white p-2 rounded-full shadow-xl ring ring-slate-400 hover:bg-gray-200 transition">
                                    <MdArrowBackIosNew />
                                </button>

                                <button onClick={nextImage} className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer bg-white p-2 shadow shadow-amber-600 rounded-full ring ring-slate-400 hover:bg-gray-200 transition">
                                    <MdArrowForwardIos />
                                </button>
                           </>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};