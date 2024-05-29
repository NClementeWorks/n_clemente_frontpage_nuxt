import { useElementBounding, useWindowScroll } from '@vueuse/core'

export const useScreen = () => {

  function get_top ( el : HTMLElement | null ) : any {
    return el?.offsetParent
      ? el?.offsetTop + get_top ( el?.offsetParent as HTMLElement )
      : el?.offsetTop
  }
  
  function get_left ( el : HTMLElement | null ) : any {
    return el?.offsetParent
      ? el?.offsetLeft + get_left ( el?.offsetParent as HTMLElement )
      : el?.offsetLeft
  }

  /**
   * function to clear any watchers created by on_screen_ready
   * should be called inside BeforeUnmount on the same component as on_screen_ready was called
   */
  let clear_on_screen_ready_watcher : any
  
  //
  // VueUse window scroll position
  //
  const {
    x: scroll_x,
    y: scroll_y,
  } = useWindowScroll ()

  let screen_scrolled_x = false
  let screen_scrolled_y = false

  /**
   * 
   * @param el 
   * @returns 
   */
  function get_element_screen_props ( el : Ref<HTMLElement | null> | HTMLElement ) : ElementScreenProperties {

    //
    // VueUse element bounding box
    //
    const {
      top,
      left,
      width,
      height,
    } = useElementBounding ( el )
    

    //
    //  calculate absolute x position
    //
    const x = ref ( left.value || 0 )
    watch ( [
      scroll_x,
      left,
    ], ( value, old_value ) => {
      //
      // do not update the value for scroll events
      if ( screen_scrolled_x ) return
      else screen_scrolled_x = value[0] - old_value[0] !== 0
      
      x.value = left.value + scroll_x.value
    })

    //
    //  calculate absolute y position
    //
    const y = ref ( top.value || 0 )
    watch ( [
      scroll_y,
      top
    ], ( value, old_value ) => {
      //
      // do not update the value for scroll events
      if ( screen_scrolled_y ) return
      else screen_scrolled_y = value[0] - old_value[0] !== 0

      y.value = top.value + scroll_y.value
    })

    return {
      x,
      y,
      top,
      left,
      width,
      height,
    }
  }
  

  return {
    get_top,
    get_left,
    clear_on_screen_ready_watcher,
    get_element_screen_props,
  }
}