<!-- HexagonsGroup -->

<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { CustomEase } from "gsap/CustomEase"

  const animations_hero = useAnimationsHexagonsHero ()
  const animations_stack = useAnimationsHexagonsStack ()
  const animations_cta = useAnimationsHexagonsCTA ()
  const animations_use_case = useAnimationsHexagonsUseCase ()
  const animations_skills = useAnimationsHexagonsSkills ()

  gsap.registerPlugin ( ScrollTrigger )

  const display = useDisplay ()
  const hexagon = useHexagons ()
    
  const screen_width = computed ( () => display.width.value )
  const screen_height = computed ( () => display.height.value )
  const page_height = ref ( 0 )
  let unwatch_screen_width = ref ( null )


  const colors = [
    '1DBBE2',
    'ED24F4',
    '1DBBE2',
    '32DEB3',
  ]
  const screen_splits = ref ( 1 )
  
  const svg_rectangle = ref ( null )
  const hexagon_paths = ref ( [] )

  const cta_hexagons = ref ( 0 )
  const cta_hexagon_paths = ref ( [] )

  const hexagon_width_px = hexagon.default_width_px

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
      const hero_start = animations_hero.init_start ( screen_width )
      animations_hero.init_timeline ( hexagon_paths, hero_start )
      
      /**
       * expanded stack
       */
      const stack_start = animations_stack.init_start ( document )
      animations_stack.init_timeline ( hexagon_paths, hero_start, stack_start )

      /**
       * cta
       */
      const cta_config = animations_cta.calculate_config ( document )
      const cta_start = animations_cta.init_start ( cta_config )
      animations_cta.init_timeline ( hexagon_paths, stack_start, cta_start )

      // cta sides hexagons
      cta_hexagons.value = Math.ceil ( screen_width.value / hexagon_width_px ) * 2 + 4 // add extra padding
      watch ( () => cta_hexagon_paths.value.length, async () =>  {
        animations_cta.init_side_hexagons ( cta_hexagon_paths, cta_config )
      })

      /**
       * use cases
       */
      const use_cases_config = animations_use_case.calculate_config ( document )
      const use_cases_start = animations_use_case.init_start ( use_cases_config, screen_width )
      animations_use_case.init_timeline ( hexagon_paths, cta_start, use_cases_start )
      
      /**
       * top skills
       */
      const skills_config = animations_skills.calculate_config ( document, use_cases_config.use_case_img_el_hegiht )
      const skills_start = animations_skills.init_start ( skills_config )
      animations_skills
        .init_timeline (
          hexagon_paths,
          skills_start,
          skills_config,
          screen_height
        )
      
      /**
       * Clear current watcher
       */
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