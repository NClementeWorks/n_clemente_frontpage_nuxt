<!-- SideNav -->

<script setup>
  const menu = useMenu ()
</script>

<template>
  <div class="side_nav_menu_list_wrapper overflow-visible">
    <VList
      class="side_nav_menu_list"
      >
      <VListItem
        v-for="menu in menu.main_menu"
        :key="menu.link"
        class="side_nav_menu_list_item bg-white opacity-50"
        :class="{
          highlight: menu.highlight
        }"
        >
        <BlocksLink
          :link="menu.link"
          >
          {{ menu.label }}
        </BlocksLink>
      </VListItem>
    </VList>
  </div>
</template>

<style lang="sass">

  .side_nav
    &_wrapper
      background-image: radial-gradient( ellipse at center left, rgba( var( --v-theme-black ), .1 ), transparent 57% )

    &_menu_list_wrapper
      padding-right: 1rem

  .v-list.side_nav_menu_list
    box-shadow: -.25rem .5rem .5rem rgba( 0, 0, 0, .2 ), -.15rem .9rem 1rem rgba( 0, 0, 0, .1 ), -.05rem .5rem 1.5rem rgba( 0, 0, 0, .05 )
    border-top-right-radius: var( --list-border-radius )
    border-bottom-right-radius: var( --list-border-radius )
    height: fit-content
    overflow: visible
    padding: 0

  .v-list-item.side_nav_menu_list_item
    border-bottom: 1px solid rgba( 0, 0, 0, .1 )
    cursor: pointer

    &:first-child
      border-top-right-radius: var( --list-border-radius )

    &:last-child
      border-bottom-right-radius: var( --list-border-radius )

</style>