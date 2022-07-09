<template>
  <div class="container py-16">
    <div v-show="noItems == 0">
      <div class="w-full flex flex-col items-center p-8">
        <img src="../assets/image/empty.png" class="w-full max-w-xs h-auto mx-auto" alt="image">
        <p class="text-xl md:text-2xl font-medium py-8">Nothing in your cart</p>

        <router-link to='/shop'>
          <button class="px-8 py-3 text-base uppercase text-white font-bold bg-sky-500">
            Buy now
          </button>
        </router-link>
      </div>
    </div>

    <div v-show="noItems != 0" class="relative w-full flex flex-col gap-4 md:flex-row items-start md:gap-4">
      <div class="w-full">
        <div class="space-y-4">
          <ShoppingCartItem v-for="item in cart.cartItems" :key="item.id" :item="item" class="border" />
        </div>
      </div>

      <div class="w-full md:max-w-xs lg:max-w-sm p-4 md:p-6 lg:p-8 space-y-4">
        <h2 class="text-3xl font-bold">Summary Cart.</h2>

        <div class="w-full py-8 space-y-4">
          <div class="flex justify-between items-center">
            <p>Subtotal</p>
            <p class="font-bold"> {{ $filters.toVND(totalPrice) }} </p>
          </div>

          <div class="flex justify-between items-center">
            <p>Shipping Cost</p>
            <p class="font-bold"> {{ $filters.toVND('0') }} </p>
          </div>

          <div class="flex justify-between items-center font-bold">
            <p>Total</p>
            <p class="">{{ $filters.toVND(totalPrice) }} </p>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block font-medium">Coupon Code</label>
          <input class="w-full px-3 py-2 border border-black focus:outline-none" type="text">
        </div>

        <BaseButtonPrimary :disabled="hasUnavailableProduct"
          class="!px-8 !py-4 w-full flex justify-center disabled:opacity-50" @click="checkout()">
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24"
            width="24px" fill="currentColor">
            <g>
              <rect fill="none" height="24" width="24" />
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <path
                d="M7,18c-1.1,0-1.99,0.9-1.99,2S5.9,22,7,22s2-0.9,2-2S8.1,18,7,18z M17,18c-1.1,0-1.99,0.9-1.99,2s0.89,2,1.99,2s2-0.9,2-2 S18.1,18,17,18z M19,16c0-0.55-0.45-1-1-1H7l1.1-2h7.45c0.75,0,1.41-0.41,1.75-1.03l3.24-6.14c0.25-0.48,0.08-1.08-0.4-1.34 c-0.49-0.27-1.1-0.08-1.36,0.41L15.55,11H8.53L4.54,2.57C4.38,2.22,4.02,2,3.64,2H2C1.45,2,1,2.45,1,3s0.45,1,1,1h1l3.6,7.59 l-1.35,2.44C4.52,15.37,5.48,17,7,17h11C18.55,17,19,16.55,19,16z M11.29,2.71c0.39-0.39,1.02-0.39,1.41,0l2.59,2.59 c0.39,0.39,0.39,1.02,0,1.41l-2.59,2.59c-0.39,0.39-1.02,0.39-1.41,0c-0.39-0.39-0.39-1.02,0-1.41L12.17,7L9,7C8.45,7,8,6.55,8,6 c0-0.55,0.45-1,1-1l3.17,0l-0.88-0.88C10.9,3.73,10.9,3.1,11.29,2.71z" />
            </g>
          </svg>
          <span>Checkout</span>
        </BaseButtonPrimary>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonPrimary from '../components/base/BaseButtonPrimary.vue';
import ShoppingCartItem from '../components/ShoppingCartItem.vue';
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    ShoppingCartItem,
    BaseButtonPrimary
  },
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(["cart", "totalPrice", "noItems"]),
    hasUnavailableProduct() {
      return this.cart.cartItems.some((item) => item.product.status === "Disable")
    },
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
  watch: {
  },
  async created() {
    this.start_load();
    await this.getUserCart();
    this.stop_load();
  },
  methods: {
    ...mapActions(["getUserCart", "start_load", "stop_load"]),
    checkout() {
      this.$router.push({ name: "Checkout" });
    },
  },
};
</script>