import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeOption = 'velvet' |'dark'| 'light';

interface ThemeStore {
  theme: ThemeOption;
  setTheme: (theme: ThemeOption) => void;
}

const applyTheme = (theme: ThemeOption) => {
  const root = document.documentElement;
  
  // Remove all theme classes
  root.classList.remove('dark', 'velvet', 'light');
  
  // Apply the selected theme
  // if (theme !== 'light') {
    root.classList.add(theme);
  // }  
};

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'velvet' as ThemeOption,
      
      setTheme: (theme) => {
  if (theme !== 'velvet' && theme !== 'dark' && theme !== 'light') {
    theme = 'velvet';
  }
  set({ theme });
  applyTheme(theme);
},
    }),
    {
      name: 'VELOUR-theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme on rehydration
        if (state?.theme === 'velvet' || state?.theme === 'dark' || state?.theme === 'light') {
  applyTheme(state.theme);
} else {
  applyTheme('velvet');
}
      },
    }
  )
);