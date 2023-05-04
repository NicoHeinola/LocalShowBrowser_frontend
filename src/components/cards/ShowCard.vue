<template>
    <div :class="'card ' + isActiveClass">
        <div class="part hidden">
            <div class="bg"></div>
            <div class="wrapper">
                <p class="text">Episodes: {{ calculateEpisodes }}</p>
                <p class="text">Seasons: {{ calculateSeasons }}</p>
                <div class="bottom">
                    <div class="progress">
                        <p>Progress {{ progress }} % / 100 %</p>
                        <div class="bar">
                            <div class="active" :style="'width:' + progress + '% !important'"></div>
                            <div class="shadow"></div>
                        </div>
                    </div>
                    <button class="button large" @click="moreInfo">More Info</button>
                    <button class="button large">Watch From Playlist</button>
                    <button class="button large" @click="$router.push('edit-show/' + show.id)">Edit</button>
                    <button class="button large red" @click="deleteShow(id)">Delete</button>
                </div>
            </div>
        </div>
        <div class="part cover" @click="toggleActive">
            <img class="cover-image" :src="image">
            <div class="wrapper">
                <h1>{{ show.title }}</h1>
            </div>
        </div>

    </div>
</template>

<script>

export default {
    name: "ShowCard",
    props: {
        show: { required: true }
    },
    computed: {
        isActiveClass() {
            return this.isActive ? "active" : "";
        },
        calculateEpisodes() {
            return this.show.seasons.reduce((current, s) => s.episodes.length + current, 0)
        },
        calculateSeasons() {
            return this.show.seasons.length;
        },
        getShowImage() {
            if (this.show.cover_images.length == 0) return "";

            let data = this.show.cover_images[0].cover_image;
            let image = "data:image/*;base64," + data;
            return image;
        },
    },
    methods: {
        toggleActive() {
            this.isActive = !this.isActive;
        },

        setActive(active) {
            this.isActive = active;
        },

        moreInfo() {
            if (!this.isUrlChanging) this.$router.push("single-show/" + this.show.id)
            this.isUrlChanging = true;
        },

        async deleteShow(showId) {
            await this.$store.dispatch('show/deleteShow', showId);
            this.$emit('deleted');
        },
        async calculateProgress() {
            if (this._isLoggedIn) {
                let response = await this.$store.dispatch("show/getWatchedEpisodes", this.show.id)
                let user_episodes = response.data
                this.progress = user_episodes.length / this.calculateEpisodes * 100
            }
        }
    },
    created() {
        this.image = this.getShowImage ? this.getShowImage : require("@/assets/images/template-cover.jpg");
        this.calculateProgress();
    },
    data() {
        return {
            isActive: false,
            image: null,
            isUrlChanging: false,
            progress: 0,
        }
    }
}

</script>

<style lang="scss" scoped>
.card {
    position: relative;
    height: 350px;
    width: 250px;
    border-radius: 15px;
    /*background: rgb(255, 255, 255);*/
    margin-right: 0;
    transition: all 0.25s ease-out;
    box-shadow: 5px 5px 15px 1px rgba(0, 0, 0, 0.404);
    color: $main-text-color;
    bottom: 0;
    opacity: 0.9;

    &:not(.active):hover {
        opacity: 1;

        .hidden {
            left: 20px;
        }
    }

    &.active {
        margin-right: 225px !important;
        opacity: 1;

        .hidden {
            left: 90%;
        }

        .cover-image {
            border-top-right-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
    }

    h1 {
        font-size: 25px;
        text-align: center;
        text-shadow: 1px 1px 15px black, 1px 1px 15px black, 1px 1px 15px black;
        user-select: none;
    }

    .part {
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 15px;
    }

    .hidden {
        position: relative;
        width: 250px;
        left: 0;
        transition: all 0.25s ease-out;

        user-select: none;

        .bg {
            width: 100%;
            height: 100%;
            position: absolute;
            background: $main-bg-2;
            opacity: 0.545;
            border-radius: 15px;
        }

        .wrapper {
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 90%;
            height: 100%;
            top: 0;
            right: 0;
            padding: 20px;

            .text {
                margin: 5px 0;
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
                        background: $bar-bg-main;
                        z-index: 10;
                    }

                    .shadow {
                        background: $bar-bg-shadow;
                        z-index: 5;
                    }
                }
            }
        }

        .bottom {
            margin-top: auto;

            &>* {
                margin-top: 10px;
            }
        }
    }

    .cover {
        position: absolute;
        width: 250px;
        height: 100%;
        cursor: pointer;
        z-index: 100;

        .effect-wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            border-radius: 15px;
            overflow: hidden;
            z-index: 100;
        }

        .cover-image {
            object-fit: cover;
            width: 100%;
            height: 100%;
            border-radius: 15px;
            transition: all 0.25s ease-out;
        }

        .wrapper {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 20;
            top: 0;
            left: 0;
            padding: 20px;
        }
    }
}
</style>