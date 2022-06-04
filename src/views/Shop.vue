<template>
  <main class="">
    <div class="container py-16 flex gap-8">
      <div class="w-72 space-y-6">
        <div class="w-full space-y-2">
          <div class="font-bold pb-2 border-b border-black">
            <h3>Sort by</h3>
          </div>
          <div class="group-radio-box">
            <label class="radio-box">
              <input type="radio" value="newest" name="order-sort" v-model="checkedSort" />
              <span class="design"></span>
              <span class="text">Newest</span>
            </label>

            <label class="radio-box">
              <input type="radio" value="oldest" name="order-sort" v-model="checkedSort" />
              <span class="design"></span>
              <span class="text">Oldest</span>
            </label>

            <label class="radio-box">
              <input type="radio" value="price-low-to-high" name="order-sort" v-model="checkedSort" />
              <span class="design"></span>
              <span class="text">Price: Low to High</span>
            </label>

            <label class="radio-box">
              <input type="radio" value="price-high-to-low" name="order-sort" v-model="checkedSort" />
              <span class="design"></span>
              <span class="text">Price: High to Low</span>
            </label>
          </div>
        </div>

        <div class="w-full space-y-2">
          <div class="font-bold pb-2 border-b border-black">
            <h3>Category</h3>
          </div>
          <div class="group-radio-box">
            <label class="check-box" v-for="item in category" :key="item.id">
              <input type="checkbox" :id="item.id" :value="item.name" v-model="checkedCategory" @change="filter()" />
              <span class="design"></span>
              <span class="text" :for="item.id">{{ item.name }}</span>
            </label>
          </div>
        </div>

        <div class="w-full space-y-2">
          <div class="font-bold pb-2 border-b border-black">
            <h3>Price</h3>
          </div>

          <div class="price-slider-wrapper">
            <div class="price-slider">
              <input type="range" id="input-left" :min="min" :max="max" v-model="priceFrom" step="1000"
                @input="setInputLeft()" @mouseover="inputLeftHover = true" @mouseout="inputLeftHover = false"
                @mousedown="inputLeftActive = true" @mouseup="inputLeftActive = false" />
              <div class="slider">
                <div class="track"></div>
                <div ref="sliderRange" class="range"></div>
                <div ref="sliderThumbLeft" class="thumb left" :class="{
                  hover: inputLeftHover,
                  active: inputLeftActive,
                }">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M3.5 10.3178C3.5 5.71789 7.34388 2 11.9934 2C16.6561 2 20.5 5.71789 20.5 10.3178C20.5 12.6357 19.657 14.7876 18.2695 16.6116C16.7388 18.6235 14.8522 20.3765 12.7285 21.7524C12.2425 22.0704 11.8039 22.0944 11.2704 21.7524C9.13474 20.3765 7.24809 18.6235 5.7305 16.6116C4.34198 14.7876 3.5 12.6357 3.5 10.3178ZM9.19423 10.5768C9.19423 12.1177 10.4517 13.3297 11.9934 13.3297C13.5362 13.3297 14.8058 12.1177 14.8058 10.5768C14.8058 9.0478 13.5362 7.77683 11.9934 7.77683C10.4517 7.77683 9.19423 9.0478 9.19423 10.5768Z"
                      fill="currentColor" />
                  </svg>
                </div>
                <div ref="sliderThumbRight" class="thumb right" :class="{
                  hover: inputRightHover,
                  active: inputRightActive,
                }">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M3.5 10.3178C3.5 5.71789 7.34388 2 11.9934 2C16.6561 2 20.5 5.71789 20.5 10.3178C20.5 12.6357 19.657 14.7876 18.2695 16.6116C16.7388 18.6235 14.8522 20.3765 12.7285 21.7524C12.2425 22.0704 11.8039 22.0944 11.2704 21.7524C9.13474 20.3765 7.24809 18.6235 5.7305 16.6116C4.34198 14.7876 3.5 12.6357 3.5 10.3178ZM9.19423 10.5768C9.19423 12.1177 10.4517 13.3297 11.9934 13.3297C13.5362 13.3297 14.8058 12.1177 14.8058 10.5768C14.8058 9.0478 13.5362 7.77683 11.9934 7.77683C10.4517 7.77683 9.19423 9.0478 9.19423 10.5768Z"
                      fill="currentColor" />
                  </svg>
                </div>
              </div>
              <input type="range" id="input-right" :min="min" :max="max" v-model="priceTo" step="1000"
                @input="setInputRight()" @mouseover="inputRightHover = true" @mouseout="inputRightHover = false"
                @mousedown="inputRightActive = true" @mouseup="inputRightActive = false" />
            </div>
          </div>

          <div class="px-3 flex justify-between gap-4">
            <p class="font-medium">From: {{ $filters.toVND(priceFrom) }}</p>
            <p class="font-medium">To: {{ $filters.toVND(priceTo) }}</p>
          </div>
        </div>
      </div>

      <div v-if="displayedProducts.length != 0" class="w-full">
        <div class="grid grid-cols-4 gap-8">
          <Product :product="product" v-for="product in displayedProducts" :key="product._id" />
        </div>
        <div class="w-full mt-8">
          <div v-if="canPagination()">
            <div class="flex justify-center">
              <button class="font-medium px-2 py-1 sm: px-4 sm:py-2" v-if="page != 1" @click="page--">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                  fill="currentColor">
                  <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
                  <path
                    d="M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76z" />
                </svg>
              </button>
              <button class="font-medium px-2 py-1 sm: px-4 sm:py-2"
                v-for="pageNumber in pages.slice(page - 1, page + 3)" :key="pageNumber.id"
                :class="pageNumber.page == page ? '!font-bold border-b-4 border-gold-500' : ''"
                @click="page = pageNumber.page">
                {{ pageNumber.page }}
              </button>
              <button @click="page++" v-if="page < pages.length" class="font-medium px-2 py-1 sm: px-4 sm:py-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                  fill="currentColor">
                  <path d="M24 24H0V0h24v24z" fill="none" opacity=".87" />
                  <path
                    d="M7.38 21.01c.49.49 1.28.49 1.77 0l8.31-8.31c.39-.39.39-1.02 0-1.41L9.15 2.98c-.49-.49-1.28-.49-1.77 0s-.49 1.28 0 1.77L14.62 12l-7.25 7.25c-.48.48-.48 1.28.01 1.76z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="w-full">
        <p class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold opacity-20 text-center px-4 py-8">
          Nothing here
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import Product from "../components/Product.vue";

