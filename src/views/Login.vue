<template>
  <div class="py-12 max-w-xs mx-auto space-y-8">
    <h2 class="text-4xl font-bold text-center">Sign in</h2>

    <div class="space-y-4">
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block font-medium">Username</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" ref="username-input" type="text"
            v-model="username">
        </div>

        <div class="space-y-2">
          <label class="block font-medium" for="">Password</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" ref="password-input" type="password"
            v-model="password">
        </div>
      </div>

      <div class="flex justify-between items-center">
        <label class="check-box">
          <input v-model="check" type="checkbox" value="remember-me" name="remember">
          <span class="design"></span>
          <span class="text">Remember me</span>
        </label>
        <router-link to='/forgot-password'>
          <a class="font-medium">Forgot Password</a>
        </router-link>
      </div>

      <div class="pt-4 w-full space-y-4">
        <a ref="btn-login" @click="submitForm()"
          class="block text-center w-full px-8 py-3 bg-violet-600 text-white uppercase font-semibold">
          <span>Login to Account</span>
        </a>

        <a ref="btn-login-with-google" @click="submitForm()"
          class="block w-full px-8 py-2 border border-black uppercase font-semibold flex justify-center items-center gap-4 hover:bg-violet-100 transition-colors duration-200 ease-in">
          <span>Login with Google</span>
          <span class="h-6 w-1px bg-black"></span>
          <span>
            <img class="w-8 h-8 object-contain" src="/assets/images/logo-google.png" alt="">
          </span>
        </a>

        <div class="flex justify-center gap-3">
          <p class="">Don't have an account?</p>
          <router-link to="/signup">
            <a class="font-semibold underline">Sign Up</a>
          </router-link>
        </div>
      </div>

      <!-- <div class="pt-3 space-y-3 text-center">
        <p>Or</p>
        
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UserAPI from "../api/UserAPI";

export default {
  components: {
  },
  data() {
    return {
      check: ['remember-me'],
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["getUserCart", "getWishlist", "setUser", "start_load", "stop_load"]),
    async login(username, password) {
      this.start_load();
      await UserAPI.login(username, password)
        .then((res) => {
          let user_login = JSON.stringify(res.data.accessToken);
          sessionStorage.setItem("user_login", user_login);
          this.setUser(res.data.user).then(() => {
            this.getUserCart();
            this.getWishlist();
            this.stop_load();
            this.$router.push("/");
            this.$swal.fire(
              'Welcome!',
              'You have successfully logged in.',
              'success'
            );
          });
        })
        .catch((err) => {
          console.log(err.message);
          this.stop_load();
          this.$swal.fire(
            'Uh oh!',
            'You have failed to login.',
            'error'
          );
        });
    },
    async submitForm() {
      if (this.username == '') {
        console.log("Username Empty");
        this.$swal.fire(
          'Oops...',
          'Please enter your Username!',
          'error'
        );
      } else if (this.password == '') {
        console.log("Password Empty");
        this.$swal.fire(
          'Oops...',
          'Please enter your Password!',
          'error'
        );
      } else {
        this.login(this.username, this.password);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.home {
  @apply flex flex-col;
}

.home>.header-page {
  @apply w-full;
}

.page-content {
  @apply p-0 sm: p-4;
  @apply bg-white sm: bg-transparent;
}

.login-form-wrapper {
  @apply max-w-sm mx-auto;
  @apply bg-white;
  @apply px-4 sm: px-6 md:px-8 pb-12 pt-8 sm:pt-10;
  @apply flex flex-col items-stretch;
}

.form-title {
  @apply pb-6;
}

.form-title h2 {
  @apply text-2xl font-extrabold;
}

.form-title hr {
  @apply w-full max-w-3xl;
  @apply border-t border-secondary;
}

.login-form {
  @apply w-full;
  @apply flex flex-col items-center;
}

.login-input {
  @apply w-full;
  @apply flex flex-col gap-4;
}

.login-input .input-text {
  @apply w-full;
}

.remember-me-forgot-password {
  @apply pt-4;
  @apply w-full;
  @apply flex flex-row justify-between items-center;
}

.remember-me-forgot-password>.check-box>.design {
  @apply w-4 h-4;
}

.remember-me-forgot-password>.check-box>.design::before {
  @apply text-xl leading-4;
}

.remember-me-forgot-password>.check-box>.text {
  @apply ml-2;
  @apply font-semibold;
}

a.forgot-password {
  @apply font-semibold;
}

.login-action {
  @apply pt-8 md: pt-10;
  @apply w-full;
  @apply flex flex-col items-center;
}

a.btn-login {
  @apply w-full;
  @apply flex flex-row justify-center items-center gap-2;
  @apply px-8 py-3;
  @apply bg-gold-500 text-white;
  @apply text-base font-semibold;

  box-shadow: rgba(255, 201, 40, 0.6) 0px 12px 10px -10px;
}

.link-sign-up {
  @apply pt-4;
  @apply flex flex-row items-center gap-2;

}

.link-sign-up p {
  @apply text-gray-600;
}

.link-sign-up a {
  @apply font-semibold;
}
</style>