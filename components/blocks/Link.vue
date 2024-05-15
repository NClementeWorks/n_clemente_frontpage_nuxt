<!-- BlocksLink -->

<script setup>
  const props = defineProps ({
    link: {
      type: String,
      default: '',
    },
    external: {
      type: Boolean,
      default: false,
    },
  })

  const {
    link,
  } = toRefs ( props )
  
  /**
   * Anchor links
   */

  const is_anchor = computed ( () => link.value.match( /^#/ ) )

  function scrollToAnchor () {
    document
      .querySelector ( link.value )
      .scrollIntoView ({
        behavior: 'smooth',
        block: 'center',
      })
  }
</script>

<template>
  <a
    v-if="is_anchor"
    class="blocks_link"
    @click.prevent="scrollToAnchor"
    >
    <slot>{{ link }}</slot>
  </a>
  <NuxtLink
    v-else
    :to="link"
    :target="external ? '_blank' : ''"
    class="blocks_link"
    >
      <slot>{{ link.replace ( 'http://www.', '' ) }}</slot>
    <VIcon
      v-if="external"
      icon="fas fa-up-right-from-square"
      size="x-small"
      class="blocks_link_icon"
      ></VIcon>
  </NuxtLink>
</template>

<style lang="sass">

 a.blocks_link
  color: rgba( var( --v-theme-on-background ), var( --v-medium-emphasis-opacity ) )
  cursor: pointer
  display: flex
  text-decoration: none
  transition: all .2s ease
  position: relative
  width: fit-content
  overflow: visible

  .blocks_link_icon
    margin-left: .38em

  &:hover
    color: rgba( var( --v-theme-blue ), var( --v-high-emphasis-opacity ) )
    // text-decoration: underline
    // transition: all .3 ease
    &::before
      width: 100%

  &::before
    content: ''
    height: 2px
    background: rgb( var( --v-theme-blue ) )
    width: 0%
    position: absolute
    bottom: -1px
    left: 0
    transition: all .2s ease

</style>