<!-- SideNav -->

<script setup>
  const links = [{
    label: 'Home',
    icon: 'home',
    to: '#the_hero'
  }, {
    label: 'Vertical Navigation',
    to: '#vertical-navigation'
  }, {
    label: 'Command Palette',
    icon: '',
    to: '#command-palette'
  }]
</script>

<template>
  <div class="side_nav_menu_list_wrapper overflow-visible">
    <VList
      class="side_nav_menu_list"
      >
      <VListItem
        v-for="link in links"
        :key="link.label"
        :title="link.label"
        :prepend-icon="`fas fa-${ link.icon }`"
        class="side_nav_menu_list_item bg-white opacity-50"
        />
    </VList>
  </div>
</template>

<style lang="sass">
  @import url('./assets/sass/vuetify_settings.scss')

  .v-list.side_nav_menu_list
    
    box-shadow: -.25rem .5rem .5rem rgba( 0, 0, 0, .2 ), -.15rem .9rem 1rem rgba( 0, 0, 0, .1 ), -.05rem .5rem 1.5rem rgba( 0, 0, 0, .05 )
    border-top-right-radius: var( --list-border-radius )
    border-bottom-right-radius: var( --list-border-radius )
    height: fit-content
    overflow: visible
    padding: 0

  .v-list-item.side_nav_menu_list_item
    border-bottom: 1px solid rgba( 0, 0, 0, .1 )

    &:first-child
      border-top-right-radius: var( --list-border-radius )

    &:last-child
      border-bottom-right-radius: var( --list-border-radius )

</style>