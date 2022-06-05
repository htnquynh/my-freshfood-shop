<template>
  <main class="container py-16 space-y-16">
    <div class="flex gap-16">

      <div class="w-5/12 aspect-square bg-fuchsia-50">
        <img class="object-contain" :src="selectedProduct.image" alt="Image" />
      </div>

      <div class="w-7/12">
        <div class="space-y-3">
          <p class="text-lg font-medium">{{ selectedProduct.category }}</p>
          <h2 class="text-5xl font-bold text-violet-700">{{ selectedProduct.name }}</h2>

          <div class="flex items-end gap-2">
            <p class="text-2xl font-bold">{{ $filters.toVND(selectedProduct.price) }}</p>
            <p class="">/ 1 kg</p>
          </div>

          <div class="w-max flex gap-2 items-center px-3 py-1.5 rounded-md bg-rose-400 text-white">
            <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M323.5 51.25C302.8 70.5 284 90.75 267.4 111.1C240.1 73.62 206.2 35.5 168 0C69.75 91.12 0 210 0 281.6C0 408.9 100.2 512 224 512s224-103.1 224-230.4C448 228.4 396 118.5 323.5 51.25zM304.1 391.9C282.4 407 255.8 416 226.9 416c-72.13 0-130.9-47.73-130.9-125.2c0-38.63 24.24-72.64 72.74-130.8c7 8 98.88 125.4 98.88 125.4l58.63-66.88c4.125 6.75 7.867 13.52 11.24 19.9C364.9 290.6 353.4 357.4 304.1 391.9z" />
            </svg>
            <p><span class="font-bold">{{ selectedProduct.calo }}</span> kcal</p>
          </div>

          <p class="text-justify">
            {{ selectedProduct.description.substring(0, 240) + '...' }}
          </p>

          <div class="product-qty flex flex-row items-center gap-4">
            <div class="w-max flex flex-row items-center p-1 bg-fuchsia-50">
              <button class="w-8 h-8 bg-white flex items-center justify-center" @click="minusQuantity()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                    fill="currentColor" />
                </svg>
              </button>
              <input type="number" min=1 max=99999 v-model="quantity" class="input-quantity" />
              <button class="w-8 h-8 bg-white flex items-center justify-center" @click="plusQuantity()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z"
                    fill="currentColor" />
                  <path
                    d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V6C11.25 5.59 11.59 5.25 12 5.25C12.41 5.25 12.75 5.59 12.75 6V18C12.75 18.41 12.41 18.75 12 18.75Z"
                    fill="currentColor" />
                </svg>
              </button>
            </div>

            <p class="py-4">{{ this.selectedProduct.quantity_remaining }}kg available</p>
          </div>

          <div class="flex">
            <p class="font-medium text-peach-500" v-show="selectedProduct.quantity_remaining <= 0">
              Out of Stock
            </p>
            <BaseButtonPrimary v-show="selectedProduct.quantity_remaining > 0" class="!px-8 !py-4" @click="addToCart()">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                fill="currentColor">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z" />
              </svg>
              <span>Add to cart</span>
            </BaseButtonPrimary>
            <BaseButtonText class="!px-8 !py-4" @click="addToWishlist(selectedProduct)">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"
                fill="currentColor">
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path
                  d="M19.66 3.99c-2.64-1.8-5.9-.96-7.66 1.1-1.76-2.06-5.02-2.91-7.66-1.1-1.4.96-2.28 2.58-2.34 4.29-.14 3.88 3.3 6.99 8.55 11.76l.1.09c.76.69 1.93.69 2.69-.01l.11-.1c5.25-4.76 8.68-7.87 8.55-11.75-.06-1.7-.94-3.32-2.34-4.28zM12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
              </svg>

              <span>Like it!</span>
            </BaseButtonText>
          </div>

        </div>
      </div>
    </div>

    <div class="space-y-8">
      <h4 class="text-3xl font-bold">Description</h4>
      <p class="text-justify">
        {{ selectedProduct.description }}
      </p>
    </div>


    <div class="space-y-16">
      <div class="flex justify-between gap-8 items-end">
        <h2 class="text-5xl font-bold">You May Also Like.</h2>
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
      <div class="grid grid-cols-4 gap-16">
        <Product class="product" v-for="item in more_product" :key='item._id' :product='item' />
      </div>
    </div>

  </main>
</template>

<script>
import BaseButtonPrimary from '../components/base/BaseButtonPrimary.vue';
import BaseButtonText from '../components/base/BaseButtonText.vue';
import Product from '../components/Product.vue';

import { mapActions, mapGetters } from "vuex";
import CartAPI from "../api/CartAPI";

