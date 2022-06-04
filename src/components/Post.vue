
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import useFormatDate from '../composables/useFormatDate';
const router = useRouter();


const props = defineProps({
  post: {
    type: Object,
    default: {}
  }
})


const heart_svg = ref(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1 20.8C11.6 20.8 11 20.6 10.6 20.2C4.1 14.5 4 14.4 4 14.3L3.9 14.2C2.7 13 2 11.3 2 9.6V9.4C2.1 5.8 5 3 8.6 3C9.7 3 11.2 3.6 12.1 4.8C13 3.6 14.6 3 15.7 3C19.3 3 22.1 5.8 22.3 9.4V9.6C22.3 11.4 21.6 13 20.4 14.3L20.3 14.4C20.2 14.5 19.4 15.2 13.7 20.3C13.2 20.6 12.7 20.8 12.1 20.8ZM5.5 14C5.9 14.4 7.9 15.8 11.6 19C11.9 19.3 12.3 19.3 12.6 19C16.4 15.6 18.6 13.7 19.1 13.3L19.2 13.2C20.2 12.2 20.7 10.9 20.7 9.6V9.4C20.6 6.6 18.4 4.5 15.6 4.5C14.9 4.5 13.5 5 13 6.1C12.8 6.5 12.4 6.7 12 6.7C11.6 6.7 11.2 6.5 11 6.1C10.5 5.1 9.2 4.5 8.4 4.5C5.7 4.5 3.4 6.7 3.3 9.4V9.7C3.3 11 3.9 12.3 4.8 13.2L5.5 14Z" fill="currentColor"/>
</svg>
`)

const comment_svg = ref(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.44226 2H17.5623C20.0954 2.08694 22.0809 4.2066 22.0023 6.74V13.26C22.0399 14.4835 21.5883 15.6716 20.7475 16.5612C19.9067 17.4508 18.746 17.9686 17.5223 18H8.00226C7.34345 18.0136 6.71868 18.2953 6.27226 18.78L3.90226 21.31C3.70147 21.529 3.41933 21.6556 3.12226 21.66C2.81544 21.6522 2.52447 21.522 2.31412 21.2985C2.10377 21.075 1.99148 20.7767 2.00226 20.47V6.74C1.92363 4.2066 3.90913 2.08694 6.44226 2ZM17.5623 16.5C19.2672 16.4137 20.5815 14.9653 20.5023 13.26V6.74C20.5815 5.03472 19.2672 3.58627 17.5623 3.5H6.44225C4.73731 3.58627 3.42298 5.03472 3.50225 6.74V19.54L5.13225 17.76C5.87768 16.9671 6.91401 16.5121 8.00225 16.5H17.5623Z" fill="currentColor"/>
<path d="M8.25244 8.75H13.2524C13.6667 8.75 14.0024 8.41421 14.0024 8C14.0024 7.58579 13.6667 7.25 13.2524 7.25H8.25244C7.83823 7.25 7.50244 7.58579 7.50244 8C7.50244 8.41421 7.83823 8.75 8.25244 8.75Z" fill="currentColor"/>
<path d="M15.7524 11.25H8.25244C7.83823 11.25 7.50244 11.5858 7.50244 12C7.50244 12.4142 7.83823 12.75 8.25244 12.75H15.7524C16.1667 12.75 16.5024 12.4142 16.5024 12C16.5024 11.5858 16.1667 11.25 15.7524 11.25Z" fill="currentColor"/>
</svg>`)

const arrow_right_svg = ref(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.05 11.47L13.05 4.47C12.8571 4.28243 12.5787 4.21204 12.3198 4.28533C12.0609 4.35863 11.8608 4.56447 11.7948 4.82533C11.7289 5.08619 11.8071 5.36243 12 5.55L17.71 11.25H4.47998C4.06577 11.25 3.72998 11.5858 3.72998 12C3.72998 12.4142 4.06577 12.75 4.47998 12.75H17.7L12 18.45C11.857 18.5893 11.7764 18.7804 11.7764 18.98C11.7764 19.1796 11.857 19.3707 12 19.51C12.1378 19.6546 12.3302 19.7345 12.53 19.73C12.729 19.7309 12.9201 19.6516 13.06 19.51L20.06 12.51C20.3524 12.2172 20.3524 11.7428 20.06 11.45L20.05 11.47Z" fill="currentColor"/>
</svg>
`)

const goDetail = () => {
  router.push(`/post?id=${props.post._id}`);
};

</script>

<template>
  <div class="space-y-4">
    <div @click="goDetail()" class="aspect-220/370 cursor-pointer rounded-xl overflow-hidden ">
      <img class="object-cover transition-transform duration-300 ease-in-out hover:transform hover:scale-115"
        :src="post.thumbnail" alt="Post cover">
    </div>
    <div class="space-y-4">
      <div class="flex items-center gap-4 text-sm font-medium">
        <span class="px-3 py-1.5 rounded-md bg-violet-100 text-violet-800">{{ post.topic }}</span>
        <span class="text-gray-600">{{ useFormatDate(post.createdAt) }}</span>
        <span class="h-0.5 flex-grow bg-dark-400"></span>
      </div>
      <div @click="goDetail()" class="space-y-2">
        <h4
          class="cursor-pointer transition-colors duration-300 ease-in hover:text-violet-600 text-lg font-bold line-clamp-2">
          {{ post.title }}</h4>
        <p class="text-gray-500 italic text-justify line-clamp-3">{{ post.subtitle }}</p>
      </div>

      <div class="pt-2 flex items-center justify-between">
        <button
          class="px-6 py-3 text-dark-800 font-medium border border-dark-600 flex items-center gap-4 transition-colors duration-300 ease-in-out hover:bg-violet-600 hover:text-white">
          Read more
          <span v-html="arrow_right_svg"></span>
        </button>
        <div class="flex gap-6 items-center">
          <div class="flex items-center gap-2">
            <button>
              <span v-html="heart_svg"></span>
            </button>
            <span>{{ post.likes.length }}</span>
          </div>

          <div class="flex items-center gap-2">
            <button class="">
              <span v-html="comment_svg"></span>
            </button>
            <span>{{ post.comments.length }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
</style>
