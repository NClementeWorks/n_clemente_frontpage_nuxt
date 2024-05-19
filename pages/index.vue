<!-- index -->

<script setup lang="ts">
  import gsap from 'gsap'
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { useTemplateStore } from '~/stores/template'
  import { useElementBounding } from '@vueuse/core'
  import { useTimelines } from '~/composables/animations/timelines'

  gsap.registerPlugin ( ScrollTrigger )

  const display = useDisplay ()
  const screen = useScreen ()
  const template = useTemplateStore ()
  const timelines = useTimelines ()
  const menu = useMenu ()
  
  //
  // save profile_pic reference to store
  //
  const profile_pic_el = ref<HTMLElement | null> ( null )
  template.add_element ( 'profile_pic', profile_pic_el )

  /**
   * Init timelines at parent component when child components are mounted
   */
  onMounted ( async () => {

    await nextTick ()

    screen.on_screen_ready ( () => {

      watch ( () => template.elements_ready, ready => {
        if ( ready ) {
          timelines.init_hexagon_timelines ( display )
        }
      },{
        immediate: true,
      })

    })

  })

  onBeforeUnmount ( screen.clear_on_screen_ready_watcher )
  
</script>

<template>
   
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

  <div>
    <div class="main">
    
    <VRow>
      <VCol>
        <TheHero id="the_hero" />
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <TheExpandedStack id="the_expanded_stack" />
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <TheCTA id="the_cta" />
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <TheUseCases id="the_use_cases" />
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <TheTopSkills id="the_top_skills" />
      </VCol>
    </VRow>

    <VRow class="contact_form_row">
      <VCol>
        <TheContactForm id="the_contact_form" />
      </VCol>
    </VRow>
  </div>

  </div>
</template>

<style lang="sass">

  .main
    position: relative

  #the_hero
    min-height: 100vh

  #the_expanded_stack
    height: 55rem

  #the_cta
    height: 8rem

  .section
    padding-top: 2rem

    &_heading
      font-size: calc(var(--font-size-default) * 2.5)
      align-self: flex-start
</style>