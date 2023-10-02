
<!-- TheContactForm -->

<script setup>

  const message_max_chars = 1000
  const message_rules = [
    value => value?.length <= message_max_chars || `Max ${ message_max_chars } characters`
  ]
  
</script>

<template>
  <div class="section contact_form_section">
    <h3 class="section_heading contact_form_heading">
      Let’s work together
    </h3>

    <VForm>
      <VTextField
        prepend-icon="fas fa-user"
        label="Jane Doe"
        ></VTextField>

      <VTextField
        prepend-icon="fas fa-envelope"
        label="jane.doe@email.com"
        ></VTextField>

      <VTextarea
        prepend-icon="fas fa-message"
        label="Leave me a note..."
        counter
        :rules="message_rules"
        ></VTextarea>

      <PrimaryBtn
        append-icon="fas fa-paper-plane"
        >
        Send
      </PrimaryBtn>
    </VForm>

  </div>
</template>

<style lang="sass">
  .contact_form

    &_section
      margin-bottom: 3rem

    &_row
      position: relative

      &::before
        background: rgb( var( --v-theme-magenta ) )
        content: ''
        height: calc( 100% + 3rem ) // add parent bottom padding
        left: -50%
        position: absolute
        top: 0
        width: 110vw

    &_heading
      color: white
      font-size: 3rem !important
      position: relative

</style>