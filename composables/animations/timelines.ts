import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TemplateElement, useTemplateStore } from "~/stores/template"

export const useTimelines = () => {
  const template = useTemplateStore ()
  
  const init_hexagon_timelines = ( display : any ) => {
    
    //
    // watch when is the last home element hydrated
    //
    const stack_items_props = ( template.get_element ( 'top_skills_first_icon' ) as TemplateElement ).props
    watch(() => stack_items_props.y, value => {
    //
    // register gsap scroll plugin
    //
    gsap.registerPlugin ( ScrollTrigger )

    //
    // init animations setup
    //
    const animations_hero = useAnimationsHexagonsHero ( gsap )
    const animations_stack = useAnimationsHexagonsStack ( gsap )
    const animations_cta = useAnimationsHexagonsCTA ( gsap )
    const animations_use_case = useAnimationsHexagonsUseCase ( gsap )
    const animations_skills = useAnimationsHexagonsSkills ( gsap )
      
    const screen_width = computed ( () => display.width.value )
    const screen_height = computed ( () => display.height.value )

      const hexagon_paths = ref<SVGElement[]> ( template.hexagon_paths )
      const cta_hexagon_paths = ref ( template.cta_hexagon_paths )

      /**
       * hero
       */
      const hero_start = animations_hero.init_start ( screen_width )
      animations_hero.init_timeline ( hexagon_paths, hero_start )
      
      /**
       * expanded stack
       */
      const stack_start = animations_stack.init_start ()
      animations_stack.init_timeline ( hexagon_paths, hero_start, stack_start ) //, screen_height )

      /**
       * cta
       */
      const cta_config = animations_cta.calculate_config ()
      const cta_start = animations_cta.init_start ( cta_config )
      animations_cta.init_timeline ( hexagon_paths, stack_start, cta_start )
      //
      // cta sides hexagons
      animations_cta.init_side_hexagons ( cta_hexagon_paths, cta_config )

      /**
       * use cases
       */
      const use_cases_config = animations_use_case.calculate_config ()
      const use_cases_start = animations_use_case.init_start ( use_cases_config )
      animations_use_case.init_timeline ( hexagon_paths, cta_start, use_cases_start )
      
      /**
       * top skills
       */
      // count only elements with distinct top positions
      const use_case_img_rows = new Set ( use_cases_config.use_case_img_el_top ).size
      // y shift is the expected image height multiplied by the amount of rows
      const skills_y_shift = use_case_img_rows * use_cases_config.use_case_img_el_height

      const skills_config = animations_skills.calculate_config ( skills_y_shift )
      const skills_start = animations_skills.init_start ( skills_config )
      animations_skills.init_timeline (
          hexagon_paths,
          skills_start,
          skills_config,
          screen_height
        )

      })

  }

  return {
    init_hexagon_timelines,
  }
}