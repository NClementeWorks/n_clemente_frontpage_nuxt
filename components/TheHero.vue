<!-- TheHero -->

<template>
  <div>

      
    <!-- text bubble -->
    <div
      id="text_bubble_wrapper"
      class="absolute left-16 md:left-44"
      >
      <div
        class="absolute min-w-[18rem] min-h-[13rem]"
        >
        <SVGTextBubble />
      </div>
      
      <h3 class="absolute text-3xl py-4 top-3 left-[4.5rem] font-light opacity-50 whitespace-nowrap">Hi!</h3>
      <h1 class="absolute text-xl py-4 top-5 left-[7rem] font-light opacity-75 w-fit whitespace-nowrap">My name is</h1>
      <h1 class="absolute text-4xl py-4 top-12 left-[4.5rem]">Noliani Clemente</h1>
      
    </div>

    <!-- hero text -->
    <div id="hero_text" class="relative top-72 left-16 w-[72vw] md:top-48 md:left-80 md:w-[36vw]">

      <h2 class="text-xl -p">I'm a</h2>
      <h2 class="text-4xl pb-4">Full-Stack Developer</h2>
      <div
        class="relative"
        >
        <UIcon
          name="i-heroicons-plus"
          class="w-5"
          />
        <h2 class="text-4xl py-4">UX Designer</h2>
      </div>
      <!-- <h2 class="text-4xl py-4">Expanded-Stack Developer</h2> -->

      <UButton
        color="blue"
        :ui="{ rounded: 'rounded-full' }"
        >
        Let's Work!
      </UButton>

    </div>

  </div>
</template>