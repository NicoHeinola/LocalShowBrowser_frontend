<template>
    <div class="rain-container">
        <div v-for="(drop, index) in drops" :key="index" :style="{ left: drop.left + 'vw', animationDelay: drop.delay + 's', animationDuration: drop.duration + 's' }" class="rain-drop"></div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            drops: []
        };
    },
    mounted() {
        this.createDrops();
    },
    methods: {
        createDrops() {
            // Create an array of drops
            for (let i = 0; i < 40; i++) {
                this.drops.push({
                    delay: Math.random() * 3, // Random delay for animation start
                    duration: Math.random() * 2 + 1, // Random duration for animation
                    left: Math.random() * 100 // Random horizontal position
                });
            }
        }
    }
};
</script>
  
<style scoped>
.rain-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    pointer-events: none;
}

.rain-drop {
    position: absolute;
    width: 1px;
    height: 50px;
    top: -50px;
    background-color: rgba(255, 255, 255, 0.329);
    animation: falling linear infinite;
}

@keyframes falling {
    from {
        transform: translateY(-50px);
    }

    to {
        transform: translateY(120vh);
    }
}
</style>
  