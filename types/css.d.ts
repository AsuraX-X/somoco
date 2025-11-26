// Type declarations for importing CSS/SCSS files in TypeScript
// Allows both side-effect imports (e.g., import './globals.css')
// and CSS Modules (e.g., import styles from './styles.module.css').

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.css" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.sass" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.module.sass" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css?global";
