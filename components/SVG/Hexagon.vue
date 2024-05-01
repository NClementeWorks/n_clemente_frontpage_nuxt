<!-- HexagonSingle -->

<script setup>

  const hexagon = useHexagons ()

</script>

<template>
  
  <svg class="hexagon" width="109" height="122" viewBox="0 0 109 122" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    <defs>
          
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
      fill="#1DBBE2"
      filter="url(#inset-shadow)"
      :d="hexagon.path"
      />
  </svg>

</template>

<style lang="sass">
.hexagon
  height: fit-content
</style>