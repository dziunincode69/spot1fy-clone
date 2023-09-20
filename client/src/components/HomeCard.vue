<template>
  <button @click.prevent="handleClickPlaylist">
    <div
      class="bg-[#111111] p-4 rounded-md m-2 hover:bg-[#252525] cursor-pointer"
    >
      <img class="rounded-md" :src="data.imageUrl" alt="" />
      <div class="text-white pt-4 font-semibold text-[17px]">
        {{ data.name }}
      </div>
    </div>
  </button>
</template>
<script>
import { useSongStore } from "../stores/song";
import { mapState, mapActions, mapWritableState } from "pinia";
export default {
  computed: {
    ...mapWritableState(useSongStore, ["currentPlaylistData", "clickedFrom"]),
  },
  methods: {
    handleClickPlaylist() {
      this.currentPlaylistData = this.data;
      this.clickedFrom = "playlist";
      this.$router.push(`/library/playlist/${this.data.id}`);
    },
  },
  props: ["data"],
};
</script>

<style></style>
