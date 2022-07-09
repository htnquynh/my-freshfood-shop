
<template>
  <div class="py-12 max-w-xs mx-auto space-y-8">
    <h2 class="text-4xl font-bold text-center">Sign in</h2>

    <div class="space-y-4">
      <div class="space-y-4">
        <div class="space-y-2">
          <label class="block font-medium">Username</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" ref="username-input" type="text"
            v-model="username" />
        </div>

        <div class="space-y-2">
          <label class="block font-medium" for="">Password</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" ref="password-input" type="password"
            v-model="password" />
        </div>
      </div>

      <div class="flex justify-between items-center">
        <label class="check-box">
          <input v-model="check" type="checkbox" value="remember-me" name="remember" />
          <span class="design"></span>
          <span class="text">Remember me</span>
        </label>
        <router-link to="/forgot-password">
          <a class="font-medium">Forgot Password</a>
        </router-link>
      </div>

      <div class="pt-4 w-full space-y-4">
        <a ref="btn-login" @click="submitForm()"
          class="block text-center w-full px-8 py-3 bg-violet-600 text-white uppercase font-semibold">
          <span>Login to Account</span>
        </a>

        <a ref="btn-login-with-google" @click="googleSignIn()"
          class="block w-full px-8 py-2 border border-black uppercase font-semibold flex justify-center items-center gap-4 hover:bg-violet-100 transition-colors duration-200 ease-in">
          <span>Login with Google</span>
          <span class="h-6 w-1px bg-black"></span>
          <span>
            <img class="w-8 h-8 object-contain" src="/assets/images/logo-google.png" alt="" />
          </span>
        </a>

        <div class="flex justify-center gap-3">
          <p class="">Don't have an account?</p>
          <router-link to="/signup">
            <a class="font-semibold underline">Sign Up</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import UserAPI from "../api/UserAPI";

export default {
  components: {},
  data() {
    return {
      check: ["remember-me"],
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions([
      "getUserCart",
      "getWishlist",
      "setUser",
      "start_load",
      "stop_load",
    ]),
    async login(username, password) {
      this.start_load();
      await UserAPI.login(username, password)
        .then((res) => {
          let user_login = JSON.stringify(res.data.accessToken);
          sessionStorage.setItem("user_login", user_login);

          this.$store.dispatch('setUser', res.data.user).then(async () => {
            console.log('Set user: ', res.data.user);
            await this.getUserCart();
            await this.getWishlist();
            this.stop_load();
            this.$router.push("/");
            this.$swal.fire(
              "Welcome!",
              "You have successfully logged in.",
              "success"
            );
            this.$forceUpdate();
          });
        })
        .catch((err) => {
          console.log(err.message);
          this.stop_load();
          this.$swal.fire("Uh oh!", "You have failed to login.", "error");
        });
    },
    async submitForm() {
      if (this.username == "") {
        console.log("Username Empty");
        this.$swal.fire("Oops...", "Please enter your Username!", "error");
      } else if (this.password == "") {
        console.log("Password Empty");
        this.$swal.fire("Oops...", "Please enter your Password!", "error");
      } else {
        this.login(this.username, this.password);
      }
    },
    async googleSignIn() {
      // let provider = new firebase.auth.GoogleAuthProvider();
      // firebase
      //   .auth()
      //   .signInWithPopup(provider)
      //   .then((result) => {
      //     this.start_load();
      //     //let token = result.credential.accessToken;
      //     let user = result.user;
      //     const { email, phoneNumber, photoURL, displayName } =
      //       user.providerData[0];
      //     this.user.username = Math.random().toString(36);
      //     this.user.password = Math.random().toString(36);
      //     this.user.email = email;
      //     this.user.phone = phoneNumber || "";
      //     this.user.avatar = photoURL;
      //     this.user.full_name = displayName;
      //     UserAPI.login_with_google(this.user)
      //       .then((res) => {
      //         let user_login = JSON.stringify(res.data.accessToken);
      //         sessionStorage.setItem("user_login", user_login);
      //         this.setUser(res.data.user).then(() => {
      //           this.getUserCart();
      //           this.getWishlist();
      //           this.stop_load();
      //           this.$router.push("/");
      //           this.$swal.fire(
      //             "Welcome!",
      //             "You have successfully logged in.",
      //             "success"
      //           );
      //         });
      //       })
      //       .catch((err) => {
      //         console.log(err.message);
      //         this.stop_load();
      //         this.$swal.fire("Uh oh!", "You have failed to login.", "error");
      //       });
      //   })
      //   .catch((err) => {
      //     console.log(err); // This will give you all the information needed to further debug any errors
      //   });
    },
  },
};
</script>
