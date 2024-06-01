import { useElementBounding, useWindowScroll } from '@vueuse/core'

export const useScreen = () => {

  /**
   * 
   * @param el 
   * @returns 
   */
  function get_element_screen_props ( el : Ref<HTMLElement | null> | HTMLElement ) : {
    top : Ref<number>,
    left : Ref<number>,
    width : Ref<number>,
    height : Ref<number>,
  } {

    //
    // VueUse element bounding box
    //
    const {
      top,
      left,
      width,
      height,
    } = useElementBounding ( el )
    
    return {
      top,
      left,
      width,
      height,
    }
  }
  
  return {
    get_element_screen_props,
  }
}