<!-- TheUseCases -->

<script setup>
  import { useTemplateStore } from '../stores/template'
  import { ref } from 'vue'

  const template = useTemplateStore ()
  const router = useRouter ()

  const use_case_img_els = ref ( [] )
  template.add_elements ( 'use_case_imgs', use_case_img_els )

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
          <VCard class="use_case_card">

            <NuxtLink to="/use_cases/multilingual-bible-search">
              <VImg
                ref="use_case_img_els"
                :src="`img/use_cases/${ use_case.img }`"
                ></VImg>
            </NuxtLink>

            <div class="use_case_card_content">
              <VCardTitle>
                <h3 class="use_case_title">
                  <BlocksLink to="use_cases/multilingual-bible-search">
                    {{ use_case.title }}
                  </BlocksLink>
                </h3>
              </VCardTitle>
              
              <VCardSubtitle>
                {{ use_case.client }}
              </VCardSubtitle>

              <VCardActions>
                <!-- <SecondaryBtn
                  @click="router.to ( 'use_cases/multilingual-bible-search' )"
                  append-icon="fas fa-arrow-right"
                > -->
                <BlocksLink
                  to="use_cases/multilingual-bible-search"
                  append_icon="fas fa-arrow-right"
                  class="use_case_read_more"
                  >
                  Read Use Case
                </BlocksLink>
                <!-- </SecondaryBtn> -->
              </VCardActions>
            </div>
          </VCard>
        </VCol>

      </VRow>
    </div>
  </div>
</template>

<style lang="sass">
  .use_cases

    &_section
      padding-top: 4rem

    &_list
      .v-row
        width: 100%

        .v-col
          max-width: 100% !important
          margin: 2rem auto

      .v-card
        max-width: 25rem
        margin: 0 auto

        &--variant-elevated,
        &--variant-flat
          background: transparent

        .v-img
          width: 16rem
          min-width: 16rem
          width: calc(80%)
          max-width: 20rem
          margin: auto

        .use_case

          &_card_content
            background: #fffc
            padding-bottom: 1rem
            margin: 1rem
            border-radius: 3rem

          &_title
            font-size: 2rem
            text-wrap: wrap

            a
              text-decoration: none
              color: rgb( var( --v-theme-surface-variant ) )

              &:hover
                color: rgb( var( --v-theme-blue ) )

          &_read_more
            font-size: var( --v-btn-size )
            font-weight: bold
            margin-left: .5rem

 #the_use_cases .use_cases_list > .v-row > .v-col
  max-width: 100% !important
</style>