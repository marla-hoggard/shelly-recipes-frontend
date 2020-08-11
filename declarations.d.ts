// Allows importing of scss modules in TS files
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}