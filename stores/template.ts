import { Value } from 'sass'
import { watch } from 'vue'

export interface TemplateElement {
  el: Ref<HTMLElement>,
  props: ElementScreenProperties,
}

export const useTemplateStore = defineStore ( 'template', () => {

  const screen = useScreen ()

  //
  // store html/ref elements
  //
  const template_elements = ref<any> ( {} )
  const home_elements = ref<any> ( {
    stack_items: null,
    stack_first_icon: null,
    cta_section: null,
    use_case_imgs: null,
    top_skills_flower: null,
    top_skills_first_icon: null,
  } )

  /**
   * Add element to template refs map and create screen properties references
   * @param key map key
   * @param el HTML element
   */
  function add_element ( key : string, el : Ref<HTMLElement | null> ) : void {
    template_elements.value [ key ] = {
      el,
      props: screen.get_element_screen_props ( el )
    }
    
    if ( home_elements.value [ key ] !== undefined )
      home_elements.value [ key ] = el
  }

  function add_elements ( key : string, el_arr : Ref<HTMLElement[]> ) : void {
    watch ( () => el_arr?.value?.length, () => {
      template_elements.value [ key ] = el_arr?.value.map ( ( el : HTMLElement ) => ({
        el,
        props: screen.get_element_screen_props ( el )
      }))
      
      if ( home_elements.value [ key ] !== undefined )
        home_elements.value [ key ] = el_arr
    })
  }

  /**
   * Retrieve element with screen properties information
   * @param key map key
   * @returns object containing the HTML element and the screen properties
   */
  function get_element ( key : string ) : TemplateElement | TemplateElement[] {
    return template_elements.value [ key ]
  }

  /**
   * Clear out elemnt and properties from the template refs map
   * @param key map key
   */
  function clear_element ( key : string ) : void {
    template_elements.value [ key ] = null
  }

  const hexagon_paths = ref<SVGElement[]> ([])
  const cta_hexagon_paths = ref<SVGElement[]> ([])

  const elements_ready = ref ( false )

  watch ( home_elements, 
    () => {
      elements_ready.value = Object.entries(home_elements.value).every ( ([ key, element ] : [ string, any ]) => !!element?.length || !!element)
    }, {
    deep: true,
  })

  return {
    add_element,
    add_elements,
    get_element,
    clear_element,
    hexagon_paths,
    cta_hexagon_paths,

    template_elements,

    elements_ready,
  }
})