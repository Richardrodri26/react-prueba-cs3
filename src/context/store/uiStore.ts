import { create } from 'zustand'

interface IUi {
    darkMode: boolean
    setDarkModeOn: () => void;
}

export const useStoreUi = create<IUi>((set) => ({
 darkMode: false,

 setDarkModeOn: () => {
    set((state) => ({
        darkMode: !state.darkMode
    }))
  },
  

}))