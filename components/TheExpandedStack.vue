<!-- TheExpandedStack -->

<script setup>
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
</script>

<template>
  <div class="section expanded_stack_section">

    <h2 class="section_heading expanded_stack_heading">The Expanded-Stack</h2>

    <!-- <div
      :style="{
        position: 'absolute',
        top: '10rem',
        display: 'flex',
        flexDirection: 'column',
        left: '38%',
      }"
      >
      <SVGHexagon
        v-for="hex in items.length"
        :key="hex"
        :data="hex"
        :style="{
          position: 'absolute',
          marginLeft: hex % 2 ? '-1.85rem' : '1.85rem',
          top: `${ ( hex - 1 ) * 7.625 * .8 }rem`,
        }"  
        />
    </div> -->

    <div
      id="expanded_stack_items"
      class="expanded_stack_items_wrapper"
      >
      <div
        v-for="item in items"
        :key="item.icon"
        class="expanded_stack_item"
        >
        <VIcon
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