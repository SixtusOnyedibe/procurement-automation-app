import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  email: string;
  customerid: number;
}

interface userStore {
  user: User | null;
  setUser: (value: User | null) => void;
}

interface MenuStore {
  accountComponentOpen: boolean;
  setAccountComponentOpen: (value: boolean) => void;

  burgerOpen: boolean;
  setBurgerOpen: (value: boolean) => void;
}

const userStore = create<userStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (value) => set(() => ({ user: value })),
    }),
    { name: 'procurement-user' }
  )
);

export const menuStore = create<MenuStore>()((set) => ({
  accountComponentOpen: false,
  setAccountComponentOpen: (value) =>
    set(() => ({ accountComponentOpen: value })),

  burgerOpen: false,
  setBurgerOpen: (value) => set(() => ({ burgerOpen: value })),
}));

export default userStore;
