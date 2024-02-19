<template>
    <div class="hero-banner">
        <img class="hero-t" :src="image">
        <div class="hero-gradient"></div>
        <div class="hero-items">
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
.hero-banner {
    position: relative;
    width: 100%;
    background: rgb(26, 26, 26);

    .hero-t {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        object-fit: cover;
        filter: brightness(70%);
    }

    .hero-gradient {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgb(0, 0, 0);
        background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.74) 100%);
    }

    .hero-items {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>