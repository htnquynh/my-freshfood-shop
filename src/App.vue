<template>
  <div id="app" class="bg-white">
    <GlobalHeader class="header-page" />
    <MiniCart />

    <router-view />


    <GlobalSubscribe />
    <GlobalFooter />

    <LoadScreen :isLoading="isLoading" />
    <button class="fixed bottom-4 right-4 rounded-full bg-gold-500 p-2 z-20" @click="backToTop()">
      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24"
        width="24px" fill="#000000">
        <rect fill="none" height="24" width="24" />
        <path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z" />
      </svg>
    </button>
  </div>
</template>
<script>
import LoadScreen from "./components/LoadScreen.vue";

import GlobalHeader from "./components/global/GlobalHeader.vue";
import GlobalFooter from "./components/global/GlobalFooter.vue";
import MiniCart from "./components/MiniCart.vue";
import GlobalSubscribe from "./components/global/GlobalSubscribe.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    LoadScreen,
    GlobalHeader,
    GlobalFooter,
    MiniCart,
    GlobalSubscribe,
  },
  data() {
    return {};
  },
  created() {
    console.log("In App.vue: " + this.isLoading);
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  methods: {
    backToTop() {
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    },
  },
};
</script>
<style scoped>
</style>
