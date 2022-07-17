<template>
  <div class="container py-16">
    <div v-show="noItems == 0" class="md:flex md:gap-4 h-max">
      <div class="w-full flex flex-col items-center p-8">
        <img src="../assets/image/empty.png" class="w-full max-w-xs h-auto mx-auto" alt="image">
        <p class="text-xl md:text-2xl font-medium py-8">Nothing to Checkout</p>

        <router-link to='/shop'>
          <button class="px-8 py-3 text-base uppercase text-white font-bold bg-gold-500"
            style="box-shadow: rgba(255, 201, 40, 0.6) 0px 12px 10px -10px;">
            Buy now
          </button>
        </router-link>
      </div>
    </div>
    <div v-show="noItems != 0" class="md:flex md:gap-4">
      <div class="w-full space-y-4">
        <div class="space-y-4 max-w-lg">
          <div class="space-y-2">
            <label class="block font-medium">Fullname</label>
            <input class="w-full px-3 py-2 border border-black focus:outline-none" type="text" v-model="full_name"
              required>
          </div>

          <div class="space-y-2">
            <label class="block font-medium">Address</label>
            <input class="w-full px-3 py-2 border border-black focus:outline-none" type="text" v-model="address"
              required>
          </div>

          <div class="space-y-2">
            <label class="block font-medium">Phone</label>
            <input class="w-full px-3 py-2 border border-black focus:outline-none" type="text" v-model="phone" required>
          </div>
        </div>

        <div class="space-y-2">
          <h3 class="font-medium">Payment</h3>

          <div class="group-radio-box">
            <label class="radio-box">
              <input v-model="check" type="radio" value="payment-on-delivery" name="payment">
              <span class="design"></span>
              <span class="text">Payment on delivery</span>
            </label>

            <label class="radio-box">
              <input v-model="check" type="radio" value="payment-by-card" name="payment" disabled>
              <span class="design"></span>
              <span class="text">Payment by card</span>
            </label>
          </div>
        </div>
      </div>

      <div class="w-full md:max-w-xs lg:max-w-sm space-y-4">
        <h2 class="text-3xl font-bold">Summary Cart.</h2>

        <div class="space-y-4">
          <CheckoutItem v-for="item in cart.cartItems" :key="item._id" :item="item" />
        </div>

        <div class="space-y-4">
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
            <p class=""> {{ $filters.toVND(totalPrice) }} </p>
          </div>
        </div>


        <BaseButtonPrimary class="!px-8 !py-4 w-full flex justify-center" @click="placeOrder()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" width="24px" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path
              d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z" />
          </svg>
          <span>Place Order</span>
        </BaseButtonPrimary>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButtonPrimary from '../components/base/BaseButtonPrimary.vue';
import CheckoutItem from '../components/CheckoutItem.vue';

import { mapGetters, mapActions } from "vuex";
import OrderAPI from "../api/OrderAPI";

export default {
  components: {
    BaseButtonPrimary,
    CheckoutItem,
  },
  data() {
    return {
      check: 'payment-on-delivery',
      full_name: "",
      address: "",
      phone: "",
    };
  },
  computed: {
    ...mapGetters(["cart", "userLogin", "totalPrice", "noItems"]),
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
  created() {
    this.getOrderInfo();
  },
  methods: {
    ...mapActions(["getUserCart", "clearCart", "start_load", "stop_load"]),
    price_on_quantity(product, quantity) {
      if (!product.on_sale) {
        return Number(product.price) * quantity;
      } else {
        return this.sale_price(product.price, product.discount_type, product.discount) * quantity;
      }
    },
    sale_price(origin_price, discount_type, discount) {
      const origin = Number(origin_price);

      if (discount_type === "%") {
        return origin - origin * discount / 100;
      }

      let result = origin - discount;
      return result > 0 ? result : 0;
    },
    async getOrderInfo() {
      this.start_load();
      this.full_name = this.userLogin.full_name;
      this.address = this.userLogin.address;
      this.phone = this.userLogin.phone;
      await this.getUserCart();
      this.stop_load();
    },
    hasEmpty() {
      if (this.full_name == ''
        || this.address == ''
        || this.phone == '') {
        return true;
      }
      return false;
    },
    async placeOrder() {
      if (this.hasEmpty()) {
        this.$swal.fire(
          'Uh oh!',
          'Please complete all information.',
          'error'
        );
        return;
      }

      this.start_load();
      let orderItems = [];
      for (let item of this.cart.cartItems) {
        orderItems.push({
          product: item.product._id,
          quantity: item.quantity,
          price: this.price_on_quantity(item.product, item.quantity),
        });
      }
      let order = {
        full_name: this.full_name,
        address: this.address,
        phone: this.phone,
        total_price: this.totalPrice,
        orderItems,
      };

      let token = JSON.parse(sessionStorage.getItem("user_login"));
      let config = {
        headers: { Authorization: "bearer " + token },
      };

      console.log(order);
      await OrderAPI.create(order, config)
        .then(() => {
          this.stop_load();
          this.$swal.fire(
            'Oh great!',
            'Your order has been successfully placed.',
            'success'
          );
          this.clearCart();
          this.$router.push("/account/my-order");
        })
        .catch((err) => {
          this.stop_load();
          console.log(err);
          this.$swal.fire(
            'Oh no!',
            'Something went wrong. Double check your work.',
            'fail'
          );
        });
    },
  },
};
</script>