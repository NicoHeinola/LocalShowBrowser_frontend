<template>
    <div :class="'alert-box ' + animationClass">
        <div :class="'color ' + colorClass">
            <img class="icon" src="@/assets/images/icons/alert.png">
        </div>
        <div class="text">
            <p>{{ text }}</p>
        </div>
    </div>
</template>
  
<script>

export default {
    name: 'AlertBox',
    components: {
    },
    props: {
        type: { required: false, default: 'success' },
    },
    computed: {
        colorClass() {
            if (this.type == 'success') return 'blue';
            else if (this.type == 'error') return 'red';
            else return 'orange';
        },
        animationClass() {
            let animationClass = '';
            if (this.text == "") animationClass += "no-display ";
            if (this.textChanged) animationClass += 'text-changed ';
            animationClass += this.timedOut ? 'timed-out ' : 'not-timed-out ';
            return animationClass;
        },
    },
    methods: {
        timeout(time, text) {

            let changed = text != this.text && this.text != '';

            // If text changed and is not doing the same animation at the moment, also checks that we are not running transition out animation
            if (changed && !this.textChanged && !this.timedOut) {
                this.textChanged = true;
                clearTimeout(this.textChangedTimeoutHandler);
                this.textChangedTimeoutHandler = setTimeout(() => {
                    this.textChanged = false;
                    this.textChangedTimeoutHandler = null;
                }, 500)
            }

            this.timedOut = false;
            this.text = text;
            clearTimeout(this.timeoutHandler);
            clearTimeout(this.timeoutTextHandler);
            this.timeoutHandler = setTimeout(() => {
                // Returns back animation
                this.timedOut = true;
                this.timeoutHandler = null;

                // Make element disappear so it doesn't take any space
                clearTimeout(this.timeoutTextHandler);
                this.timeoutTextHandler = setTimeout(() => {
                    this.text = '';
                }, 450);
            }, time)
        }
    },
    data() {
        return {
            text: '',
            textChanged: false,
            textChangedTimeoutHandler: null,
            timedOut: true,
            timeoutHandler: null,
            timeoutTextHandler: null,
        }
    },
    created() {
    },
}
</script>
  
<style lang="scss" scoped>
.alert-box {
    display: grid;
    position: relative;
    grid-template-columns: 40px auto;
    height: 40px;
    width: min-content;
    box-shadow: 0px 3px 10px 2px rgba(0, 0, 0, 0.404);
    margin: auto;
    left: 0;
    border-radius: 5px;

    &.no-display {
        display: none;
    }

    & * {
        color: $dark-text-color !important;
    }

    .text {
        display: flex;
        align-items: center;
        background: $light-color-1;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        padding: 0 20px;
        /*min-width: 150px;*/
        width: max-content;
        white-space: nowrap;
    }

    .color {
        width: 40px;
        height: 40px;
        padding: 5px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;

        .icon {
            height: 100%;
            object-fit: contain;
        }

        &.blue {
            background: rgb(0, 102, 255);
        }

        &.red {
            background: rgb(255, 0, 0);
        }

        &.orange {
            background: rgb(255, 166, 0);
        }
    }

    animation-direction: normal;
    animation-timing-function: ease-in-out;
    animation-duration: 0.5s;
    animation-play-state: paused;
    animation-iteration-count: 1;

    &.timed-out {
        /*animation: transition-out 0.3s normal forwards ease-in-out;*/
        animation-play-state: running !important;
        animation-name: transition-out;
    }

    &.not-timed-out {
        /*animation: transition-in 0.3s normal forwards ease-in-out;*/
        animation-play-state: running !important;
        animation-name: transition-in;
    }

    &.text-changed {
        animation-name: transition-in, move;
    }

    @keyframes move {
        0% {
            left: 0px;
        }

        50% {
            left: 20px;
        }

        100% {
            left: 0px;
        }
    }


    @keyframes transition-out {
        0% {
            opacity: 100;
            left: 0px;
        }

        100% {
            opacity: 0;
            left: -20px;
        }
    }

    @keyframes transition-in {
        0% {
            opacity: 0;
            left: -20px;
        }

        100% {
            opacity: 100;
            left: 0px;
        }
    }
}
</style>