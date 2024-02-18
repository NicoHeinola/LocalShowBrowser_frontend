<template>
  <div class="single-show-view">
    <div class="single-show-view-wrapper">
      <img class="image" :src="image">
      <div class="items" v-if="show">
        <h1 class="big-title title">{{ show.title }}</h1>
        <div class="list-view">
          <p class="title">Seasons:</p>
          <hr>
          <div class="list-items seasons">
            <div class="item-wrapper" v-for="season in show.seasons" :key="'season-' + season.id">
              <p :class="'item ' + seasonClass(season.id)" @click="selectSeason(season.id)">{{ season.number }} {{ season.title ? ' - ' + season.title : '' }}</p>
              <div :class="'status ' + seasonStatusClass(season.id)" @click="toggleWatchedSeason(season.id)"></div>
            </div>
          </div>
        </div>
        <div class="list-view" v-show="currentEpisodes.length > 0">
          <p class="title">Episodes:</p>
          <hr>
          <div class="list-items episodes">
            <transition-group name="fade">
              <div class="item-wrapper" v-for="ep in currentEpisodes" :key="'episode-' + ep.id">
                <p :class="'item ' + episodeClass(ep.id)" @click="selectEpisode(ep.id)">{{ ep.number }} - {{ (ep.title) ? ep.title : ep.filename }}</p>
                <div :class="'status ' + episodeStatusClass(ep.id)" @click="toggleWatchedEpisode(selectedSeason, ep.id)"></div>
              </div>
            </transition-group>
          </div>
        </div>
        <div class="bottom">
          <AlertBox ref='season_warning' type="warning"></AlertBox>
          <AlertBox ref='episode_warning' type="warning"></AlertBox>
          <div class="progress">
            <p>Progress {{ calculateProgress }} % / 100 %</p>
            <div class="bar">
              <div class="active" :style="'width:' + calculateProgress + '% !important'"></div>
              <div class="shadow"></div>
            </div>
          </div>
          <button class="button large" @click="watchSeason">Watch From Playlist</button>
          <button class="button large" @click="watchEpisode">Watch Episode</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue';


export default {
  name: 'SingleShowView',
  components: {
    AlertBox
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
    },
    selectSeason(seasonId) {
      if (this.selectedSeason == seasonId) this.selectedSeason = null;
      else this.selectedSeason = seasonId;
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
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
:root {
  --bar-width: 0%;
}

.parent {
  position: absolute;
  width: 100%;
  height: 100%;
}

.single-show-view {

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .single-show-view-wrapper {

    display: flex;
    flex-direction: row;
    justify-content: center;
    color: $main-text-color;
    width: 100%;

    .image {
      width: 450px;
      height: 650px;
      object-fit: cover;
    }

    .list-view {
      .list-items {
        display: grid;
        position: relative;
        margin-top: 10px;
        max-height: 200px;
        overflow-y: auto;
        transition: all 0.2s;

        .fade-enter-active,
        .fade-leave-active {
          transition: all 0.3s ease;
          opacity: 1;
        }

        .fade-enter-from,
        .fade-leave-to {
          opacity: 0;
        }

        &.seasons {
          max-height: 120px;
        }

        .item-wrapper {
          width: 100%;
          display: flex;
          flex-direction: row;
          cursor: pointer;

          .item {
            width: 100%;
            padding: 10px 20px;
            white-space: wrap;
            transition: all 0.1s;
            background: rgba(255, 255, 255, 0.082);

            &:hover {
              background: rgba(255, 255, 255, 0.185);
            }

            &.active {
              background: rgba(255, 255, 255, 0.226);
            }
          }

          .status {
            min-width: 40px;
            width: 40px;
            height: 100%;
            background: $button-bg-1;
            transition: all 0.1s;
            filter: brightness(80%);

            &:hover {
              opacity: 0.4;
            }

            &.watched {
              background: $button-bg-1-hover;
              filter: brightness(100%);
            }
          }
        }
      }
    }
  }

  .progress {
    position: relative;
    width: 100%;
    text-align: center;

    .bar {
      position: relative;
      width: 100%;
      margin-top: 5px;


      >* {
        position: absolute;
        width: 100%;
        height: 2px;
      }

      .active {
        width: 0%;
        transition: all 0.3s;
        background: $bar-bg-main;
        z-index: 10;
      }

      .shadow {
        background: $bar-bg-shadow;
        z-index: 5;
      }
    }
  }

  .items {
    position: relative;
    margin-left: 50px;
    width: 650px;

    &>* {
      margin: 10px 0;
    }

    .bottom {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      &>* {
        margin-top: 10px;
      }
    }
  }
}

.big-title {
  max-height: 100px;
  overflow: auto;
}
</style>