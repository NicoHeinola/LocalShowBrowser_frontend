<template>
  <div class="home">
    <HeroBanner :heroImage="require('@/assets/images/wallpaper-1.jpg')">
      <div class="cards">
        <!--ShowCard title="TEST 1" episodes="48" seasons="2" /-->
      </div>
    </HeroBanner>
    <div class="card-container">
      <h1 class="title">Latest uploads</h1>
      <div class="card-row">
        <ShowCard @deleted="onDeleteShow" v-for="show in latestUploadedShows" :key="'latest-show-' + show.id" :show="show" />
      </div>
    </div>
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
  },
  methods: {
    onDeleteShow() {
      this.updateLatestUploadedShows();
    },
    async updateLatestUploadedShows() {
      await this.$store.dispatch('show/latestUploaded');
      this.latestUploadedShows = this.$store.getters["show/latestUploaded"]
    }
  },
  async created() {
    this.updateLatestUploadedShows();
  },
  data() {
    return {
      latestUploadedShows: []
    }
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

.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 40px 0;

  .title {
    margin-bottom: 40px;
  }

  .card-row {
    display: grid;
    position: relative;
    grid-template-columns: auto auto auto;
    justify-content: space-evenly;
    width: 100%;
  }
}
</style>