import gsap from 'gsap'
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTemplateStore } from "~/stores/template"

export const useTimelines = () => {

  const init_hexagon_timelines = () => {
    
    const display = useDisplay ()
    const screen = useScreen ()
    const template = useTemplateStore ()
    
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

    /**
     * Init timelines at parent component to increase chances of child components mounted
     */
    screen.on_screen_ready ( () => {
      const hexagon_paths = ref ( template.hexagon_paths )
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
      const use_cases_start = animations_use_case.init_start ( use_cases_config, screen_width )
      animations_use_case.init_timeline ( hexagon_paths, cta_start, use_cases_start )
      
      /**
       * top skills
       */
      const skills_config = animations_skills.calculate_config ( use_cases_config.use_case_img_el_height )
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