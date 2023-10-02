<!-- HexagonsGroup -->

<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { CustomEase } from "gsap/CustomEase";

  gsap.registerPlugin ( ScrollTrigger )

  const display = useDisplay ()
  // console.log('display',display)
  const menu = useMenu ()
  const hexagon = useHexagons ()
  
  const screen_width = computed ( () => display.width.value )
  const screen_height = computed ( () => display.height.value )
  let unwatch_screen_width = ref ( null )

  const hexagon_default_gap_px = 8
  const hexagon_paths = ref ( [] )

  const hexagon_grid_width_px = hexagon.default_width_px + hexagon_default_gap_px
  const hexagon_grid_height_px = hexagon.default_height_px * .75 + hexagon_default_gap_px

  const hexagon_grid_column_px = col => hexagon_grid_width_px * .5 * col
  const hexagon_grid_row_px = row => hexagon_grid_height_px * row

  const hexagon_compressed_grid_column_px = col => ( hexagon.default_width_px - hexagon_default_gap_px ) * .5 * col
  const hexagon_compressed_grid_row_px = row => ( hexagon.default_height_px - hexagon_default_gap_px ) * row

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
        -hexagon_compressed_grid_column_px ( 6 ),
        -hexagon_compressed_grid_column_px ( 4 ),
        -hexagon_compressed_grid_column_px ( 2 ),
        hexagon_compressed_grid_column_px ( 0 ),
        hexagon_compressed_grid_column_px ( 2 ),
        hexagon_compressed_grid_column_px ( 4 ),
        hexagon_compressed_grid_column_px ( 6 ),
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
    // console.log('HexagonsGroup onMounted')
    // console.log('HexagonsGroup onMounted :: screen_width', screen_width.value)
    // console.log('HexagonsGroup onMounted :: hexagon_paths', hexagon_paths)

    /**
     * Initial positioning on Hero
     */
    unwatch_screen_width = watch ( screen_width, () => {
      // console.log('menu.current_menu', menu.current_menu)
      // console.log('hexagons_anchor_positions [ menu.current_menu ]', hexagons_anchor_positions [ menu.current_menu ])

      // timeline
      // const tl_master = gsap.timeline ({ 
      //   defaults: {
      //     // ease: CustomEase.create("custom", "M0,0 C0.296,0 0.618,0.214 0.7,0.5 0.761,0.713 0.78,1 1,1 "),
      //     ease: 'sine',
      //   },
      // })
      
      const tl_hero = gsap.timeline ({})
      const tl_stack = gsap.timeline ({})
      const tl_cta = gsap.timeline ({})
      // const tl_hero = gsap.timeline ({
      //   scrollTrigger: {
      //     trigger: '#the_hero',
      //     start: 'top top',
      //     end: 'center center',
      //     scrub: true
      //   },
      //   ease: 'sine',
      // })
      
      // hexagon_paths.value.forEach ( ( hex, index ) => {

        // hero
        tl_hero.set (
          hexagon_paths.value,
          {
            x: index => hexagons_anchor_positions [ 0 ].anchor.x
              + hexagons_anchor_positions [ 0 ].x [ index ],
            y: index => hexagons_anchor_positions [ 0 ].anchor.y
              + hexagons_anchor_positions [ 0 ].y [ index ],
          },
        )

        // expanded stack
        tl_stack.fromTo (
          hexagon_paths.value,
          {
            x: index => hexagons_anchor_positions [ 0 ].anchor.x
              + hexagons_anchor_positions [ 0 ].x [ index ],
            y: index => hexagons_anchor_positions [ 0 ].anchor.y
              + hexagons_anchor_positions [ 0 ].y [ index ],
          },
          {
            scrollTrigger: {
              trigger: '#the_expanded_stack',
              start: 'top center',
              end: 'center center',
              scrub: true,
            },
            x: index => hexagons_anchor_positions [ 1 ].anchor.x
              + hexagons_anchor_positions [ 1 ].x [ index ],
            y: index => hexagons_anchor_positions [ 1 ].anchor.y
              + hexagons_anchor_positions [ 1 ].y [ index ],
            scale: index => index >= 6 ? 0 : 1,
            stagger: .1,
          },
        )

        // cta
        tl_cta.fromTo (
          hexagon_paths.value,
          {
            x: index => hexagons_anchor_positions [ 1 ].anchor.x
              + hexagons_anchor_positions [ 1 ].x [ index ],
            y: index => hexagons_anchor_positions [ 1 ].anchor.y
              + hexagons_anchor_positions [ 1 ].y [ index ],
            scale: index => index >= 6 ? 0 : 1,
          },
          {
            scrollTrigger: {
              trigger: '#the_cta',
              start: '-100% center',
              end: 'center center',
              scrub: true
            },
            x: index => hexagons_anchor_positions [ 2 ].anchor.x
              + hexagons_anchor_positions [ 2 ].x [ index ],
            y: index => hexagons_anchor_positions [ 2 ].anchor.y
              + hexagons_anchor_positions [ 2 ].y [ index ],
            stagger: .1,
          },
        )

      // })
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
        <!-- <path
          id="hexagon_1"
          d="M108.013 85.1321C108.013 89.1409 105.866 92.8432 102.394 94.8538L59.6263 119.495C56.1543 121.493 51.885 121.493 48.413 119.495L5.63261 94.8538C2.16062 92.8555 0.0136871 89.1409 0.0136871 85.1321V35.8739C0.0136871 31.8651 2.16062 28.1628 5.63261 26.1523L48.4007 1.49871C51.8727 -0.499569 56.1421 -0.499569 59.6141 1.49871L102.382 26.14C105.854 28.1383 108.001 31.8528 108.001 35.8617V85.1321H108.013Z"
          />
        <path
          id="hexagon_2"
          d="M281.196 382.837C281.196 386.846 279.049 390.548 275.577 392.559L232.809 417.2C229.337 419.199 225.067 419.199 221.595 417.2L178.815 392.559C175.343 390.561 173.196 386.846 173.196 382.837V333.579C173.196 329.57 175.343 325.868 178.815 323.857L221.583 299.203C225.055 297.205 229.325 297.205 232.797 299.203L275.565 323.845C279.037 325.843 281.184 329.558 281.184 333.566V382.837H281.196Z"
          />
        <path
          id="hexagon_3"
          d="M108 283.482C108 287.491 105.853 291.193 102.381 293.203L59.6128 317.845C56.1408 319.843 51.8714 319.843 48.3994 317.845L5.61901 293.203C2.14701 291.205 0 287.491 0 283.482V234.223C0 230.215 2.14701 226.512 5.61901 224.502L48.3872 199.848C51.8592 197.85 56.1286 197.85 59.6006 199.848L102.369 224.489C105.841 226.488 107.988 230.202 107.988 234.211V283.482H108Z"
          />
        <path
          id="hexagon_4"
          d="M221.595 481.487C221.595 485.496 219.448 489.198 215.976 491.209L173.208 515.85C169.736 517.848 165.467 517.848 161.995 515.85L119.214 491.209C115.742 489.21 113.595 485.496 113.595 481.487V432.229C113.595 428.22 115.742 424.518 119.214 422.507L161.983 397.853C165.455 395.855 169.724 395.855 173.196 397.853L215.964 422.495C219.436 424.493 221.583 428.208 221.583 432.216V481.487H221.595Z"
          />
        <path
          id="hexagon_5"
          d="M167.564 382.837C167.564 386.846 165.417 390.548 161.945 392.559L119.177 417.2C115.705 419.198 111.435 419.198 107.963 417.2L65.1829 392.559C61.7109 390.56 59.5639 386.846 59.5639 382.837V333.579C59.5639 329.57 61.7109 325.868 65.1829 323.857L107.951 299.203C111.423 297.205 115.693 297.205 119.165 299.203L161.933 323.845C165.405 325.843 167.552 329.558 167.552 333.566V382.837H167.564Z"
          />
        <path
          id="hexagon_6"
          d="M167.576 184.487C167.576 188.496 165.429 192.198 161.957 194.208L119.189 218.85C115.717 220.848 111.448 220.848 107.976 218.85L65.1953 194.208C61.7233 192.21 59.5763 188.496 59.5763 184.487V135.229C59.5763 131.22 61.7233 127.517 65.1953 125.507L107.963 100.853C111.435 98.8551 115.705 98.8551 119.177 100.853L161.945 125.495C165.417 127.493 167.564 131.208 167.564 135.216V184.487H167.576Z"
          />
        <path
          id="hexagon_7"
          d="M167.626 582.487C167.626 586.496 165.479 590.198 162.007 592.208L119.239 616.85C115.767 618.848 111.498 618.848 108.026 616.85L65.2451 592.208C61.7731 590.21 59.6261 586.496 59.6261 582.487V533.229C59.6261 529.22 61.7731 525.517 65.2451 523.507L108.013 498.854C111.485 496.855 115.755 496.855 119.227 498.854L161.995 523.495C165.467 525.493 167.614 529.208 167.614 533.216V582.487H167.626Z"
          /> -->
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
        <stop offset="0%" stop-color="#ED24F4" />
        <stop offset="50%" stop-color="#1DBBE2" />
        <stop offset="100%" stop-color="#32DEB3" />
      </linearGradient>
    </defs>
  </svg>

</template>