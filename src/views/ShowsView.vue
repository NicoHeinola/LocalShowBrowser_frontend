<template>
  <div class="shows-view">
    <HeroBanner :heroImage="require('@/assets/images/wallpaper-2.jpg')">
      <div class="items">
        <div class="bg"></div>
        <h1>Search & Filtering</h1>
        <TextInput class="large" placeholder="Type a name of a movie or show..."></TextInput>
      </div>
    </HeroBanner>
    <div class="shows">
      <h1 class="title">Found 0 shows</h1>
      <div class="column">
        <ShowCard title="TEST 1" />
      </div>
    </div>
  </div>
</template>

<script>
import ShowCard from '@/components/cards/ShowCard.vue';
import HeroBanner from '@/components/HeroBanner.vue';
import TextInput from '@/components/inputs/TextInput.vue';

export default {
  name: 'SettingsView',
  components: {
    ShowCard,
    HeroBanner,
    TextInput
  }
}
</script>

<style lang="scss" scoped>
.items {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 1200px;
  max-width: 100%;
  height: 200px;
  color: $light-color-1;
  padding: 20px;

  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: $main-bg-2;
    opacity: 0.5;
    pointer-events: none;
    z-index: 0 !important;
  }

  >* {
    z-index: 10;
  }

  .large {
    width: 50%;
  }
}

.shows {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 25px;
  width: 100%;
  color: $light-color-1;

  .title {
    margin: 25px 0;
  }

  .column {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    margin: 25px 0;

    &>* {
      margin: 0 25px;
    }
  }
}
</style>