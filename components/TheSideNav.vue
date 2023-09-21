<!-- SideNav -->

<script setup>
  const links = [{
    label: 'Profile',
    avatar: {
      src: 'https://avatars.githubusercontent.com/u/739984?v=4'
    },
    badge: 100
  }, {
    label: 'Installation',
    icon: 'i-heroicons-home',
    to: '#installation'
  }, {
    label: 'Vertical Navigation',
    icon: 'i-heroicons-chart-bar',
    to: '#vertical-navigation'
  }, {
    label: 'Command Palette',
    icon: 'i-heroicons-command-line',
    to: '#command-palette'
  }]
</script>

<template>
  <div class="flex fixed col-start-1 w-1/6 h-2/3 m-0">
    <UVerticalNavigation
      :links="links"
      class="w-full my-auto"
      />
  </div>
</template>