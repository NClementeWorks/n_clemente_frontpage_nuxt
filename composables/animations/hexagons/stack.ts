import { useTemplateStore } from '~/stores/template'
import { useWindowScroll } from '@vueuse/core'

export const useAnimationsHexagonsStack = ( gsap : any ) => {

  const hexagon = useHexagons ()
  const template = useTemplateStore ()
  const { y: scroll_y } = useWindowScroll ()

  function init_start () : any {
    
    const stack_items_props = ( template.get_element ( 'stack_items' ) as TemplateElement ).props
    const stack_first_icon_props = ( template.get_element ( 'stack_first_icon' ) as TemplateElement ).props
    const stack_top = stack_items_props.top + scroll_y.value

    const stack_start = {

      x: ( index : number ) =>
        stack_items_props.left
        - ( hexagon.default_width_px / 2 )
        + ( ( stack_first_icon_props.width || 0 ) / 2 )
        + hexagon.hexagon_grid_column_px ( index % 2 ),

      y: ( index : number ) => stack_top
        + hexagon.hexagon_grid_row_px ( index ),

      scale: ( index : number ) => index >= 6 ? 0 : 1,

    } as any
    
    return stack_start
  }

  function init_timeline (
    hexagon_paths : Ref<SVGElement[]>,
    previous_state : any,
    new_state: any,
  ) : void {

    const tl_stack = gsap.timeline ({})

    tl_stack
      .fromTo (
        hexagon_paths.value,
        previous_state,
        {
          ...hexagon.base_scroll_trigger ({
            trigger: '#the_expanded_stack',
            start: '-35% center',
            end: 'center center',
          }),
          ...new_state,
        },
      )
  }

  return {
    init_start,
    init_timeline,
  }
}