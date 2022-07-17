<template>
  <div class="group-item-wrapper">
    <div class="group-item">
      <img class="group-item-image" :src="item.product.image" alt="image">
      <div class="group-item-spec">
        <div class="product-spec">
          <p class="product-category">{{ item.product.category }}</p>
          <p class="product-name">{{ item.product.name }}</p>
          <div class="product-price-unit">
            <!-- <p class="product-price">{{ $filters.toVND(item.product.price) }}</p>
            <p class="product-unit">/ 1 kg</p> -->
            <p v-if="item.product.on_sale" class="product-price">
              <span class="line-through text-gray-400 font-light">{{ $filters.toVND(item.product.price) }}</span>
              {{ $filters.toVND(sale_price(item.product.price, item.product.discount_type, item.product.discount)) }}
            </p>
            <p v-else class="product-price">
              {{ $filters.toVND(item.product.price) }}
            </p>

            <p class="product-unit">/ {{ item.product.unit }}</p>
          </div>
        </div>
        <p class="product-qty">x {{ item.quantity }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["item"],
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
  methods: {
    sale_price(origin_price, discount_type, discount) {
      const origin = Number(origin_price);

      if (discount_type === "%") {
        return origin - origin * discount / 100;
      }

      let result = origin - discount;
      return result > 0 ? result : 0;
    },
  },
}
</script>

<style lang="postcss" scoped>
.group-item-wrapper {
  @apply w-full;
}

.group-item {
  @apply flex flex-row items-stretch gap-4;
}

.group-item-image {
  @apply w-20 h-20;
  @apply bg-dominant;
  @apply p-2;
  @apply object-contain;
}

.group-item-spec {
  @apply py-1;
  @apply w-full flex-1;
  @apply flex flex-row items-start gap-2;
}

.product-spec {
  @apply flex-grow;
  @apply w-full;
  @apply flex flex-col;
}

.product-category {
  @apply text-xs;
}

.product-name {
  @apply text-sm font-bold;
}

.product-price-unit {
  @apply flex flex-row items-center gap-1;
}

.product-price {
  @apply text-sm font-semibold text-gold-500;
}

.product-unit {
  @apply text-xs font-medium;
}

.product-qty {
  @apply w-10;
  @apply text-right;
  @apply text-sm font-normal;
}
</style>