<template>
  <div class="single-show-view">
    <img class="image" :src="image">
    <div class="items">
      <h1 class="title">TITLE 1234556</h1>
      <div class="list-view">
        <p class="title">Seasons:</p>
        <hr>
        <div class="list-items">
          <div class="item-wrapper" v-for="season in seasons" :key="'season-' + season.id">
            <p :class="'item ' + seasonClass(season.id)" @click="() => selectSeason(season.id)">{{ season.number }}</p>
            <div :class="'status ' + seasonStatusClass(season.id)" @click="() => toggleWatchedSeason(season.id)"></div>
          </div>
        </div>
      </div>
      <div class="list-view" v-show="currentEpisodes.length > 0">
        <p class="title">Episodes:</p>
        <hr>
        <div class="list-items">
          <transition-group name="fade">
            <div class="item-wrapper" v-for="ep, index in currentEpisodes" :key="index">
              <p :class="'item ' + episodeClass(ep.id)" @click="() => selectEpisode(ep.id)">{{ ep.title }}</p>
              <div :class="'status ' + episodeStatusClass(ep.id)" @click="() => toggleWatchedEpisode(ep.id)"></div>
            </div>
          </transition-group>
        </div>
      </div>
      <div class="bottom">
        <div class="progress">
          <p>Progress {{ calculateProgress }} % / 100 %</p>
          <div class="bar">
            <div class="active" :style="'width:' + calculateProgress + '% !important'"></div>
            <div class="shadow"></div>
          </div>
        </div>
        <button class="button large">Watch From Playlist</button>
        <button class="button large">Watch Episode</button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'SingleShowView',
  components: {

  },
  methods: {
    selectEpisode(episode) {
      this.selectedEpisode = episode;
    },
    selectSeason(season) {
      this.selectedSeason = season;
    },
    seasonClass(season) {
      return this.selectedSeason == season ? "active" : "";
    },
    episodeClass(ep) {
      return this.selectedEpisode == ep ? "active" : "";
    },
    seasonStatusClass(season) {
      let episodesInSeason = this.episodes.filter(e => e.season_id == season);
      let watched = true;
      for (let e of episodesInSeason) {
        if (!this.episodeStatusClass(e.id)) {
          watched = false;
          break;
        }
      }
      return watched ? "watched" : "";
    },
    episodeStatusClass(episode) {
      return this.watchedEpisodes.find(ep => ep.id == episode) ? "watched" : "";
    },
    toggleWatchedSeason(season) {
      let found = this.seasonStatusClass(season);
      let episodesInSeason = this.episodes.filter(e => e.season_id == season);
      if (found) {
        // -> Not watched
        for (let e of episodesInSeason) {
          if (this.episodeStatusClass(e.id)) {
            this.toggleWatchedEpisode(e.id);
          }
        }
      } else {
        // -> Watched
        let toAdd = { ...this.seasons.find(s => s.id == season) };
        for (let e of episodesInSeason) {
          if (!this.episodeStatusClass(e.id)) {
            this.toggleWatchedEpisode(e.id);
          }
        }
      }
    },
    toggleWatchedEpisode(episode) {
      let found = this.watchedEpisodes.find(e => e.id == episode)
      if (found) {
        let index = this.watchedEpisodes.indexOf(found);
        this.watchedEpisodes.splice(index, 1);
      } else {
        let toAdd = { ...this.episodes.find(e => e.id == episode) };
        this.watchedEpisodes.push(toAdd);
      }
    },
  },
  computed: {
    currentSeason() {
      return this.seasons.find(season => season.id == this.selectedSeason);
    },
    currentEpisodes() {
      return this.episodes.filter(ep => ep.season_id == this.selectedSeason)
    },
    calculateProgress() {
      let episodeCount = this.episodes.length;
      let watched = this.watchedEpisodes.length;
      return Math.round(watched / episodeCount * 100);
    }
  },
  created() {
    this.id = this.$route.params.id;
    this.image = this.coverImage ? this.coverImage : require("@/assets/images/template-cover.jpg");
  },
  data() {
    return {
      id: null,
      image: null,
      selectedSeason: null,
      selectedEpisode: null,
      watchedEpisodes: [],
      seasons: [{ id: 0, number: 1 }, { id: 1, number: 2 }],
      episodes: [{ id: 0, season_id: 0, title: "Episode 1 - Potato war starts" }, { id: 1, season_id: 0, title: "Episode 2 - Potato war continue" }, { id: 2, season_id: 0, title: "Episode 3 - Potato war end" }, { id: 4, season_id: 1, title: "Episode 1" }, { id: 5, season_id: 1, title: "Episode 2" }, { id: 6, season_id: 1, title: "Episode 3" }, { id: 7, season_id: 1, title: "Episode 4" }],
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
  flex-direction: row;
  justify-content: center;
  margin-top: 100px;
  color: $light-color-1;
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
      max-height: 150px;
      overflow-y: scroll;
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

      .item-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;

        .item {
          width: 90%;
          padding: 10px 20px;
          white-space: nowrap;
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
          margin: auto;
          width: 10%;
          height: 100%;
          background: $main-bg-2;
          transition: all 0.1s;

          &:hover {
            opacity: 0.4;
          }

          &.watched {
            background: $button-bg-1-hover;
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
    width: 450px;

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
</style>