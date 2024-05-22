<!-- app -->

<script setup>
  import { useElementBounding } from '@vueuse/core'
  import { useTemplateStore } from '../stores/template'

  useHead ({
    htmlAttrs: {
      class: 'bg-surface',
    },
    link: [{
      rel:'icon',
      type: 'image/svg+xml',
      href: '/favicon.svg'
    }],
  })

  const menu = useMenu ()
  const template = useTemplateStore ()
  const route = useRoute ()
  console.log('route',route)

  const footer_el = ref ()
  template.add_element( 'footer', footer_el )
  const {
    height: footer_height,
  } = useElementBounding ( footer_el )
  
</script>

<template>

  <!-- app content -->
  <VApp id="application" class="bg-surface">

    <VContainer id="app_container" class="bg-surface"
      :style="{
        marginBottom: `${ footer_height }px`
      }">

      <!-- <select v-model="$colorMode.preference">
        <option value="system">System</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select> -->
        <!-- <option value="sepia">Sepia</option> -->

      <VRow
        no-gutters
        class="content_row d-flex justify-center"
        >
        
        <VCol
          v-if="route.fullPath === '/'"
          cols="2"
          class="side_nav_wrapper"
          >
          <SideNav :menu_items="menu.main_menu" />
        </VCol>

        <VCol
          cols="12"
          class="main_content"
          >
          <NuxtPage />
        </VCol>

      </VRow>

    </VContainer>
      
    <VRow id="app_footer" class="footer_row" ref="footer_el">
      <VCol>
        
        <VFooter>
          <TheFooter id="the_footer" />
          <TheCopyrights
            id="the_copyrights"
            />
        </VFooter>
        
      </VCol>
    </VRow>
  </VApp>
  
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

#application
  overflow-x: hidden
  position: relative
  z-index: 1

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
  padding: 0
  margin: 0
  max-width: 100vw
  min-height: 100vh
  margin-bottom: 37rem // magic number, should be overwritten by inline style
  z-index: 1

  .content_row
    width: 100vw
    max-width: 100vw
    min-width: 100vw

.v-footer
  display: flex
  flex-direction: column
  justify-content: center
  padding: 0 4rem

#app_footer
  bottom: 0
  overflow-x: hidden
  padding: 0 12rem
  position: fixed
  width: 100vw

#the_copyrights
  position: relative
  bottom: 0
  color: gray
  font-size: .75em

.side_nav
  &_wrapper
    align-items: center
    display: flex
    left: 0
    min-height: 62%
    overflow: hidden
    padding-right: 10%
    position: fixed
    width: 12rem
    z-index: 9

    &::before
      background: linear-gradient(0deg, transparent, rgba(0,0,0,.1), transparent)
      content: ''
      display: block
      height: 50vh
      width: 2px

.main_content
  position: relative
  
  .main > .v-row
    padding: 0 12rem
    max-width: 100vw
    min-width: 100vw
    overflow-x: hidden
    position: relative
    left: 0

    .v-col
      max-width: calc(100% - 24rem) !important
      padding: 0
      overflow: visible

</style>