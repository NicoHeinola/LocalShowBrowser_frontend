<template>
  <div class="settings">
    <div class="media-player-status">
      <h1>Media Player Status</h1>
      <p class="status-text " :class="downloadStatusClass">{{ downloadStatus }}</p>
      <LoadingAnimation class="loading-animation" v-if="isDownloading"></LoadingAnimation>
      <button class="button large" @click="downloadMediaPlayer" :disabled="isDownloaded">Download</button>
    </div>
  </div>
</template>

<script>
import LoadingAnimation from '@/components/LoadingAnimation.vue';


export default {
  name: 'SettingsView',
  components: {
    LoadingAnimation
  },
  computed: {
    downloadStatus() {
      return this.$store.getters['mediaPlayer/isDownloaded'] ? 'Downloaded' : 'Not downloaded';
    },
    downloadStatusClass() {
      return this.$store.getters['mediaPlayer/isDownloaded'] ? 'green' : 'red';
    },
    isDownloaded() {
      return this.$store.getters['mediaPlayer/isDownloaded'];
    },
  },
  methods: {
    async downloadMediaPlayer() {
      this.isDownloading = true;
      await this.$store.dispatch("mediaPlayer/download");
      this.isDownloading = false;
    }
  },
  created() {
    this.$store.dispatch('mediaPlayer/isDownloaded');
  },
  data() {
    return {
      isDownloading: false,
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  position: relative;
  margin-top: $margin-top-from-nav;

  .media-player-status {
    position: relative;
    background: $main-bg-2;
    width: 470px;
    margin: auto;
    text-align: center;
    padding: 20px;

    &>* {
      margin-bottom: 20px;
    }

    .status-text {
      border-radius: 10px;
      padding: 10px;
      width: min-content;
      white-space: nowrap;
      margin-inline: auto;
      transition: all 0.2s;

      &.green {
        background: rgb(5, 116, 5);
      }

      &.red {
        background: rgb(94, 9, 9);
      }

      .loading-animation {
        margin: auto;
      }

    }

    .button {
      position: relative;
      margin-bottom: 0;
    }
  }
}
</style>