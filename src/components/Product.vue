<template>

  <div class="px-4 py-4 bg-white">
    <div class="aspect-square flex items-center">
      <img class="" :src="imageProduct(product.image)" alt="Product image" @click="detailProduct()" />
    </div>

    <div class="space-y-4">
      <div class="flex justify-between items-center gap-2">
        <ButtonIcon @click="compare(product._id)" class="flex-shrink-0">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M32 160h319.9l.0791 72c0 9.547 5.652 18.19 14.41 22c8.754 3.812 18.93 2.078 25.93-4.406l112-104c10.24-9.5 10.24-25.69 0-35.19l-112-104c-6.992-6.484-17.17-8.217-25.93-4.408c-8.758 3.816-14.41 12.46-14.41 22L351.9 96H32C14.31 96 0 110.3 0 127.1S14.31 160 32 160zM480 352H160.1L160 279.1c0-9.547-5.652-18.19-14.41-22C136.9 254.2 126.7 255.9 119.7 262.4l-112 104c-10.24 9.5-10.24 25.69 0 35.19l112 104c6.992 6.484 17.17 8.219 25.93 4.406C154.4 506.2 160 497.5 160 488L160.1 416H480c17.69 0 32-14.31 32-32S497.7 352 480 352z" />
          </svg>
        </ButtonIcon>

        <ButtonIcon v-show="product.quantity_remaining > 0" @click="addItemToCart()">
          <svg viewBox="0 0 416 416" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M416 208C416 225.69 401.67 240.01 384 240.01H240V384.01C240 401.7 225.67 416 208 416C190.33 416 176 401.7 176 384.01V240.01H32C14.33 240.01 0 225.69 0 208C0 190.31 14.33 176.01 32 176.01H176V32.01C176 14.32 190.33 0 208 0C225.67 0 240 14.32 240 32.01V176.01H384C401.7 176 416 190.3 416 208Z"
              fill="currentColor" />
          </svg>
        </ButtonIcon>

        <ButtonIcon @click="addToWishlist(product)">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
            <path
              d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
          </svg>
        </ButtonIcon>
      </div>
      <div>
        <p class="text-gray-700">{{ product.category }}</p>
        <p class="text-lg font-bold">{{ product.name }}</p>
        <div class="pt-2 flex items-center justify-end gap-1">
          <p class="font-bold">{{ $filters.toVND(product.price) }}</p>
          <p class="">/ 1 kg</p>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import ButtonIcon from './base/ButtonIcon.vue'
import { mapGetters, mapActions } from "vuex";
import CartAPI from "../api/CartAPI";

export default {
  props: ["product"],
  components: {
    ButtonIcon
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["is_login", "compareProducts", "wishlist"]),
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
    ...mapActions([
      "start_load",
      "stop_load",
      "getSelectedProduct",
      "getCompareProducts",

      "getUserCart",

      "addItemToWishlist",
      "addItemsToWishlist",
      "getWishlist",
    ]),

    imageProduct(name) {
      try {
        let img = "https://shopfreshapi.herokuapp.com/products/" + name;
        return img;
      } catch (error) {
        console.log(error);
      }
    },

    detailProduct() {
      this.getSelectedProduct(this.product._id);
      const id = this.product._id;
      const path = `/product/${id}`;
      if (this.$route.path !== path) this.$router.push(path);
    },

    compare(product_id) {
      if (this.compareProducts.length == 0) {
        this.$swal.fire(
          "One more!",
          "Please choose 1 more product to compare",
          "success"
        );
      }
      if (this.compareProducts.length != 0) {
        for (let item of this.compareProducts) {
          if (item._id === product_id) {
            this.$swal.fire(
              "You have already selected this product!",
              "Please choose another product to compare!",
              "warning"
            );
            return;
          }
        }
        this.$router.push({ name: "Compare" });
      }
      this.getCompareProducts(product_id);
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
          "Login to your account",
          "You must be logged in to be able to add products to your cart.",
          "warning"
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
          "Uh oh!",
          "Product already exists in wishlist!",
          "info"
        );
        return;
      }
      this.start_load();
      await this.addItemToWishlist(product).then((res) => {
        console.log(res);
        this.addItemsToWishlist().then(() => {
          this.stop_load();
        });
        this.$swal.fire(
          "Great!",
          "Added product to wishlist successfully!",
          "success"
        );
      });
    },
  },
};
</script>

<style scoped>
</style>
