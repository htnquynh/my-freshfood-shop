<template>
  <div id="app" class="bg-white">
    <GlobalHeader class="header-page" />
    <MiniCart />

    <router-view />

    <GlobalFooter />

    <LoadScreen :isLoading="isLoading" />
    <button
      class="fixed bottom-8 right-24 rounded-full bg-gold-500 p-2 z-20"
      id="backToTop"
      @click="backToTop()"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#000000"
      >
        <rect fill="none" height="24" width="24" />
        <path d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z" />
      </svg>
    </button>
    <beautiful-chat
      :participants="participants"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="true"
      :messageStyling="messageStyling"
    >
      <template v-slot:header>
        <img
          style="border-radius: 50%"
          width="50"
          src="https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-fresh-logo-of-green-leaf-ecology-vector-collection-of-bright-and-png-image_1862265.jpg"
        />
        <h3 style="line-height: 50px; margin-left: 10px">
          Welcome to Fresh Shop
        </h3>
      </template>
      <template v-slot:text-message-body="{ message }">
        {{ message.data.text }}
        <br />
        <small v-if="message.author != 'me'" style="color: #4d4d4d">
          {{ message.data.meta }}
        </small>
        <small v-else style="color: #e6e6e6">
          {{ message.data.meta }}
        </small>
      </template>
    </beautiful-chat>
  </div>
</template>
<script>
import LoadScreen from "./components/LoadScreen.vue";

import GlobalHeader from "./components/global/GlobalHeader.vue";
import GlobalFooter from "./components/global/GlobalFooter.vue";
import MiniCart from "./components/MiniCart.vue";
import { mapGetters } from "vuex";
import * as io from "socket.io-client";
import moment from "moment";

export default {
  components: {
    LoadScreen,
    GlobalHeader,
    GlobalFooter,
    MiniCart,
  },
  data() {
    return {
      socket: io.connect("http://localhost:5000"),
      participants: [
        {
          id: "shop",
          name: "Shop",
          imageUrl:
            "https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-fresh-logo-of-green-leaf-ecology-vector-collection-of-bright-and-png-image_1862265.jpg",
        },
        {
          id: "user2",
          name: "Support",
          imageUrl:
            "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
        },
      ],
      messageList: [
        {
          type: "text",
          author: `me`,
          data: { text: `Say yes!`, meta: "06-16-2019 12:43" },
        },
        {
          type: "text",
          author: `shop`,
          data: { text: `No.`, meta: "06-16-2019 12:43" },
        },
        {
          type: "text",
          author: `shop`,
          data: {
            text: `bạn có muốn đi chơi với mình không`,
            meta: "06-16-2019 12:43",
          },
        },
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 1,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      colors: {
        header: {
          bg: "#4e8cff",
          text: "#ffffff",
        },
        launcher: {
          bg: "#4e8cff",
        },
        messageList: {
          bg: "#ffffff",
        },
        sentMessage: {
          bg: "#4e8cff",
          text: "#ffffff",
        },
        receivedMessage: {
          bg: "#eaeaea",
          text: "#222222",
        },
        userInput: {
          bg: "#f4f7f9",
          text: "#565867",
        },
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true, // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    };
  },
  created() {
    console.log("In App.vue: " + this.isLoading);
  },
  mounted() {
    document.getElementById("backToTop").style.visibility = "hidden";
    window.onscroll = function () {
      if (pageYOffset >= 200) {
        document.getElementById("backToTop").style.visibility = "visible";
      } else {
        document.getElementById("backToTop").style.visibility = "hidden";
      }
    };
  },
  computed: {
    ...mapGetters(["isLoading", "userLogin"]),
  },
  methods: {
    backToTop() {
      window.scroll({ top: 0, behavior: "smooth" });
    },
    sendMessage(text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen
          ? this.newMessagesCount
          : this.newMessagesCount + 1;
      }
    },
    onMessageWasSent(message) {
      message.data = {
        ...message.data,
        meta: moment(Date.now()).format("MM-DD-YYYY kk:mm"),
      };
      this.socket.emit("sendMessage", {
        type: "text",
        author: this.userLogin._id,
        data: {
          text: message.data.text,
          meta: Date.now(),
        },
      });
      // called when the user sends a message
      this.messageList = [...this.messageList, message];
    },
    openChat() {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true;
      this.newMessagesCount = 0;
    },
    closeChat() {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false;
    },
  },
};
</script>
<style scoped></style>
