<script setup>
import BaseButtonPrimary from '../components/base/BaseButtonPrimary.vue'
import BaseButtonSecondary from '../components/base/BaseButtonSecondary.vue'
import BaseButtonText from '../components/base/BaseButtonText.vue'
import useFormatDate from '../composables/useFormatDate';
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import PostAPI from '../api/PostAPI';
import getConfigHeaderAPI from '../api/config.js'
import { mapGetters } from '../store/mapState';
import Swal from 'sweetalert2'

const { is_login, userLogin } = mapGetters();
const route_param = useRoute().query;
const post = ref({
  _id: '',
  title: '',
  subtitle: '',
  thumbnail: '',
  topic: '',
  likes: [],
  comments: [],
  createdAt: null,
  updatedAt: null,
});

onMounted(async () => {
  await PostAPI.getById(route_param.id).then((res) => {
    post.value = res.data;
  })
});

const comment = ref({
  user: null,
  content: '',
  commentAt: null,
});

const shares = ref([
  {
    id: 0,
    svg: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 21.5C12 21.7761 12.2241 22.0013 12.4999 21.9877C17.7905 21.7272 22 17.3552 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 16.6251 5.13989 20.5168 9.40433 21.6598C9.70966 21.7417 10 21.5044 10 21.1883V14H9C8.44771 14 8 13.5523 8 13C8 12.4477 8.44772 12 9 12H10V10C10 8.34315 11.3431 7 13 7H14C14.5523 7 15 7.44772 15 8C15 8.55229 14.5523 9 14 9H13C12.4477 9 12 9.44772 12 10V12H14C14.5523 12 15 12.4477 15 13C15 13.5523 14.5523 14 14 14H12V21.5Z" fill="#2563EB"/>
</svg>`,
  },
  {
    id: 1,
    svg: `<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5659 4.5C19.0554 12 13.6713 18 6.81875 18C4.45766 18 2.09658 17.6768 0.244206 16.7706C-0.180042 16.5631 -0.0142117 15.985 0.455136 15.9532C2.73612 15.7987 4.6237 15.2423 5.83983 14C0.537552 12.1945 -0.377062 5.4995 0.575427 2.00719C0.68726 1.59713 1.20916 1.59499 1.41952 1.96246C3.04599 4.80371 6.13859 6.39003 10.0146 6.02396C9.84688 5.54804 9.75554 5.03492 9.75554 4.5C9.75554 2.01472 11.7278 0 14.1607 0C15.6469 0 16.9612 0.75182 17.7591 1.90346L19.44 1.65815C19.8589 1.59703 20.1512 2.07087 19.9165 2.43047L18.5659 4.5Z" fill="#0EA5E9"/>
</svg>`,
  },
  {
    id: 2,
    svg: `<svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.68826 0.24606C1.821 0.36169 0.350133 1.82087 0.204737 3.68604C0.0965153 5.07434 0 6.6819 0 8C0 9.3181 0.0965153 10.9257 0.204737 12.314C0.350133 14.1791 1.821 15.6383 3.68826 15.7539C5.68542 15.8776 8.53673 16 12 16C15.4633 16 18.3146 15.8776 20.3117 15.7539C22.179 15.6383 23.6499 14.1791 23.7953 12.314C23.9035 10.9257 24 9.3181 24 8C24 6.6819 23.9035 5.07434 23.7953 3.68604C23.6499 1.82087 22.179 0.36169 20.3117 0.24606C18.3146 0.12239 15.4633 0 12 0C8.53673 0 5.68542 0.12239 3.68826 0.24606ZM14.752 7.1678L11.5547 5.03633C10.8902 4.59329 10 5.06969 10 5.86838V10.1313C10 10.93 10.8902 11.4064 11.5547 10.9634L14.752 8.8319C15.3457 8.4361 15.3457 7.5636 14.752 7.1678Z" fill="#DC2626"/>
</svg>`,
  },
]);

const heart_svg = ref(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.1 20.8C11.6 20.8 11 20.6 10.6 20.2C4.1 14.5 4 14.4 4 14.3L3.9 14.2C2.7 13 2 11.3 2 9.6V9.4C2.1 5.8 5 3 8.6 3C9.7 3 11.2 3.6 12.1 4.8C13 3.6 14.6 3 15.7 3C19.3 3 22.1 5.8 22.3 9.4V9.6C22.3 11.4 21.6 13 20.4 14.3L20.3 14.4C20.2 14.5 19.4 15.2 13.7 20.3C13.2 20.6 12.7 20.8 12.1 20.8ZM5.5 14C5.9 14.4 7.9 15.8 11.6 19C11.9 19.3 12.3 19.3 12.6 19C16.4 15.6 18.6 13.7 19.1 13.3L19.2 13.2C20.2 12.2 20.7 10.9 20.7 9.6V9.4C20.6 6.6 18.4 4.5 15.6 4.5C14.9 4.5 13.5 5 13 6.1C12.8 6.5 12.4 6.7 12 6.7C11.6 6.7 11.2 6.5 11 6.1C10.5 5.1 9.2 4.5 8.4 4.5C5.7 4.5 3.4 6.7 3.3 9.4V9.7C3.3 11 3.9 12.3 4.8 13.2L5.5 14Z" fill="currentColor"/>
</svg>`)

const heart_filled_svg = ref(`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.1 9.1C22 5.7 19.3 3 15.9 3C14.8 3 13.1 3.8 12.4 5.1C12.3 5.4 11.9 5.4 11.8 5.1C11 3.9 9.4 3.1 8.2 3.1C4.9 3.1 2.1 5.8 2 9.1V9.2V9.3C2 11 2.7 12.6 3.9 13.8C3.9 13.8 3.9 13.8 3.9 13.9C4 14 8.8 18.2 11 20.1C11.6 20.6 12.5 20.6 13.1 20.1C15.3 18.2 20 14 20.2 13.9C20.2 13.9 20.2 13.9 20.2 13.8C21.4 12.7 22.1 11.1 22.1 9.3V9.1Z" fill="currentColor"/>
</svg>`)


const submitComment = async () => {
  if (is_login.value) {
    if (comment.value.content) {
      comment.value.user = userLogin.value._id;
      comment.value.commentAt = Date.now();

      const config = getConfigHeaderAPI();
      await PostAPI.comment(post.value._id, comment.value, config);
      await PostAPI.getById(route_param.id).then((res) => {
        post.value = res.data;
      })
    }
  } else {
    Swal.fire(
      "Login required",
      "You must be logged in to be able to comment posts.",
      "warning"
    );
  }
};

const userLikedPost = computed(() => {
  return post.value.likes.some((item) => item.user._id == userLogin.value._id);
});

const likePost = async () => {
  if (is_login.value) {
    const likeObj = {
      user: userLogin.value._id
    }
    const config = getConfigHeaderAPI();
    await PostAPI.like(post.value._id, likeObj, config);

    await PostAPI.getById(route_param.id).then((res) => {
      post.value = res.data;
    })
  } else {
    Swal.fire(
      "Login required",
      "You must be logged in to be able to like posts.",
      "warning"
    );
  }
};

</script>

<template>
  <div class="container py-16">
    <div class="max-w-2xl mx-auto space-y-8">
      <div class="space-y-6">
        <h1 class="text-3xl text-center font-bold">{{ post.title }}</h1>
        <div class="flex justify-center items-center gap-4 text-sm font-medium">
          <span class="px-3 py-1.5 rounded-md bg-violet-100 text-violet-800">{{ post.topic }}</span>
          <span class="text-gray-600">{{ useFormatDate(post.createdAt) }}</span>
        </div>
        <div>
          <p class="text-justify font-semibold">{{ post.subtitle }}</p>
        </div>
      </div>
      <div class="aspect-220/370">
        <img :src="post.thumbnail" alt="Post cover" class="object-cover">
      </div>
      <div>
        <div v-html="post.content" class="space-y-5"></div>
      </div>
      <div class="py-4 border-t flex justify-between items-center">
        <div>
          <div class="space-y-3 md:space-y-0 md:flex md:gap-3">
            <p>Share:</p>
            <div class="text-gray-500 flex items-center gap-4">
              <span v-for="item in shares" :key="item.id" v-html="item.svg"></span>
            </div>
          </div>
        </div>
        <BaseButtonText v-if="!userLikedPost" @click="likePost">
          <span>Like</span>
          <span v-html="heart_svg"></span>
        </BaseButtonText>

        <BaseButtonText v-else class="!text-rose-500 !hover:bg-rose-50">
          <span>Liked</span>
          <span v-html="heart_filled_svg"></span>
        </BaseButtonText>

      </div>
    </div>

    <div class="max-w-2xl mx-auto py-16 space-y-4">
      <div class="space-y-6">
        <p class="text-2xl font-semibold">Post's comment</p>
        <form @submit.prevent="() => { }" class="flex items-center gap-4">
          <input v-model="comment.content" type="text"
            class="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
            placeholder="Type your comment ..." />
          <BaseButtonPrimary @click="submitComment">
            Submit
          </BaseButtonPrimary>
        </form>
      </div>

      <div class="py-6 space-y-2">
        <div class="py-3 border-b" v-for="item in post.comments" :key="item.id">
          <div class="flex items-start gap-3">
            <div v-if="item.user.avatar" class="flex-shrink-0 aspect-square w-10">
              <img :src='item.user.avatar' alt="Avatar" class="rounded-full" />
            </div>

            <div v-else class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-400">
            </div>

            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <p class="font-semibold">{{ item.user.username }}</p>
                <p class="text-sm text-gray-600">{{ useFormatDate(item.commentAt) }}</p>
              </div>
              <div class="">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


