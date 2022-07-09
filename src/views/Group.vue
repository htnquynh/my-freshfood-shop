<template>
  <div class="container py-16 space-y-16">
    <div class="flex gap-16">
      <div class="w-5/12 aspect-square bg-fuchsia-50">
        <img :src="selectedGroup.image" class="object-contain" alt="Image" />
      </div>

      <div class="w-7/12">
        <div class="space-y-6">
          <h2 class="text-5xl font-bold text-violet-700">
            {{ selectedGroup.title }}
          </h2>

          <div class="flex gap-4">
            <div
              class="flex gap-2 items-center px-3 py-1.5 rounded-md bg-rose-400 text-white"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  d="M323.5 51.25C302.8 70.5 284 90.75 267.4 111.1C240.1 73.62 206.2 35.5 168 0C69.75 91.12 0 210 0 281.6C0 408.9 100.2 512 224 512s224-103.1 224-230.4C448 228.4 396 118.5 323.5 51.25zM304.1 391.9C282.4 407 255.8 416 226.9 416c-72.13 0-130.9-47.73-130.9-125.2c0-38.63 24.24-72.64 72.74-130.8c7 8 98.88 125.4 98.88 125.4l58.63-66.88c4.125 6.75 7.867 13.52 11.24 19.9C364.9 290.6 353.4 357.4 304.1 391.9z"
                />
              </svg>
              <p>
                <span class="font-bold">{{ selectedGroup.calo }}</span> kcal
              </p>
            </div>

            <div
              class="flex gap-2 items-center px-3 py-1.5 rounded-md bg-violet-500 text-white"
            >
              <svg
                class="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M472.8 168.4C525.1 221.4 525.1 306.6 472.8 359.6L360.8 472.9C351.5 482.3 336.3 482.4 326.9 473.1C317.4 463.8 317.4 448.6 326.7 439.1L438.6 325.9C472.5 291.6 472.5 236.4 438.6 202.1L310.9 72.87C301.5 63.44 301.6 48.25 311.1 38.93C320.5 29.61 335.7 29.7 344.1 39.13L472.8 168.4zM.0003 229.5V80C.0003 53.49 21.49 32 48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L410.7 218.7C435.7 243.7 435.7 284.3 410.7 309.3L277.3 442.7C252.3 467.7 211.7 467.7 186.7 442.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5L.0003 229.5zM112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112z"
                />
              </svg>
              <p>
                <span class="font-bold">{{
                  $filters.toVND(selectedGroup.price)
                }}</span>
              </p>
            </div>
          </div>

          <div class="group-ingredients">
            <p>Ingredients</p>

            <div class="w-full grid grid-cols-2 gap-2">
              <GroupItem
                v-for="item in selectedGroup.material"
                :key="item._id"
                :product="item.product"
              />
            </div>
          </div>

          <div class="product-action">
            <p
              class="font-medium text-lg text-peach-500"
              v-if="!enough_quantity"
            >
              Out of Stock
            </p>
            <BaseButtonPrimary
              v-if="enough_quantity && canAddAll"
              class="!px-8 !py-4"
              @click="addAllToCart()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="currentColor"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
                />
              </svg>
              <span>Add all to cart</span>
            </BaseButtonPrimary>
          </div>
        </div>
      </div>
    </div>

    <div class="space-y-8">
      <h4 class="text-3xl font-bold">Description</h4>
      <p class="text-justify" v-html="selectedGroup.description"></p>
    </div>

    <div class="space-y-16">
      <div class="flex justify-between gap-8 items-end">
        <h2 class="text-5xl font-bold">You May Also Like.</h2>
        <router-link to="/recommend-menu">
          <button
            class="border border-black px-4 py-2 flex items-center gap-2 font-medium hover:border-rose-600 hover:text-rose-600"
          >
            More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="currentColor"
            >
              <rect fill="none" height="24" width="24" />
              <path
                d="M15,5l-1.41,1.41L18.17,11H2V13h16.17l-4.59,4.59L15,19l7-7L15,5z"
              />
            </svg>
          </button>
        </router-link>
      </div>
      <div class="grid grid-cols-3 gap-16">
        <Group v-for="item in more_group" :key="item._id" :group="item" />
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonPrimary from "../components/base/BaseButtonPrimary.vue";
import Group from "../components/Group.vue";
import GroupItem from "../components/GroupItem.vue";

