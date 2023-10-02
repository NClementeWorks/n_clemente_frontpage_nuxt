<!-- HexagonsGroup -->

<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { CustomEase } from "gsap/CustomEase";
  import { useUseCaseStore } from '@/stores/useCase'
import { storeToRefs } from '@pinia/nuxt/dist/runtime/composables';

  gsap.registerPlugin ( ScrollTrigger )

  const display = useDisplay ()
  // console.log('display',display)
  const menu = useMenu ()
  const hexagon = useHexagons ()
  const use_case_store = useUseCaseStore ()
  const { use_case_images } = storeToRefs ( use_case_store )
  
    
  const screen_width = computed ( () => display.width.value )
  const screen_height = computed ( () => display.height.value )
  let unwatch_screen_width = ref ( null )

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

  const hexagons_anchor_positions = [
    // hero
    {
      anchor: {
        get x () { return screen_width.value / 5 },
        y: 125,
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
    }
  ]

  onMounted ( () => {
    /**
     * Initial positioning on Hero
     */
    unwatch_screen_width = watch ( screen_width, async () => {
      
      // hero
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

      // expanded stack
      const tl_stack = gsap.timeline ({})

      const stack_start = {
        x: index => hexagons_anchor_positions [ 1 ].anchor.x
          + hexagons_anchor_positions [ 1 ].x [ index ],
        y: index => hexagons_anchor_positions [ 1 ].anchor.y
          + hexagons_anchor_positions [ 1 ].y [ index ],
        scale: index => index >= 6 ? 0 : 1,
      }

      tl_stack
        .fromTo (
          hexagon_paths.value,
          hero_start,
          {
            ...stack_start,
            scrollTrigger: {
              trigger: '#the_expanded_stack',
              start: 'top center',
              end: 'center center',
              scrub: true,
            },
            stagger: .1,
          },
        )

      // cta
      const tl_cta = gsap.timeline ({})
      
      const cta_start = {
        x: index => hexagons_anchor_positions [ 2 ].anchor.x
          + hexagons_anchor_positions [ 2 ].x [ index ],
        y: index => hexagons_anchor_positions [ 2 ].anchor.y
          + hexagons_anchor_positions [ 2 ].y [ index ],
        scale: 1,
      }

      tl_cta
        .fromTo (
          hexagon_paths.value,
          stack_start,
          {
            ...cta_start,
            scrollTrigger: {
              trigger: '#the_cta',
              start: '-100% center',
              end: 'top center',
              scrub: true,
            },
            stagger: .1,
          },
        )

      cta_hexagons.value = Math.ceil ( screen_width.value / hexagon_width_px ) * 2
      
      watch ( () => cta_hexagon_paths.value.length, async () => {

        const tl_cta_sides = gsap.timeline ({})

        const cta_hex_left_side = cta_hexagon_paths.value.filter ( ( h, i ) => i % 2 === 0 )
        const cta_hex_right_side = cta_hexagon_paths.value.filter ( ( h, i ) => i % 2 === 1 )

        const cta_right_side_start = {
          x: index => hexagons_anchor_positions [ 2 ].anchor.x
            + hexagon_compressed_grid_column_px ( index )
            + hexagon_compressed_grid_column_px ( 3 ),
          y: index => hexagons_anchor_positions [ 2 ].anchor.y
            + hexagons_anchor_positions [ 2 ].y [ index % 2 ],
          scale: 0,
        }
        const cta_left_side_start = {
          x: index => hexagons_anchor_positions [ 2 ].anchor.x
            - hexagon_compressed_grid_column_px ( index )
            - hexagon_compressed_grid_column_px ( 3 ),
          y: index => hexagons_anchor_positions [ 2 ].anchor.y
            + hexagons_anchor_positions [ 2 ].y [ index % 2 ],
          scale: 0,
        }

        const cta_sides_trigger = {
            scrollTrigger: {
            trigger: '#the_cta',
            start: '-50% center',
            end: 'top center',
            scrub: true,
          },
          scale: 1,
          stagger: .05,
          ease: 'sine',
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
      })
      
      // use cases
      const tl_use_cases = gsap.timeline ({})

      watch ( () => use_case_images.value.length, () => {

        const use_case_card_images = use_case_images.value

        const use_case_image_scale = use_case_card_images [ 0 ].height / hexagon_height_px
        
        const use_cases_start = {
          x: index => use_case_cards [ index ].offsetTop,
          y: index => hexagons_anchor_positions [ 0 ].anchor.y
            + hexagons_anchor_positions [ 0 ].y [ index ],
          scale: scale_to_use_case_image,
        }

        tl_use_cases
          .to (
            hexagon_paths.value.filter ( ( h, i ) => i <= 1 ),
            {
              ...use_cases_start,
              scrollTrigger: {
                trigger: '#the_use_cases',
                start: 'top center',
                end: 'center center',
                scrub: true,
              },
              stagger: .05,
              ease: 'sine',
            },
          )
      })

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
    :height="screen_height"
    :viewBox="`0 0 ${ screen_width } ${ screen_height }`"
    xmlns="http://www.w3.org/2000/svg"
    filter="url( #inset_shadow )"
    >
    
    <rect x="0" y="0" 
      :width="screen_width"
      :height="screen_height"
      clip-path="url( #clip_path )"
      fill="url( #linear_gradient )"
      ></rect>

    <defs>
      <clipPath id="clip_path">
        
        <path
          v-for="hex in 7"
          :key="hex"
          :id="`hex_${ hex }`"
          :ref="el => hexagon_paths.push ( el )"
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
        x2="0%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
        >
        <stop offset="25%" stop-color="#ED24F4" />
        <stop offset="50%" stop-color="#1DBBE2" />
        <stop offset="75%" stop-color="#32DEB3" />
      </linearGradient>
    </defs>
  </svg>

</template>