import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
    devtools(
        (set) => ({
            user: {},
            status: 'checking',
        
            setLogin: (user) => {
                set(() => ({ user, status: 'authenticated' }), false, 'setLogin')
            },
            setLogout: () => {
                set(() => ({ user: {}, status: 'not-authenticated' }), false, 'setLogout')
            }
        })
    )
)