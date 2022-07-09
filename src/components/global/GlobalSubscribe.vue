<template>
  <section class="relative overflow-hidden">
    <div class="hidden md:block absolute z-0 top-0 left-0">
      <img src="/assets/images/subscribe-vec-1.png" alt="" class="w-80">
    </div>
    <div class="absolute z-0 top-0 right-0">
      <img src="/assets/images/subscribe-vec-2.png" alt="" class="">
    </div>
    <div class="relative z-1 container py-16 flex justify-center">
      <div class="space-y-2 ">
        <div class="text-violet-500">
          <svg class="h-10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
          </svg>
        </div>

        <div class="space-y-6">
          <div class="space-y-1 w-80">
            <h3 class="text-2xl font-medium">Don't miss out!</h3>
            <p>Sign up for our newsletter to stay in the loop.</p>
          </div>

          <div class="space-y-2 w-72">
            <input type="email" placeholder="Email address"
              class="block border border-dark-800 w-full px-4 py-3 focus:outline-none">
            <button
              class="w-full px-3 py-3 bg-black md:bg-violet-500 shadowViolet text-white font-medium uppercase"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.shadow-peach {
  box-shadow: rgba(253, 139, 124, 0.45) 0px 25px 20px -20px;
}

.shadowViolet {
  box-shadow: rgba(139, 92, 246, 0.45) 0px 25px 20px -20px;
}
</style>