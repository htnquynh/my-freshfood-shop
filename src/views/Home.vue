<template>
  <main class="w-full">
    <div class="w-full bg-fuchsia-50 flex items-center">
      <div class="container pt-12 flex justify-between items-center gap-16">
        <div class="flex-shrink-0 w-sm rounded-2xl">
          <h1 class="text-6xl font-bold text-violet-700">Fresh Shop</h1>
          <p class="pt-6 ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </p>

          <div class="pt-8">
            <router-link to="/shop">
              <button
                class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
                Shop now
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                  viewBox="0 0 24 24" fill="currentColor">
                  <rect fill="none" height="24" width="24" />
                  <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
                </svg>
              </button>
            </router-link>
          </div>
        </div>
        <div class="relative">
          <img src="/assets/images/image-3.png" alt="" class="">
        </div>
      </div>
    </div>
    <div class="section-service">
      <GlobalService />
    </div>
    <div class="py-16 lg:pb-24">
      <div class="container space-y-16">
        <div class="flex justify-between gap-8 items-end">
          <h2 class="text-5xl font-bold">Trending Product.</h2>
          <router-link to="/shop">
            <a
              class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </a>
          </router-link>
        </div>
        <div class="grid grid-cols-5 gap-6">
          <Product class="product" v-for="item in featured" :key="item._id" :product="item" />
        </div>
      </div>
    </div>

    <div class="py-16 lg:pb-24 bg-fuchsia-50">
      <div class="container space-y-16">
        <div class="flex justify-center gap-8 items-end">
          <h2 class="text-5xl font-bold text-violet-800">Best Seller.</h2>
          <router-link to="/shop">
            <a
              class="text-violet-800 border border-violet-800 px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </a>
          </router-link>
        </div>
        <div class="">
          <swiper :modules="modules" :loop="true" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }" :slides-per-view="5" :space-between="24" navigation :pagination="{ clickable: true }" class="!pb-16">
            <swiper-slide v-for="item in best_seller" :key="item._id" class="">
              <Product :product="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="py-16 lg:pb-24">
      <div class="container space-y-16">
        <div class="flex justify-center gap-8 items-end">
          <h2 class="text-5xl font-bold">New Arrival.</h2>
          <router-link to="/shop">
            <a
              class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </a>
          </router-link>
        </div>
        <div class="">
          <swiper :modules="modules" :loop="true" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }" :slides-per-view="5" :space-between="24" navigation :pagination="{ clickable: true }" class="!pb-16">
            <swiper-slide v-for="item in new_arrival" :key="item._id" class="">
              <Product :product="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="py-16 lg:pb-24">
      <div class="container space-y-16">
        <div class="flex justify-between gap-8 items-end">
          <h2 class="text-5xl font-bold">Recommend menu.</h2>
          <router-link to="/recommend-menu">
            <a
              class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </a>
          </router-link>
        </div>
        <div class="">
          <swiper :modules="modules" :loop="true" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }" :slides-per-view="3" :space-between="32" navigation :pagination="{ clickable: true }" class="!pb-16">
            <swiper-slide v-for="item in groups.slice(0, 3)" :key="item._id" class="">
              <Group :group="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import Swiper core and required modules
import { Autoplay, Navigation, Pagination } from 'swiper';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Product from "../components/Product.vue";
import Group from "../components/Group.vue";
import GlobalService from "../components/global/GlobalService.vue";

import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    GlobalService,
    Product,
    Group,
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      featured: [],
      best_seller: [],
      new_arrival: [],
    };
  },
  setup() {
    return {
      modules: [Autoplay, Navigation, Pagination],
    };
  },
  async created() {
    this.start_load();
    this.getProducts().then((res) => {
      console.log(res);
      this.featured = this.products.slice(0, 10);
      this.best_seller = this.sortProductBySold(this.products).slice(0, 10);
      this.new_arrival = this.featured.slice(0, 5);
      this.getGroups().then(() => {
        this.stop_load();
      });
    });
  },
  computed: {
    ...mapGetters(["products", "groups"]),
  },
  methods: {
    ...mapActions(["getProducts", "getGroups", "start_load", "stop_load"]),
    sortProductBySold(list) {
      return list.sort(function (a, b) {
        return b.quantity_sold - a.quantity_sold;
      });
    },
  },
};
</script>

<style>
.swiper-wrapper {}

.swiper-button-next,
.swiper-button-prev {
  width: 32px !important;
  height: 32px !important;
  background-color: #6d28d9;
  color: #ffffff;
  border-radius: 24px;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 1rem;
  font-weight: 700;
}

.swiper-pagination-bullet-active {
  background-color: #6d28d9 !important;
}
</style>