import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useModalStore = create(
    devtools(
        (set) => ({
            isModalOpen: false,
            modalData: null,
            isModalGalleryOpen: false,
            
            
            openModal: (data) => set({ isModalOpen: true, modalData: data }, false, 'openModal'),
            closeModal: () => set({ isModalOpen: false, modalData: null }, false, 'closeModal'),

            openModalGallery: (data) => set({ isModalGalleryOpen: true, modalData: data }, false, 'openModalGallery'),
            closeModalGallery: () => set({ isModalGalleryOpen: false, modalData: null }, false, 'closeModalGallery'),
        })
    )
)
  

