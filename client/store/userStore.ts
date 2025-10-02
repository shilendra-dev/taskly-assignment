import { create } from "zustand";

interface user {
    id: string;
    name: string;
    email: string;
}

interface userStore {
    user: user | null;
    setUser: (user: user | null) => void;
}

export const useUserStore = create<userStore>((set) => ({
    user: null,
    setUser: (user: user | null) => set({ user }),
}));
