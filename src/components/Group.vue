<template>
  <div class="w-full">
    <div class="">
      <div class="aspect-16/24">
        <img class="object-cover" :src="group.image" @click="detailGroup()" alt="Image">
      </div>

      <div class="px-6 py-4 space-y-3 w-full bg-fuchsia-50">
        <h4 class="text-violet-800 text-xl font-bold line-clamp-1">{{ group.title }}</h4>


        <div class="w-full flex gap-2 overflow-x-auto">
          <GroupItem v-for="item in group.material" :key='item._id' :product='item.product' />
        </div>

        <div class="pt-2 text-sm flex justify-between items-center">
          <div class="flex gap-2 items-center px-3 py-1.5 rounded-md bg-rose-400 text-white">
            <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M323.5 51.25C302.8 70.5 284 90.75 267.4 111.1C240.1 73.62 206.2 35.5 168 0C69.75 91.12 0 210 0 281.6C0 408.9 100.2 512 224 512s224-103.1 224-230.4C448 228.4 396 118.5 323.5 51.25zM304.1 391.9C282.4 407 255.8 416 226.9 416c-72.13 0-130.9-47.73-130.9-125.2c0-38.63 24.24-72.64 72.74-130.8c7 8 98.88 125.4 98.88 125.4l58.63-66.88c4.125 6.75 7.867 13.52 11.24 19.9C364.9 290.6 353.4 357.4 304.1 391.9z" />
            </svg>
            <p><span class="font-bold">{{ group.calo }}</span> kcal</p>
          </div>

          <div class="flex gap-2 items-center px-3 py-1.5 rounded-md bg-violet-500 text-white">
            <svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M472.8 168.4C525.1 221.4 525.1 306.6 472.8 359.6L360.8 472.9C351.5 482.3 336.3 482.4 326.9 473.1C317.4 463.8 317.4 448.6 326.7 439.1L438.6 325.9C472.5 291.6 472.5 236.4 438.6 202.1L310.9 72.87C301.5 63.44 301.6 48.25 311.1 38.93C320.5 29.61 335.7 29.7 344.1 39.13L472.8 168.4zM.0003 229.5V80C.0003 53.49 21.49 32 48 32H197.5C214.5 32 230.7 38.74 242.7 50.75L410.7 218.7C435.7 243.7 435.7 284.3 410.7 309.3L277.3 442.7C252.3 467.7 211.7 467.7 186.7 442.7L18.75 274.7C6.743 262.7 0 246.5 0 229.5L.0003 229.5zM112 112C94.33 112 80 126.3 80 144C80 161.7 94.33 176 112 176C129.7 176 144 161.7 144 144C144 126.3 129.7 112 112 112z" />
            </svg>
            <p><span class="font-bold">{{ $filters.toVND(group.price) }}</span> </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupItem from './GroupItem.vue';

import { mapActions } from "vuex";
export default {
  props: ["group"],
  components: {
    GroupItem,
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
  methods: {
    ...mapActions(["setSelectedGroup",]),
    detailGroup() {
      this.setSelectedGroup(this.group._id);
      const id = this.group._id;
      const path = `/group/${id}`
      if (this.$route.path !== path) this.$router.push(path);
    },
  },
}
</script>

<style scoped>
*::-webkit-scrollbar {
  @apply hidden;
}
</style>