<template>
  <div class="control-shows">
    <div class="start-view">
      <button class="button plus-button choose-template" @click="openTemplateModal()">
        <div class="plus">
          <div class="line horizontal"></div>
          <div class="line vertical"></div>
        </div>
        <p class="text">Pick a Template</p>
      </button>
      <button class="button plus-button choose-template" @click="openSeasonModal()">
        <div class="plus">
          <div class="line horizontal"></div>
          <div class="line vertical"></div>
        </div>
        <p class="text">Add a Season</p>
      </button>
      <Modal :show="isTemplateModalOpen" @close="closeTemplateModal()" class="template-modal">
        <div class="template-shows">
          <TextInput v-model="templateSearch" placeholder="Search templates" class="search-templates"></TextInput>
          <div class="template-show" v-for="(season, index) in templateNotAddedShows" :key="'templatet' + index" :value="index" @click="closeTemplateModal(); templateShowIndex = _notAddedShows.indexOf(season); chooseShow()">
            <div class="text">
              <p class="name">{{ season.name }}</p>
              <p class="path">{{ season.full_path }}</p>
            </div>
          </div>
        </div>
      </Modal>
      <Modal :show="isSeasonModalOpen" @close="closeSeasonModal()" class="template-modal">
        <div class="template-shows">
          <TextInput v-model="seasonSearch" placeholder="Search seasons" class="search-templates"></TextInput>
          <div class="template-show" v-for="(season, index) in seasonNotAddedShows" :key="'seasont' + index" :value="index" @click="closeSeasonModal(); templateSeasonIndex = _notAddedShows.indexOf(season); appendSeason()">
            <div class="text">
              <p class="name">{{ season.name }}</p>
              <p class="path">{{ season.full_path }}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>

    <div class="section">
      <h1 class="section-title">Seasons</h1>
      <button class="button re-order-button" @click="reOrderSeasons()">Re-order seasons</button>
      <div class="box-view">
        <div class="box-button" :class="selectedSeasonIndex == index ? 'active extra-options' : ''" v-for="(season, index) in seasons" :key="'season' + index" @click="selectSeason(index)">
          <p class="text">S{{ season.number }}</p>
          <div class="options">
            <div class="option" @click="openSeasonEditModal()">
              <img class="icon" src="@/assets/images/icons/edit.png">
            </div>
            <div class="option" @click="removeSeason(selectedSeasonIndex);">
              <img class="icon" src="@/assets/images/icons/trashcan.png">
            </div>
          </div>
        </div>
        <div class="box-button plus-button" @click="addSeason()">
          <div class="plus">
            <div class="line horizontal"></div>
            <div class="line vertical"></div>
          </div>
        </div>
      </div>

      <Modal v-if="hasSelectedSeason" :show="isSeasonEditModalOpen" @close="closeSeasonEditModal()">
        <div class="edit-modal">
          <h1 class="season-name">{{ selectedSeason.title ? selectedSeason.title : "Season " }} {{ selectedSeason.number }}</h1>
          <div class="inputs">
            <TextInput placeholder="Title" v-model="selectedSeason.title"></TextInput>
            <TextInput placeholder="Path" v-model="selectedSeason.path"></TextInput>
            <TextInput placeholder="Number" v-model="selectedSeason.number"></TextInput>
          </div>
        </div>
      </Modal>
    </div>

    <div class="section">
      <h1 class="section-title">Episodes</h1>
      <button class="button re-order-button" @click="reOrderEpisodes()">Re-order episodes</button>
      <div class="box-view" v-if="hasSelectedSeason">
        <div class="box-button active extra-options" v-for="(episode, index) in selectedSeason.episodes" :key="'season' + index">
          <p class="text">EP{{ episode.number }}</p>
          <div class="options">
            <div class="option" @click="selectEpisode(index); openEpisodeEditModal()">
              <img class="icon" src="@/assets/images/icons/edit.png">
            </div>
            <div class="option" @click="removeEpisode(selectedSeasonIndex, index);">
              <img class="icon" src="@/assets/images/icons/trashcan.png">
            </div>
          </div>
        </div>
        <div class="box-button plus-button" @click="addEpisode(selectedSeasonIndex)">
          <div class="plus">
            <div class="line horizontal"></div>
            <div class="line vertical"></div>
          </div>
        </div>
      </div>

      <Modal v-if="hasSelectedEpisode" :show="isEpisodeEditModalOpen" @close="closeEpisodeEditModal(); selectedEpisodeIndex = -1;">
        <div class="edit-modal">
          <h1 class="episode-name">{{ selectedEpisode.title ? selectedEpisode.title : "Episode " + selectedEpisode.number }}</h1>
          <div class="inputs">
            <TextInput placeholder="Title" v-model="selectedEpisode.title"></TextInput>
            <TextInput placeholder="Filename" v-model="selectedEpisode.filename"></TextInput>
            <TextInput placeholder="Number" v-model="selectedEpisode.number"></TextInput>
          </div>
        </div>
      </Modal>
    </div>

    <div class="section show-information">
      <h1 class="section-title">Show Information</h1>
      <div class="input-with-icon">
        <TextInput class="input" placeholder="Name" v-model="title"></TextInput>
        <button class="icon-button button" @click="openAlternateTitleModal">
          <img class="icon" src="@/assets/images/icons/addmore.png">
        </button>
      </div>
      <div class="input-with-icon">
        <TextInput class="input" placeholder="Image URL" v-model="image_url"></TextInput>
        <a class="icon-button button" target="_blank" :href="'https://www.google.com/search?q=' + title + ' hd cover&tbm=isch&source=lnms'">
          <img class="icon" src="@/assets/images/icons/openimage.png">
        </a>
      </div>

      <Modal :show="isAlternateTitleModalOpen" @close="closeAlternateTitleModal();">
        <div class="alternate-titles">
          <div class="alternate-title" v-for="(title, index) in titles" :key="'alttitle' + index">
            <TextInput class="input" v-model="title.title" :placeholder="'Alternate Title ' + (index + 1)" />
            <button class="button" @click="removeAlternateTitle(index)">Delete</button>
          </div>
          <button class="button plus-button" @click="addAlternateTitle()">
            <div class="plus">
              <div class="line horizontal"></div>
              <div class="line vertical"></div>
            </div>
            <p class="text">Add a Title</p>
          </button>
        </div>
      </Modal>
    </div>

    <div class="add-show-button-wrapper">
      <div class="alerts">
        <AlertBox ref='success' type="success"></AlertBox>
        <AlertBox ref='warning' type="warning"></AlertBox>
        <AlertBox ref='error' type="error"></AlertBox>
      </div>
      <button class="button add-show-button" :class="addingShowLoadingClass" @click="addShow()">Add Show</button>
      <LoadingAnimation class="adding-show-loading-animation" :class="addingShowLoadingClass"></LoadingAnimation>
    </div>
  </div>
