<!-- app -->

<script setup>
  useHead ({
    htmlAttrs: {
      class: 'scroll-smooth'
    }
  })

</script>

<template>
  <UContainer
    class="grid grid-cols-none md:grid-cols-5"
    >
    
    <!-- <select v-model="$colorMode.preference">
      <option value="system">System</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select> -->
      <!-- <option value="sepia">Sepia</option> -->

    <TheSideNav
      class="flex col-start-1 col-span-5 md:col-span-1 m-0 sticky md:fixed w-full md:w-1/6 h-fit md:h-2/3 bg-white shadow-md left-0 top-0 md:left-auto md:shadow-none"
      />

    <NuxtPage
      class="col-start-1 md:col-start-2 col-span-5 mx-4 py-4 md:px-4 row-start-2 md:row-start-1"
      />

  </UContainer>
</template>
