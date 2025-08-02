import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: "fantasy",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "fantasy" ? "dark" : "fantasy",
    })),
}));
