import { create } from "zustand";
import { devtools } from "zustand/middleware";



export const useNoteStore = create(
    devtools(
        (set) => ({
            selectedNote: {},
            loading: false,

            setSelectedNote: (note) => set({ selectedNote: note }, false, 'setSelectedNote'),
            setLoading: (value) => set({ loading: value }, false, 'setLoading')
        })
    )
)