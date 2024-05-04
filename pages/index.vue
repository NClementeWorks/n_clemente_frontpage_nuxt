<!-- index -->

<script setup>



</script>

<template>
  <div>
    
    <VRow>
      <VCol>
        <TheHero id="the_hero" ref="the_hero_el" />
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

    <VRow class="footer_row">
      <VCol>
        
        <VFooter>
          <TheFooter id="the_footer" />
          <TheCopyrights
            id="the_copyrights"
            :style="{
              left: `calc( ( ${ display.width.value }px - 1200px ) / 2 )`
            }"
            />
        </VFooter>
        
      </VCol>
    </VRow>

  </div>
</template>

<style lang="sass">

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

  #the_copyrights
    position: fixed
    width: calc( 10% )
    /* border: 1px solid white */
    text-align: left
    bottom: 0
    color: gray
</style>