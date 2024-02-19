<template>
    <div class="banner">
        <img class="hero" :src="image">
        <div class="gradient"></div>
        <div class="items">
            <slot></slot>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'HeroBanner',
    components: {
    },
    props: {
        heroImage: { required: false },
    },
    data() {
        return {
            image: null,
        }
    },
    created() {
        this.image = this.heroImage ? this.heroImage : require("@/assets/images/wallpaper-1.png");
    },
}
</script>
  
<style lang="scss" scoped>
.banner {
    position: relative;
    width: 100%;
    height: 650px;
    background: rgb(26, 26, 26);

    .hero {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
        filter: brightness(70%);
    }

    .gradient {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0);
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.74) 100%);
    }

    .items {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>