<template>
  <div
    id="TopNav"
    class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between"
  >
    <div class="flex items-center ml-6">
      <button
        v-if="!isPremium"
        class="bg-[#f6f6f6] hover:bg-[#5C8374] text-black font-bold py-2 px-4 rounded-full"
        type="button"
        @click="handlePremium"
      >
        Upgrade Premium
      </button>
    </div>

    <button
      @click="openMenu = !openMenu"
      :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
      class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer"
    >
      <div class="flex items-center">
        <img
          class="rounded-full"
          width="27"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        />
        <div class="text-white text-[14px] ml-1.5 font-semibold">
          {{ username }}
        </div>
      </div>
    </button>
    <span
      v-if="openMenu"
      class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer"
    >
      <ul class="text-gray-200 font-semibold text-[14px]">
        <li
          class="px-3 py-2.5 hover:bg-[#3E3D3D]"
          @click.prevent="handleLogout"
        >
          Log out
        </li>
      </ul>
    </span>
  </div>
</template>

<script>
import { useSongStore } from "../stores/song";
import { mapState, mapActions, mapWritableState } from "pinia";
export default {
  computed: {
    ...mapState(useSongStore, ["username", "audio", "isPremium"]),
    ...mapWritableState(useSongStore, ["page", "username", "isPremium"]),
  },
  async created() {
    await this.checkStatus();
    if (localStorage.getItem("email")) {
      this.username = localStorage.getItem("email").split("@")[0];
    }
  },
  methods: {
    async handlePremium() {
      const tokenPayment = await this.getPaymentUri();
      window.snap.pay(tokenPayment.token, {
        onSuccess: async (result) => {
          await this.updateStatus(result.order_id);
        },
        onError: () => {
          this.$router.push("/");
        },
        onClose: () => {
          console.log("closed");
        },
      });
    },
    ...mapActions(useSongStore, [
      "pauseClickedSong",
      "resetState",
      "getPaymentUri",
      "updateStatus",
      "checkStatus",
    ]),
    handleLogout() {
      if (this.audio) {
        this.resetState();
      }
      this.page = "auth";
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  data() {
    return {
      openMenu: false,
    };
  },
};
</script>

<style scoped></style>
