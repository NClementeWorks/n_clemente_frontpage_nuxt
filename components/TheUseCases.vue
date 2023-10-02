<!-- TheUseCases -->

<script setup>
  const use_cases = [
    {
      title: 'Multilingual Bible Search',
      img: 'multilingual_bible_search.png',
      client: 'One Voice Fellowship',
    },
    {
      title: 'Vuetify + WP Nested Taxonomy Selector',
      img: 'vuetify_+_wp_nested_taxonomy_selector.png',
      client: 'One Voice Fellowship',
    },
  ]
</script>

<template>
  <div class="section use_cases_section">
    <h2 class="section_heading use_cases_heading">Use Cases</h2>

    <div class="use_cases_list">
      <VRow no-gutters>
        
        <VCol
          v-for="use_case in use_cases"
          :key="use_case.title"
          cols="6"
          >
          <VCard>

            <VImg :src="`img/use_cases/${ use_case.img }`"></VImg>

            <VCardTitle>
              <h3 class="use_case_title">{{ use_case.title }}</h3>
            </VCardTitle>
            
            <VCardSubtitle>
              {{ use_case.client }}
            </VCardSubtitle>

            <VCardActions>
              <SecondaryBtn
                append-icon="fas fa-arrow-right"
                >
                Read Use Case
              </SecondaryBtn>
            </VCardActions>
          </VCard>
        </VCol>

      </VRow>
    </div>
  </div>
</template>

<style lang="sass">
  .use_cases

    &_list
      .v-card
        margin: 1rem 2rem

        &--variant-elevated,
        &--variant-flat
          background: transparent

        .use_case
          &_title
            font-size: 2rem
            text-wrap: wrap

</style>