<script setup lang="ts">
  const use_case_id = useRoute().params.use_case
  const navigation = await fetchContentNavigation()

  const current_nav_idx = computed ( () => navigation [ 0 ].children.findIndex( ( nav : any ) => nav._path.split ( '/' ) [ 2 ] === use_case_id ) )
  const current_nav = computed ( () => navigation [ 0 ].children [ current_nav_idx.value ] )

  const prev_item = computed ( () => navigation [ 0 ].children [ current_nav_idx.value - 1 ] || null )
  const next_item = computed ( () => navigation [ 0 ].children [ current_nav_idx.value + 1 ] || null )
  console.log('current_nav', current_nav )
</script>

<template>
  <div>
    <div class="main page">
    
      <VRow>
        <VCol>

          <!-- <ContentNavigation /> -->
          <ul class="page_breadcrumbs">
            <li>
              <BlocksLink to="/">
                Home
              </BlocksLink>
            </li>
            <li>
              <VIcon class="icon" icon="fa-chevron-right" size="x-small" />
              <BlocksLink :to="navigation [ 0 ]._path">
                {{ navigation [ 0 ].title }}
              </BlocksLink>
            </li>
            <li>
              <VIcon class="icon" icon="fa-chevron-right" size="x-small" />
              {{ current_nav.title }}
            </li>
          </ul>


          <h1 class="page_title">{{ current_nav.title }}</h1>

          <ContentDoc />

          <div class="page_bottom_nav">
            <BlocksLink
              v-if="prev_item"
              :to="prev_item._path"
              class="page_bottom_nav_prev">
              <div class="page_bottom_nav_wrapper">
                <div class="page_bottom_nav_top">
                  <VIcon class="icon" icon="fa-angles-left" size="x-small" /> Previous Use Case
                </div>
                <div>
                  <em>{{ prev_item.title }}</em>
                </div>
              </div>
            </BlocksLink>
            <BlocksLink
              v-if="next_item"
              :to="next_item._path"
              class="page_bottom_nav_next">
              <div class="page_bottom_nav_wrapper">
                <div class="page_bottom_nav_top">
                  Next Use Case <VIcon class="icon" icon="fa-angles-right" size="x-small" />
                </div>
                <div>
                  <em>{{ next_item.title }}</em>
                </div>
              </div>
            </BlocksLink>
          </div>
  
        </VCol>
      </VRow>
    </div>

  </div>
</template>

<style lang="sass">
.page
  padding: 1rem

  &_breadcrumbs
    display: flex
    list-style: none
    padding: 0
    
    li
      display: flex
      align-items: center

      .icon
        margin: 0 .5rem

      // &:not(:first-child)::before
      //   font-family: var( --fa-font-solid )
      //   content: '\f105'
      //   margin: 0 .5rem

  &_title
    margin: 2em 0

  &_bottom_nav
    border-top: 1px solid rgb( var( --v-theme-gray ) )
    display: grid
    grid-template-columns: 1fr 1fr
    margin-top: 2rem
    padding: 4rem 0

    &_wrapper
      display: flex
      flex-direction: column

    &_top
      display: flex
      align-items: center

    &_prev
      grid-column: 1

      .icon
        margin-right: .5rem

    &_next
      grid-column: 2
      text-align: right
      justify-self: end

      .page_bottom_nav_top
        justify-content: end

      .icon
        margin-left: .5rem
</style>