export default {
  components: {
    BaseButtonPrimary,
    BaseButtonText,
    Product,
  },
  data() {
    return {
      product: {},
      quantity: 1,
      more_product: [],
    };
  },
  created() {
    this.start_load();
    this.getProducts().then(() => {
      this.more_product = this.products.slice(0, 4);
      this.stop_load();
    });
  },
  computed: {
    ...mapGetters(["is_login", "selectedProduct", "products", "wishlist"]),
  },
  filters: {
    toVND: function (value) {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
  },
  methods: {
    ...mapActions(
      [
        "getProducts",
        "getUserCart",
        "addItemToCart",
        "addItemToWishlist",
        "addItemsToWishlist",
        "start_load",
        "stop_load",
      ]
    ),
    minusQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    plusQuantity() {
      if (this.quantity < this.selectedProduct.quantity_remaining) {
        this.quantity++;
      }
    },
    addToCart() {
      if (this.quantity < 1) {
        this.quantity = 1;
        this.$swal.fire(
          'Uh oh!',
          'Quantity must be at least 1!',
          'fail'
        );
        return;
      }
      if (this.selectedProduct.quantity_remaining < this.quantity) {
        this.quantity = this.selectedProduct.quantity_remaining;
        this.$swal.fire(
          'Uh oh!',
          `This product is only ${this.selectedProduct.quantity_remaining}kg`,
          'fail'
        );
        return;
      }
      this.addItemToCart();
    },

    async addItemToCart() {
      if (this.is_login) {
        this.start_load();
        let token = JSON.parse(sessionStorage.getItem("user_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };

        let total_price = parseInt(this.selectedProduct.price) * this.quantity;

        console.log(parseInt(this.selectedProduct.price));
        console.log(this.quantity);
        console.log(total_price);

        let items = [
          {
            product: this.selectedProduct._id,
            quantity: this.quantity,
            price: total_price.toString(),
          }
        ];
        await CartAPI.add(items, config)
          .then((res) => {
            console.log(res.data);
            this.getUserCart().then(() => {
              this.stop_load();
              this.$swal.fire(
                'Oh great!',
                'Add product to cart successfully!',
                'success'
              );
            });
          })
          .catch((error) => {
            console.log(error);
            this.stop_load();
            this.$swal.fire(
              'Oh no!',
              'Something went wrong. Double check your work.',
              'fail'
            );
          });
      } else {
        this.$swal.fire(
          'Login to your account',
          'You must be logged in to be able to add products to your cart.',
          'warning'
        );
        this.$router.push({
          name: "Login",
        });
      }
    },

    async addToWishlist(product) {
      this.start_load();
      const item = this.wishlist.find((item) => item._id == product._id);
      if (item) {
        this.stop_load();
        this.$swal.fire(
          'Uh oh!',
          'Product already exists in wishlist!',
          'info'
        );
        return;
      }
      await this.addItemToWishlist(product).then((res) => {
        console.log(res);
        this.addItemsToWishlist().then(() => {
          this.stop_load();
          this.$swal.fire(
            'Great!',
            'Added product to wishlist successfully!',
            'success'
          )
        });
      });
    },
  },
};
</script>

<style lang="postcss" scoped>
input[type="number"].input-quantity {
  @apply flex-shrink-0;
  @apply bg-transparent;
  @apply w-10 h-8;
  @apply p-1;
  /* @apply text-gold-500; */
  @apply text-center font-bold antialiased;
  @apply focus: outline-none;
}

input[type="number"].input-quantity::-webkit-outer-spin-button,
input[type="number"].input-quantity::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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
  /* @apply w-max; */
}

.product-description h4:before {
  content: '';
  display: block;

  @apply flex-grow-0;

  width: 64px;
  height: 1px;

  background-color: theme('colors.secondary');

  /* position: absolute;
  bottom: 8px; */

  z-index: -1;
}

.product-description h4:after {
  content: '';
  display: block;

  @apply flex-grow-0;

  width: 100%;
  height: 1px;

  background-color: theme('colors.secondary');

  /* position: absolute;
  bottom: 8px; */

  z-index: -1;
}

.product-description p {
  @apply text-justify;
}

.section-featured-product {
  @apply w-full max-w-5xl mx-auto;
  @apply py-10;
  @apply flex flex-row justify-between gap-16;
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

.section-featured-product .section-product {
  @apply w-full max-w-5xl;
  @apply flex flex-col items-end gap-8;
}

.section-featured-product .section-list-product {
  @apply w-full;

  @apply grid grid-cols-1 lg: grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4;
}
</style>
