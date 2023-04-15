<template>
  <Navigation></Navigation>
  <RouterView v-slot="{ Component }">
    <Transition name="nav-transition" mode="out-in">
      <component :is="Component"></component>
    </Transition>
  </RouterView>
</template>

<script>
import Navigation from './components/Navigation.vue';

export default {
  name: "App",
  components: {
    Navigation,
  }
}

</script>

<style lang="scss" scoped>
.nav-transition-enter-active,
.nav-transition-leave-active {
  transition: all 0.2s ease-in-out;
  opacity: 1;
}

.nav-transition-enter-from,
.nav-transition-leave-to {
  opacity: 0;
}
</style>
