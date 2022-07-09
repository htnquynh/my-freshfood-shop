<template>
  <div class="w-full pt-4 pb-8">
    <div class="w-full max-w-xs mx-auto space-y-4">
      <h3 class="text-xl lg:text-2xl text-center font-semibold">Change Password</h3>
      <div class="space-y-2">
        <div class="space-y-2">
          <label class="block font-medium">Old Password</label>
          <input
              class="w-full px-3 py-2 border border-black focus:outline-none focus:border-violet-500 focus:ring-3 focus:ring-violet-200 transition-all duration-200 ease-in"
              type="password"
              v-model="password"
          >
        </div>

        <div class="space-y-2">
          <label class="block font-medium">New Password</label>
          <input
              class="w-full px-3 py-2 border border-black focus:outline-none focus:border-violet-500 focus:ring-3 focus:ring-violet-200 transition-all duration-200 ease-in"
              type="password"
              v-model="new_password"
          >
        </div>

        <div class="space-y-2">
          <label class="block font-medium">Confirm Password</label>
          <input
              class="w-full px-3 py-2 border border-black focus:outline-none focus:border-violet-500 focus:ring-3 focus:ring-violet-200 transition-all duration-200 ease-in"
              type="password"
              v-model="retype_new_password"
          >
        </div>
      </div>

      <button class="px-6 py-3 w-full bg-violet-600 text-white font-semibold text-center" @click="changePassword()">Change Password</button>
    </div>
  </div>
</template>

<script>
import UserAPI from "../api/UserAPI";
import { mapGetters } from "vuex";

export default {
  components: {
  },
  data() {
    return {
      password: "",
      new_password: "",
      retype_new_password: "",
    }
  },
  computed: {
    ...mapGetters(["userLogin", "start_load", "stop_load"]),
  },
  methods: {
    async changePassword() {
      if (this.password == "" || this.new_password == "" || this.retype_new_password == "") {
        this.$swal.fire(
          'Uh oh!',
          'Please complete all information.',
          'error'
        );
        return;
      }

      if (this.new_password !== this.retype_new_password) {
        this.$swal.fire(
          'Uh oh!',
          'Confirm password does not match.',
          'error'
        );
        return;
      }

      this.start_load();
      await UserAPI.changePassword(this.userLogin._id, this.password, this.new_password)
        .then((res) => {
          console.log(res.data.message);
          this.stop_load();
          this.$swal.fire(
            'Success!',
            'You have successfully updated your password',
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
  },
};
</script>

<style>
</style>