<template>
    <div class="text-input">
        <input type="text" :placeholder="placeholder" :value="modelValue" @input="onInput" />
        <div class="effects">
            <div class="underline"></div>
            <div class="highlight"></div>
        </div>
    </div>
</template>

<script>

export default {
    name: "TextInput",
    props: {
        modelValue: { required: false },
        placeholder: { required: false },
    },
    methods: {
        onInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    },
    data() {
        return {
        }
    }
}

</script>

<style lang="scss" scoped>
.text-input {

    &.large {
        width: 100%;
    }

    input {
        border: none !important;
        width: 100%;
        min-width: 200px;
    }

    input:focus~.effects .underline {
        width: 100%;
    }

    .effects {
        position: relative;
        bottom: -5px;
        width: 100%;
        height: 7px;
    }

    .underline {
        position: absolute;
        width: 20%;
        height: 2px;
        top: 0;
        left: 0;
        background: $light-color-1;
        transition: all 0.2s ease-in-out;
        z-index: 5;
    }

    .highlight {
        position: absolute;
        width: 100%;
        height: 2px;
        top: 0;
        left: 0;
        background: $light-color-1;
        opacity: 0.4;
        transition: all 0.2s ease-in-out;
    }
}
</style>