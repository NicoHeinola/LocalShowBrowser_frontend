<template>
    <nav>
        <router-link to="/" class="link">
            <img class="icon" src="@/assets/images/icons/home.png">
            <p class="title">Home</p>
        </router-link>
        <router-link to="/shows" class="link">
            <img class="icon" src="@/assets/images/icons/shows.png">
            <p class="title">Shows</p>
        </router-link>
        <router-link to="/control-shows" class="link" v-if="_isAdmin">
            <img class="icon" src="@/assets/images/icons/edit-shows.png">
            <p class="title">Show Admin Panel</p>
        </router-link>
        <router-link to="/settings" class="link" v-if="_isAdmin">
            <img class="icon" src="@/assets/images/icons/settings.png">
            <p class="title">Site Settings</p>
        </router-link>
        <router-link v-if="!_isLoggedIn" to="/login" class="link">
            <img class="icon" src="@/assets/images/icons/login.png">
            <p class="title">Login</p>
        </router-link>
        <router-link v-if="!_isLoggedIn" to="/register" class="link">
            <img class="icon" src="@/assets/images/icons/register.png">
            <p class="title">Register</p>
        </router-link>
        <div v-if="_isLoggedIn && _currentUser" @click="logout" class="link">
            <img class="icon" src="@/assets/images/icons/logout.png">
            <p class="title">Logout ({{ _currentUser.username }})</p>
        </div>
    </nav>
</template>

<script>
import TextInput from './inputs/TextInput.vue';


export default {
    name: 'Navigation',
    components: {
        TextInput
    },
    methods: {
        logout() {
            this.$store.dispatch('auth/logout');
        }
    },
}

</script>

<style lang="scss" scoped>
nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    position: fixed;
    top: 0;
    width: $nav-width;
    height: 100%;
    background: $nav-color;
    z-index: 100;

    box-shadow: 0px 0 8px 1px rgba(0, 0, 0, 0.671);

    .link {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        width: 100%;
        aspect-ratio: 1;

        cursor: pointer;


        .icon {
            width: 65%;
            transition: all 0.2s;
        }

        &:hover {
            .title {
                opacity: 1;
            }

            .icon {
                width: 72%;
            }
        }

        .title {
            position: absolute;
            left: 100%;
            margin-left: 15px;
            background: $nav-item-color;
            border-radius: 25px;
            padding: 10px;

            opacity: 0;
            transition: opacity 0.2s;
            box-shadow: 0px 0 15px 1px rgba(0, 0, 0, 0.315);

            white-space: nowrap;
            pointer-events: none;
        }
    }
}
</style>