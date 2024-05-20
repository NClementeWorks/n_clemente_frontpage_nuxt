export const useUtils = () => {

  const as_plain_object = ( ref_el : any ) => JSON.parse( JSON.stringify ( ref_el ) )

  return {
    as_plain_object,
  }
}