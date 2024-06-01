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
  const menu = useMenu ()
  const timelines = useTimelines ()
  
  //
  // save profile_pic reference to store
  //
  const profile_pic_el = ref<HTMLElement | null> ( null )
  template.add_element ( 'profile_pic', profile_pic_el )

  const row_classes = computed ( () => display.mdAndUp.value ? 'md' : display.smAndUp.value ? 'sm' : '' )
  
  let elements_ready_unwatch : Function | null = null
  let timeline_activation_timeout : NodeJS.Timeout | null = null
  onMounted ( async () => {

    await nextTick ()

    elements_ready_unwatch = watch ( () => template.elements_ready, ready => {
      if ( ready ) {
        timelines.init_hexagon_timelines ()
        template.first_init = false
        // hack to activate vertical positioning
        timeline_activation_timeout = setTimeout ( () => { 
          window.scrollTo ( 0, 1 ) 
        }, 10)
      }
    },{
      immediate: true,
    })
  })

  onBeforeUnmount ( () => {
    timelines.clear_watchers ()
    template.clear_watchers ()

    if ( elements_ready_unwatch )
      elements_ready_unwatch ()

    if ( timeline_activation_timeout )
      clearTimeout ( timeline_activation_timeout )

    template.reset_elements ()
  })
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
    
    <VRow :class="row_classes">
      <VCol class="the_hero_wrapper" >
        <TheHero id="the_hero" />
      </VCol>
    </VRow>

    <VRow :class="row_classes">
      <VCol>
        <TheExpandedStack id="the_expanded_stack" />
      </VCol>
    </VRow>

    <VRow :class="row_classes">
      <VCol>
        <TheCTA id="the_cta" />
      </VCol>
    </VRow>

    <VRow :class="row_classes">
      <VCol>
        <TheUseCases id="the_use_cases" />
      </VCol>
    </VRow>

    <VRow :class="row_classes">
      <VCol>
        <TheTopSkills id="the_top_skills" />
      </VCol>
    </VRow>

    <VRow
      :class="row_classes"
      class="contact_form_row"
      >
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

  .the_hero_wrapper
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