import gsap from 'gsap'
import { useHexagons } from "#imports"
import { useScreen } from '#imports'

export const useAnimationsHexagonsUseCase = () => {

  const hexagon = useHexagons ()
  const screen = useScreen ()

  const tl_use_cases = gsap.timeline ({})

  function calculate_config ( document : Document ) : any {

    const use_case_img_el = [ ...document.querySelectorAll<HTMLElement> ( '#the_use_cases .v-img' ) ]  
    const use_case_imgs_el_left = use_case_img_el.map ( el => screen.get_left ( el ) )
    const use_case_img_el_top = screen.get_top ( use_case_img_el [ 0 ] )
    
    const use_case_img_el_width = use_case_img_el [ 0 ]?.offsetWidth || 0
    const use_case_img_el_hegiht = use_case_img_el_width * hexagon.hexagon_proportions
    const use_case_img_el_bottom = use_case_img_el_top + use_case_img_el_hegiht

    return {
      use_case_imgs_el_left,
      use_case_img_el_top,
      use_case_img_el_bottom,
      use_case_img_el_hegiht,
      use_case_img_el_width,
    }
  }

  function init_start (
    config: any,
    screen_width : Ref<number>
  ) : any {

    const use_case_random_x_options = [

      // center space
      () => gsap.utils.random (
        config.use_case_imgs_el_left [ 0 ] + config.use_case_img_el_width - hexagon.default_width_px,
        config.use_case_imgs_el_left [ 1 ]
      ),

      // space before
      () => gsap.utils.random (
        screen_width.value * .2,
        config.use_case_imgs_el_left [ 0 ]
      ),
      
      // space after
      () => gsap.utils.random (
        config.use_case_imgs_el_left [ 1 ] + config.use_case_img_el_width,
        config.use_case_imgs_el_left [ 1 ] + config.use_case_img_el_width - hexagon.default_width_px
      ),
    ]

    const use_cases_random_start = {

      x: ( index : number ) => use_case_random_x_options [ index % 3 ] (),

      y: () => gsap.utils.random (
        config.use_case_img_el_top,
        config.use_case_img_el_bottom - hexagon.default_height_px
      ),

      scale: () => gsap.utils.random ( 0.5, 1 ),

    }

    return use_cases_random_start
  }

  function init_timeline (
    hexagon_paths : Ref<SVGElement>,
    previous_state : any,
    new_state: any,
  ) : void {
    tl_use_cases
      .fromTo (
        hexagon_paths.value,
        previous_state,
        {
          ...hexagon.base_scroll_trigger ({
            trigger: '#the_use_cases',
            start: 'top 25%',
            end: '-5% top',
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