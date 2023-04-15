<template>
    <div class="nav-wrapper">
        <nav>
            <div class="bg"></div>
            <div class="items">
                <!--div class="item return">
                    <img class="logo" src="@/assets/images/icons/return.png">
                    <p class="text" @click="goBack">Go Back</p>
                </div-->
                <router-link to="/" class="item">
                    <img class="logo" src="@/assets/images/icons/home.png">
                    <p class="text">Home</p>
                </router-link>
                <router-link to="/shows" class="item">
                    <img class="logo" src="@/assets/images/icons/movie.png">
                    <p class="text">Shows</p>
                </router-link>
                <router-link to="/settings" class="item">
                    <img class="logo" src="@/assets/images/icons/settings.png">
                    <p class="text">Settings</p>
                </router-link>
                <div class="item search">
                    <TextInput placeholder="Search for shows or movies" />
                    <img class="logo" src="@/assets/images/icons/search.png">
                </div>
                <button style="z-index: 100;" class="button" @click="test">Test button!</button>
            </div>
        </nav>
    </div>
</template>

<script>
import TextInput from './inputs/TextInput.vue';


export default {
    name: 'Navigation',
    components: {
        TextInput
    },
    methods: {
        goBack() {
            this.$router.back()
        },
        test() {
            this.$store.dispatch("searchShows", "test");
        }
    }
}

</script>

<style lang="scss" scoped>
.nav-wrapper {

    display: flex;
    justify-content: center;

    nav {
        position: absolute;
        width: 90%;
        margin: 20px 0;
        padding: 10px 20px;
        height: 55px;
        border-radius: 50px;

        z-index: 100;
        color: $light-color-1;

        &>.bg {
            position: absolute;
            width: 100%;
            height: 55px;
            border-radius: 50px;
            background: $main-bg-2;
            opacity: 0.5;
            left: 0;
            top: 0;
        }

        .logo {
            position: relative;
            bottom: -1px;
            height: 25px;
            z-index: 10;
            margin: 0 5px;
            transition: all 0.2s ease-in-out;
        }

        .items {
            display: flex;
            flex-direction: row;
            justify-content: center;
            height: 100%;

            .item {
                margin: 0 10px;
                position: relative;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                height: 100%;
                width: min-content;
                overflow: hidden;
                cursor: pointer;

                & *::selection {
                    background: none;
                }

                &:not(.search) ::after {
                    display: block;
                    position: absolute;
                    bottom: 2px;
                    left: calc(25px + 10px);
                    width: 0%;
                    content: "";
                    height: 2px;
                    border-radius: 50px;
                    background: white;
                    transition: all 0.3s ease-out;
                }

                &:visited {
                    color: none;
                }

                &:hover {
                    & ::after {
                        width: 100%;
                    }

                    .logo {
                        bottom: 4px;
                    }
                }
            }

            .text {
                white-space: nowrap;
            }

            .search {
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
            }

            .return {
                position: absolute;
                height: 35px;
                left: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
}
</style>