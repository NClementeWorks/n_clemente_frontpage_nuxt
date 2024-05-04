<!-- HexagonsGroup -->

<script setup>
 import { useTemplateStore } from "~/stores/template"

  const color = useColor ()
  const display = useDisplay ()
  const hexagon = useHexagons ()
  const screen = useScreen ()
    
  const screen_width = computed ( () => display.width.value )
  const screen_height = computed ( () => display.height.value )
  const page_height = ref ( 0 )

  const colors = [
    color.theme.cyan,
    color.theme.magenta,
    color.theme.cyan,
    color.theme.green,
  ]
  const screen_splits = ref ( 1 )
  const template = useTemplateStore ()
  
  const svg_rectangle = ref ( null )
  const hexagon_paths = ref ( [] )
  template.hexagon_paths = hexagon_paths

  const cta_hexagons = ref ( 0 )
  const cta_hexagon_paths = ref ( [] )
  template.cta_hexagon_paths = cta_hexagon_paths

  const hexagon_width_px = hexagon.default_width_px

  screen.on_screen_ready ( () => {

    /**
     * Set SVG height to page total height
     */
    page_height.value = document.body.scrollHeight

    /**
     * Initial positioning on Hero
     */
    screen_splits.value = Math.ceil ( page_height.value / screen_height.value )

    // cta sides hexagons
    cta_hexagons.value = Math.ceil ( screen_width.value / hexagon_width_px ) * 2 + 4 // add extra padding
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