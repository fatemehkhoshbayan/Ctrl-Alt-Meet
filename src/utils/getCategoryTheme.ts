type ColorTheme = {
  badge: string;
  border: string;
  titleHover: string;
  button: string;
};
const COLOR_THEMES = {
  primary: {
    badge: 'bg-primary text-on-primary',
    border: 'hover:border-primary/50',
    titleHover: 'group-hover:text-primary',
    button: 'bg-primary/10 text-primary hover:bg-primary hover:text-on-primary',
  },
  secondary: {
    badge: 'bg-secondary text-on-secondary',
    border: 'hover:border-secondary/50',
    titleHover: 'group-hover:text-secondary',
    button: 'bg-secondary/10 text-secondary hover:bg-secondary hover:text-on-secondary',
  },
  tertiary: {
    badge: 'bg-tertiary text-on-tertiary',
    border: 'hover:border-tertiary/50',
    titleHover: 'group-hover:text-tertiary',
    button: 'bg-tertiary/10 text-tertiary hover:bg-tertiary hover:text-on-tertiary',
  },
} satisfies Record<string, ColorTheme>;

const CATEGORY_THEME_MAP: Record<string, keyof typeof COLOR_THEMES> = {
  Frontend: 'tertiary',
  Backend: 'tertiary',
  Languages: 'primary',
  'Cloud & DevOps': 'primary',
  'AI & ML': 'secondary',
  'Open Source': 'secondary',
  Security: 'primary',
  Hackathon: 'primary',
  Conference: 'tertiary',
  Workshops: 'tertiary',
  'Women in Tech': 'secondary',
  Founders: 'primary',
};

export default function getCategoryTheme(category: string): ColorTheme {
  const key = CATEGORY_THEME_MAP[category] ?? 'tertiary';
  return COLOR_THEMES[key];
}
