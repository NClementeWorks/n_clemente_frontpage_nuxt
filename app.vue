<!-- app -->

<script setup>
  useHead ({
    htmlAttrs: {
      class: 'scroll-smooth bg-surface'
    }
  })

</script>

<template>
  <VApp class="bg-off_white">
    <VContainer>
      
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
          <!-- class="flex col-start-1 col-span-5 md:col-span-1 m-0 sticky md:fixed w-full md:w-1/6 h-fit md:h-2/3 shadow-md left-0 top-0 md:left-auto md:shadow-none opacity-80" -->

        <VCol
          cols="10"
          class="main_content"
          >
          <NuxtPage
          />
          <!-- class="relative col-start-1 md:col-start-2 col-span-5 mx-4 py-4 md:px-4 row-start-2 md:row-start-1" -->
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

.v-container
  min-height: 100vh

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

    &::before
      background: linear-gradient(0deg, transparent, rgba(0,0,0,.1), transparent)
      content: ''
      display: block
      height: 50vh
      width: 2px

.main_content
  margin-left: calc( 100vw * ( 2/12 ) )
  position: relative
  
</style>