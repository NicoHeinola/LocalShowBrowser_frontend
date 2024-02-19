<template>
  <div class="main-app">
    <Navigation></Navigation>
    <div class="content">
      <RouterView v-slot="{ Component }">
        <Transition name="nav-transition" mode="out-in">
          <component :is="Component"></component>
        </Transition>
      </RouterView>
    </div>
  </div>
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
.main-app {
  width: 100%;
  height: 100vh;

  .content {
    margin-left: $nav-width;
    width: calc(100% - $nav-width);
    height: 100%;
  }
}

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
