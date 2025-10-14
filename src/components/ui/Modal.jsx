import { IoClose } from "react-icons/io5";
import { useModalStore } from "../../stores/useModalStore";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

export const Modal = () => {
    const closeModal = useModalStore(state => state.closeModal)
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const modalData = useModalStore((state) => state.modalData);
    const [showAnimation, setShowAnimation] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(isModalOpen){
            setShowAnimation(true)    
            setIsLoading(false)
        } 

    }, [isModalOpen])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleCloseModal()
        }
    }

    const handleCloseModal = () => {
        setShowAnimation(false)
        
        return new Promise((resolve) => {
            setTimeout(() => {
                closeModal()
                resolve()
            }, 200)
        })
    }

    const handleActionClick = (btn) => {
        if(btn.loading){
            setIsLoading(true)
        }  
        btn.onClick(handleCloseModal)
    }

    return (
        <div className={`bg-black/60 w-full h-full fixed top-0 left-0 flex justify-center items-center transition duration-400 px-6 ${showAnimation ? 'opacity-100' : 'opacity-0' }`} onClick={handleOverlayClick}>
            <div className="w-100 bg-white p-10 relative rounded-md">
                <button className="absolute right-3 top-3 cursor-pointer" onClick={handleCloseModal}>
                    <IoClose size={25}/>
                </button>

                <div className="flex justify-center flex-col items-center text-center">
                
                    { modalData?.icon && <div> { modalData?.icon } </div> }

                    { modalData?.title && <h2 className="text-lg font-semibold mb-2">{ modalData?.title }</h2> }
                    { modalData?.message && <p className="mb-6 text-gray-700">{ modalData?.message }</p> }

                    {
                        isLoading 
                        ? <Loading />
                        : modalData?.buttons?.length > 0 && 
                            <div className="flex justify-end gap-8">
                                {
                                    modalData.buttons.map(btn => (
                                        <button
                                            key={btn.label}
                                            onClick={() => handleActionClick(btn)}
                                            className={`px-3 py-1 rounded cursor-pointer transition hover:scale-110 ${btn.class}`}
                                        >
                                            { btn.label }
                                        </button>
                                    ))
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    );
};