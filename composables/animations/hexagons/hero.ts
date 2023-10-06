import gsap from 'gsap'
import { useHexagons } from "#imports"

export const useAnimationsHexagonsHero = () => {

  const hexagon = useHexagons ()

  const tl_hero = gsap.timeline ({})

  const hero_cols = [ 0, 1, 0, 1, 3, 2, 1 ]
  const hero_rows = [ 0, 1, 2, 3, 3, 4, 5 ]
  
  function init_start ( screen_width : Ref<number> ) : any {
    return {
      x: ( index : number ) => screen_width.value / 5
        + hexagon.hexagon_grid_column_px( hero_cols [ index ] ),
      y: ( index : number ) => hexagon.default_height_px
        + hexagon.hexagon_grid_row_px ( hero_rows [ index ] ),
      scale: 1,
    }
  }

  function init_timeline (
    hexagon_paths : Ref<SVGElement>,
    hero_start : any
  ) : void {
    tl_hero
      .set (
        hexagon_paths.value,
        hero_start,
      )
  }

  return {
    init_timeline,
    init_start,
  }
}