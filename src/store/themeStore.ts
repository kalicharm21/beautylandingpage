import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeOption = 'velvet' | 'nightlight' | 'dark' | 'light';

interface ThemeStore {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const applyTheme = (theme: ThemeOption) => {
  const root = document.documentElement;
  
  // Remove all theme classes
  root.classList.remove('dark', 'nightlight', 'velvet', 'light');
  
  // Apply the selected theme
  if (theme !== 'light') {
    root.classList.add(theme);
  }
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'velvet' as ThemeOption,
      
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
    }),
    {
      name: 'VELOUR-theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on rehydration
        if (state?.theme) {
          applyTheme(state.theme);
        }
      },
    }
  )
);