<!-- TheExpandedStack -->

<script setup>
 import { useTemplateStore } from "~/stores/template"

  const template = useTemplateStore ()

  const expanded_stack_items = ref ()
  const expanded_stack_item_first_icon = ref ()
  
  template.add_element ( 'stack_items', expanded_stack_items )
  template.add_element ( 'stack_first_icon', expanded_stack_item_first_icon )

  const items = [
    {
      icon: 'user',
      text: 'User Experience<br />Design',
    },
    {
      icon: 'paintbrush',
      text: 'UI Graphic<br />Design',
    },
    {
      icon: 'desktop',
      text: 'Front-end<br />Development',
    },
    {
      icon: 'network-wired',
      text: 'REST API',
    },
    {
      icon: 'server',
      text: 'Back-end<br />Development',
    },
    {
      icon: 'database',
      text: 'SQL<br />Databases',
    },
  ]

  const set_expanded_stack_item_first_icon = ( el, index ) => {
    if ( index === 0 )
      expanded_stack_item_first_icon.value = el?.$el
  }
</script>

<template>
  <div class="section expanded_stack_section">

    <h2 class="section_heading expanded_stack_heading">The Expanded-Stack</h2>

    <div
      ref="expanded_stack_items"
      id="expanded_stack_items"
      class="expanded_stack_items_wrapper"
      >
      <div
        v-for="( item, index ) in items"
        :key="item.icon"
        class="expanded_stack_item"
        >
        <VIcon
          :ref="el => set_expanded_stack_item_first_icon ( el, index )"
          :icon="item.icon"
          size="x-large"
          />
        <div class="expanded_stack_text">
          <div v-html="item.text"></div>
          <div class="expanded_stack_text_line"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<style lang="sass">
  .expanded_stack

    &_section
      display: flex
      flex-direction: column
      align-items: center
      position: relative

    &_item
      margin: 1.8rem 0 2.23rem
      display: flex
      align-items: center

      &:nth-child(2n)
        margin-left: 3.6rem

      .v-icon
        color: rgb( var( --v-theme-blue ) )
        mix-blend-mode: color-burn

    &_text
      margin-left: 2rem
      font-size: 1.25rem
      color: rgb( var( --v-theme-gray ) )
      position: relative

      &_line
        height: 1px
        width: 100vw
        background: rgb( var( --v-theme-gray ) )
        position: absolute
        left: 0
        top: 1.5rem
        opacity: .38

</style>