<template>
    <div class="edit-shows">
        <ControlShowsView v-if="show" :isEditing="true" :show="show"></ControlShowsView>
    </div>
</template>
  
<script>
import ControlShowsView from './ControlShowsView.vue';


export default {
    name: 'EditShowsView',
    components: {
        ControlShowsView
    },
    methods: {
    },
    computed: {

    },
    data() {
        return {
            show: null,
        }
    },
    async created() {
        await this.$store.dispatch('show/getShow', this.$route.params.id);
        this.show = this.$store.getters['show/show'];
    }
}
</script>
  
<style lang="scss" scoped></style>