import { mapActions, mapGetters } from "vuex";
import CartAPI from "../api/CartAPI";

export default {
  components: {
    Group,
    GroupItem,
    BaseButtonPrimary,
  },
  data() {
    return {
      more_group: [],
    };
  },
  async created() {
    this.start_load();
    await this.getGroups();
    this.more_group = this.groups.slice(0, 3);
    this.stop_load();
  },
  computed: {
    ...mapGetters(["is_login", "selectedGroup", "groups"]),
    enough_quantity() {
      return this.checkQuantity();
    },
    canAddAll() {
      return this.selectedGroup.material.every(
        (item) => item.product.status === "Enable"
      );
    },
  },
  methods: {
    ...mapActions(["getGroups", "getUserCart", "start_load", "stop_load"]),
    checkQuantity() {
      for (const item of this.selectedGroup.material) {
        console.log(item.product.quantity_remaining);
        if (item.product.quantity_remaining == 0) {
          console.log(item.product.quantity_remaining == 0);
          return false;
        }
      }
      return true;
    },
    async addAllToCart() {
      if (this.is_login) {
        this.start_load();
        let token = JSON.parse(sessionStorage.getItem("user_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };

        let items = [];

        for (const item of this.selectedGroup.material) {
          console.log(item.product.price);
          items.push({
            product: item.product._id,
            quantity: 1,
            price: item.product.price,
          });
        }
        console.log(items);
        await CartAPI.add(items, config)
          .then((res) => {
            console.log(res.data);
            this.getUserCart().then(() => {
              this.stop_load();
              this.$swal.fire(
                "Oh great!",
                "Add all product to cart successfully!",
                "success"
              );
            });
          })
          .catch((error) => {
            this.stop_load();
            console.log(error);
            this.$swal.fire(
              "Oh no!",
              "Something went wrong. Double check your work.",
              "fail"
            );
          });
      } else {
        this.$swal.fire(
          "Login to your account",
          "You must be logged in to be able to add products to your cart.",
          "warning"
        );
        this.$router.push({
          name: "Login",
        });
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
.home {
  @apply flex flex-col;
}

.home > .header-page {
  @apply w-full;
}

.page-content {
  @apply p-4;
}

.product-page {
  @apply w-full max-w-5xl mx-auto;
  @apply flex flex-col gap-4 md: gap-8;
  @apply md: pt-4 md:pb-8;
}

.product-detail {
  @apply grid grid-flow-row sm: grid-flow-col sm:auto-cols-auto place-content-stretch place-items-start gap-4 md:gap-8;
  @apply w-full;

  @apply bg-white;

  @apply p-4 md: p-6 lg:p-8;
  @apply rounded-3xl;
}

/* .product-col {
  @apply w-full;
  background-color: antiquewhite;
} */

/* .product-image {
  @apply w-full h-auto sm:w-72 md:h-72 lg:w-96 lg:h-96;
  @apply rounded-2xl;
}

.product-image img {
  @apply w-full h-full;
  @apply object-cover;
  @apply rounded-2xl;
} */

.product-image {
  @apply w-full sm: w-max;
  @apply bg-dominant;
  @apply p-2 md: p-8;

  @apply rounded-2xl;
}

.product-image img {
  @apply w-full h-auto sm: w-72 md:h-72 lg:w-96 lg:h-96;
  @apply object-cover;
}

.product-spec {
  @apply w-full h-full;
  /* @apply flex-grow-0; */
  @apply flex flex-col gap-0;
}

.product-name {
  @apply text-3xl font-bold;
  @apply py-2;
  @apply relative;
  z-index: 1;
}

.product-name::after {
  content: "";
  display: block;
  width: 128px;
  height: 12px;
  background-color: theme("colors.aqua-blue");
  position: absolute;
  bottom: 8px;
  z-index: -1;
}

.group-calo-price {
  @apply py-4;
  @apply w-full;
  @apply flex flex-row justify-between items-center gap-2;
}

.group-calo,
.group-price {
  @apply flex flex-row items-center gap-3;
}

.group-calo svg,
.group-price svg {
  @apply w-8 h-8 p-1;
  @apply rounded-lg;
}

.group-calo svg {
  @apply text-gold-500 bg-gold-100;
}

.group-price svg {
  @apply text-peach-500 bg-peach-100;
}

.group-calo p,
.group-price p {
  @apply text-base;
}

span.value {
  @apply font-bold;
}

.product-short-description {
  @apply w-full;
  @apply text-base;
}

.product-description {
  @apply w-full;
  @apply p-2 md: px-8 md:py-6;
  @apply flex flex-col gap-3;
  @apply leading-relaxed;
}

.product-description h4 {
  @apply font-bold uppercase;
  @apply text-lg;
  @apply flex flex-row items-center gap-3;
}

.product-description h4:before {
  content: "";
  display: block;
  @apply flex-grow-0;
  width: 64px;
  height: 1px;
  background-color: theme("colors.secondary");
  z-index: -1;
}

.product-description h4:after {
  content: "";
  display: block;
  @apply flex-grow-0;
  width: 100%;
  height: 1px;
  background-color: theme("colors.secondary");
  z-index: -1;
}

.product-description p {
  @apply text-justify;
}

.product-col {
  @apply max-w-full h-full;
  @apply overflow-hidden;
}

.group-ingredients {
  @apply w-full h-full;
  @apply pt-6;
  @apply flex flex-col justify-end gap-3;
}

.group-ingredients > p {
  @apply text-lg font-bold;
}

.group-list-item-wrapper {
  @apply bg-dominant;
  @apply p-1 sm: p-2 md:p-3 lg:p-4;
}

.group-list-item {
  @apply w-full;
  @apply overflow-auto;
  @apply flex flex-row gap-4;
  @apply p-2;
}

.group-list-item::-webkit-scrollbar {
  @apply hidden;
}

.section-recommend-menu {
  @apply w-full max-w-5xl mx-auto;
  @apply py-10;
  @apply flex flex-row justify-between items-center gap-0;
}

.section-recommend-menu .section-product {
  @apply w-full max-w-5xl;
  @apply flex flex-col items-end gap-8;
}

.section-recommend-menu .section-product .section-list-product {
  @apply w-full flex-shrink-0;
  @apply grid grid-cols-1 lg: grid-cols-3 sm:grid-cols-2 gap-4 place-items-center;
}

.section-product-title {
  @apply w-full;
  @apply flex flex-row items-center justify-between gap-2;
}

.section-product-title h2.section-title {
  @apply font-extrabold text-2xl sm: text-3xl md:text-4xl;
}

.section-product-title a {
  @apply w-max flex-shrink-0;
  @apply flex flex-row items-center gap-2;
}

.section-product-title a svg {
  @apply w-5 h-5;
}

.section-product-title p {
  @apply text-center;
}

.product-action {
  @apply py-4;
  @apply flex flex-row flex-wrap items-center gap-3;
}

a.btn-add-to-cart {
  @apply w-full md: w-max;
  @apply flex flex-row justify-center items-center gap-2;
  @apply px-8 py-4;
  @apply bg-gold-500 text-white;
  @apply text-base font-semibold capitalize;

  box-shadow: rgba(255, 201, 40, 0.6) 0px 12px 10px -10px;
}
</style>
