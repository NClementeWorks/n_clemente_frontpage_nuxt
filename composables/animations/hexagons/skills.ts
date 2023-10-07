import gsap from 'gsap'
import { useHexagons } from "#imports"
import { useScreen } from '#imports'

export const useAnimationsHexagonsSkills = () => {

  const hexagon = useHexagons ()
  const screen = useScreen ()
  
  const tl_skills = gsap.timeline ({})

  function calculate_config ( document : Document, position_shift_y : number ) : any {

    const skills_el = document.querySelector<HTMLElement> ( '#top_skills_flower' )
    const skills_el_top = screen.get_top ( skills_el )
    const skills_el_left = screen.get_left ( skills_el )

    const skills_icon_el = document.querySelector<HTMLElement> ( '#top_skills_flower .v-img' )
    const skills_icon_el_width = skills_icon_el?.offsetWidth || 0
    const calculated_skills_section_top = skills_el_top + position_shift_y

    return {
      skills_el_left,
      skills_icon_el_width,
      calculated_skills_section_top,
    }
  }

  function init_start ( config : any ) : any {

    const skills_rows = [ 0, 1, 1, 3, 3, 4, 2 ]
    const skills_rows_gaps = [ 0, 2, 2, 4 , 4, 6, 3 ]
    const skills_cols = [ 1, 0, 2, 2, 0, 1, 1 ]
    const skills_cols_gaps = [ 2, 0, 4, 4, 0, 2, 2 ]

    const skills_start = {

      x: ( index : number ) => config.skills_el_left
        // using row grid on x axis since hexagons are rotated 90 deg.
        + hexagon.hexagon_compressed_grid_row_px ( skills_cols [ index ] )
        + ( hexagon.hexagon_grid_gap_px * skills_cols_gaps [ index ] )
        // using hexagon height on x axis since hexagons are rotated 90 deg.
        - ( ( hexagon.hexagon_grid_height_px - hexagon.hexagon_grid_gap_px ) / 2 )
        ,

      y: ( index : number ) => config.calculated_skills_section_top
        // using col grid on y axis since hexagons are rotated 90 deg.
        + hexagon.hexagon_compressed_grid_column_px ( skills_rows [ index ] )
        + ( hexagon.hexagon_grid_gap_px * skills_rows_gaps [ index ] ),
        
      scale: ( index : number ) => index === 6 ? 0 : 1,
      rotation: 90,

    }

    return skills_start
  }

  function init_timeline (
    hexagon_paths : Ref<SVGElement>,
    new_state : any,
    config : any,
    screen_height : Ref<number>,
  ) : void {
    tl_skills.to (
      hexagon_paths.value,
      {
        ...hexagon.base_scroll_trigger ({
          trigger: '#the_top_skills',
          start: () => config.calculated_skills_section_top - ( screen_height.value * .85 ),
          end: () => config.calculated_skills_section_top - ( screen_height.value * .5 ),
        }),
        ...new_state,
      },
    )
  }

  return {
    calculate_config,
    init_start,
    init_timeline,   
  }
}