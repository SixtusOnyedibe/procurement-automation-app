import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  email: string;
}

interface userStore {
  user: User | null;
  setUser: (value: User | null) => void;
  accountComponentOpen: boolean;
  setAccountComponentOpen: (value: boolean) => void;
}

const userStore = create<userStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (value) => set(() => ({ user: value })),

      accountComponentOpen: false,
      setAccountComponentOpen: (value) =>
        set(() => ({ accountComponentOpen: value })),
    }),
    { name: 'procurement-user' }
  )
);

export default userStore;
