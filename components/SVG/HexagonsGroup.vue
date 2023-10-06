<!-- HexagonsGroup -->

<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { CustomEase } from "gsap/CustomEase"
  import { useUseCaseStore } from '@/stores/useCase'
  import { storeToRefs } from 'pinia'

  gsap.registerPlugin ( ScrollTrigger )

  const display = useDisplay ()
  // console.log('display',display)
  const menu = useMenu ()
  const hexagon = useHexagons ()
  const use_case_store = useUseCaseStore ()
  console.log('=== use_case_store',use_case_store)
  const { use_case_images } = storeToRefs ( use_case_store )
  
    
  const screen_width = computed ( () => display.width.value )
  const screen_height = computed ( () => display.height.value )
  const page_height = ref ( 0 )
  // computed ( () => document?.body?.scrollHeight )
  let unwatch_screen_width = ref ( null )


  const colors = [
    '1DBBE2',
    'ED24F4',
    '1DBBE2',
    '32DEB3',
  ]
  const screen_splits = ref ( 1 )
  
  const svg_rectangle = ref ( null )
  const hexagon_default_gap_px = 8
  const hexagon_paths = ref ( [] )
  const cta_hexagons = ref ( 0 )
  const cta_hexagon_paths = ref ( [] )

  const hexagon_width_px = hexagon.default_width_px
  const hexagon_height_px = hexagon.default_height_px * .75

  const hexagon_grid_width_px = hexagon_width_px + hexagon_default_gap_px
  const hexagon_grid_height_px = hexagon_height_px + hexagon_default_gap_px

  const hexagon_grid_column_px = col => hexagon_grid_width_px * .5 * col
  const hexagon_grid_row_px = row => hexagon_grid_height_px * row

  const hexagon_compressed_grid_column_px = col => ( hexagon_width_px - hexagon_default_gap_px ) * .5 * col
  const hexagon_compressed_grid_row_px = row => ( hexagon_height_px - hexagon_default_gap_px ) * row

  const hexagons_default_top = 125

  const hexagons_anchor_positions = [
    // hero
    {
      anchor: {
        get x () { return screen_width.value / 5 },
        y: hexagons_default_top,
      },
      x: [
        hexagon_grid_column_px ( 0 ),
        hexagon_grid_column_px ( 1 ),
        hexagon_grid_column_px ( 0 ),
        hexagon_grid_column_px ( 1 ),
        hexagon_grid_column_px ( 3 ),
        hexagon_grid_column_px ( 2 ),
        hexagon_grid_column_px ( 1 ),
      ],
      y: [
        hexagon_grid_row_px ( 0 ),
        hexagon_grid_row_px ( 1 ),
        hexagon_grid_row_px ( 2 ),
        hexagon_grid_row_px ( 3 ),
        hexagon_grid_row_px ( 3 ),
        hexagon_grid_row_px ( 4 ),
        hexagon_grid_row_px ( 5 ),
      ],
    },

    // expanded stack
    {
      anchor: {
        get x () { return screen_width.value / 2 },
        get y () { return screen_height.value / 2 },
      },
      x: [
        hexagon_grid_column_px ( 0 ),
        hexagon_grid_column_px ( 1 ),
        hexagon_grid_column_px ( 0 ),
        hexagon_grid_column_px ( 1 ),
        hexagon_grid_column_px ( 0 ),
        hexagon_grid_column_px ( 1 ),
        hexagon_grid_column_px ( 0 ),
      ],
      y: [
        -hexagon_grid_row_px ( 3 ),
        -hexagon_grid_row_px ( 2 ),
        -hexagon_grid_row_px ( 1 ),
        hexagon_grid_row_px ( 0 ),
        hexagon_grid_row_px ( 1 ),
        hexagon_grid_row_px ( 2 ),
        hexagon_grid_row_px ( 3 ),
      ],
    },

    // cta
    {
      anchor: {
        get x () { return screen_width.value / 2 },
        get y () { return screen_height.value / 2 },
      },
      x: [
        -hexagon_compressed_grid_column_px ( 3 ),
        -hexagon_compressed_grid_column_px ( 2 ),
        -hexagon_compressed_grid_column_px ( 1 ),
        hexagon_compressed_grid_column_px ( 0 ),
        hexagon_compressed_grid_column_px ( 1 ),
        hexagon_compressed_grid_column_px ( 2 ),
        hexagon_compressed_grid_column_px ( 3 ),
      ],
      y: [
        -hexagon_compressed_grid_row_px ( 1 ),
        hexagon_compressed_grid_row_px ( 0 ),
        -hexagon_compressed_grid_row_px ( 1 ),
        hexagon_compressed_grid_row_px ( 0 ),
        -hexagon_compressed_grid_row_px ( 1 ),
        hexagon_compressed_grid_row_px ( 0 ),
        -hexagon_compressed_grid_row_px ( 1 ),
      ],
    },

    // skills
    {
      anchor: {
        get x () { return screen_width.value / 2 },
        get y () { return screen_height.value / 2 },
      },
      x: [
        hexagon_compressed_grid_row_px ( 0 ),
        -hexagon_compressed_grid_row_px ( 1 ),
        hexagon_compressed_grid_row_px ( 1 ),
        -hexagon_compressed_grid_row_px ( 1 ),
        hexagon_compressed_grid_row_px ( 1 ),
        hexagon_compressed_grid_row_px ( 0 ),
        hexagon_compressed_grid_row_px ( 0 ),
      ],
      y: [
        -hexagon_compressed_grid_column_px ( 2 ),
        -hexagon_compressed_grid_column_px ( 1 ),
        -hexagon_compressed_grid_column_px ( 1 ),
        hexagon_compressed_grid_column_px ( 1 ),
        hexagon_compressed_grid_column_px ( 1 ),
        hexagon_compressed_grid_column_px ( 2 ),
        hexagon_compressed_grid_column_px ( 0 ),
      ],
      x_gap: [
        0, -2, 2, -2, 2, 0, 0
      ],
      y_gap: [
        -3, -1, -1, 1, 1, 3, 0
      ],
    }
  ]

  const base_scroll_trigger = ({ trigger, ...args }) => ({
    scrollTrigger: {
      trigger,
      start: args.start || 'top center',
      end: args.end || 'bottom center',
      scrub: args.scrub || true,
      markers: args.markers || false,
      // pin: args.pin || false,
      // snap: args.snap || 1,
    },
    stagger: args.stagger || .05,
    ease: args.ease || 'sine',
  })

  let get_left = el => {
    // console.log('___get_left', el.offsetLeft, el)
    return el.offsetParent
      ? el.offsetLeft + get_left ( el.offsetParent )
      : el.offsetLeft
  }
  
  let get_top = ( el ) => {
    // console.log('___get_top', el.offsetTop, el.clientTop, el.scrollTop, el)
    return el.offsetParent
      ? el.offsetTop + get_top ( el.offsetParent )
      : el.offsetTop
  }
  
  // const draw_mark = ( {top, left}, text, fixed ) => {
  //   const div = document.createElement ( 'div' )
  //   div.id = 'custom_marker'
  //   div.style.overflow = 'visible'
  //   div.style.height = '2px'
  //   div.style.width = '20px'
  //   div.style.background = 'red'
  //   div.style.position = fixed ? 'fixed' : 'absolute'
  //   div.style.top = top ? `${ top }px` : '50%'
  //   div.style.left = left ? `${ left }px` : '50%'
  //   div.innerText = text
  //   const nuxt_el = document.querySelector ( '#__nuxt' )
  //   nuxt_el.appendChild ( div )
  // }

  onMounted ( async () => {
    await nextTick ()
    /**
     * Set SVG height to page total height
     */
    page_height.value = document.body.scrollHeight

    /**
     * Initial positioning on Hero
     */
    unwatch_screen_width = watch ( screen_width, async () => {
        
      /**
       * setup color divisions
       */
      screen_splits.value = Math.ceil ( page_height.value / screen_height.value )

      /**
       * hero
       */
      const tl_hero = gsap.timeline ({})
      
      const hero_start = {
        x: index => hexagons_anchor_positions [ 0 ].anchor.x
          + hexagons_anchor_positions [ 0 ].x [ index ],
        y: index => hexagons_anchor_positions [ 0 ].anchor.y
          + hexagons_anchor_positions [ 0 ].y [ index ],
        scale: 1,
      }

      tl_hero
        .set (
          hexagon_paths.value,
          hero_start,
        )

      /**
       * expanded stack
       */
      const tl_stack = gsap.timeline ({})

      const expanded_stack_items_el = document.querySelector ( '#expanded_stack_items' )
      const expanded_stack_items_el_top = get_top ( expanded_stack_items_el )
      const expanded_stack_items_el_left = get_left ( expanded_stack_items_el )

      const expanded_stack_firts_item_el = document.querySelector ( '#expanded_stack_items .expanded_stack_item .v-icon' )

      const stack_start = {
        x: index => expanded_stack_items_el_left
          - ( hexagon.default_width_px / 2 )
          + ( expanded_stack_firts_item_el.offsetWidth / 2 )
          + hexagons_anchor_positions [ 1 ].x [ index ],
        y: index => expanded_stack_items_el_top
          + hexagon_grid_row_px ( index ),
        scale: index => index >= 6 ? 0 : 1,
      }

      tl_stack
        .fromTo (
          hexagon_paths.value,
          hero_start,
          {
            ...base_scroll_trigger ({
              trigger: '#the_expanded_stack',
              start: 'top center',
              end: 'center center',
            }),
            ...stack_start,
          },
        )

      /**
       * cta
       */
      const tl_cta = gsap.timeline ({})
      
      const cta_el = document.querySelector ( '#the_cta' )
      const cta_el_top = get_top ( cta_el )
      
      const cta_el_left = get_left ( cta_el )
      const cta_center = cta_el_left + ( cta_el.offsetWidth / 2 ) - ( hexagon.default_width_px * 2 )

      const cta_start_y = index => cta_el_top
          - ( hexagon.default_height_px / 3 )
          + hexagon_compressed_grid_row_px ( index % 2 )

      const cta_start = {
        x: index => cta_center
          + hexagon_compressed_grid_column_px ( index ),
        y: cta_start_y,
        scale: 1,
      }

      tl_cta
        .fromTo (
          hexagon_paths.value,
          stack_start,
          {
            ...base_scroll_trigger ({
              trigger: '#the_cta',
              start: 'bottom bottom',
              end: 'top center',
              snap: .5
            }),
            ...cta_start,
          },
        )

      cta_hexagons.value = Math.ceil ( screen_width.value / hexagon_width_px ) * 2 + 4 // add extra padding
      
      // cta sides hexagons
      watch ( () => cta_hexagon_paths.value.length, async () =>  {

        const tl_cta_sides = gsap.timeline ({})

        const cta_hex_left_side = cta_hexagon_paths.value.filter ( ( h, i ) => i % 2 === 0 )
        const cta_hex_right_side = cta_hexagon_paths.value.filter ( ( h, i ) => i % 2 === 1 )

        const cta_right_side_start = {
          x: index => cta_center
            + hexagon_compressed_grid_column_px ( index + 6 ),
          y: cta_start_y,
          scale: 0,
        }

        const cta_left_side_start = {
          x: index => cta_center
            - hexagon_compressed_grid_column_px ( index ),
          y: cta_start_y,
          scale: 0,
        }

        const cta_sides_trigger = {
          ...base_scroll_trigger ({
            trigger: '#the_cta',
            start: '-100% center',
            end: 'top center',
            scrub: undefined,
            snap: undefined,
          }),
          scale: 1,
        }

        const cta_sides_trigger_reverse = {
          ...base_scroll_trigger ({
            trigger: '#the_cta',
            start: 'top 25%',
            end: 'top top',
            scrub: undefined,
            snap: undefined,
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
      })

      /**
       * use cases
       */
      const tl_use_cases = gsap.timeline ({})

      let use_cases_random_start = {}

      const use_case_img_el = [ ...document.querySelectorAll ( '#the_use_cases .v-img' ) ]  
      const use_case_img_el_top = get_top ( use_case_img_el [ 0 ] )
      const use_case_imgs_el_left = use_case_img_el.map ( el => get_left ( el ) )
      
      const hexagon_proportions = hexagon.default_height_px / hexagon.default_width_px
      const use_case_img_el_hegiht = use_case_img_el [ 0 ].offsetWidth * hexagon_proportions
      const use_case_img_el_bottom = use_case_img_el_top + use_case_img_el_hegiht
      const use_case_image_width = use_case_img_el [ 0 ].offsetWidth

      const use_case_random = () => gsap.utils.random ( use_case_img_el_top, use_case_img_el_bottom )

      const use_case_random_x_options = [
          () => gsap.utils.random ( screen_width.value * .2, use_case_imgs_el_left [ 0 ] ),
          () => gsap.utils.random ( use_case_imgs_el_left [ 0 ] + use_case_image_width - hexagon.default_width_px, use_case_imgs_el_left [ 1 ] ),
          () => gsap.utils.random ( use_case_imgs_el_left [ 1 ] + use_case_image_width, use_case_imgs_el_left [ 1 ] + use_case_image_width, + hexagon.default_width_px ),
      ]

      use_cases_random_start = {
        x: index => {
          const rnd_option = index % 3
          return use_case_random_x_options [ rnd_option ] ()
        },
        y: () => use_case_random (),
        scale: () => gsap.utils.random ( 0.5, 1 ),
      }
      
      tl_use_cases
        .fromTo (
          hexagon_paths.value,
          cta_start,
          {
            ...base_scroll_trigger ({
              trigger: '#the_use_cases',
              start: 'top 25%',
              end: '-5% top',
            }),
            ...use_cases_random_start,
          },
        )
      
      /**
       * top skills
       */
      const tl_skills = gsap.timeline ({})

      const skills_el = document.querySelector ( '#top_skills_flower' )
      const skills_el_top = get_top ( skills_el )
      const skills_el_left = get_left ( skills_el )
      const skills_icon_el = document.querySelector ( '#top_skills_flower .v-img' )
      const calculated_skills_section_top = skills_el_top + use_case_img_el_hegiht

      const skills_rows = [ 0, 1, 1, 3, 3, 4, 2 ]
      const skills_rows_gaps = [ 0, 2, 2, 4 , 4, 6, 3 ]
      const skills_cols = [ 1, 0, 2, 2, 0, 1, 1 ]
      const skills_cols_gaps = [ 2, 0, 4, 4, 0, 2, 2 ]

      const skills_start = {
        x: index => skills_el_left
          - ( ( hexagon.default_height_px - ( skills_icon_el.offsetWidth / 2 ) ) / 2 )
          + hexagon_compressed_grid_row_px ( skills_cols [ index ] )
          + ( hexagon_default_gap_px * skills_cols_gaps [ index ] ),
        y: index => calculated_skills_section_top
          + hexagon_compressed_grid_column_px ( skills_rows [ index ] )
          + ( hexagon_default_gap_px * skills_rows_gaps [ index ] ),
        scale: index => index === 6 ? 0 : 1,
        rotation: 90,
      }

      tl_skills.to (
        hexagon_paths.value,
        {
          ...base_scroll_trigger ({
            trigger: '#the_top_skills',
            start: () => calculated_skills_section_top - ( display.height.value * .85 ),
            end: () => calculated_skills_section_top - ( display.height.value * .5 ),
          }),
          ...skills_start,
        },
      )

      unwatch_screen_width ()
      
    })

  })

  onBeforeUnmount ( () => {
    unwatch_screen_width ()
  })
</script>

<template>
  <svg
    :width="screen_width"
    :height="page_height"
    :viewBox="`0 0 ${ screen_width } ${ page_height }`"
    xmlns="http://www.w3.org/2000/svg"
    filter="url( #inset_shadow )"
    >
    
    <rect
      id="svg_rectangle"
      ref="svg_rectangle"
      x="0" y="0"
      :width="screen_width"
      :height="page_height"
      clip-path="url( #clip_path )"
      fill="url( #linear_gradient )"
      ></rect>

    <defs>
      <clipPath id="clip_path">
        
        <path
          v-for="hex in 7"
          :key="hex"
          :id="`hex_${ hex }`"
          :ref="el => {
            if ( !hexagon_paths.includes ( el ) )
              hexagon_paths.push ( el )
          }"
          d="M3.8147e-06 85.84C3.8147e-06 89.8822 2.1669 93.6153 5.67106 95.6425L48.8351 120.489C52.3393 122.504 56.6482 122.504 60.1524 120.489L103.329 95.6425C106.833 93.6276 109 89.8822 109 85.84V36.1722C109 32.13 106.833 28.397 103.329 26.3697L60.1648 1.51117C56.6606 -0.503724 52.3517 -0.503724 48.8475 1.51117L5.68346 26.3573C2.1793 28.3722 0.0123843 32.1176 0.0123843 36.1598V85.84H3.8147e-06Z"
          />

        <path
          v-for="hex in cta_hexagons"
          :key="hex"
          :id="`hex_cta_${ hex }`"
          :ref="el => cta_hexagon_paths.push ( el )"
          d="M3.8147e-06 85.84C3.8147e-06 89.8822 2.1669 93.6153 5.67106 95.6425L48.8351 120.489C52.3393 122.504 56.6482 122.504 60.1524 120.489L103.329 95.6425C106.833 93.6276 109 89.8822 109 85.84V36.1722C109 32.13 106.833 28.397 103.329 26.3697L60.1648 1.51117C56.6606 -0.503724 52.3517 -0.503724 48.8475 1.51117L5.68346 26.3573C2.1793 28.3722 0.0123843 32.1176 0.0123843 36.1598V85.84H3.8147e-06Z"
          />
      </clipPath>

      <filter id="inset_shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer in=SourceAlpha>
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="4"/>
        <feOffset dx="-4" dy="6" result="offsetblur"/>
        <feFlood flood-color="rgb(0, 0, 0)" result="color"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>
      </filter>
      
      <linearGradient id="linear_gradient"
        x1="0%"
        y1="0%"
        x2="85%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
        >
        <stop
          v-for="index in ( screen_splits * colors.length )"
          :key="index"
          :offset="`${ (index - 1) * screen_height / page_height / colors.length * 100 }%`" :stop-color="`#${ colors [ ( index - 1 ) % colors.length ] }`"
          :data-index="index"
          />
        <!-- <stop offset="25%" stop-color="#ED24F4" />
        <stop offset="50%" stop-color="#1DBBE2" />
        <stop offset="75%" stop-color="#32DEB3" /> -->
      </linearGradient>
    </defs>
  </svg>

</template>