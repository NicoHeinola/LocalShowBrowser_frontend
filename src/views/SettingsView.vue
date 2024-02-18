<template>
  <div class="settings">
    <div class="media-player-status">
      <h1>Media Player Status</h1>
      <p class="status-text " :class="downloadStatusClass">{{ downloadStatus }}</p>
      <LoadingAnimation class="loading-animation" v-if="isDownloading"></LoadingAnimation>
      <button class="button large" @click="downloadMediaPlayer" :disabled="isDownloaded">Download</button>
    </div>
    <div class="all-settings">
      <h1 class="title">General Settings</h1>
      <div class="single" v-for="setting, index in settings" :key="'setting-' + setting.id">
        <p class="name">{{ setting.name }}: </p>
        <TextInput class="input" type="text" v-model="settings[index].value" />
        <button class="button" @click="updateSetting(setting.name)">Update</button>
        <button class="button red" @click="resetSetting(setting.name)">Reset</button>
      </div>
    </div>
    <div class="blacklisted-folders">
      <h1 class="title">Blacklisted Folders</h1>
      <div class="folder" v-for="folder, index in blacklistedFolders" :key="'setting-' + folder.id">
        <TextInput class="input" type="text" v-model="blacklistedFolders[index].folder_path" />
        <button class="button" @click="updateBlacklistedFolder(folder.id)">Update</button>
        <button class="button red" @click="deleteBlacklistedFolder(folder.id)">Delete</button>
      </div>
      <div class="new">
        <TextInput class="input" type="text" v-model="newBlacklistedFolderPath" :placeholder="'Type a new blacklisted folder name'" />
        <button class="button add-more" @click="addBlacklistedFolder">Add new blacklisted folder</button>
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import LoadingAnimation from '@/components/LoadingAnimation.vue';
import Swal from 'sweetalert2'


export default {
  name: 'SettingsView',
  components: {
    LoadingAnimation,
    TextInput
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
    async updateSetting(name) {
      let value = this.settings.find(setting => setting.name == name).value;
      let result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure you want to update this setting?',
        text: `${name} => ${value}`,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true
      });
      if (!result.isConfirmed) return;

      await this.$store.dispatch("setting/updateSetting", { name: name, value: value });
      this.getSettings();
    },
    async resetSetting(name) {

      let result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure you want to reset this setting?',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true
      });
      if (!result.isConfirmed) return;

      await this.$store.dispatch("setting/resetSetting", { name: name });
      this.getSettings();
    },
    async updateBlacklistedFolder(id) {
      let path = this.blacklistedFolders.find(blacklistedFolder => blacklistedFolder.id == id).folder_path;
      let result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure you want to update this blacklisted folder?',
        text: `${id} => ${path}`,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true
      });
      if (!result.isConfirmed) return;

      await this.$store.dispatch("blacklistedFolder/updateBlacklistedFolder", { id: id, path: path });
      this.getBlacklistedFolders();
    },
    async addBlacklistedFolder() {
      await this.$store.dispatch("blacklistedFolder/addBlacklistedFolder", { path: this.newBlacklistedFolderPath });
      this.getBlacklistedFolders();
      this.newBlacklistedFolderPath = "";
    },
    async deleteBlacklistedFolder(id) {

      let result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure you want to update this blacklisted folder?',
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        showCancelButton: true,
        showCloseButton: true
      });
      if (!result.isConfirmed) return;

      await this.$store.dispatch("blacklistedFolder/deleteBlacklistedFolder", { id: id });
      this.getBlacklistedFolders();
    },
    async downloadMediaPlayer() {
      this.isDownloading = true;
      await this.$store.dispatch("mediaPlayer/download");
      this.isDownloading = false;
    },
    async getSettings() {
      await this.$store.dispatch('setting/getSettings');
      this.settings = this.$store.getters["setting/settings"];
    },
    async getBlacklistedFolders() {
      await this.$store.dispatch('blacklistedFolder/getBlacklistedFolders');
      this.blacklistedFolders = this.$store.getters["blacklistedFolder/blacklistedFolders"];
    }
  },
  created() {
    this.$store.dispatch('mediaPlayer/isDownloaded');
    this.getSettings();
    this.getBlacklistedFolders();
  },
  data() {
    return {
      isDownloading: false,
      settings: [],
      blacklistedFolders: [],
      newBlacklistedFolderPath: "",
    }
  }
}
</script>

<style lang="scss" scoped>
.settings {
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100%;
  padding: 100px;

  .media-player-status {
    position: relative;
    background: $main-bg-2;
    width: 470px;
    margin: auto;
    text-align: center;
    padding: 20px;
    border-radius: 10px;

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

    }

    .button {
      position: relative;
      margin-bottom: 0;
    }
  }
}

.loading-animation {
  margin: auto;
  margin-bottom: 20px;
}

.all-settings {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  background: $main-bg-2;
  gap: 20px;
  width: 1000px;
  max-width: 100%;
  margin-top: 30px;
  padding: 20px;
  border-radius: 10px;

  .title {
    text-align: center;
  }

  .single {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .button {
      width: 150px;
      margin-left: auto;
    }
  }
}

.blacklisted-folders {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: auto;
  background: $main-bg-2;
  gap: 20px;
  width: 700px;
  max-width: 100%;
  margin-top: 30px;
  padding: 20px;
  border-radius: 10px;

  .title {
    text-align: center;
  }

  .folder {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 0.5fr 0.5fr;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    .button {
      width: 150px;
      margin-left: auto;
    }
  }

  .new {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    width: 100%;
    margin-top: 20px;
  }
}
</style>