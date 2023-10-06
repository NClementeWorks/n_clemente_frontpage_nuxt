export const useHexagons = () => {
  
  const hexagon_width_px = 109
  const hexagon_height_px = 122

  const hexagon_grid_gap_px = 8
  
  const hexagon_grid_width_px = hexagon_width_px + hexagon_grid_gap_px
  const hexagon_grid_height_px = ( hexagon_height_px  * .75 ) + hexagon_grid_gap_px

  const hexagon_grid_column_px = ( col : number ) => hexagon_grid_width_px * .5 * col
  const hexagon_grid_row_px = ( row : number ) => hexagon_grid_height_px * row

  const hexagon_compressed_grid_column_px = ( col : number ) => ( hexagon_width_px - hexagon_grid_gap_px ) * .5 * col
  const hexagon_compressed_grid_row_px = ( row : number ) => ( hexagon_height_px - hexagon_grid_gap_px ) * row

  
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

    get default_width_px () { return hexagon_width_px },
    get default_height_px () { return hexagon_height_px },

    get hexagon_grid_gap_px () { return hexagon_grid_gap_px },
    get hexagon_grid_width_px () { return hexagon_grid_width_px },

    hexagon_grid_column_px,
    hexagon_grid_row_px,

    hexagon_compressed_grid_column_px,
    hexagon_compressed_grid_row_px,

    base_scroll_trigger,

  }
}