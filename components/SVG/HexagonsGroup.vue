<!-- HexagonsGroup -->

<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { CustomEase } from "gsap/CustomEase"

  const color = useColor ()

  const animations_hero = useAnimationsHexagonsHero ()
  const animations_stack = useAnimationsHexagonsStack ()
  const animations_cta = useAnimationsHexagonsCTA ()
  const animations_use_case = useAnimationsHexagonsUseCase ()
  const animations_skills = useAnimationsHexagonsSkills ()

  gsap.registerPlugin ( ScrollTrigger )

  const display = useDisplay ()
  const hexagon = useHexagons ()
  const screen = useScreen ()
    
  const screen_width = computed ( () => display.width.value )
  const screen_height = computed ( () => display.height.value )
  const page_height = ref ( 0 )

  let unwatch_screen_width = null

  const colors = [
    color.theme.cyan,
    color.theme.magenta,
    color.theme.cyan,
    color.theme.green,
  ]
  const screen_splits = ref ( 1 )
  
  const svg_rectangle = ref ( null )
  const hexagon_paths = ref ( [] )

  const cta_hexagons = ref ( 0 )
  const cta_hexagon_paths = ref ( [] )

  const hexagon_width_px = hexagon.default_width_px

  screen.on_screen_ready ( () => {


    /**
     * Set SVG height to page total height
     */
    page_height.value = document.body.scrollHeight

    /**
     * Initial positioning on Hero
     */
        
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
      animations_skills.init_timeline (
          hexagon_paths,
          skills_start,
          skills_config,
          screen_height
        )
      
      /**
       * Clear current watcher
       */
      

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
        
        <!-- main hexagons -->
        <path
          v-for="hex in 7"
          :key="hex"
          :id="`hex_${ hex }`"
          :ref="el => {
            if ( !hexagon_paths.includes ( el ) )
              hexagon_paths.push ( el )
          }"
          :d="hexagon.path"
          />

        <!-- CTA sides hexagons -->
        <path
          v-for="hex in cta_hexagons"
          :key="hex"
          :id="`hex_cta_${ hex }`"
          :ref="el => cta_hexagon_paths.push ( el )"
          :d="hexagon.path"
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
          :offset="`${ (index - 1) * screen_height / ( page_height || 1 /* prevent infinity */) / colors.length * 100 }%`"
          :stop-color="colors [ ( index - 1 ) % colors.length ]"
          :data-index="index"
          />
      </linearGradient>
    </defs>
  </svg>

</template>