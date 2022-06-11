<template>
  <div class="py-12 max-w-xs mx-auto space-y-8">
    <h2 class="text-4xl font-bold text-center">Sign up</h2>

    <div class="space-y-4">
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block font-medium">Email</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" type="email" v-model="user.email"
            @keyup="checkEmail()">
          <p class="text-sm text-red-600">{{ email_error }}</p>
        </div>

        <div class="space-y-2">
          <label class="block font-medium">Username</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" type="text" v-model="user.username"
            @keyup="checkUsername()">
          <p class="text-sm text-red-600">{{ username_error }}</p>
        </div>

        <div class="space-y-2">
          <label class="block font-medium">Password</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" type="password" v-model="user.password"
            @keyup="checkPassword()">
          <p class="text-sm text-red-600">{{ password_error }}</p>
        </div>

        <div class="space-y-2">
          <label class="block font-medium">Confirm Password</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" type="password"
            v-model="confirm_password" @keyup="checkPassword()">
          <p class="text-sm text-red-600">{{ confirm_password_error }}</p>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <label class="check-box">
          <input v-model="check" type="checkbox" value="remember-me" name="remember">
          <span class="design"></span>
          <span class="text">I agree to the Terms & Conditions</span>
        </label>
      </div>

      <div class="pt-4 w-full space-y-4">
        <a class="block text-center w-full px-8 py-3 bg-violet-600 text-white uppercase font-semibold" @click="signup()"
          :class="{ 'opacity-40': !enableSubmit() }">
          <span>Create Account</span>
        </a>

        <div class="flex justify-center gap-3">
          <p>Already have an account?</p>
          <router-link to="/login">
            <a class="font-semibold underline">Sign In</a>
          </router-link>
        </div>
      </div>
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
      check: ['remember-me'],
      user: {
        username: "",
        password: "",
        full_name: "",
        email: "",
        position: "customer",
        birthdate: "",
        address: "",
        phone: "",
        avatar: "",
        status: "active",
      },
      confirm_password: '',
      email_error: '',
      username_error: '',
      password_error: '',
      confirm_password_error: '',

      email_valid: false,
      username_valid: false,
      password_valid: false,
      confirm_valid: false,
    };
  },
  computed: {
  },
  filters: {
    toVND: function (value) {
      if (typeof value !== "number") {
        value = parseInt(value);
        // return value;
      }
      var formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
  },
  watch: {
    check() {
      console.log(this.check);
    },
  },
  created() {

  },
  methods: {
    ...mapActions(["start_load", "stop_load"]),
    enableSubmit() {
      return !!(this.email_valid &&
        this.username_valid &&
        this.password_valid &&
        this.confirm_valid);
    },
    checkEmail() {
      var reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!this.user.email.match(reg)) {
        this.email_valid = false;
        this.email_error = "This is not email!";
      } else {
        this.email_valid = true;
        this.email_error = "";
      }
      this.enableSubmit();
    },
    checkUsername() {
      var reg = /^(?=.*[a-zA-Z])[a-zA-Z0-9_]{4,20}$/;
      if (!this.user.username.match(reg)) {
        this.username_valid = false;
        this.username_error = "Must contain between 8 and 20 characters, including letters, numbers or underscore!";
      } else {
        this.username_valid = true;
        this.username_error = "";
      }
      this.enableSubmit();
    },
    checkPassword() {
      this.validatePassword();
      if (this.password_valid) {
        if (this.confirm_password != this.user.password) {
          this.confirm_valid = false;
          this.confirm_password_error = "Not matching";
        } else {
          this.confirm_valid = true;
          this.confirm_password_error = "";
        }
        this.enableSubmit();
      }
    },
    validatePassword() {
      var reg = /^(?=.*[0-9])(?=.*[!@.#$%^&*])[a-zA-Z0-9!@.#$%^&*]{8,20}$/;
      if (!this.user.password.match(reg)) {
        this.password_valid = false;
        this.password_error = "Must contain between 8 and 20 characters, including uppercase, lowercase letters, numbers and special characters!";
      } else {
        this.password_valid = true;
        this.password_error = "";
      }
      this.enableSubmit();
    },
    async signup() {
      if (this.enableSubmit) {
        this.start_load();
        const isEmailExist = await this.checkEmailExist(this.user.email);
        if (isEmailExist) {
          this.email_valid = false;
          this.email_error = "Email already exists!";
          this.enableSubmit();
          this.stop_load();
          return;
        }

        const isUsernameExist = await this.checkUsernameExist(this.user.username);
        if (isUsernameExist) {
          this.username_valid = false;
          this.username_error = "Username already exists!";
          this.enableSubmit();
          this.stop_load();
          return;
        }

        await UserAPI.signup(this.user).then((res) => {
          this.stop_load();
          this.$router.push({ name: "VerifyUser" });
          console.log(res.data.message);
        });
      }
    },
    async checkEmailExist(email) {
      await UserAPI.getUserByEmail(email).then((res) => {
        console.log("Check email", res.data ? true : false)
        return res.data;
      }).catch((err) => {
        console.log(err);
      });
    },
    async checkUsernameExist(username) {
      await UserAPI.getUserByUsername(username).then((res) => {
        return !(res.data);
      }).catch((err) => {
        console.log(err);
      });
    }
  },
};
</script>
