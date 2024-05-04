<!-- app -->

<script setup>
  import gsap from 'gsap'
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { CustomEase } from "gsap/CustomEase"
  import { useTemplateStore } from '../stores/template'

  useHead ({
    htmlAttrs: {
      class: 'bg-surface'
    }
  })

  const display = useDisplay ()
  const hexagon = useHexagons ()
  const screen = useScreen ()
  const template = useTemplateStore ()

  //
  // save profile_pic reference to store
  //
  const profile_pic_el = ref ( null )
  template.add_element ( 'profile_pic', profile_pic_el )

  //
  // register gsap scroll plugin
  //
  gsap.registerPlugin ( ScrollTrigger )

  //
  // init animations setup
  //
  const animations_hero = useAnimationsHexagonsHero ()
  const animations_stack = useAnimationsHexagonsStack ()
  const animations_cta = useAnimationsHexagonsCTA ()
  const animations_use_case = useAnimationsHexagonsUseCase ()
  const animations_skills = useAnimationsHexagonsSkills ()
    
  const screen_width = computed ( () => display.width.value )
  const screen_height = computed ( () => display.height.value )

  let unwatch_screen_width = null

  /**
   * Init timelines at parent component to increase chances of child components mounted
   */
  screen.on_screen_ready ( () => {
    const hexagon_paths = ref ( template.hexagon_paths )
    const cta_hexagon_paths = ref ( template.cta_hexagon_paths )

    /**
     * hero
     */
    const hero_start = animations_hero.init_start ( screen_width )
    animations_hero.init_timeline ( hexagon_paths, hero_start )
    
    /**
     * expanded stack
     */
    const stack_start = animations_stack.init_start ()
    animations_stack.init_timeline ( hexagon_paths, hero_start, stack_start ) //, screen_height )

    /**
     * cta
     */
    const cta_config = animations_cta.calculate_config ()
    const cta_start = animations_cta.init_start ( cta_config )
    animations_cta.init_timeline ( hexagon_paths, stack_start, cta_start )
    //
    // cta sides hexagons
    animations_cta.init_side_hexagons ( cta_hexagon_paths, cta_config )

    /**
     * use cases
     */
    const use_cases_config = animations_use_case.calculate_config ()
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
  })
</script>

<template>

  <div id="app_wrapper">
  <!-- profile -->
  <div
    ref="profile_pic_el"
    id="profile_pic_wrapper"
    :class="{
      md: display.mdAndUp.value
    }"
    >
    <img
      src="/img/profile_300.png"
      />
  </div>
  
  <!-- hexagons group -->
  <SVGHexagonsGroup
    id="hexagons_group" 
    />

  <!-- app content -->
  <VApp class="bg-surface">
    <VContainer id="app_container">
      
      <!-- <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select> -->
        <!-- <option value="sepia">Sepia</option> -->

      <VRow
        no-gutters
        class="d-flex justify-center"
        >
        
        <VCol
          cols="2"
          class="side_nav_wrapper"
          >
          <TheSideNav />
        </VCol>

        <VCol
          cols="12"
          class="main_content"
          >
          <NuxtPage />
        </VCol>

      </VRow>

    </VContainer>
  </VApp>
  </div>
</template>

<style lang="sass">

*
  font-family: Roboto, sans-serif

html
  overflow-x: hidden
  overflow-y: visible
  scroll-behavior: smooth
  max-width: 100vw
  width: 100vw

body
  max-width: 100vw
  width: 100vw
  margin: 0 !important

#app_wrapper
  overflow: hidden

#hexagons_group
  position: absolute
  top: 0
  left: 0

#profile_pic_wrapper
  position: absolute
  opacity: .3
  top: 6rem
  left: -6rem

  &.md
    left: 25vw

#app_container
  min-height: 100vh
  padding-left: 1rem


  @media (min-width: 960px)
    padding-left: 10rem


.side_nav
  &_wrapper
    align-items: center
    display: flex
    min-height: 62%
    overflow: hidden
    padding-right: 10%
    position: fixed
    width: 100%
    z-index: 9
    left: 0

    &::before
      background: linear-gradient(0deg, transparent, rgba(0,0,0,.1), transparent)
      content: ''
      display: block
      height: 50vh
      width: 2px

.main_content
  position: relative
  
</style>