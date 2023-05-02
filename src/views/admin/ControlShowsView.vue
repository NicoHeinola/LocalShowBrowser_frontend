<template>
  <div class="control-shows-wrapper">
    <div class="box top-box">
      <div>
        <select class="top-alert" v-model="templateShowIndex">
          <option :value="null" disabled="disabled" :selected="true">Choose a template show</option>
          <option v-for="(season, index) in _notAddedShows" :key="'season1' + index" :value="index">{{ season.full_path }}</option>
        </select>
        <button class="button top-alert" @click="chooseShow">Choose Template Show</button>

        <select class="top-alert" v-model="templateSeasonIndex">
          <option :value="null" disabled="disabled" :selected="true">Choose a template season</option>
          <option v-for="(season, index) in _notAddedShows" :key="'season2' + index" :value="index">{{ season.full_path }}</option>
        </select>
        <button class="button top-alert" @click="e => appendSeason(false)">Choose Template Season</button>

        <!--select class="top-alert" v-model="templateEpisodeIndex">
          <option :value="null" disabled="disabled" :selected="true">Choose show for episodes</option>
          <option v-for="(season, index) in _notAddedShows" :key="'season3' + index" :value="index">{{ season.full_path }}</option>
        </select>
        <select class="top-alert" v-model="templateSeasonIndexForEpisode">
          <option :value="null" disabled="disabled" :selected="true">Choose a season</option>
          <option v-for="(season, index) in seasons" :key="'season4' + index" :value="index">Season {{ season.number }}</option>
        </select>
        <button class="button top-alert" @click="e => appendEpisodesToSeason()">Choose Episodes</button-->
      </div>
    </div>
    <div class="control-shows">
      <div class="box">
        <h1 class="title">Alternate Titles</h1>
        <div class="rows-wrapper">
          <div class="row" v-for="(title, index) in titles" :key="'alttitle' + index">
            <TextInput v-model="title.title" placeholder="Alternate Title" />
            <button class="button" @click="removeAlternateTitle(index)">Delete</button>
          </div>
        </div>
        <div class="bottom">
          <button class="button" @click="addAlternateTitle">Add Alternate Title</button>
        </div>
      </div>
      <div class="box">
        <h1 class="title">Add New Show</h1>
        <TextInput v-model="title" placeholder="Main Title" />
        <TextInput v-model="image_url" placeholder="Image URL" />
        <button class="button" @click="showImagePickerModal">Image Picker</button>
        <div class="bottom">
          <div class="centered">
            <AlertBox ref='success' type="success"></AlertBox>
            <AlertBox ref='warning' type="warning"></AlertBox>
            <AlertBox ref='error' type="error"></AlertBox>
          </div>
          <button class="button" @click="addShow">{{ isEditing ? 'Edit Show' : 'Add Show' }}</button>
        </div>
      </div>
      <div class="box">
        <h1 class="title">Seasons</h1>
        <div class="rows-wrapper">
          <div class="row-grid" v-for="(season, index) in seasons" :key="'season' + index">
            <h2>Season {{ season.number }}</h2>
            <TextInput v-model="season.title" placeholder="Season Title" />
            <TextInput v-model="season.path" placeholder="Path" />
            <TextInput v-model="season.number" placeholder="Season Number" />

            <div class="row-grid" v-for="(episode, epIndex) in season.episodes" :key="'episode' + index">
              <br>
              <h3>Episode {{ episode.number }}</h3>
              <TextInput v-model="episode.title" placeholder="Episode Title" />
              <TextInput v-model="episode.filename" placeholder="Filename" />
              <span class="margin-right">Is Special?</span>
              <input type="checkbox" v-model="episode.isSpecial" />
              <TextInput v-model="episode.number" placeholder="Episode Number" />
              <button class="button top-alert" @click="removeSeason(index)">Delete Episode</button>
            </div>
            <button class="button top-alert" @click="addEpisode(index)">Add Episode</button>
            <button class="button" @click="removeSeason(index)">Delete Season</button>
            <hr>
          </div>
        </div>
        <div class="bottom">
          <button class="button" @click="addSeason">Add Season</button>
        </div>
      </div>
    </div>
    <Modal :show="imagePickerModal" @close="hideImagePickerModal">
      <ImagePicker @pickedImageWithUrl="setImageUrl" :loading="loadingImages" :imageUrls="$store.getters['show/imageCovers']"></ImagePicker>
      <br>
      <TextInput v-model="imageCoverSearchTerm" placeholder="Search Term (Leave empty for default, aka. show title)" />
      <TextInput v-model="imageCoverAmount" placeholder="Amount of images to get" />
      <button class="button" @click="loadCoverImages">Search Images</button>
      <div class="centered">
        <AlertBox ref='search-success' type="success"></AlertBox>
        <AlertBox ref='search-warning' type="warning"></AlertBox>
        <AlertBox ref='search-error' type="error"></AlertBox>
      </div>
    </Modal>
  </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import Modal from '@/components/Modal.vue';
