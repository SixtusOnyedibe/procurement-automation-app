import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  username: string;
  email: string;
}

interface userStore {
  user: User | null;
  setUser: (value: User | null) => void;
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

export default userStore;
