<script setup>
import { ref } from "vue";
import useTopic from "../composables/useTopic";

const topics = useTopic();

const quote_svg = ref(`<svg viewBox="0 0 45 36" class=""><path fill="currentColor" d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"></path></svg>`);

const chevron_right_svg = (`<svg class="" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.00017 20.7501C8.19924 20.751 8.39029 20.6717 8.53017 20.5301L16.5302 12.5301C16.8226 12.2373 16.8226 11.7629 16.5302 11.4701L8.53017 3.47009C8.23466 3.19473 7.77416 3.20286 7.48855 3.48847C7.20294 3.77408 7.19481 4.23458 7.47017 4.53009L14.9402 12.0001L7.47017 19.4701C7.17772 19.7629 7.17772 20.2373 7.47017 20.5301C7.61006 20.6717 7.80111 20.751 8.00017 20.7501Z" fill="currentColor"/>
</svg>
`);
</script>

<template>
  <div class="">
    <div class="">
      <div class="py-16 bg-fuchsia-50">
        <div class="container flex gap-16">
          <div class="w-6/12 flex items-center">
            <div class="space-y-4">
              <h2 class="text-7xl text-violet-700 font-bold">Blogs</h2>
              <p class="pt-2 tracking-widest font-medium">Latest news from our blog</p>
              <p class="text-gray-600">The passage experienced a surge in popularity during the 1960s when Letraset used
                it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with
                their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our
                generator to get your own, or read on for the authoritative history of lorem ipsum.</p>
            </div>
          </div>
          <div class="w-5/12 space-y-6">
            <div class="flex items-center gap-6">
              <h3 class="text-3xl font-bold">Trending Posts</h3>
              <span class="h-0.5 flex-1 bg-black"></span>
              <!-- <p class="pl-3 pr-2 py-1 border border-dark-200 rounded-full text-sm italic flex items-center gap-1">
              See all
              <span v-html="chevron_right_svg" class="leading-0 w-4 h-4"></span>
            </p> -->
            </div>

            <div class="space-y-6">
              <div v-for="item in listPost.slice(0, 3)" :key="item._id">
                <div class="flex items-stretch gap-4">
                  <div class="w-40 h-24 flex-shrink-0">
                    <div class="aspect-96/160 rounded-lg overflow-hidden">
                      <img :src="item.thumbnail" class="w-full h-full object-cover" alt="Post cover">
                    </div>
                  </div>
                  <div class="w-full relative">
                    <div class="relative z-5 w-full">
                      <span class="text-sm font-bold text-violet-600">{{ item.topic
                      }}</span>
                      <span v-html="quote_svg"
                        class="absolute top-0 right-0 -z-1 w-8 text-violet-900 transform rotate-180"></span>
                    </div>
                    <h4 class="pt-1 font-semibold text-justify line-clamp-2">{{ item.title }}</h4>

                    <!-- <p class="pt-1.5 text-sm text-gray-500 text-justify line-clamp-2">{{ item.subtitle }}</p> -->
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container py-16 space-y-16">
        <div class="space-y-5">
          <h3 class="text-4xl font-bold">Post By Topic</h3>
          <div class="flex items-center gap-5">
            <p v-for="(topic, index) in topics" :key="index" class="px-3 py-1 bg-gray-100 rounded-md font-medium">
              {{ topic }}
            </p>
          </div>
        </div>

        <div class="">
          <div class="grid grid-cols-3 gap-10">
            <Post v-for="post in listPost" :key="post._id" :post="post" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from "../components/Post.vue";
import PostAPI from "../api/PostAPI";
import { ref } from "vue";

export default {
  components: {
    Post,
  },
  data() {
    return {
      listPost: []
    };
  },
  async created() {
    await PostAPI.get()
      .then((res) => {
        this.listPost = res.data;
      })
      .catch((error) => {
        console.log(error.message);
      });
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="postcss" scoped>
</style>
