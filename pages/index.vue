<!-- index -->

<script setup>
  const display = useDisplay()
</script>

<template>
  <div>

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

    <SVGHexagonsGroup
      id="hexagons_group"
      :class="{
        md: display.mdAndUp.value
      }"
      
      />

    <VRow>
      <VCol>
        <TheHero id="the_hero" />
      </VCol>
    </VRow>

    <VRow>
      <VCol>
        <TheExpandedStack id="the_expanded_stack" />
      </VCol>
    </VRow>

  </div>
</template>

<style lang="sass">
  #profile_pic_wrapper
    position: absolute
    opacity: .3
    top: 6rem
    left: -6rem

    &.md
      left: 0

  #hexagons_group
    position: absolute
    top: 14rem
    left: -8rem

    &.md
      top: 6rem
      left: -7rem

  #the_hero
    height: 50rem
</style>