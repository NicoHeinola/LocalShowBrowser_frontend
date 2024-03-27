<template>
    <div class="container">
        <video ref="videoPlayer" class="video video-js vjs-default-skin vjs-big-play-centered" controls width="640" height="360"> </video>
        <div v-if="error" class="error-message">{{ error }}</div>
    </div>
</template>
  
<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-hls';
import axios from "axios";

export default {
    props: ['videoPath'],
    data() {
        return {
            error: null,
            player: null,
        };
    },
    computed: {
        videoUrlAddress() {
            return `${axios.defaults.baseURL}/video/watch/${this.videoPath}`;
        }
    },
    watch: {
        videoPath(newPath, oldPath) {
            this.initializeNewVideo();
        }
    },
    mounted() {
        this.initializeNewVideo();

        if (!this.player) {
            return;
        }

        // Handle player errors
        this.player.on('error', this.handlePlayerError);
    },
    methods: {
        handlePlayerError(error) {
            this.error = 'Video.js error: ' + error.message;
        },
        initializeNewVideo() {
            if (this.player) {
                this.player.dispose();
            }

            if (this.videoPath === "") {
                this.player = null;
                return;
            }

            // Use video.js with hls plugin
            this.player = videojs(this.$refs.videoPlayer, {
                autoplay: false,
                controls: true,
                sources: [{
                    src: this.videoUrlAddress,
                    type: 'application/x-mpegURL'
                }]
            });

        }
    },
    beforeDestroy() {
        // Dispose the video player when component is destroyed
        if (this.player) {
            this.player.dispose();
        }
    }
};
</script>
  
<style scoped>
.container {
    width: 100%;
    height: 100%;

    .video {
        width: 100%;
        height: 100%;
    }

    .error-message {
        color: red;
        margin-top: 10px;
    }
}
</style>
  