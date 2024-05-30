<!-- SideNav -->

<script setup>
  import gsap from 'gsap'

  const display = useDisplay ()

  const props = defineProps({
    menu_items: {
      type: Array,
      validate: items => items.every ( item => item.link?.match ( /^#\w/ ) && item.label.trim ().length )
    }
  })

  //
  // mobile menu open/close
  //
  const is_open = ref ( false )

  //
  // mobile menu transitions
  //
  const beforeEnter = el => {
    el.style.opacity = 0
    el.style.height = 0
  }

  const onEnter = (el, done) => {
    gsap.to ( el, {
      opacity: 1,
      height: '4rem',
      delay: el.dataset.index * 0.10,
      onComplete: done,
    })
  }

  const onLeave = (el, done) => {
    gsap.to ( el, {
      opacity: 0,
      height: 0,
      delay: el.dataset.index * 0.03,
      onComplete: done,
    })
  }

  const close_menu = () => {
      is_open.value = false
  }
</script>

<template>
  <div
    class="side_nav_menu_list_wrapper overflow-visible"
    :class="display.mdAndUp.value ? 'md' : display.smAndUp.value ? 'sm' : ''"
    >
    
    <VList
      class="side_nav_menu_list"
      >
      <TransitionGroup appear
        @before-enter="beforeEnter"
        @enter="onEnter"
        @leave="onLeave"
        >
        <VListItem
          class="side_nav_menu_list_item bg-white"
          @click="is_open = !is_open"
          >
          <VIcon
            :icon="`fas fa-${ is_open ? 'xmark' : 'bars' }`"
            />
        </VListItem>
        <template v-if="is_open">
          <VListItem
            v-for="( menu, index ) in menu_items"
            :key="menu.link"
            :data-index="index"
            class="side_nav_menu_list_item bg-white"
            :class="{
              highlight: menu.highlight
            }"
            @click="close_menu"
            >
            <BlocksLink
              :link="menu.link"
              >
              {{ menu.label }}
            </BlocksLink>
          </VListItem>
        </template>
      </TransitionGroup>
    </VList>
  </div>
</template>

<style lang="sass">

  .side_nav
    &_wrapper
      background-image: radial-gradient( ellipse at center left, rgba( var( --v-theme-black ), .1 ), transparent 57% )
      margin-top: 2rem

      &.md,
      &.sm
        margin-top: 0

    &_menu_list_wrapper
      padding-right: 1rem

      .side_nav_menu_list_item.v-list-item
        padding-inline-start: .5rem
        min-height: 4rem

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

      .v-list-item--density-default:not(.v-list-item--nav).v-list-item--one-line
        padding-inline: .5rem

        .v-list-item__content,
        .blocks_link
          display: flex
          align-items: center
          height: 100%
          width: 100%

        &:first-child
          border-top-right-radius: var( --list-border-radius )

        &:last-child
          border-bottom-right-radius: var( --list-border-radius )

      &.sm,
      &.md
        .side_nav_menu_list_item.v-list-item
          padding: 0 1rem

        .v-list-item.side_nav_menu_list_item

          &:first-child
            border-top-right-radius: var( --list-border-radius )

          &:last-child
            border-bottom-right-radius: var( --list-border-radius )
</style>