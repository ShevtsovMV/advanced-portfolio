<template>
  <div class="login-page-component">
    <div class="content">
      <form class="form" @submit.prevent="handleSubmit">
        <div class="form-title">Авторизация</div>
        <div class="row">
          <app-input
            v-model="user.name"
            :errorMessage="validation.firstError('user.name')"
            title="Логин"
            icon="user"
          />
        </div>
        <div class="row">
          <app-input
            v-model="user.password"
            :errorMessage="validation.firstError('user.password')"
            title="Пароль"
            icon="key"
            type="password"
          />
        </div>
        <div class="btn">
          <app-button :disabled="isSubmitDisabled" typeAttr="submit" title="Отправить" />
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import appInput from "../../components/input";
import appButton from "../../components/button";
import { Validator, mixin as ValidatorMixin } from "simple-vue-validator";
import $axios from "../../requests";

export default {
  mixins: [ValidatorMixin],
  validators: {
    "user.name": value => {
      return Validator.value(value).required("Введите имя пользователя")
    },
    "user.password": value => {
      return Validator.value(value).required("Введите пароль")
    },
  },
  components: {
    appInput,
    appButton,
  },
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
      isSubmitDisabled: false,
    };
  },
  methods: {
    async handleSubmit() {
      if ((await this.$validate()) === false) return;
      
      this.isSubmitDisabled = true;
      try {
        const response = await $axios.post("/login", this.user);
        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;
        this.$router.replace("/");
      } catch (error) {
        console.log(error.response.data.error);
      } finally {
        this.isSubmitDisabled = false;
      }
    },
  },
};
</script>

<style lang="postcss" scoped src="./login.pcss"></style>