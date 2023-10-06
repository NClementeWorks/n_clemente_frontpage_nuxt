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
  }
}