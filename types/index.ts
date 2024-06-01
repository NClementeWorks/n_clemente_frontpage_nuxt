export { };

declare global {

  type ElementScreenProperties = {
    top : number,
    left : number,
    width : number,
    height : number,
  }

  interface TemplateElement {
    el: Ref<HTMLElement>,
    props: ElementScreenProperties,
  }
  
}