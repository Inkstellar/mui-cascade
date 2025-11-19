import type { ButtonProps } from './components/Button/Button';
import type { CardProps } from './components/Card/Card';
import type { InputProps } from './components/Input/Input';
import type { ModalProps } from './components/Modal/Modal';

// Core Components
export { Button as default } from './components/Button/Button';
export type { ButtonProps } from './components/Button/Button';
export { Card as CardComp, CardHeader, CardContent, CardActions } from './components/Card/Card';
export type { CardProps } from './components/Card/Card';
export { Input } from './components/Input/Input';
export type { InputProps } from './components/Input/Input';
export { Modal } from './components/Modal/Modal';
export type { ModalProps } from './components/Modal/Modal';

// Theme
export { createCustomTheme, themeOptions, darkThemeOptions } from './theme/theme';
