import gsap from 'gsap'
import { useHexagons } from "#imports"
import { useScreen } from '#imports'

export const useAnimationsHexagonsStack = () => {

  const hexagon = useHexagons ()
  const screen = useScreen ()

  const tl_stack = gsap.timeline ({})

  function init_start ( document : Document ) : any {

    const expanded_stack_items_el = document.querySelector<HTMLElement> ( '#expanded_stack_items' )
    const expanded_stack_items_el_top = screen.get_top ( expanded_stack_items_el )
    const expanded_stack_items_el_left = screen.get_left ( expanded_stack_items_el )

    const expanded_stack_firts_item_el = document.querySelector<HTMLElement> ( '#expanded_stack_items .expanded_stack_item .v-icon' )

    const stack_start = {

      x: ( index : number ) =>
        expanded_stack_items_el_left
        - ( hexagon.default_width_px / 2 )
        + ( ( expanded_stack_firts_item_el?.offsetWidth || 0 ) / 2 )
        + hexagon.hexagon_grid_column_px ( index % 2 ),

      y: ( index : number ) =>
        expanded_stack_items_el_top
        + hexagon.hexagon_grid_row_px ( index ),

      scale: ( index : number ) => index >= 6 ? 0 : 1,

    } as any

    return stack_start
  }

  function init_timeline (
    hexagon_paths : Ref<SVGElement>,
    previous_state : any,
    new_state: any,
  ) : void {
    tl_stack
      .fromTo (
        hexagon_paths.value,
        previous_state,
        {
          ...hexagon.base_scroll_trigger ({
            trigger: '#the_expanded_stack',
            start: 'top center',
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