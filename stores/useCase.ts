import { defineStore } from 'pinia'

export const useUseCaseStore = defineStore ( 'useCase', () => {

  const use_case_images = ref ( [] )

  function set_use_case_images ( values: [ never ] ) {
    use_case_images.value = values
  }

  return {
    use_case_images,
    set_use_case_images,
  }
  
})