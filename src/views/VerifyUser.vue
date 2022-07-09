<template>
  <div class="py-12 max-w-xs mx-auto space-y-8">
    <div class="flex flex-col justify-center items-center">
      <h2 class="relative z-2 text-4xl font-bold text-center">Verify Email!</h2>
      <hr class="relative z-0 w-full max-w-40 border-t-14 border-fuchsia-200">
    </div>

    <div class="space-y-8">
      <div class="w-full space-y-4">
        <p class="font-semibold text-center">We sent a code to your email. Please check mail and enter code in here.</p>

        <div class="input-opt">
          <input type="text" ref="code-1" id="code-1" maxlength="1" @keyup="liveOTP('code-1', 'code-2')"
            v-model="otp_1">
          <input type="text" ref="code-2" id="code-2" maxlength="1" @keyup="liveOTP('code-2', 'code-3')"
            v-model="otp_2">
          <input type="text" ref="code-3" id="code-3" maxlength="1" @keyup="liveOTP('code-3', 'code-4')"
            v-model="otp_3">
          <input type="text" ref="code-4" id="code-4" maxlength="1" @keyup="liveOTP('code-4', 'code-5')"
            v-model="otp_4">
          <input type="text" ref="code-5" id="code-5" maxlength="1" v-model="otp_5">
        </div>
      </div>

      <a ref="btn-login" @click="verify()"
        class="block text-center w-full px-8 py-3 bg-violet-600 text-white uppercase font-semibold">
        <span>Verify</span>
      </a>
    </div>
  </div>
</template>

<script>
import UserAPI from "../api/UserAPI";
import { mapActions } from "vuex";

export default {
  components: {
  },
  data() {
    return {
      otp_1: '',
      otp_2: '',
      otp_3: '',
      otp_4: '',
      otp_5: '',
    };
  },
  methods: {
    ...mapActions(["setUser", "start_load", "stop_load"]),
    liveOTP(current, next) {
      if (this.$refs[current].value.length) {
        this.$refs[next].focus();
      }
    },
    async verify() {
      if (this.otp_1 == '' || this.otp_2 == '' || this.otp_3 == '' || this.otp_4 == '' || this.otp_5 == '') {
        this.$swal.fire(
          'Uh oh!',
          'Please complete all information.',
          'error'
        );
        return;
      }
      this.start_load();
      let verify_code = this.otp_1 + this.otp_2 + this.otp_3 + this.otp_4 + this.otp_5;
      console.log(verify_code);
      await UserAPI.verifyUser(verify_code)
        .then((res) => {
          let user_login = JSON.stringify(res.data.accessToken);
          sessionStorage.setItem("user_login", user_login);
          this.setUser(res.data.newUser);
          this.stop_load();
          this.$router.push({ name: "Home" });
          this.$swal.fire(
            'Welcome!',
            'You have successfully registered!',
            'success'
          );
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
  }
};
</script>