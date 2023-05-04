<template>
  <div class="home">
    <HeroBanner :heroImage="require('@/assets/images/wallpaper-1.jpg')">
      <div class="cards">
        <!--ShowCard title="TEST 1" episodes="48" seasons="2" /-->
      </div>
    </HeroBanner>
  </div>
</template>

<script>
// @ is an alias to /src

import ShowCard from '@/components/cards/ShowCard.vue';
import HeroBanner from '@/components/HeroBanner.vue';

export default {
  name: 'HomeView',
  components: {
    ShowCard,
    HeroBanner
  }
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 650px;
  background: rgb(26, 26, 26);

  .cards {
    position: absolute;
    display: flex;
    top: 50%;
    transform: translateY(-50%);
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto;

    &>* {
      margin: 0 50px;
    }
  }

  .hero {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(70%);
  }

  .gradient {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgb(0, 0, 0);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.74) 100%);
  }
}
</style>