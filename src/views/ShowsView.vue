<template>
  <div class="shows-view">
    <HeroBanner class="show-banner" :heroImage="require('@/assets/images/wallpaper-2.png')">
      <div class="gradient"></div>
      <div class="items">
        <div class="bg"></div>
        <h1>Search & Filtering</h1>
        <TextInput v-model="searchTerm" @input="searchShows" v-on:keyup.enter="searchShows" class="large" placeholder="Type a name of a movie or show..."></TextInput>
      </div>
    </HeroBanner>
    <div class="shows-wrapper">
      <h1 class="title">Found {{ showCount }} shows</h1>
      <div class="shows">
        <div class="column" v-for="(row, index) in showsAsRows" :key="'showrow' + index">
          <Transition name="show-appear" v-for="(show) in row" :key="'show' + show.id">
            <ShowCard @deleted="searchShows" :show="show" />
          </Transition>
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
    }
  },
  computed: {
    showCount() {
      let shows = this.$store.getters['show/shows'];
      return shows.length;
    },
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
.show-appear-enter-active,
.show-appear-active {
  transition: opacity .3s
}

.show-appear,
.show-appear-active {
  opacity: 0
}

.show-banner {
  height: 650px;
}

.gradient {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(0, 0, 0);
  background: linear-gradient(180deg, #0f191f00 0%, #0f191f63 60%, #0f191f 100%);
  pointer-events: none;
}

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
    border-radius: 10px;

    z-index: 0 !important;
    pointer-events: none;
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
  margin-top: 20px;

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