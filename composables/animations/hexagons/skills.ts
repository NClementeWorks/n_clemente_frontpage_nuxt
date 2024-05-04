import gsap from 'gsap'
import { useTemplateStore } from '~/stores/template'
import { useWindowScroll } from '@vueuse/core'

export const useAnimationsHexagonsSkills = () => {

  const hexagon = useHexagons ()
  const template = useTemplateStore ()
  const { y: window_scroll_y } = useWindowScroll ()
  
  const tl_skills = gsap.timeline ({})

  const skills_rows = [ 0, 1, 1, 3, 3, 4, 2 ]
  const skills_cols = [ 1, 0, 2, 2, 0, 1, 1 ]

  function calculate_config ( document : Document, position_shift_y : number ) : any {

    const top_skills_props = template.get_element ( 'top_skills_flower' ).props
    const top_skills_first_icon_props = template.get_element ( 'top_skills_first_icon' ).props

    const skills_el_left = top_skills_props.left
    const skills_icon_el_width = top_skills_first_icon_props.width || 0

    const calculated_skills_section_top = top_skills_props.top + window_scroll_y.value + position_shift_y
    return {
      skills_el_left,
      skills_icon_el_width,
      calculated_skills_section_top,
    }
    
  }

  function init_start ( config : any ) : any {

    const skills_start = {

      x: ( index : number ) => config.skills_el_left
        // using row grid on x axis since hexagons are rotated 90 deg.
        + hexagon.hexagon_grid_row_px ( skills_cols [ index ] )
        // using hexagon height on x axis since hexagons are rotated 90 deg.
        - ( ( hexagon.hexagon_grid_height_px ) / 2 )
        + hexagon.hexagon_grid_gap_px,

      y: ( index : number ) => config.calculated_skills_section_top
        // using col grid on y axis since hexagons are rotated 90 deg.
        + hexagon.hexagon_grid_column_px ( skills_rows [ index ] ),
        
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
          start: () => config.calculated_skills_section_top - ( screen_height.value * 1.25 ),
          end: () => config.calculated_skills_section_top - ( screen_height.value * .3 ),
        }),
        ...new_state,
      },
    )
  }

  return {
    calculate_config,
    init_start,
    init_timeline,   
    skills_rows,
    skills_cols,
  }
}