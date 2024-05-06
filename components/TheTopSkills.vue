<!-- TheTopSkills -->

<script setup>
  import gsap from 'gsap'
  import { ref } from 'vue'
  import { useTemplateStore } from '~/stores/template'

  const skills = [
    {
      icon: 'Vue.png',
      name: 'Vue.js',
    },
    {
      icon: 'Node.png',
      name: 'Node JS',
    },
    {
      icon: 'Adobe.png',
      name: 'Adobe Suite',
    },
    {
      icon: 'PHP.png',
      name: 'PHP',
    },
    {
      icon: 'WP.png',
      name: 'Wordpress',
    },
    {
      icon: 'MySQL.png',
      name: 'MySQL',
    },
  ]

  const hexagons = useHexagons ()
  const skills_animations = useAnimationsHexagonsSkills ( gsap )

  const flower_gap_px = 8

  const hexagon_top = position => {
    return hexagons.hexagon_grid_column_px ( skills_animations.skills_rows [ position ] )
  }

  const hexagon_left = position => {
    return hexagons.hexagon_grid_row_px ( skills_animations.skills_cols [ position ] )
      - hexagons.hexagon_grid_row_px ( 1.75 )
      + ( hexagons.hexagon_grid_gap_px * 1.5 )
  }

  const current_skill = ref ( skills [ 0 ].name )
  
  const template = useTemplateStore ()
  const top_skills_flower = ref ()
  template.add_element ( 'top_skills_flower', top_skills_flower )
  
  const skills_first_icon = ref ()
  template.add_element ( 'top_skills_first_icon', top_skills_flower )
  const set_skills_first_icon = ( el, index ) => {
    if ( index === 0 )
      skills_first_icon.value = el
  }
</script>

<template>
  <div class="section top_skills_section">
    <h3 class="section_heading top_skills_heading">
      Top Resume Skills
    </h3>

    <div
      ref="top_skills_flower"
      id="top_skills_flower"
      class="top_skills_flower_wrapper"
      :style="{
          height: `${ hexagons.default_height_px * 3 }px`
      }"
      >
      <div>
        <VImg
          v-for="( skill, index ) in skills"
          :key="skill.name"
          :ref="el => set_skills_first_icon ( el, index )"
          :src="`/img/skills_icons/${ skill.icon }`"
          class=""
          :style="{
            position: 'absolute',
            top: `${ hexagon_top ( index ) }px`,
            left: `${ hexagon_left ( index ) }px`,
            minHeight: `${ hexagons.default_width_px }px`,
            minWidth: `${ hexagons.default_height_px }px`,
            maxHeight: `${ hexagons.default_width_px }px`,
            maxWidth: `${ hexagons.default_height_px }px`,
            mixBlendMode: 'color-burn',
          }"
          @mouseenter="current_skill = skill.name"
          />
      </div>
      <div
        class="current_skill_wrapper"
        :style="{
          top: `${ hexagon_top ( 6 ) }px`,
          left: `${ hexagon_left ( 6 ) }px`,
          width: `${ hexagons.default_height_px }px`,
          height: `${ hexagons.default_width_px }px`,
        }"
        >
        {{ current_skill }}
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

      .v-img
        display: flex
        align-items: center
        justify-content: center
        
        img
          height: 60%
          width: 60%
          margin: 20%

    &_review_resume_btn
      margin: 2rem 0

  .current_skill_wrapper
    position: absolute
    display: flex
    align-items: center
    justify-content: center
    font-weight: var( --font-weight-bold )
    font-size: 1.5rem
    text-align: center

</style>