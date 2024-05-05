<!-- TheFooter -->

<script setup lang="ts">
  const menu = useMenu ()
</script>

<template>
  <div class="section footer_section">
    <h3 class="section_heading footer_heading">
      Thanks for Visiting
    </h3>

    <VRow>
      <VCol>
 
        <div class="footer_menu">
          <BlocksLink
            v-for="menu_item in menu.main_menu"
            :key="menu_item.link"
            class="footer_menu_link"
            :class="{
              highlight: menu_item.highlight
            }"
            :link="menu_item.link"
            >
            {{ menu_item.label }}
          </BlocksLink>
        </div>

      </VCol>
      <VCol>

        <div
          v-for="contact in menu.contact_info"
          :key="contact.data"
          class="footer_contact"
          >
          <h4
            class="footer_sub_heading"
            >
            {{ contact.label }}
          </h4>

          <div class="footer_contact_block">
            <VIcon
              :icon="`fas fa-${ contact.icon }`"
              size="small"
              ></VIcon>
                        
            <BlocksLink
              :link="menu.get_href_for_type ( contact.type, contact.data )"
              >{{ contact.data }}
          </BlocksLink>
          </div>

        </div>

        <h4 class="footer_sub_heading">Profile Links</h4>

        <BlocksLink
          v-for="link in menu.profile_links"
          :key="link.link"
          :link="link.link"
          :external="true"
          />

      </VCol>
      <VCol>

        <PrimaryBtn
          class="footer_button"
          color="green"
          :to="menu.nav.contact_form.link"
          nuxt
          >
          {{ menu.nav.contact_form.label }}
        </PrimaryBtn>

      </VCol>
    </VRow>
  </div>
</template>

<style lang="sass">
  .footer

    &_section
      margin-bottom: 2rem
      color: white
      width: 100%

      .footer_sub_heading
        color: white
        opacity: .8
        font-size: 1.5rem
        margin: 1.75rem 0

        &:first-child
          margin-top: 0

      a.blocks_link
        color: white
        display: block
        margin: 1.5rem 0
        letter-spacing: 0.5px
        opacity: .8
        transition: all .2s ease

        &::before
          background: rgb( var( --v-theme-white ) )

        &:hover
          opacity: 1

      .footer_contact
        &_block
          display: flex
          align-items: center

          a.blocks_link
            margin-left: 1rem

        .footer_sub_heading
          margin-bottom: 0

    &_row
      .v-footer
        background: transparent

      &::before
        background: rgb( var( --v-theme-blue ) )
        content: ''
        height: 100%
        left: 0
        position: absolute
        top: 0
        width: 100vw

    &_heading
      background: linear-gradient( 120deg, rgb( var( --v-theme-magenta ) ), rgb( var( --v-theme-cyan ) ), rgb( var( --v-theme-green ) ) )
      background-clip: text
      color: transparent
      font-size: 1.75rem
      position: relative
      width: fit-content

    &_menu
      width: fit-content

      &_link
        &.blocks_link
          display: block
          padding: 1.5rem 0
          border-bottom: 1px solid rgba( var( --v-theme-white ), .4 )
          margin: 0 !important
          width: 100%

          &.highlight
            color: rgb( var( --v-theme-green ) )
            font-weight: var( --font-weight-bold )

            &::before
              background: rgb( var( --v-theme-green ) )

    &_button
      font-weight: var( --font-weight-bold )
      margin-bottom: 2rem
      
</style>