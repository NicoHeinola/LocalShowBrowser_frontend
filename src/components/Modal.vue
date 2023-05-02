<template>
    <div v-if="show" class="modal">
        <div class="items">
            <slot></slot>
            <div class="close-icon" @click="close"></div>
        </div>
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
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;

    .items {
        position: relative;
        width: 800px;
        height: 90%;
        padding: 50px;
        background: $modal-background;
        box-shadow: 0 0 20px 2px black;
        border-radius: 5px;

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
}
</style>