<!-- TheTopSkills -->

<script setup>
  const skills = [
    {
      icon: 'Vue.png',
      name: 'Vue.js',
    },
    {
      icon: 'WP.png',
      name: 'Wordpress',
    },
    {
      icon: 'Java.png',
      name: 'Java',
    },
    {
      icon: 'Adobe.png',
      name: 'Adobe Suite',
    },
    {
      icon: 'MySQL.png',
      name: 'MySQL',
    },
    {
      icon: 'JS.png',
      name: 'Javascript',
    },
  ]

  const hexagons = useHexagons ()

  const flower_gap_px = 8

  const hexagon_top = position => {
    if ( position === 0 )
      return 0
    if ( [ 1, 5 ].includes ( position ) )
      return hexagons.default_width_px * .5 + flower_gap_px // using width for top position since the hexagon is rotated 90 deg
    if ( [ 2, 4 ].includes ( position ) )
      return hexagons.default_width_px * 1.5 + ( flower_gap_px * 2 )
    if ( position === 3 )
      return hexagons.default_width_px * 2 + ( flower_gap_px * 3 )
  }

  const hexagon_left = position => {
    if ( [ 0, 3 ].includes ( position ) )
      return hexagons.default_height_px * -.5 // using height for left position since the hexagon is rotated 90 deg
    if ( [ 1, 2 ].includes ( position ) )
      return hexagons.default_height_px * .25 + flower_gap_px
    if ( [ 4, 5 ].includes ( position ) )
      return hexagons.default_height_px * -1.25 - flower_gap_px
  }

</script>

<template>
  <div class="section top_skills_section">
    <h3 class="section_heading top_skills_heading">
      Top Resume Skills
    </h3>

    <div
      id="top_skills_flower"
      class="top_skills_flower_wrapper"
      :style="{
          height: `${ hexagons.default_height_px * 3 }px`
      }"
      >
      <!-- <SVGHexagon
        v-for="( skill, index ) in skills"
        :key="skill.name"
        :style="{
          transform: 'rotate( 90deg )',
          position: 'absolute',
          top: `${ hexagon_top ( index ) }px`,
          left: `${ hexagon_left ( index ) }px`,
        }"
        /> -->
      <div>
        <VImg
          v-for="( skill, index ) in skills"
          :key="skill.name"
          :src="`/img/skills_icons/${ skill.icon }`"
          :style="{
            position: 'absolute',
            top: `${ hexagon_top ( index ) + ( hexagons.default_width_px * .2 ) }px`,
            left: `${ hexagon_left ( index ) + ( hexagons.default_height_px * .15 ) }px`,
            minHeight: `${ hexagons.default_width_px * .6 }px`,
            minWidth: `${ hexagons.default_height_px * .6 }px`,
            mixBlendMode: 'color-burn',
          }"
          />
      </div>
      <div
        class="current_skill_wrapper"
        :style="{
          top: `${ hexagons.default_width_px * 1.15 }px`,
          left: `${ hexagons.default_height_px * -.55 }px`,
          width: `${ hexagons.default_height_px }px`,
          height: `${ hexagons.default_width_px }px`,
        }"
        >
        Vue.js
      </div>
    </div>

    <SecondaryBtn
      append-icon="fas fa-arrow-right"
      class="top_skills_review_resume_btn"
      >
      Review Resume
    </SecondaryBtn>

  </div>
</template>

<style lang="sass">
  .top_skills

    &_section
      position: relative
      display: flex
      flex-direction: column
      align-items: center

    &_flower_wrapper
      position: relative

    &_review_resume_btn
      margin: 2rem 0

  .current_skill_wrapper
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    font-weight: var( --font-weight-bold )
    font-size: 1.5rem

</style>