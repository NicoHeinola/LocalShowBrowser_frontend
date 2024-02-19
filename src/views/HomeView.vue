<template>
  <div class="home">
    <HeroBanner :heroImage="require('@/assets/images/wallpaper-1.png')">
      <RainEffect class="rain" />
      <div class="gradient"></div>
      <div class="card-container">
        <LoadingAnimation class="title" v-if="loading"></LoadingAnimation>
        <h1 class="title" v-else-if="_isLoggedIn && latestWatchedShows.length > 0">Lately Watched Shows</h1>
        <h1 class="title" v-else-if="latestUploadedShows.length > 0">Lately Watched Shows</h1>
        <h1 class="title" v-else>No Shows Found</h1>
        <div class="card-row">
          <ShowCard @deleted="onDeleteShow" v-for="show in latestWatchedShows" :key="'latest-show-' + show.id" :show="show" />
        </div>
      </div>
    </HeroBanner>
    <div class="card-container" v-if="_isLoggedIn && latestUploadedShows.length > 0 && latestWatchedShows.length > 0">
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
import RainEffect from '@/components/effects/RainEffect.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';

export default {
  name: 'HomeView',
  components: {
    ShowCard,
    HeroBanner,
    RainEffect,
    LoadingAnimation,
  },
  methods: {
    onDeleteShow() {
      this.updateLatestUploadedShows();
      this.updateLatestWatchedShows();
    },
    async updateLatestUploadedShows() {
      await this.$store.dispatch("show/latestUploaded");
      this.latestUploadedShows = this.$store.getters["show/latestUploaded"]
    },
    async updateLatestWatchedShows() {
      if (!this._isLoggedIn) {
        return;
      }

      await this.$store.dispatch("show/latestWatched");
      this.latestWatchedShows = this.$store.getters["show/latestWatched"]
    }
  },
  async created() {
    this.loading = true;

    const promise1 = this.updateLatestUploadedShows();
    const promise2 = this.updateLatestWatchedShows();
    await Promise.all([promise1, promise2]);

    this.loading = false;
  },
  data() {
    return {
      latestUploadedShows: [],
      latestWatchedShows: [],
      loading: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 100vh;
  background: rgb(26, 26, 26);

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
    background: linear-gradient(180deg, #0f191f00 0%, #0f191f41 80%, #0f191f 100%);
    pointer-events: none;
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
    text-shadow: 0 0 15px black;
  }

  .card-row {
    display: flex;
    position: relative;
    justify-content: center;
    width: 100%;
    gap: 75px;
  }
}
</style>