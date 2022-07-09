<template>
  <beautiful-chat :titleImageUrl="titleImageUrl" title="Welcome to Fresh Shop" :participants="participants"
    :onMessageWasSent="onMessageWasSent" :messageList="messageList" :newMessagesCount="newMessagesCount"
    :isOpen="isChatOpen" :close="closeChat" :open="openChat" :showLauncher="true" :showCloseButton="true"
    :colors="colors" :alwaysScrollToBottom="alwaysScrollToBottom" :disableUserListToggle="true"
    :messageStyling="messageStyling">
    <template v-slot:header>
      <img style="border-radius: 50%" width="50"
        src="https://png.pngtree.com/png-vector/20191027/ourlarge/pngtree-fresh-logo-of-green-leaf-ecology-vector-collection-of-bright-and-png-image_1862265.jpg" />
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
</template>

<script>
import moment from "moment";
import ChatAPI from "../../api/ChatAPI";
import * as io from "socket.io-client";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      socket: io.connect("https://shopfreshapi.herokuapp.com"),
      titleImageUrl:
        "https://i.pinimg.com/originals/b4/6d/40/b46d40eb9f5f330fd966552f6c57839b.jpg",
      participants: [
        {
          id: "shop",
          name: "Shop",
          imageUrl:
            "https://i.pinimg.com/originals/b4/6d/40/b46d40eb9f5f330fd966552f6c57839b.jpg",
        },
        {
          id: "user2",
          name: "Support",
          imageUrl:
            "https://avatars3.githubusercontent.com/u/37018832?s=200&v=4",
        },
      ],
      messageList: [], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
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
    if (this.userLogin._id) {
      this.getChatByUser();
    }
    this.socket.on("pushMessageToClient", (chat) => {
      this.newMessagesCount = this.isChatOpen
        ? this.newMessagesCount
        : this.newMessagesCount + 1;
      this.messageList = chat.messages.map((message) => {
        return {
          type: message.type,
          author: message.author,
          data: {
            text: message.data.text,
            meta: moment(message.data.meta).format("MM-DD-YYYY kk:mm"),
          },
        };
      });
    });
  },
  computed: {
    ...mapGetters(["userLogin"]),
  },
  methods: {
    async getChatByUser() {
      await ChatAPI.get(this.userLogin._id).then((res) => {
        if (res.data.chat.length === 0) {
          this.messageList = [];
        } else {
          this.messageList = res.data.chat.messages.map((message) => {
            return {
              type: message.type,
              author: message.author,
              data: {
                text: message.data.text,
                meta: moment(message.data.meta).format("MM-DD-YYYY kk:mm"),
              },
            };
          });
        }
      });
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
        isShop: false,
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
      if (!this.userLogin._id) {
        this.$swal.fire(
          "Must login!",
          "You must login to chat with shop",
          "info"
        );
        return;
      }
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

<style>
.sc-header--img {
  width: 64px;
  height: 64px;
}
</style>
