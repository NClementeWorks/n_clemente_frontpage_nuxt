import { useElementBounding, useWindowScroll } from '@vueuse/core'

export const useScreen = () => {

  //
  // use Vuetify display composable
  //
  const display = useDisplay ()

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
    // VueUse window scroll position
    //
    const {
      x: scroll_x,
      y: scroll_y,
    } = useWindowScroll ()

    //
    //  calculate absolute x position
    //
    const x = ref ( left.value || 0 )
    watch ( [
      scroll_x,
      left,
    ], () => {
      x.value = left.value + scroll_x.value
    })

    //
    //  calculate absolute y position
    //
    const y = ref ( top.value || 0 )
    watch ( [
      scroll_y,
      top
    ], () => {
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