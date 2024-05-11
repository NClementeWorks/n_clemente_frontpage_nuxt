<!-- TheCopyrights -->

<template>
  <div class="copyrights_section">
    <p>Design & Development by Noliani Clemente
      <VIcon
        icon="fas fa-hand-spock"
        size="x-small"
        />
        with VueJS and Nuxt
    </p>
    <p>© Noliani Clemente {{ new Date().getYear() + 1900 }}</p>
  </div>
</template>

<style lang="sass">
  .copyrights_section
    background: transparent
    text-align: center
    left: 0
    padding: 1rem

    p
      color: rgb( var( --v-theme-surface ) )
      opacity: .8
</style>