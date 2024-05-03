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
   * 
   * @param callback 
   */
  function on_screen_ready ( callback : Function ) : void {
    //
    // use Vuetify display composable
    //
    const display = useDisplay ()

    //
    // setup watcher clearing function
    //
    let unwatch_screen_width : Function | null = null
    const clear_watcher = () => unwatch_screen_width && unwatch_screen_width ()
    
    //
    // wait for mounting process and screen dimensions set to call callback
    //
    onMounted ( async () => {

      await nextTick ()

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
        clear_watcher ()
        
      })
  
    })
  
    /**
     * clear watcher on unmount
     */
    onBeforeUnmount ( () => {
      clear_watcher ()
    })
  }
  
  /**
   * 
   * @param el 
   * @returns 
   */
  function get_element_screen_props ( el : HTMLElement ) : ElementScreenProperties {

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
    const x = ref ( 0 )
    on_screen_ready ( () => {
      x.value = top.value + scroll_x.value 
    })

    //
    //  calculate absolute y position
    //
    const y = ref ( 0 )
    on_screen_ready ( () => {
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
    get_element_screen_props,
  }
}