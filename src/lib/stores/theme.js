import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Create a writable store with initial value
const createThemeStore = () => {
  const { subscribe, set, update } = writable('light');
  
  return {
    subscribe,
    toggle: () => update(theme => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      if (browser) {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      }
      return newTheme;
    }),
    set: (theme) => {
      if (browser) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }
      set(theme);
    },
    init: () => {
      if (browser) {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
        set(theme);
      }
    }
  };
};

export const theme = createThemeStore();