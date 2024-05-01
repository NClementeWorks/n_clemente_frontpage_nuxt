<!-- TheHero -->

<script setup>
  const display = useDisplay ()
  const menu = useMenu ()
</script>

<template>
  <div>

    <!-- text bubble -->
    <div
      id="text_bubble_wrapper"
      :class="{
        md: display.mdAndUp.value
      }"
      >
      <div
        class="text_bubble_image"
        >
        <SVGTextBubble />
      </div>
      
      <div class="text_bubble_text_wrapper">
        <div class="text_bubble_text_line--top">
          <h3 class="text_bubble_text text_bubble_text--hi">Hi!</h3>
          <h1 class="text_bubble_text text_bubble_text--name">My name is</h1>
        </div>
        
        <h1 class="text_bubble_text text_bubble_text--full_name">Noliani Clemente</h1>
      </div>
      
    </div>

    <!-- hero text -->
    <div
      id="hero_heading"
      :class="{
        md: display.mdAndUp.value
      }">

      <h2 class="hero_heading_text hero_heading_text--pre">I'm a</h2>
      <h2 class="hero_heading_text hero_heading_text--developer">Full-Stack Developer</h2>
      <div class="hero_heading_text_line"></div>
      <div class="hero_heading_text hero_heading_text_line--last">
        <VIcon
          icon="fas fa-plus"
          class="hero_heading_text hero_heading_text--plus"
          />
        <h2 class="hero_heading_text hero_heading_text--designer">UX Designer</h2>
      </div>
      <!-- <h2 class="text-4xl py-4">Expanded-Stack Developer</h2> -->

      <div class="hero_buttons">
        <PrimaryBtn
          :to="menu.nav.contact_form.link"
          nuxt
          >
          {{ menu.nav.contact_form.label }}
        </PrimaryBtn>

        <SecondaryBtn
          :to="menu.nav.stack.link"
          nuxt
          >
          Explore
        </SecondaryBtn>
      </div>

      <div class="profile_links">

        <h4 class="profile_links_heading">Profile Links</h4>

        <BlocksLink
          v-for="link in menu.profile_links"
          :key="link.link"
          :link="link.link"
          :external="true"
          />

      </div>

    </div>

  </div>
</template>

<style lang="sass">

  #text_bubble_wrapper
    position: absolute
    left: 4rem
    top: 1rem

    &.md
      left: 19rem

    .text_bubble_image
      position: absolute
      min-width: 20rem
      min-height: 15rem
      padding: 1rem
      top: -3rem
      left: -4rem

    .text_bubble_text
      font-weight: var( --font-weight-thin )
      white-space: nowrap
      margin: 0

      &_wrapper
        position: absolute
        top: 1.5rem
        left: .75rem
        display: flex
        flex-direction: column

      &_line--top
        display: flex
        align-items: baseline

      &--hi
        font-size: calc( var( --font-size-default ) * 2.5 )
        margin-right: .5rem 
        opacity: .5
      &--name
        font-size: calc( var( --font-size-default ) )
        opacity: .75
        width: fit-content
      &--full_name
        font-size: calc( var( --font-size-default ) * 1.75 )

  #hero_heading
    left: 13.75rem
    position: relative
    top: 19rem
    width: fit-content

    .hero_heading_text
      font-weight: var( --font-weight-thiner )
      margin: 0
      padding-bottom: .5rem

      &--pre
        font-size: calc( var( --font-size-default ) * 1.2 )
        opacity: .85

      &--developer,
      &--designer
        font-size: calc( var( --font-size-default ) * 2.5 )

      &--plus
        position: absolute
        left: -2rem

      &_line
        height: 1px
        width: 100vw
        background: rgb( var( --v-theme-gray ) )
        opacity: .38

        &--last
          align-items: center
          display: flex
          position: reltive

    .hero_buttons
      display: flex
      flex-wrap: wrap
      margin-top: 3rem

      .v-btn
        margin-right: 2rem
    
    &.md
      top: 12rem
      left: 27rem
      width: 36vw

    .profile_links

      margin-top: 4rem

      &_heading
        color: rgba( var( --v-theme-black ), .5 )
        font-size: 1.25rem

      .blocks_link
        font-size: 1.25rem
        margin-top: 1rem

        &:last-child
          padding-bottom: 1px // hack, otherwise underline appears less thick than it should -NC 27-09-23

</style>