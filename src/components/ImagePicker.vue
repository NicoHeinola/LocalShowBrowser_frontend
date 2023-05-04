

<template>
    <div class="image-picker">
        <div class="images">
            <img v-for="(image, index) in imageUrls" :key="'image' + index" :class="'image ' + selectedClass(index)" :src="image" @click="e => pickedImage(index)">
            <p class="centered" v-if="imageUrls.length == 0 && !loading">No images to pick from</p>
            <div v-if="loading" class="loading-wrapper">
                <LoadingAnimation class="centered loading-icon"></LoadingAnimation>
            </div>
        </div>
    </div>
</template>
  
<script>

import LoadingAnimation from "@/components/LoadingAnimation.vue"

export default {
    name: 'ImagePicker',
    components: {
        LoadingAnimation
    },
    props: {
        imageUrls: { required: false, default: [] },
        loading: { required: false, default: false },
    },
    data() {
        return {
            selectedIndex: null,
        }
    },
    methods: {
        selectedClass(index) {
            if (this.selectedIndex == index) return 'selected';
            return '';
        },
        pickedImage(index) {
            this.selectedIndex = index;
            this.$emit('pickedImageWithUrl', this.imageUrls[index])
        }
    },
    computed: {
    },
    created() {
    },
}
</script>
  
<style lang="scss" scoped>
.image-picker {
    pointer-events: all;
    position: relative;

    .centered {
        margin: auto;
        text-align: center;
        cursor: default;

        &::selection {
            background: none;
        }
    }

    .loading-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.397);

        .loading-icon {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .images {
        --padding: 15px;
        display: flex;
        flex-direction: row;
        overflow-x: auto;
        background: $modal-background-darker;
        padding: calc(var(--padding) * 2) var(--padding);
        border-radius: 5px;
        height: 365px;

        .image {
            width: min-content;
            min-width: 250px;
            width: 250px;
            height: 100%;
            object-fit: cover;
            margin: 0 var(--padding);
            cursor: pointer;
            pointer-events: all;
            border-radius: 5px;

            &:hover {
                outline: 5px solid $modal-background;
            }

            &.selected {
                outline: 5px solid $modal-background-bright;
            }
        }
    }
}
</style>