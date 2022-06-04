<template>
  <div class="flex-shrink-0 flex gap-2 w-56 h-16 bg-white px-2 py-3">
    <div class="aspect-square w-16 flex items-center">
      <img class="object-contain" :src="imageProduct(product.image)" alt="Image" />
    </div>

    <div class="flex-1 flex gap-2 items-start">
      <div class="flex-1 text-sm space-y-1">
        <!-- <p class="product-category">{{ product.category }}</p> -->
        <p class="font-semibold sp">{{ product.name }}</p>
        <div class="flex items-center gap-1">
          <p class="text-violet-600 font-semibold">{{ $filters.toVND(product.price) }}</p>
          <p class="">/ 1 kg</p>
        </div>
      </div>

      <div class="flex flex-col gap-1">
        <button v-show="product.quantity_remaining > 0" class="w-4 h-4 text-violet-800" @click="addItemToCart()">
          <svg viewBox="0 0 416 416" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M416 208C416 225.69 401.67 240.01 384 240.01H240V384.01C240 401.7 225.67 416 208 416C190.33 416 176 401.7 176 384.01V240.01H32C14.33 240.01 0 225.69 0 208C0 190.31 14.33 176.01 32 176.01H176V32.01C176 14.32 190.33 0 208 0C225.67 0 240 14.32 240 32.01V176.01H384C401.7 176 416 190.3 416 208Z"
              fill="currentColor" />
          </svg>
        </button>

        <button class="w-4 h-4 text-violet-800" @click="addToWishlist(product)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import CartAPI from "../api/CartAPI";

export default {
  props: ["product"],
  created() {
  },
  computed: {
    ...mapGetters(["is_login", "wishlist"]),
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
  methods: {
    ...mapActions(["getUserCart", "addItemToWishlist", "addItemsToWishlist", "start_load", "stop_load"]),
    imageProduct(name) {
      try {
        let img = "https://shopfreshapi.herokuapp.com/products/" + name;
        return img;
      } catch (error) {
        console.log(error);
      }
    },
    async addItemToCart() {
      if (this.is_login) {
        this.start_load();
        let token = JSON.parse(sessionStorage.getItem("user_login"));
        let config = {
          headers: { Authorization: "bearer " + token },
        };
        let items = [{ product: this.product._id, quantity: 1, price: this.product.price }];
        await CartAPI.add(items, config)
          .then((res) => {
            console.log(res.data);
            this.stop_load();
            this.$swal.fire(
              'Oh great!',
              'Add product to cart successfully!',
              'success'
            );
            this.getUserCart();
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
        this.stop_load();
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
      const item = this.wishlist.find((item) => item._id == product._id);
      if (item) {
        this.$swal.fire(
          'Uh oh!',
          'Product already exists in wishlist!',
          'info'
        );
        return;
      }
      this.start_load();
      await this.addItemToWishlist(product).then((res) => {
        console.log(res);
        this.stop_load();
        this.addItemsToWishlist();
        this.$swal.fire(
          'Great!',
          'Added product to wishlist successfully!',
          'success'
        )
      });
    },
  },
}
</script>

<style lang="postcss" scoped>
.group-item-wrapper {
  @apply flex-shrink-0;
  @apply p-2;
  @apply bg-white;
  @apply rounded-2xl;
  @apply w-64;

  box-shadow: rgba(57, 42, 35, 0.05) 0px 12px 10px -10px;
}

.group-item {
  @apply flex flex-row items-stretch gap-4;
}

.group-item-image {
  @apply w-20 h-20;

  @apply bg-dominant;
  @apply rounded-xl;

  /* @apply rounded-full; */
  @apply p-2;
  /* @apply mx-2; */
  @apply object-contain;
}

.group-item-spec {
  @apply w-full flex-1;
  @apply flex flex-row justify-between items-start gap-0;
}

.product-spec {
  @apply flex-grow;
  @apply w-full;
  @apply flex flex-col;
}

.product-category {
  @apply text-xs tracking-wide font-normal;
}

.product-name {
  @apply text-sm font-bold;
}

.product-price-unit {
  @apply flex flex-row items-center gap-1;
}

.product-price {
  @apply text-sm font-semibold text-gold-500;
  /* color: #97EA07; */
}

.product-unit {
  @apply text-xs font-medium;
}

.product-action {
  @apply flex flex-col justify-center items-center gap-2;
}

.btn-small-icon {
  @apply flex items-center justify-center;
  @apply w-7 h-7;
  @apply p-1;

  @apply rounded-lg;

}

.btn-add-to-cart {
  /* @apply bg-gold-500 text-white; */

  /* @apply text-secondary bg-gold-500; */

  @apply bg-gold-500 text-white;

  box-shadow: rgba(255, 201, 40, 0.8) 0px 10px 8px -8px;
}

.btn-small-icon svg {
  @apply transform scale-125;
}

.btn-add-to-wishlist {
  @apply bg-gold-100 text-gold-500;
  box-shadow: rgba(57, 42, 35, 0.15) 0px 10px 8px -8px;
}
</style>