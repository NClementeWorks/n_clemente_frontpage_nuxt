<template>
  
  <svg class="hexagon" width="109" height="122" viewBox="0 0 109 122" fill="none" xmlns="http://www.w3.org/2000/svg">
    
    <defs>
      <!-- <filter id="inset-shadow">
        <feOffset dx="-4" dy="4" result="offsetblur" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite operator="in" in2="SourceAlpha" />
      </filter> -->
          
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
      d="M3.8147e-06 85.84C3.8147e-06 89.8822 2.1669 93.6153 5.67106 95.6425L48.8351 120.489C52.3393 122.504 56.6482 122.504 60.1524 120.489L103.329 95.6425C106.833 93.6276 109 89.8822 109 85.84V36.1722C109 32.13 106.833 28.397 103.329 26.3697L60.1648 1.51117C56.6606 -0.503724 52.3517 -0.503724 48.8475 1.51117L5.68346 26.3573C2.1793 28.3722 0.0123843 32.1176 0.0123843 36.1598V85.84H3.8147e-06Z"
      fill="#1DBBE2"
      filter="url(#inset-shadow)"
      />
  </svg>

</template>

<style lang="sass">
.hexagon
  height: fit-content
</style>