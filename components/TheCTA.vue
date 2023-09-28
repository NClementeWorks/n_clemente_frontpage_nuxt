<!-- TheCTA -->

<script setup>

  const display = useDisplay ()
  const hexagon_width_px = 109
  const hexagon_height_px = 122

  const background_hexagons_amount = computed ( () => Math.ceil ( display.width.value / hexagon_width_px ) + 1 )
  
</script>

<template>
  <div class="cta_section">

    <div
      v-for="line in 2" :key="line"
      :style="{
        position: 'absolute',
        top: `${ line % 2 ? '-' : '' }${ hexagon_height_px / 2.75 }px`,
        left: line % 2 ? '0' : `-${ hexagon_width_px / 2 }px`,
        maxWidth: '100%',
      }"
      >
      <SVGHexagon
        v-for="hex in background_hexagons_amount"
        :key="hex"
        :style="{
          position: 'absolute',
          left: ( hex - 1 ) * hexagon_width_px,
        }"  
        />
    </div>

    <PrimaryBtn>
      Lets Work!
    </PrimaryBtn>

  </div>
</template>

<style lang="sass">
  .cta_section
    display: flex
    align-items: center
    justify-content: center
    position: relative
</style>