import _ from "lodash";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Product,
  },
  data() {
    return {
      shop_products: [],
      checkedCategory: [],
      checkedSort: "newest",
      priceFrom: 0,
      priceTo: 1000000,
      min: 0,
      max: 1000000,
      isApplyPrice: false,
      page: 1,
      perPage: 6,
      pages: [],

      inputLeftHover: false,
      inputRightHover: false,
      inputLeftActive: false,
      inputRightActive: false,
    };
  },
  created() {
    this.start_load();
    this.getCategory();
    this.getProducts().then((res) => {
      console.log(res);
      this.filterByKeyWord();
      this.stop_load();
    });
  },
  computed: {
    ...mapGetters(["products", "category"]),
    totalPages: function () {
      return Math.ceil(this.resultCount / this.itemsPerPage);
    },
    displayedProducts() {
      return this.paginate(this.shop_products);
    },
  },
  filters: {
    toVND: function (value) {
      if (typeof value !== "number") {
        value = parseInt(value);
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
    checkedSort: function () {
      this.filter();
    },
    shop_products() {
      this.page = 1;
      this.setPages();
    },
    perPage() {
      this.setPages();
    },
    "$route.params.key": {
      handler: function (search) {
        console.log(search);
        this.filterByKeyWord();
        this.checkedCategory = [];
        this.checkedSort = 'newest';
        this.priceFrom = 0;
        this.priceTo = 1000000;
      },
    },
  },

  methods: {
    ...mapActions(["getProducts", "getCategory", "start_load", "stop_load"]),
    filterByKeyWord() {
      this.start_load();
      if (this.$route.params.key) {
        this.shop_products = this.products.filter((p) => {
          return p.name.toLowerCase().includes(this.$route.params.key);
        });
        this.stop_load();
      } else {
        this.shop_products = this.products;
        this.stop_load();
      }
    },
    setInputLeft() {
      this.priceFrom = Math.min(
        parseInt(this.priceFrom),
        parseInt(this.priceTo)
      );
      var percent = ((this.priceFrom - this.min) / (this.max - this.min)) * 100;
      this.$refs.sliderThumbLeft.style.left = percent + "%";
      this.$refs.sliderRange.style.left = percent + "%";

      this.callFilter();
    },
    setInputRight() {
      this.priceTo = Math.max(parseInt(this.priceTo), parseInt(this.priceFrom));
      var percent = ((this.priceTo - this.min) / (this.max - this.min)) * 100;
      this.$refs.sliderThumbRight.style.right = 100 - percent + "%";
      this.$refs.sliderRange.style.right = 100 - percent + "%";
      this.callFilter();
    },
    changePerPage() {
      console.log("Per Page: " + this.perPage);
      this.setPages();
    },
    canPagination() {
      if (this.shop_products.length / this.perPage <= 1) {
        return false;
      }
      return true;
    },
    setPages() {
      let numberOfPages = Math.ceil(this.shop_products.length / this.perPage);
      this.pages = [];
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push({ id: index - 1, page: index });
      }
    },
    paginate(shop_products) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;
      return shop_products.slice(from, to);
    },
    callFilter: _.debounce(function () {
      this.filter();
    }, 600),
    async filter() {
      this.start_load();
      await this.filterByKeyWord();
      if (this.checkedCategory.length != 0) {
        this.shop_products = this.shop_products.filter((p) => {
          if (this.checkedCategory.includes(p.category)) {
            return true;
          }
        });
      }
      this.shop_products = this.filterPrice(this.shop_products);
      this.sortProducts();
      this.stop_load();
    },
    filterPrice(listProduct) {
      return listProduct.filter((p) => {
        if (
          parseInt(p.price) >= this.priceFrom &&
          parseInt(p.price) <= this.priceTo
        ) {
          return true;
        }
      });
    },
    sortProducts() {
      switch (this.checkedSort) {
        case "oldest":
          this.shop_products = this.shop_products.sort(function (a, b) {
            return new Date(a.createdAt) - new Date(b.createdAt);
          });
          break;
        case "price-low-to-high":
          this.shop_products = this.shop_products.sort(function (a, b) {
            return parseInt(a.price) - parseInt(b.price);
          });
          break;
        case "price-high-to-low":
          this.shop_products = this.shop_products.sort(function (a, b) {
            return parseInt(b.price) - parseInt(a.price);
          });
          break;
        default:
          this.shop_products = this.shop_products.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          break;
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/style/slider-range.css";
</style>
