import { darkTheme } from './dark.theme';
import { lightTheme } from './light.theme';
import type { Theme, ThemeId } from './types';

export type { ColorTokens, Theme, ThemeId } from './types';
export { darkTheme, lightTheme };

export const themes: Record<ThemeId, Theme> = {
  light: lightTheme,
  dark: darkTheme,
};

export function applyThemeClass(themeId: ThemeId): void {
  document.documentElement.classList.toggle('dark', themeId === 'dark');
}

export function getTheme(id: ThemeId): Theme {
  return themes[id];
}
