<template>
  <div class="shows-view">
    <HeroBanner :heroImage="require('@/assets/images/wallpaper-2.jpg')">
      <div class="items">
        <div class="bg"></div>
        <h1>Search & Filtering</h1>
        <TextInput v-model="searchTerm" @input="searchShows" v-on:keyup.enter="searchShows" class="large" placeholder="Type a name of a movie or show..."></TextInput>
      </div>
    </HeroBanner>
    <div class="shows-wrapper">
      <h1 class="title">Found 0 shows</h1>
      <div class="shows">
        <div class="column" v-for="(row, index) in showsAsRows" :key="'showrow' + index">
          <ShowCard v-for="(show) in row" :key="'show' + show.id" :coverImage="getShowImage(show)" :title="show.title" :id="show.id" :seasons="show.seasons.length" :episodes="calculateEpisodes(show)" />
        </div>
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
  },
  methods: {
    searchShows() {
      this.$store.dispatch('show/searchShows', { searchTerm: this.searchTerm })
    },
    calculateEpisodes(show) {
      return show.seasons.reduce((current, s) => s.episodes.length + current, 0)
    },
    getShowImage(show) {
      if (show.cover_images.length == 0) return "";

      let data = show.cover_images[0].cover_image;
      let image = "data:image/*;base64," + data;
      return image;
    }
  },
  computed: {
    showsAsRows() {
      let shows = this.$store.getters['show/shows'];
      let rows = [];
      let current_row = null
      let divider = 3;
      for (let i = 0; i < shows.length; i++) {
        let show = shows[i];
        let new_row = i % divider == 0;
        if (new_row) {
          if (current_row != null) rows.push(current_row);
          current_row = [];
        }
        current_row.push(show)
      }
      rows.push(current_row)
      return rows;
    }
  },
  created() {
    this.searchShows()
  },
  data() {
    return {
      searchTerm: "",
    }
  }
}
</script>

<style lang="scss" scoped>
.items {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1200px;
  max-width: 100%;
  height: 200px;
  color: $main-text-color;
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

.shows-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .shows {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 25px;
    width: 100%;
    color: $main-text-color;

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
}
</style>