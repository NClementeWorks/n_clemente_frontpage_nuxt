<!-- TheCTA -->

<script setup>
  import { useTemplateStore } from "~/stores/template"

  const template = useTemplateStore ()
  const display = useDisplay ()
  const hexagons = useHexagons ()
  const menu = useMenu ()

  const cta_el = ref ()
  template.add_element ( 'cta_section', cta_el )
  
  onBeforeUnmount ( () => {
    template.clear_watchers ()
  })
</script>

<template>
  <div class="cta_section" ref="cta_el">

    <PrimaryBtn
      :to="menu.nav.contact_form.link"
      nuxt
      >
      {{ menu.nav.contact_form.label }}
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