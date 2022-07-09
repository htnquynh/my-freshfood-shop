<template>
  <div class="py-16 max-w-xs mx-auto space-y-8 min-h-96">

    <h2 class="text-4xl font-bold text-center">Forgot Password!</h2>

    <div class="space-y-4">
      <div class="space-y-2">
        <label class="block font-medium">Email</label>
        <input class="w-full px-3 py-2 border border-black focus:outline-none" type="email" v-model="email" />
      </div>

      <a ref="btn-login" @click="sendMail()"
        class="block text-center w-full px-8 py-3 bg-violet-600 text-white uppercase font-semibold">
        <span>Reset Password</span>
      </a>
    </div>
  </div>
</template>

<script>

import { mapActions } from "vuex";
import UserAPI from '../api/UserAPI';

export default {
  components: {
  },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    ...mapActions(["start_load", "stop_load"]),
    async sendMail() {
      if (this.email == '') {
        this.$swal.fire(
          'Uh oh!',
          'Please enter your email address.',
          'error'
        );
        return;
      }

      this.start_load();
      await UserAPI.getUserByEmail(this.email)
        .then((res) => {
          if (res.data) {
            UserAPI.forgotPassword(this.email)
              .then((res) => {
                this.stop_load();
                console.log(res.data);
                this.$router.push({
                  name: "VerifyResetPassword",
                  params: { email: this.email },
                });
              })
              .catch((err) => {
                this.stop_load();
                this.$swal.fire(
                  'Uh oh!',
                  'Something went wrong. Double check your work.',
                  'error'
                );
                console.log(err.message);
              });
          } else {
            this.stop_load();
            this.$swal.fire(
              'Oh oh!',
              'This email is not registered!',
              'error'
            );
          }
        })
        .catch((err) => {
          this.stop_load();
          this.$swal.fire(
            'Uh oh!',
            'Something went wrong. Double check your work.',
            'error'
          );
          console.log(err.message);
        });
    },
  },
};
</script>