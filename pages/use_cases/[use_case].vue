<script setup lang="ts">
  const use_case_id = useRoute().params.use_case
  const navigation = await fetchContentNavigation()

  const current_nav_idx = computed ( () => navigation [ 0 ].children.findIndex( ( nav : any ) => nav._path.split ( '/' ) [ 2 ] === use_case_id ) )
  const current_nav = computed ( () => navigation [ 0 ].children [ current_nav_idx.value ] )

  const prev_item = computed ( () => navigation [ 0 ].children [ current_nav_idx.value - 1 ] || null )
  const next_item = computed ( () => navigation [ 0 ].children [ current_nav_idx.value + 1 ] || null )
</script>

<template>
  <div>
    <div class="main page">
    
      <VRow>
        <VCol>

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


          <ContentDoc>
            <template v-slot="{ doc }">
                
              <VRow
                no-gutters
                class="content_row d-flex justify-center"
                >
                
                <VCol
                  cols="2"
                  class="side_nav_wrapper"
                  >
                  <SideNav :menu_items="doc?.body?.children?.filter( node=>node.tag==='h2').map( node => ({ link: `#${ node.props?.id }`, label: node.children?.find(n=>n.type==='text')?.value }) )" />
                  <!-- <div class="side_nav_menu_list_wrapper overflow-visible">
                    <VList
                      class="side_nav_menu_list"
                      >
                      <VListItem
                        v-for="menu in doc?.body?.children?.filter( node=>node.tag==='h2').map( node => ({ link: `#${ node.props?.id }`, label: node.children?.find(n=>n.type==='text')?.value }) )"
                        :key="menu.link"
                        class="side_nav_menu_list_item bg-white"
                        >
                        <BlocksLink
                          :link="menu.link"
                          >
                          {{ menu.label }}
                        </BlocksLink>
                      </VListItem>
                    </VList>
                  </div> -->
                </VCol>
              </VRow>

  

              <img :src="doc.image.src" class="page_header_image" />
              <div class="page_title">
                <h1>{{ doc.title }}</h1>
                <span class="page_subheading">{{ doc.description }}</span>
              </div>

              <ContentRenderer :value="doc" class="page_content" />
            </template>
            
            <template #not-found>
              <h1>Our apologies, we could not find the page you are requesting</h1>
            </template>
          </ContentDoc>


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

  &_header_image
    margin-top: 2em

  &_title
    margin: 2em 0

    h1
      font-size: 4.5rem

  &_subheading
    font-style: italic
    font-size: 2rem

  &_image
    max-width: 50%

  &_content
    margin: 4rem 0

    a
      color: rgb( var( --v-theme-primary-darken-1 ) )

      &:hover
        color: rgb( var( --v-theme-blue ) )

      &:visited
        color: rgb( var( --v-theme-secondary-darken-1 ) )
        &:hover
          color: rgb( var( --v-theme-blue ) )

    h2, h3, h4
      margin-top: 3em

    h2
      font-size: 3em

      &:first-of-type
        margin-top: 1.5em

    p
      color: rgb( var( --v-theme-surface-variant ) )
      font-size: 1.15rem
      line-height: 1.65

    .figure
      align-items: center
      display: flex
      flex-direction: column
      margin: 4rem 0

      em
        margin-top: 1em

    blockquote
      background: rgba(var(--v-theme-green), .15)
      border: 1px solid #8888
      border-radius: 1rem
      font-size: .8rem
      padding: 1rem 2rem
      margin: 0

      h2:first-child, h3:first-child, h4:first-child
        margin-top: 1em

      p
        font-size: .8rem

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


.main_content .main > .v-row .v-col.side_nav_wrapper
  max-width: fit-content !important
</style>