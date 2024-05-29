import { TemplateElement, useTemplateStore } from '~/stores/template'
import { useWindowScroll } from '@vueuse/core'

export const useAnimationsHexagonsUseCase = ( gsap : any ) => {

  const hexagon = useHexagons ()
  const template = useTemplateStore ()
  const { as_plain_object } = useUtils ()
  const { y: scroll_y } = useWindowScroll ()

  function calculate_config () : any {
    const use_case_imgs_props = ( template.get_element ( 'use_case_imgs' ) as TemplateElement[] )
      ?.map ( ( item : TemplateElement ) => as_plain_object ( item.props ))
    
    const use_case_imgs_el_left = use_case_imgs_props?.map ( ( props : any ) => props.left )
    const use_case_img_el_top = use_case_imgs_props?.map ( ( props : any ) => props.top + scroll_y.value )
    
    const use_case_img_el_width = use_case_imgs_props ? use_case_imgs_props [ 0 ]?.width || 0 : 0
    const use_case_img_el_height = use_case_img_el_width * hexagon.hexagon_proportions
    const use_case_img_el_bottom = (use_case_img_el_top ? use_case_img_el_top [ 0 ] : 0) + use_case_img_el_height

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
  ) : any {

    //
    //
    const use_case_random_x_options = [
      
      // space before
      () => gsap.utils.random (
        // screen_width.value * .2,
        config.use_case_imgs_el_left [ 0 ] - hexagon.default_width_px,
        config.use_case_imgs_el_left [ 0 ]
      ),
      
      // center space
      () => gsap.utils.random (
        config.use_case_imgs_el_left [ 0 ] + config.use_case_img_el_width - hexagon.default_width_px,
        config.use_case_imgs_el_left [ 1 ]
      ),

      // space after
      () => gsap.utils.random (
        config.use_case_imgs_el_left [ 1 ] + config.use_case_img_el_width - hexagon.default_width_px,
        config.use_case_imgs_el_left [ 1 ] + config.use_case_img_el_width + hexagon.default_width_px
      ),
    ]

    //
    //
    const use_case_random_y_options = ( top : number ) => ([

      // space before
      () => gsap.utils.random (
        top - ( hexagon.default_height_px / 2 ),
        top + hexagon.default_height_px
      ),
      
      // space after
      () => gsap.utils.random (
        top + config.use_case_img_el_height - hexagon.default_height_px,
        top + config.use_case_img_el_height + hexagon.default_height_px
      ),
    ])

    //
    //
    const use_cases_random_start = {

      x: () => use_case_random_x_options [ gsap.utils.random (0, 2, 1) ] (),

      y: ( index : number ) => {
        const top_index = index % config.use_case_img_el_top.length
        const top_value = config.use_case_img_el_top [ top_index ]
        const y_options = use_case_random_y_options ( top_value )
        return y_options [ gsap.utils.random (0, 1, 1) ] ()
      },

      scale: () => gsap.utils.random ( 0.5, 1 ),

    }

    return use_cases_random_start
  }

  function init_timeline (
    hexagon_paths : Ref<SVGElement[]>,
    previous_state : any,
    new_state: any,
  ) : void {
    
    const tl_use_cases = gsap.timeline ({})

    tl_use_cases
      .fromTo (
        hexagon_paths.value,
        previous_state,
        {
          ...hexagon.base_scroll_trigger ({
            trigger: '#the_use_cases',
            start: 'top 25%',
            end: 'top top',
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