</template>

<script>
import AlertBox from '@/components/AlertBox.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import Modal from '@/components/Modal.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';

export default {
  name: 'ControlShowsView',
  components: {
    TextInput,
    AlertBox,
    Modal,
    LoadingAnimation
  },
  props: {
    isEditing: { default: false, required: false },
    show: { default: null, required: false }
  },
  methods: {
    setImageUrl(url) {
      this.image_url = url
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
      this.titles = [];
      this.seasons = [];
      this.image_url = "";

      this.appendSeason(show)
      this.selectedSeasonIndex = 0;
    },

    appendSeason(show) {
      if (!show) show = this._notAddedShows[this.templateSeasonIndex]
      if (!show) return;

      let full_path = show.full_path
      let episodes = show.episodes
      let is_special = show.is_special

      let season_episodes = []
      for (let ep of episodes) {
        let title = ep.name
        let file = ep.file
        let number = ep.suggested_episode_number

        let to_add = { is_special: is_special, title: title, filename: file, number: '' + number }
        season_episodes.push(to_add)
      }
      let season = { title: '', episodes: season_episodes, path: full_path, number: '' + (this.seasons.length + 1) }
      this.seasons.push(season)
    },

    appendEpisodesToSeason(show) {
      if (!show) show = this._notAddedShows[this.templateEpisodeIndex]
      if (!show || this.templateSeasonIndexForEpisode == null) return;


      let season = this.seasons[this.templateSeasonIndexForEpisode];
      let is_special = show.is_special
      let episodes = season.episodes;
      let season_episodes = []

      for (let [i, ep] of episodes.entries()) {
        let title = ep.name
        let file = ep.file
        let number = ep.suggested_episode_number

        let to_add = { is_special: is_special, title: title, filename: file, number: '' + (season.episodes.length + i + 1) }
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
      this.selectedSeasonIndex = -1;
    },
    addEpisode(seasonIndex) {
      this.seasons[seasonIndex].episodes.push({ is_special: false, title: "", filename: "", number: '' + (this.seasons[seasonIndex].episodes.length + 1) })
    },
    removeEpisode(seasonIndex, episodeIndex) {
      this.seasons[seasonIndex].episodes.splice(episodeIndex, 1);
    },
    addShow() {
      if (!this.validate()) return;

      this.addingShow = true;

      let route = this.isEditing ? 'show/editShow' : 'show/addShow';

      this.$store.dispatch(route, {
        title: this.title,
        image_url: this.image_url,
        titles: this.titles,
        seasons: this.seasons,
        id: this.show ? this.show.id : null
      }).then(response => {
        this.addingShow = false;
        this.$store.dispatch('show/getNotAddedShows');

        if (this.isEditing) {
          this.$refs.success.timeout(4000, 'Show saved successfully!');
        } else {
          this.$refs.success.timeout(4000, 'Show added successfully!');
          this.clearForm()
        }
      }).catch(e => {
        this.addingShow = false;
        let error = "";
        if (this.isEditing) error = (e && e.response.data.error) ? e.response.data.error : 'There was an unkown error while adding show!';
        else if (!this.isEditing) error = (e && e.response.data.error) ? e.response.data.error : 'There was an unkown error while editing show!';
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

    reOrderSeasons() {
      this.seasons = this.seasons.sort((seasonA, seasonB) => Number(seasonA.number) > Number(seasonB.number));
      this.selectedSeasonIndex = -1;
    },
    reOrderEpisodes() {
      if (!this.hasSelectedSeason) {
        return;
      }

      this.selectedSeason.episodes = this.selectedSeason.episodes.sort((episodeA, episodesB) => Number(episodeA.number) > Number(episodesB.number));

      this.selectedEpisodeIndex = -1;
    },

    closeTemplateModal() {
      this.isTemplateModalOpen = false;
    },
    openTemplateModal() {
      this.isTemplateModalOpen = true;
    },

    closeSeasonModal() {
      this.isSeasonModalOpen = false;
    },
    openSeasonModal() {
      this.isSeasonModalOpen = true;
    },
    selectSeason(index) {
      this.selectedSeasonIndex = index;
    },

    closeSeasonEditModal() {
      this.isSeasonEditModalOpen = false;
    },
    openSeasonEditModal() {
      this.isSeasonEditModalOpen = true;
    },

    closeEpisodeEditModal() {
      this.isEpisodeEditModalOpen = false;
    },

    selectEpisode(index) {
      this.selectedEpisodeIndex = index;
    },
    openEpisodeEditModal() {
      this.isEpisodeEditModalOpen = true;
    },

    closeAlternateTitleModal() {
      this.isAlternateTitleModalOpen = false;
    },
    openAlternateTitleModal() {
      this.isAlternateTitleModalOpen = true;
    },

  },
  computed: {
    templateNotAddedShows() {
      return this._notAddedShows.filter(show => show.full_path.toLowerCase().includes(this.templateSearch.toLowerCase()));
    },
    seasonNotAddedShows() {
      return this._notAddedShows.filter(show => show.full_path.toLowerCase().includes(this.seasonSearch.toLowerCase()));
    },

    selectedSeason() {
      return this.seasons[this.selectedSeasonIndex];
    },
    hasSelectedSeason() {
      return this.seasons.length > this.selectedSeasonIndex && this.selectedSeasonIndex >= 0;
    },

    selectedEpisode() {
      return this.selectedSeason.episodes[this.selectedEpisodeIndex];
    },
    hasSelectedEpisode() {
      if (!this.hasSelectedSeason) {
        return false;
      }

      return this.selectedSeason.episodes.length > this.selectedEpisodeIndex && this.selectedEpisodeIndex >= 0;
    },

    addingShowLoadingClass() {
      return this.addingShow ? "loading" : "";
    }
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

      addingShow: false,

      isTemplateModalOpen: false,
      templateSearch: "",

      isSeasonModalOpen: false,
      seasonSearch: "",
      selectedSeasonIndex: -1,

      isSeasonEditModalOpen: false,

      selectedEpisodeIndex: -1,
      isEpisodeEditModalOpen: false,

      isAlternateTitleModalOpen: false,
    }
  },
  created() {
    this.$store.dispatch('show/getNotAddedShows');
    if (!this.isEditing || !this.show) return;
    this.seasons = this.show.seasons;
    this.titles = this.show.alternate_titles;
    this.image_url = this.show.image_url;
    this.title = this.show.title;
    this.selectedSeasonIndex = 0;
  }
}
</script>

<style lang="scss" scoped>
.control-shows {
  display: flex;
  flex-direction: column;
  gap: 70px;
  width: 100%;
  height: calc(100% - margin-bottom * 2);
  margin-bottom: 100px;

  .box-view {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
  }

  .section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 20px;

    .section-title {
      width: 100%;
      text-align: center;
    }

    .re-order-button {
      width: 200px;
    }
  }

  .start-view {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding: 100px 0;
    background: rgba(0, 0, 0, 0.25);

    .choose-template {
      width: 330px;
      height: 150px;
    }

    .template-modal {
      height: 800px;
      width: 80%;

      .template-shows {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;

        .search-templates {
          width: calc(100% - 40px);
          margin-bottom: 20px;
        }

        .template-show {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;

          .text {
            display: flex;
            align-items: center;
            width: 100%;
            height: 50px;
            background: rgba(0, 0, 0, 0);
            padding: 0 20px;

            &:hover {
              cursor: pointer;
              background: rgba(0, 0, 0, 0.158);


              .name {
                opacity: 0;
              }

              .path {
                opacity: 1;
              }
            }

            .name {
              opacity: 1;
              transition: all 0.2s;

              &::selection {
                background: none;
              }
            }

            .path {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: 20px;
              width: 100%;
              opacity: 0;

              transition: all 0.2s;

              &::selection {
                background: none;
              }
            }
          }
        }
      }
    }
  }

  .edit-modal {
    width: 800px;
    height: 250px;
    padding: 0 20px;
    padding-bottom: 90px;

    .season-name {
      text-align: center;
    }

    .inputs {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;
    }

    * {
      width: 100%;
    }
  }

  .show-information {
    .input-with-icon {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 10px;
    }

    .input {
      width: 400px;
    }
  }

  .alternate-titles {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 800px;
    height: 600px;
    padding: 0 20px;
    gap: 20px;

    .alternate-title {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 100%;
      gap: 20px;

      .input {
        width: 100%;
      }
    }
  }

  .add-show-button-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    .alerts {
      position: absolute;
      top: calc(-100% - 20px);
      z-index: 50;
    }

    .add-show-button {
      width: 400px;
      opacity: 1;
      transition: all 1s;

      &.loading {
        opacity: 0;
        pointer-events: none;
      }
    }

    .adding-show-loading-animation {
      position: absolute;
      left: 50%;
      top: 50%;
      opacity: 0;
      transform: translate(-50%, -50%);
      transition: all 1s;
      pointer-events: none;

      &.loading {
        opacity: 1;
      }
    }
  }
}
</style>