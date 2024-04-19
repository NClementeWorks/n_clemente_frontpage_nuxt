<!-- app -->

<script setup>
  useHead ({
    htmlAttrs: {
      class: 'bg-surface'
    }
  })

  const display = useDisplay()

</script>

<template>

  <!-- profile -->
  <div
    id="profile_pic_wrapper"
    :class="{
      md: display.mdAndUp.value
    }"
    >
    <img
      src="/img/profile_300.png"
      />
  </div>
  
  <!-- hexagon -->
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
</template>

<style lang="sass">

*
  font-family: Roboto, sans-serif

html
  overflow-x: hidden
  scroll-behavior: smooth

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

  @media (min-width: 1280px)
    max-width: 62rem

  @media (min-width: 1920px)
    max-width: 70rem

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