<!-- HexagonSingle -->

<script setup>
  defineProps ( {
    color: {
      type: String,
      default: 'red',
      validate: value => value?.match ( /^#([A-Fa-f0-9]{8}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/ ) // hex color
        || value?.match ( /^rgb\([ ]?[1-2]?[0-9]?[0-9][ ]?,[ ]?[1-2]?[0-9]?[0-9][ ]?,[ ]?[1-2]?[0-9]?[0-9][ ]?\)$/ ) // rgb color
        || value?.match ( /^rgba\([ ]?[1-2]?[0-9]?[0-9][ ]?,[ ]?[1-2]?[0-9]?[0-9][ ]?,[ ]?[1-2]?[0-9]?[0-9][ ]?,[ ]?(0.)?[0-9]+[ ]?\)/ ) // rgba color
        || value?.match ( /^[a-z]+$/ ) // color name
    },
    flat: {
      type: Boolean,
      default: true,
    },
  })

  const hexagon = useHexagons ()

</script>

<template>
  
  <svg class="hexagon" width="109" height="122" viewBox="0 0 109 122" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    <defs v-if="!flat">
          
      <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feComponentTransfer in=SourceAlpha>
          <feFuncA type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur stdDeviation="4"/>
        <feOffset dx="-4" dy="6" result="offsetblur"/>
        <feFlood flood-color="rgb(0, 0, 0)" result="color"/>
        <feComposite in2="offsetblur" operator="in"/>
        <feComposite in2="SourceAlpha" operator="in" />
        <feMerge>
          <feMergeNode in="SourceGraphic" />
          <feMergeNode />
        </feMerge>
      </filter>
    </defs>

    <path
      class="hexagon_path"
      :d="hexagon.path"
      :fill="color"
      :filter="!flat ? 'url(#inset-shadow)' : null"
      />
  </svg>

</template>

<style lang="sass">
.hexagon
  height: fit-content
</style>