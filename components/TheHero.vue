<!-- TheHero -->

<template>
  <div>

    <!-- profile -->
   <div
    id="profile_pic_wrapper"
    class="absolute opacity-30"
    >
      <img
        src="/img/profile_300.png"
        />
    </div>
      
    <!-- text bubble -->
    <div
      id="text_bubble_wrapper"
      class="absolute"
      >
      <div
        class="absolute min-w-[18rem] min-h-[13rem]"
        >
        <img
          src="/img/text_bubble.svg"
          width="274"
          height="207"
          />
      </div>
      
      <h3 class="absolute text-3xl py-4 top-3 left-12 font-light opacity-50 whitespace-nowrap">Hi!</h3>
      <h1 class="absolute text-xl py-4 top-5 left-[5.5rem] font-light opacity-75 w-fit whitespace-nowrap">My name is</h1>
      <h1 class="absolute text-4xl py-4 top-12 left-12">Noliani Clemente</h1>
      
    </div>

    <!-- hero text -->
    <div id="hero_text">
      <h2 class="text-6xl py-4">Full-Stack Developer</h2>
      <h2 class="text-6xl py-4">UX Designer</h2>
      <h2 class="text-6xl py-4">Expanded-Stack Developer</h2>
    </div>

  </div>
</template>