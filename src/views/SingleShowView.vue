<template>
  <div v-if="show" class="single-show-view">
    <div class="banner">
      <img class="banner-bg-image" :src="image">
      <div class="banner-image-container">
        <div class="image-wrapper">
          <img class="banner-image" :src="image">
          <div class="buttons" v-if="_isAdmin">
            <button class="button" @click="watchSeason()" :disabled="selectedSeason === null">Watch Season (VLC)</button>
            <button class="button" @click="watchEpisode()" :disabled="selectedEpisode === null">Watch Episode (VLC)</button>
            <button class="button" @click="generateSelectedSeasonStreamFiles()" :disabled="selectedSeason === null">Generate Stream Files For Season</button>
            <button class="button" @click="generateSelectedEpisodeStreamFiles()" :disabled="selectedEpisode === null || currentEpisodeConversionStatus != 'not-generated'">Generate Stream Files For Episode</button>
          </div>
        </div>
      </div>
      <h1 class="show-title">{{ show.title }}</h1>
    </div>
    <div class="right-part">
      <div class="video-container">
        <HLSVideoPlayer class="video-player" :videoPath="selectedVideoPath" />
      </div>

      <div class="seasons">
        <div class="box-button compact" :class="selectedSeason === season.id ? 'active' : ''" @click="selectSeason(season.id)" v-for="(season, index) in show.seasons" :key="'season-' + index">
          <p class="text">S{{ season.number }}</p>
        </div>
      </div>

      <div class="episodes">
        <div class="box-button compact" :class="selectedEpisode === episode.id ? 'active' : ''" @click="selectEpisode(episode.id)" v-for="(episode, index) in currentEpisodes" :key="'episode-' + index">
          <p class="text">EP{{ episode.number }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue';

import HLSVideoPlayer from "@/components/video/HLSVideoPlayer.vue"

export default {
  name: 'SingleShowView',
  components: {
    AlertBox,
    HLSVideoPlayer
  },
  watch: {
    selectedEpisode(newEpisode, oldEpisode) {
      this.updateSelectedEpisodeStreamFileStatus()
    }
  },
  methods: {
    watchEpisode() {
      if (!this.selectedEpisode || !this.selectedSeason) {
        if (!this.selectedEpisode) this.$refs.episode_warning.timeout(4000, 'Remember to choose an episode!');
        if (!this.selectedSeason) this.$refs.season_warning.timeout(4000, 'Remember to choose a season!');
        return;
      }
      this.$store.dispatch("show/watchEpisode", { showId: this.show.id, seasonId: this.selectedSeason, episodeId: this.selectedEpisode })
    },
    watchSeason() {
      if (!this.selectedSeason) {
        this.$refs.season_warning.timeout(4000, 'Remember to choose a season!');
        return;
      }
      this.$store.dispatch("show/watchSeason", { showId: this.show.id, seasonId: this.selectedSeason })
    },
    selectEpisode(episodeId) {
      this.selectedEpisode = episodeId;
      this.$store.dispatch("show/getShowVideoPath", { show_id: this.show.id, season_id: this.selectedSeason, episode_id: this.selectedEpisode }).then(response => {
        this.selectedVideoPath = response.data;
      });
    },
    selectSeason(seasonId) {
      if (this.selectedSeason == seasonId) this.selectedSeason = null;
      else this.selectedSeason = seasonId;
      this.selectedEpisode = null;
    },
    seasonClass(seasonId) {
      return this.selectedSeason == seasonId ? "active" : "";
    },
    episodeClass(episodeId) {
      return this.selectedEpisode == episodeId ? "active" : "";
    },
    seasonStatusClass(seasonId) {
      let episodesInSeason = this.seasonEpisodes(seasonId);
      let watched = true;
      for (let e of episodesInSeason) {
        if (!this.episodeStatusClass(e.id)) {
          watched = false;
          break;
        }
      }
      return watched ? "watched" : "";
    },
    episodeStatusClass(episodeId) {
      let found = this.watchedEpisodes.find(ep => ep.id == episodeId) ? "watched" : "";
      return found
    },
    toggleWatchedSeason(seasonId) {
      if (!this._isLoggedIn) return;

      let foundWatchedStatus = this.seasonStatusClass(seasonId);
      let episodesInSeason = this.seasonEpisodes(seasonId).filter(e => e.season_id == seasonId);
      if (foundWatchedStatus) {
        // -> Not watched
        for (let e of episodesInSeason) {
          if (this.episodeStatusClass(e.id)) {
            this.toggleWatchedEpisode(seasonId, e.id);
          }
        }
      } else {
        // -> Watched
        for (let e of episodesInSeason) {
          if (!this.episodeStatusClass(e.id)) {
            this.toggleWatchedEpisode(seasonId, e.id);
          }
        }
      }
    },
    async toggleWatchedEpisode(seasonId, episodeId) {
      if (!this._isLoggedIn) return;

      let found = this.watchedEpisodes.find(e => e.id == episodeId && e.season_id == seasonId)
      if (found) {
        let index = this.watchedEpisodes.indexOf(found);
        this.watchedEpisodes.splice(index, 1);
      } else {
        let toAdd = { ...this.seasonEpisodes(seasonId).find(e => e.id == episodeId && e.season_id == seasonId) };
        this.watchedEpisodes.push(toAdd);
      }
      let watched = found == undefined;
      await this.$store.dispatch('show/watchedEpisode', { episodeId: episodeId, seasonId: seasonId, showId: this.id, watched: watched })
    },
    seasonEpisodes(seasonId) {
      return this.show.seasons.filter(s => s.id == seasonId)[0].episodes;
    },
    async updateWatchedEpisodes() {
      if (!this._isLoggedIn) return;

      this.watchedEpisodes = []
      let response = await this.$store.dispatch("show/getWatchedEpisodes", this.id)
      for (let user_episode of response.data) {
        let episode;
        for (let season of this.show.seasons) {
          episode = season.episodes.find(episode => episode.id == user_episode.episode_id);
          if (episode) break;
        }
        this.watchedEpisodes.push({ ...episode })
      }
      this.watchedEpisodes = [...this.watchedEpisodes]
    },
    async updateSelectedEpisodeStreamFileStatus() {
      if (this.selectedEpisode === null) {
        this.currentEpisodeConversionStatus = "not-generated";
        return;
      }

      let response = await this.$store.dispatch("show/getEpisodeStreamFileStatus", this.selectedEpisode);
      let status = response.data.status;
      this.currentEpisodeConversionStatus = status;
    },
    generateSelectedSeasonStreamFiles() {
      for (let episode of this.currentEpisodes) {
        this.generateEpisodeStreamFiles(episode.id);
      }
    },
    generateSelectedEpisodeStreamFiles() {
      this.generateEpisodeStreamFiles(this.selectedEpisode);
    },
    async generateEpisodeStreamFiles(episode) {
      await this.$store.dispatch("show/generateStreamFiles", episode);
      this.updateSelectedEpisodeStreamFileStatus();
    }
  },
  computed: {
    currentSeason() {
      return this.show.seasons.find(season => season.id == this.selectedSeason);
    },
    currentEpisodes() {
      return (this.currentSeason) ? this.currentSeason.episodes : [];
    },
    calculateProgress() {
      let episodeCount = (this.selectedSeason) ? this.currentEpisodes.length : this.show.seasons.reduce((current, season) => current + season.episodes.length, 0);
      let watched = (this.selectedSeason) ? this.watchedEpisodes.filter(episode => episode.season_id == this.selectedSeason).length : this.watchedEpisodes.length;
      return Math.round(watched / episodeCount * 100);
    },
  },
  async created() {
    this.id = this.$route.params.id;
    this.image = require("@/assets/images/template-cover.jpg");

    await this.$store.dispatch("show/getShow", this.id)

    let show = this.$store.getters['show/show'];
    this.show = show;
    if (this.show.cover_images.length > 0) this.image = 'data:image/*;base64,' + this.show.cover_images[0].cover_image;

    await this.updateWatchedEpisodes();
  },
  data() {
    return {
      id: null,
      image: null,
      selectedSeason: null,
      selectedEpisode: null,
      watchedEpisodes: [],
      show: null,
      selectedVideoPath: "",
      currentEpisodeConversionStatus: "not-generated"
    }
  }
}
</script>

<style lang="scss" scoped>
.single-show-view {
  width: 100%;
  height: 100%;

  .banner {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 250px;

    .banner-bg-image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(50%);
    }

    .banner-image-container {
      min-width: 500px;
      height: 100%;

      .image-wrapper {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 20px;

        top: 55px;
        right: 0;

        width: 370px;

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.514);
          height: 540px;
        }

        .buttons {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;

          width: 100%;

          .button {
            width: 100%;
          }
        }
      }
    }

    .show-title {
      margin: auto;
      text-align: center;
      text-shadow: 0 0 7px rgba(0, 0, 0, 0.493);
      padding: 0 20px;
    }
  }

  .right-part {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;

    width: calc(100% - 500px);
    margin-left: auto;
    padding-top: 50px;
    padding-bottom: 50px;

    .video-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;
      height: 370px;

      .video-player {
        width: 650px;
      }
    }

    .seasons {
      width: 650px;
    }

    .episodes {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 20px;
      width: 650px;
    }
  }
}
</style>