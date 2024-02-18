<template>
    <div class="modal" :class="showClass">
        <div class="darkened-bg"></div>
        <div class="items">
            <slot></slot>
        </div>
        <div class="close-icon" @click="close"></div>
    </div>
</template>
  
<script>

export default {
    name: 'Modal',
    components: {
    },
    props: {
        show: { required: false, default: false }
    },
    data() {
        return {
        }
    },
    methods: {
        close() {
            this.$emit('close')
        }
    },
    computed: {
        showClass() {
            return this.show ? "show" : "hide";
        }
    },
    created() {
    },
}
</script>
  
<style lang="scss" scoped>
.modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;

    top: 50%;
    left: calc(50% + $nav-width);
    transform: translate(calc(-50% - $nav-width / 2), -50%);

    z-index: 150;
    transition: all 0.2s;

    .darkened-bg {
        position: fixed;
        width: calc(100vw + $nav-width);
        height: 100vh;
        background: rgba(0, 0, 0, 0.486);
    }

    &.hide {
        opacity: 0;
        pointer-events: none;
    }

    .items {
        position: relative;
        width: 100%;
        height: 100%;
        background: $modal-background;
        box-shadow: 0 0 20px 2px black;
        border-radius: 5px;
        padding-top: 60px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .close-icon {
        --size: 25px;
        position: absolute;
        top: 10px;
        right: 10px;
        width: var(--size);
        height: var(--size);
        background: url('@/assets/images/icons/close.png');
        background-size: contain;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            transform: rotateZ(90deg);
        }
    }
}
</style>