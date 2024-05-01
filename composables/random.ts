export const useRandom = () => {
  
  const get_random_int = ( num: number ) => Math.ceil ( Math.random() * num )

  return {
    get_random_int,
  }
}