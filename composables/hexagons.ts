export const useHexagons = () => {
  
  const hexagon_width_px = 109
  const hexagon_height_px = 122

  return {

    get default_width_px () { return hexagon_width_px },
    get default_height_px () { return hexagon_height_px },

  }
}