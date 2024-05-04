0
<!-- TheContactForm -->

<script setup lang="ts">
  import gsap from 'gsap';
  import { ScrollTrigger } from "gsap/ScrollTrigger"
  import { useWindowSize } from '@vueuse/core'

  const { width, height } = useWindowSize ()
  const random = useRandom ()

  gsap.registerPlugin ( ScrollTrigger )

  const message_max_chars = 1000
  const message_rules = [
    ( value : any ) => value?.length <= message_max_chars || `Max ${ message_max_chars } characters`
  ]
  
  const use_case = useAnimationsHexagonsUseCase ( gsap )
  const screen = useScreen ()
  const hexagon = useHexagons ()

  const color = useColor ()
  const bg_colors = [
    color.theme.magenta,
    color.theme.green,
    color.theme.cyan,
  ]

  const contact_form_bg = ref (null)

  onMounted ( async () => {

    await nextTick ()

    const use_case_config = use_case.calculate_config ()
    const contact_form_bg_top = screen.get_top ( contact_form_bg.value )

    const tl_contact_bg = gsap.timeline ({
      scrollTrigger: {
        trigger: contact_form_bg.value,
        start: () => contact_form_bg_top - use_case_config.use_case_img_el_hegiht,
        toggleActions: 'play pause play pause'
      },
      onComplete: (a:any) => {
        tl_contact_bg.restart ()
      },
    })

    bg_colors.forEach ( ( color, index ) => {
      const duration = 5
      const position = index * duration
      tl_contact_bg
        .to (
          contact_form_bg.value,
          { 
            backgroundColor: color,
            duration,
            ease: 'power4.inOut',
          },
          position
        )
    })
  })

  const hexagon_position = () => {
    const row = random.get_random_int ( 5 )
    const col_shift = (row % 2)
    const col_base = random.get_random_int ( 2 )
    const col = ( col_base * 2 ) - ( col_shift )
    return {
      top: `${ hexagon.hexagon_grid_row_px( row ) }px`,
      left: `calc( 110% - ${ hexagon.hexagon_grid_column_px( col ) }px )`,
    }
  }
</script>

<template>
  <div class="section contact_form_section">

    <div
      id="contact_form_bg"
      ref="contact_form_bg"
      class="contact_form_bg"
      ></div>

    <div class="contact_form_hexagons">
    <template v-for="n in 15" :key="n">
      <SVGHexagon
        :color="bg_colors[n % bg_colors.length]"
        :style="hexagon_position ()"
        />
      </template>
    </div>

    <h3 class="section_heading contact_form_heading">
      Let’s join forces
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
      overflow: hidden

      .hexagon
        position: absolute

    &_hexagons
        opacity: .5

    &_row
      position: relative

    &_bg
      background: rgb( var( --v-theme-cyan ) )
      content: ''
      height: calc( 100% + 3rem ) // add parent bottom padding
      left: -50%
      position: absolute
      top: 0
      width: 200vw

    &_heading
      color: white
      font-size: 3rem !important
      position: relative


</style>