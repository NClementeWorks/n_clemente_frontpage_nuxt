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
   * Needs to be called inside a lifecycle hook
   * @param callback 
   */
  async function on_screen_ready ( callback : Function ) : Promise<void> {

    //
    // setup watcher clearing function
    //
    let unwatch_screen_width : Function | null = null
    clear_on_screen_ready_watcher = () => unwatch_screen_width && unwatch_screen_width ()

    //
    // Initial positioning 
    //
    unwatch_screen_width = watch ( () => display.width.value, async () => {

      //
      // Call function
      //
      callback ()

      //
      // Clear current watcher
      //
      clear_on_screen_ready_watcher ()
      
    })

  }
  
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
    //  calculate absolute x and y positions
    //
    const x = ref ( 0 )
    const y = ref ( 0 )
    on_screen_ready ( () => {
      x.value = top.value + scroll_x.value 
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
    on_screen_ready,
    clear_on_screen_ready_watcher,
    get_element_screen_props,
  }
}