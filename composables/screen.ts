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
  
  // const draw_mark = (
  //   { top, left } : { top: number, left : number }
  //   , text : string
  //   , fixed : boolean
  // ) => {
  //   const div = document.createElement ( 'div' )
  //   div.id = 'custom_marker'
  //   div.style.overflow = 'visible'
  //   div.style.height = '2px'
  //   div.style.width = '20px'
  //   div.style.background = 'red'
  //   div.style.position = fixed ? 'fixed' : 'absolute'
  //   div.style.top = top ? `${ top }px` : '50%'
  //   div.style.left = left ? `${ left }px` : '50%'
  //   div.innerText = text
  //   const nuxt_el = document.querySelector ( '#__nuxt' )
  //   nuxt_el?.appendChild ( div )
  // }

  return {
    get_top,
    get_left,
    get_element_screen_props,
  }
}