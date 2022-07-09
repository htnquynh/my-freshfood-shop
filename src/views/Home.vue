<template>
  <main class="w-full">
    <div class="w-full bg-fuchsia-50 flex items-center">
      <div class="container pt-12 space-y-4 md:space-y-0 md:flex md:justify-between md:items-center md:gap-16">
        <div class="relative md:order-2">
          <img src="/assets/images/image-3.png" alt="" class="">
        </div>
        <div class="w-full md:order-first md:flex-shrink-0 md:w-sm md:rounded-2xl">
          <h1 class="text-4xl md:text-6xl font-bold text-violet-700">Fresh Shop</h1>
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
      </div>
    </div>
    <div>
      <GlobalService />
    </div>
    <div class="py-16 lg:pb-24">
      <div class="container space-y-16">
        <div class="space-y-4 md:space-y-0 md:flex md:justify-between md:gap-8 md:items-end">
          <h2 class="text-3xl md:text-5xl font-bold">Trending Product.</h2>
          <router-link to="/shop" class="block">
            <button
              class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </button>
          </router-link>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <Product class="product" v-for="item in featured" :key="item._id" :product="item" />
        </div>
      </div>
    </div>

    <div class="py-16 lg:pb-24 bg-fuchsia-50">
      <div class="container space-y-16">
        <div class="space-y-4 md:space-y-0 md:flex md:justify-center md:gap-8 md:items-end">
          <h2 class="text-3xl md:text-5xl font-bold text-violet-800">Best Seller.</h2>
          <router-link to="/shop" class="block">
            <button
              class="text-violet-800 border border-violet-800 px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </button>
          </router-link>
        </div>
        <div class="">
          <swiper :modules="modules" :loop="best_seller.length >= 5 ? true : false" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }" :breakpoints="breakpoints" navigation :pagination="{ clickable: true }" class="!pb-16">
            <swiper-slide v-for="item in best_seller" :key="item._id" class="">
              <Product :product="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="py-16 lg:pb-24">
      <div class="container space-y-16">
        <div class="space-y-4 md:space-y-0 md:flex md:justify-center md:gap-8 md:items-end">
          <h2 class="text-3xl md:text-5xl font-bold">New Arrival.</h2>
          <router-link to="/shop" class="block">
            <button
              class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </button>
          </router-link>
        </div>
        <div class="">
          <swiper :modules="modules" :loop="new_arrival.length >= 5 ? true : false" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }" :breakpoints="breakpoints" navigation :pagination="{ clickable: true }" class="!pb-16">
            <swiper-slide v-for="item in new_arrival" :key="item._id" class="">
              <Product :product="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>

    <div class="py-16 lg:pb-24">
      <div class="container space-y-16">
        <div class="space-y-4 md:space-y-0 md:flex md:justify-center md:gap-8 md:items-end">
          <h2 class="text-3xl md:text-5xl font-bold">Recommend menu.</h2>
          <router-link to="/recommend-menu" class="block">
            <button
              class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600">
              Show all
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"
                viewBox="0 0 24 24" fill="currentColor">
                <rect fill="none" height="24" width="24" />
                <path d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z" />
              </svg>
            </button>
          </router-link>
        </div>
        <div class="">
          <swiper :modules="modules" :loop="groups.length >= 3 ? true : false" :autoplay="{
            delay: 2500,
            disableOnInteraction: false,
          }" :breakpoints="breakpoints_group" navigation :pagination="{ clickable: true }" class="!pb-16">
            <swiper-slide v-for="item in groups.slice(0, 3)" :key="item._id" class="">
              <Group :group="item" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <GlobalSubscribe />
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
import GlobalSubscribe from "../components/global/GlobalSubscribe.vue"
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    GlobalService,
    GlobalSubscribe,
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
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 20
        }
      },
      breakpoints_group: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    };
  },
  setup() {
    return {
      modules: [Autoplay, Navigation, Pagination],
    };
  },
  async created() {
    this.start_load();
    await this.getProducts();
    if (this.products.length > 0) {
      this.featured = this.products.length > 10 ? this.products.slice(0, 10) : this.products;
      this.best_seller = this.products.length > 10 ? this.sortProductBySold(this.products).slice(0, 10) : this.products;
      this.new_arrival = this.products.length > 5 ? this.featured.slice(0, 5) : this.products;
    }
    await this.getGroups();
    this.stop_load();
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