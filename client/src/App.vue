<template>
  <RouterView v-if="page === 'auth'" />

  <div v-else>
    <!-- <div
      id="TopNav"
      class="w-[calc(100%-240px)] h-[60px] fixed right-0 z-20 bg-[#101010] bg-opacity-80 flex items-center justify-between"
    >
      <div class="flex items-center ml-6"></div>

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
          <div class="text-white text-[14px] ml-1.5 font-semibold">Manesty</div>
        </div>
      </button>

      <span
        v-if="openMenu"
        class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer"
      >
        <ul class="text-gray-200 font-semibold text-[14px]">
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">
            Profile
          </li>
          <li class="px-3 py-2.5 hover:bg-[#3E3D3D]">Log out</li>
        </ul>
      </span>
    </div> -->
    <TopNav />
    <SideNav />

    <div
      class="fixed right-0 top-0 w-[calc(100%-240px)] overflow-auto h-full bg-gradient-to-b from-[#1C1C1C] to-black"
    >
      <div class="mt-[70px]"></div>
      <RouterView />
      <div class="mb-[100px]"></div>
    </div>

    <MusicPlayer v-if="currentDataSong" />
  </div>
</template>
<script>
import { useSongStore } from "./stores/song";
import { mapState, mapActions, mapWritableState } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import MenuItem from "./components/MenuItem.vue";
import MusicPlayer from "./components/MusicPlayer.vue";
import SideNav from "./components/SideNav.vue";
import TopNav from "./components/TopNav.vue";

export default {
  data() {
    return {
      openMenu: false,
    };
  },
  components: {
    TopNav,
    SideNav,
    MusicPlayer,
    MenuItem,
  },
  computed: {
    ...mapState(useSongStore, ["currentDataSong", "currentArtist", "page"]),
    ...mapWritableState(useSongStore, ["page"]),
  },
  methods: {
    ...mapActions(useSongStore, ["checkStatus"]),
  },
  async created() {
    await this.checkStatus();
    if (localStorage.getItem("access_token")) {
      this.page = "home";
    }
  },
};
</script>

<style></style>
