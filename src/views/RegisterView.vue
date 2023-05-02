<template>
  <div class="register">
    <h1 class="title">Register</h1>
    <TextInput v-model="username" placeholder="Username" />
    <TextInput v-model="password" placeholder="Password" />
    <button class="button" @click="register">Register</button>
    <AlertBox ref='success' type="success"></AlertBox>
    <AlertBox ref='warning' type="warning"></AlertBox>
    <AlertBox ref='error' type="error"></AlertBox>
  </div>
</template>

<script>
import TextInput from '@/components/inputs/TextInput.vue';
import AlertBox from '@/components/AlertBox.vue';

export default {
  name: 'RegisterView',
  components: {
    TextInput,
    AlertBox
  },
  methods: {
    register() {
      if (!this.validate()) return;
      this.$store.dispatch('auth/register', { password: this.password, username: this.username }).then(response => {
        this.$refs.success.timeout(4000, 'Registered successfully!');
        this.clearForm();
      }).catch(e => {
        this.$refs.error.timeout(4000, e.response.data.error);
      })
    },
    validate() {
      let warning = "";
      if (!this.username) warning = "Remember to add username!";
      else if (!this.password) warning = "Remember to add password!";
      if (warning) {
        this.$refs.warning.timeout(4000, warning);
        return false;
      }
      return true;
    },
    clearForm() {
      this.username = "";
      this.password = "";
    },
  },
  computed: {

  },
  data() {
    return {
      username: "",
      password: "",
    }
  },
}
</script>

<style lang="scss" scoped>
.register {
  width: 600px;
  padding: 30px;
  margin-top: 250px;
  background: $main-bg-2;
  margin-inline: auto;
  border-radius: 5px;

  .title {
    text-align: center;
  }

  &>* {
    margin-bottom: 25px;
  }

  .button {
    width: 100%;
    margin-top: 10px;
  }
}
</style>