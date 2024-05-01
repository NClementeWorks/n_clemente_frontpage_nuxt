export const useHexagons = () => {

  const path = 'M3.8147e-06 85.84C3.8147e-06 89.8822 2.1669 93.6153 5.67106 95.6425L48.8351 120.489C52.3393 122.504 56.6482 122.504 60.1524 120.489L103.329 95.6425C106.833 93.6276 109 89.8822 109 85.84V36.1722C109 32.13 106.833 28.397 103.329 26.3697L60.1648 1.51117C56.6606 -0.503724 52.3517 -0.503724 48.8475 1.51117L5.68346 26.3573C2.1793 28.3722 0.0123843 32.1176 0.0123843 36.1598V85.84H3.8147e-06Z'
  
  const hexagon_width_px = 109
  const hexagon_height_px = 122

  const hexagon_proportions = hexagon_height_px / hexagon_width_px

  const hexagon_grid_gap_px = 8
  
  const hexagon_grid_width_px = hexagon_width_px + hexagon_grid_gap_px
  const hexagon_grid_height_px = ( hexagon_height_px  * .75 ) + hexagon_grid_gap_px

  const hexagon_grid_column_px = ( col : number ) => hexagon_grid_width_px * .5 * col
  const hexagon_grid_row_px = ( row : number ) => hexagon_grid_height_px * row

  const hexagon_compressed_grid_column_px = ( col : number ) => ( hexagon_grid_width_px - hexagon_grid_gap_px ) * .5 * col
  const hexagon_compressed_grid_row_px = ( row : number ) => ( hexagon_grid_height_px - hexagon_grid_gap_px ) * row

  
  const base_scroll_trigger = ( { trigger, ...args } : any ) => ({
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

  return {

    path,
    hexagon_width_px,
    hexagon_height_px,

    get default_width_px () { return hexagon_width_px },
    get default_height_px () { return hexagon_height_px },

    get hexagon_grid_gap_px () { return hexagon_grid_gap_px },
    get hexagon_grid_width_px () { return hexagon_grid_width_px },
    get hexagon_grid_height_px () { return hexagon_grid_height_px },

    get hexagon_proportions () { return hexagon_proportions },

    hexagon_grid_column_px,
    hexagon_grid_row_px,

    hexagon_compressed_grid_column_px,
    hexagon_compressed_grid_row_px,

    base_scroll_trigger,

  }
}