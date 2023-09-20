<template>
  <button @click.prevent="handleClickPlaylist">
    <div
      class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer"
    >
      <img class="rounded-md" :src="data.albumImage" alt="" />
      <div class="text-white pt-4 font-semibold text-[13px]">
        {{ data.albumName }}
      </div>
      <div class="text-white pt-4 font-bold text-[15px]">
        {{ data.artist }}
      </div>
    </div>
  </button>
</template>
<script>
import { useSongStore } from "../stores/song";
import { mapState, mapActions, mapWritableState } from "pinia";
export default {
  computed: {
    ...mapWritableState(useSongStore, ["currentAlbumData", "clickedFrom"]),
  },
  methods: {
    handleClickPlaylist() {
      this.currentAlbumData = this.data;
      this.clickedFrom = "album";
      this.$router.push(`/library/album/${this.data.albumId}`);
    },
  },
  props: ["data"],
};
</script>

<style></style>
