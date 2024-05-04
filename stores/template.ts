import { watch } from 'vue'

export const useTemplateStore = defineStore ( 'template', () => {

  const screen = useScreen ()

  //
  // store html/ref elements
  //
  const template_elements = ref ( {} )

  /**
   * Add element to template refs map and create screen properties references
   * @param key map key
   * @param el HTML element
   */
  function add_element ( key : string, el : HTMLElement ) : void {
    template_elements.value [ key ] = {
      el,
      props: screen.get_element_screen_props ( el )
    }
  }

  function add_elements ( key : string, el_arr : Ref<Array<HTMLElement>> ) : void {
    watch ( () => el_arr?.value?.length, () => {
      template_elements.value [ key ] = el_arr?.value.map ( ( el : HTMLElement ) => ({
        el,
        props: screen.get_element_screen_props ( el )
      }))
    })
  }

  /**
   * Retrieve element with screen properties information
   * @param key map key
   * @returns object containing the HTML element and the screen properties
   */
  function get_element ( key : string ) : {
    el: HTMLElement,
    props: ElementScreenProperties,
  } {
    return template_elements.value [ key ]
  }

  /**
   * Clear out elemnt and properties from the template refs map
   * @param key map key
   */
  function clear_element ( key : string ) : void {
    template_elements.value [ key ] = null
  }

  return {
    add_element,
    add_elements,
    get_element,
    clear_element,
  }
})