import ImagePicker from '@/components/ImagePicker.vue';

export default {
  name: 'ControlShowsView',
  components: {
    TextInput,
    AlertBox,
    Modal,
    ImagePicker
  },
  props: {
    isEditing: { default: false, required: false },
    show: { default: null, required: false }
  },
  methods: {
    setImageUrl(url) {
      this.image_url = url
    },
    loadCoverImages() {
      let term = this.imageCoverSearchTerm;
      if (!term) {
        term = this.title;
      }

      let warning = ''
      if (term == '' || !term) warning = 'Remember to either add a search term or show title!';
      else if (!this.imageCoverAmount) warning = 'Remember to add an amount!';
      else if (this.loadingImages) warning = 'Wait until images have been loaded!';

      if (warning) {
        this.$refs['search-warning'].timeout(4000, warning)
        return;
      }

      term += ' Cover'; // Searches covers now

      this.loadingImages = true;
      this.$store.dispatch("show/suggestCovers", { "searchTerm": term, "amount": this.imageCoverAmount }).then(response => {
        this.$refs['search-success'].timeout(4000, 'Found Images Successfully!')
      }).catch(e => {
        let error = (e && e.response && e.response.data.error) ? e.response.data.error : 'There was an unkown error while searching covers!'
        this.$refs['search-error'].timeout(4000, error);
      }).finally(() => {
        this.loadingImages = false;
      });
    },
    showImagePickerModal() {
      this.imagePickerModal = true;
    },
    hideImagePickerModal() {
      this.imagePickerModal = false;
    },
    getImages() {

    },
    chooseShow() {
      let show = this._notAddedShows[this.templateShowIndex]
      if (!show) return;
      let title = show.name
      this.title = title;
      this.seasons = [];

      this.appendSeason(show)
    },

    appendSeason(show) {
      if (!show) show = this._notAddedShows[this.templateSeasonIndex]
      if (!show) return;

      let full_path = show.full_path
      let episodes = show.episodes
      let isSpecial = show.is_special

      let season_episodes = []
      for (let ep of episodes) {
        let title = ep.name
        let file = ep.file
        let number = ep.suggested_episode_number

        let to_add = { isSpecial: isSpecial, title: title, filename: file, number: '' + number }
        season_episodes.push(to_add)
      }
      let season = { title: '', episodes: season_episodes, path: full_path, number: '' + (this.seasons.length + 1) }
      this.seasons.push(season)
    },

    appendEpisodesToSeason(show) {
      if (!show) show = this._notAddedShows[this.templateEpisodeIndex]
      if (!show || this.templateSeasonIndexForEpisode == null) return;


      let season = this.seasons[this.templateSeasonIndexForEpisode];
      let isSpecial = show.is_special
      let episodes = season.episodes;
      let season_episodes = []

      for (let [i, ep] of episodes.entries()) {
        let title = ep.name
        let file = ep.file
        let number = ep.suggested_episode_number

        let to_add = { isSpecial: isSpecial, title: title, filename: file, number: '' + (season.episodes.length + i + 1) }
        season_episodes.push(to_add)
      }
      season.episodes = [...season.episodes, ...season_episodes]
    },

    addAlternateTitle() {
      this.titles.push({ title: '' })
    },
    removeAlternateTitle(index) {
      this.titles.splice(index, 1)
    },
    addSeason() {
      this.seasons.push({ title: "", episodes: [], path: "", number: '' + (this.seasons.length + 1) })
    },
    removeSeason(index) {
      this.seasons.splice(index, 1)
    },
    addEpisode(seasonIndex) {
      this.seasons[seasonIndex].episodes.push({ isSpecial: false, title: "", filename: "", number: '' + (this.seasons[seasonIndex].episodes.length + 1) })
    },
    removeEpisode(index) {
      this.titles.splice(index, 1)
    },
    addShow() {
      if (!this.validate()) return;

      let route = this.isEditing ? 'show/editShow' : 'show/addShow';

      this.$store.dispatch(route, {
        title: this.title,
        image_url: this.image_url,
        titles: this.titles,
        seasons: this.seasons,
        id: this.show ? this.show.id : null
      }).then(response => {
        this.$store.dispatch('show/getNotAddedShows');
        this.$refs.success.timeout(4000, 'Show added successfully!');
        this.clearForm()
      }).catch(e => {
        let error = (e && e.response.data.error) ? e.response.data.error : 'There was an unkown error while adding show!'
        this.$refs.error.timeout(4000, error);
      });

    },
    clearForm() {
      this.title = "";
      this.image_url = "";
      this.templateShowIndex = null;
      this.templateSeasonIndex = null;
      this.templateEpisodeIndex = null;
      this.templateSeasonIndexForEpisode = null;
      this.titles = [];
      this.seasons = [];
    },
    validate() {
      let warning = "";
      if (!this.title) warning = "Remember to add a title!";
      else if (this.seasons.length == 0) warning = "Remember to add a season!";
      else if (this.seasons[0].episodes.length == 0) warning = "Remember to add an episode!";
      else {
        for (let title of this.titles) {
          if (title == "") warning = "Don't leave alterante titles empty!"
        }
      }

      // Don't allow same number episodes or seasons
      if (!warning) {
        let foundSeasons = []
        for (let season of this.seasons) {
          let duplicate_season = foundSeasons.filter(foundSeason => foundSeason.number == season.number)
          if (duplicate_season.length > 0) {
            warning = 'There is a duplicate season: "' + season.number + '"!';
            break;
          }

          let addedSeason = { number: season.number, episodeNumbers: [] }
          foundSeasons.push(addedSeason)

          for (let episode of season.episodes) {
            let number = episode.number;
            if (addedSeason.episodeNumbers.includes(number)) {
              warning = 'There is a duplicate episode: "' + episode.number + '" in season: "' + season.number + '"!';
              break;
            }

            addedSeason.episodeNumbers.push(episode.number)
          }

          if (warning) break;
        }
      }

      if (warning) {
        this.$refs.warning.timeout(4000, warning);
        return false;
      }
      return true;
    },
  },
  computed: {

  },
  data() {
    return {
      title: "",
      image_url: "",
      templateShowIndex: null,
      templateSeasonIndex: null,
      templateEpisodeIndex: null,
      templateSeasonIndexForEpisode: null,
      titles: [],
      seasons: [],
      imagePickerModal: false,
      loadingImages: false,
      imageCoverSearchTerm: '',
      imageCoverAmount: "20",
    }
  },
  created() {
    this.$store.dispatch('show/getNotAddedShows');
    if (!this.isEditing || !this.show) return;
    this.seasons = this.show.seasons;
    this.titles = this.show.alternate_titles;
    this.image_url = this.show.image_url;
    this.title = this.show.title;
  }
}
</script>

<style lang="scss" scoped>
.control-shows {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 75px;
  padding: 0 75px;
  margin-top: calc($margin-top-from-nav / 2);
}

.margin-right {
  margin-right: 15px;
}

.rows-wrapper {
  max-height: 450px;
  overflow: scroll;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .button {
    width: 80px;
    min-width: initial;
  }

  >* {
    width: 75%;
  }
}

.top-alert {
  margin-bottom: 20px;
}

.box {
  display: flex;
  flex-direction: column;
  height: 600px;
  padding: 20px;
  background: $main-bg-2;

  &.top-box {
    align-items: center;
    width: calc(100% - 75px * 2);
    height: initial;
    margin: auto;
    margin-top: $margin-top-from-nav;

    &>* {
      width: 100%;
      max-width: 100%;

      >* {
        width: 100%;
      }
    }
  }
}

.title {
  text-align: center;
}

.text-input {
  margin-bottom: 20px;
}

.bottom {
  margin-top: auto;
}

.button {
  width: 100%;
}

.centered {
  margin: 10px auto;
  grid-column: 2;

  >* {
    margin-top: 10px;
  }
}

hr {
  margin: 25px 0;
  border-color: red;
  border-style: dashed;
}
</style>