import gsap from "gsap"
import { useTemplateStore } from "~/stores/template"

export const useAnimationsHexagonsCTA = () => {

  const template = useTemplateStore ()
  const hexagon = useHexagons ()

  const tl_cta = gsap.timeline ({})

  function calculate_config () : any {

    const cta_props = template.get_element ( 'cta_section' ).props

    const cta_center = cta_props.left
      + ( ( cta_props.width || 0 ) / 2 )
      - ( hexagon.default_width_px * 2 )

    const cta_start_y = ( index : number ) => cta_props.y
      - ( hexagon.default_height_px / 3 )
      + hexagon.hexagon_compressed_grid_row_px ( index % 2 )
      - ( index % 2 ? hexagon.hexagon_grid_gap_px : 0 )

    return {
      cta_center,
      cta_start_y,
    }
  }

  function init_start ( config : any ) : any {

    const cta_start = {

      x: ( index : number ) => config.cta_center
        + hexagon.hexagon_compressed_grid_column_px ( index ),

      y: config.cta_start_y,

      scale: 1,

    }

    return cta_start
  }
  
  function init_timeline (
    hexagon_paths : Ref<SVGElement>,
    previous_state : any,
    new_state: any,
  ) : void {
    tl_cta
      .fromTo (
        hexagon_paths.value,
        previous_state,
        {
          ...hexagon.base_scroll_trigger ({
            trigger: '#the_cta',
            start: 'bottom bottom',
            end: 'top center',
          }),
          ...new_state,
        },
      )
  }

  // cta sides hexagons
  function init_side_hexagons (
    cta_hexagon_paths : Ref<Array<HTMLElement>>,
    config : any,
  ) : any {

    const tl_cta_sides = gsap.timeline ({})

    const cta_hex_left_side = cta_hexagon_paths.value.filter ( ( h, i ) => i % 2 === 0 )
    const cta_hex_right_side = cta_hexagon_paths.value.filter ( ( h, i ) => i % 2 === 1 )

    const cta_right_side_start = {
      x: ( index : number ) => config.cta_center
        + hexagon.hexagon_compressed_grid_column_px ( index + 6 ),
      y: config.cta_start_y,
      scale: 0,
    }

    const cta_left_side_start = {
      x: ( index : number ) => config.cta_center
        - hexagon.hexagon_compressed_grid_column_px ( index ),
      y: config.cta_start_y,
      scale: 0,
    }

    const cta_sides_trigger = {
      ...hexagon.base_scroll_trigger ({
        trigger: '#the_cta',
        start: '-100% center',
        end: 'top center',
      }),
      scale: 1,
    }

    const cta_sides_trigger_reverse = {
      ...hexagon.base_scroll_trigger ({
        trigger: '#the_cta',
        start: 'top 25%',
        end: 'top top',
      }),
      scale: 0,
    }
    
    tl_cta_sides
      .set (
        cta_hex_right_side,
        cta_right_side_start,
      )
      .set (
        cta_hex_left_side,
        cta_left_side_start,
      )
      .fromTo (
        cta_hex_right_side,
        cta_right_side_start,
        cta_sides_trigger,
      )
      .fromTo (
        cta_hex_left_side,
        cta_left_side_start,
        cta_sides_trigger,
      )
      .fromTo (
        cta_hex_right_side.reverse (),
        { scale: 1 },
        cta_sides_trigger_reverse,
      )
      .fromTo (
        cta_hex_left_side.reverse (),
        { scale: 1 },
        cta_sides_trigger_reverse,
      )
  }



  return {
    calculate_config,
    init_start,
    init_timeline,
    init_side_hexagons,
  }
}