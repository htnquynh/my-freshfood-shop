<template>
  <div class="container py-16 min-h-sm">
    <div v-show="wishlist_length == 0" class="w-full">
      <div class="w-full flex flex-col items-center p-8">
        <img src="../assets/image/empty.png" class="w-full max-w-xs h-auto mx-auto">
        <p class="text-xl md:text-2xl font-medium py-8">Nothing in Wishlist</p>

        <router-link to='/shop'>
          <button class="px-8 py-3 text-base uppercase text-white font-bold bg-gold-500"
            style="box-shadow: rgba(255, 201, 40, 0.6) 0px 12px 10px -10px;">
            Add now
          </button>
        </router-link>
      </div>
    </div>

    <div v-show="wishlist_length != 0" class="w-full">
      <div class="">
        <div class="space-y-4">
          <WishlistItem v-for="item in wishlist" :key="item.id" :product="item" class="border" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WishlistItem from '../components/WishlistItem.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    WishlistItem,
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(["wishlist", "wishlist_length"]),
  },
  filters: {
    toVND: function (value) {
      if (typeof value !== "number") {
        value = parseInt(value);
        // return value;
      }
      let formatter = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
      });
      return formatter.format(value);
    },
  },
  watch: {
  },
  async created() {
    this.start_load();
    await this.getWishlist();
    this.stop_load();
  },
  methods: {
    ...mapActions(["getWishlist", "start_load", "stop_load"]),
  },
};
</script>

<style>
</style>