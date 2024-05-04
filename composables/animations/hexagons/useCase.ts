import { useTemplateStore } from '~/stores/template'
import { useWindowScroll } from '@vueuse/core'

export const useAnimationsHexagonsUseCase = ( gsap : any ) => {

  const hexagon = useHexagons ()
  const { y: window_scroll_y } = useWindowScroll ()
  const template = useTemplateStore ()

  const tl_use_cases = gsap.timeline ({})

  function calculate_config () : any {
    const use_case_imgs_props = template.get_element ( 'use_case_imgs' ).map ( ( item : any ) => item.props )

    const use_case_imgs_el_left = use_case_imgs_props.map ( ( props : ElementScreenProperties ) => props.left )
    const use_case_img_el_top = use_case_imgs_props [ 0 ].top + window_scroll_y.value
    
    const use_case_img_el_width = use_case_imgs_props [ 0 ].width || 0
    const use_case_img_el_height = use_case_img_el_width * hexagon.hexagon_proportions
    const use_case_img_el_bottom = use_case_img_el_top + use_case_img_el_height

    return {
      use_case_imgs_el_left,
      use_case_img_el_top,
      use_case_img_el_bottom,
      use_case_img_el_height,
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