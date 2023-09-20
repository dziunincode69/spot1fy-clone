<script>
import SongRow from "../components/SongRow.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import DotsHorizontal from "vue-material-design-icons/DotsHorizontal.vue";

import { useSongStore } from "../stores/song";
import { mapState, mapActions } from "pinia";
export default {
  components: {
    SongRow,
    Play,
    Pause,
    DotsHorizontal,
  },
  computed: {
    ...mapState(useSongStore, [
      "isPlaying",
      "currentTrack",
      "currentArtist",
      "currentAlbumData",
      "songListAlbum",
    ]),
  },
  methods: {
    ...mapActions(useSongStore, ["getSongFromAlbum", "getAlbumDetail"]),
  },
  created() {
    const param = this.$route.params.id;
    if (param && !this.currentAlbumData.name) {
      console.log("hello wolrddd");
      this.getAlbumDetail(param);
    }
    this.playlistId = param;
    this.getSongFromAlbum(param);
  },
};
</script>

<template>
  <div class="p-8 overflow-x-hidden">
    <button
      type="button"
      class="text-white text-2xl font-semibold hover:underline cursor-pointer"
    >
      {{ currentAlbumData.name }}
    </button>

    <div class="py-1.5"></div>
    <div class="flex items-center w-full relative h-full">
      <img width="140" :src="currentAlbumData.imageUrl" />

      <div class="w-full ml-5">
        <div
          style="font-size: 25px"
          class="text-white absolute w-full hover:underline cursor-pointer top-0 font-bosemiboldld"
        >
          {{ currentAlbumData.artist }}
        </div>

        <div class="text-gray-300 text-[13px] flex">
          <div class="flex">Playlist</div>
          <div class="ml-2 flex">
            <div class="circle mt-2 mr-2" />
            <span class="-ml-0.5">{{ songListAlbum.length }} songs</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6"></div>
    <div class="flex items-center justify-between px-5 pt-2">
      <div class="flex items-center justify-between text-gray-400">
        <div class="mr-7">#</div>
        <div class="text-sm">Title</div>
      </div>
    </div>
    <div class="border-b border-b-[#2A2A2A] mt-2"></div>
    <div class="mb-4"></div>
    <ul class="w-full" v-for="(song, index) in songListAlbum" :key="song.id">
      <SongRow :song="song" :index="++index" />
    </ul>
  </div>
</template>

<style scoped>
.circle {
  width: 4px;
  height: 4px;
  background-color: rgb(189, 189, 189);
  border-radius: 100%;
}
</style>
