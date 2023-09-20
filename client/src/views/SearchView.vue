<template>
  <div>
    <div class="p-8">
      <form @submit.prevent="handleSearch">
        <input
          class="hov flex w-full rounded-md bg-neutral-700 border border-transparent px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-400 disabled:cursor-not-allowed disabled:opacity-30 focus:outline-none"
          placeholder="What do you want to listen to?"
          type="text"
          v-model="search"
        />
        <button
          type="button"
          class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
          Browse all
        </button>
      </form>
    </div>
    <SongRow
      v-for="(song, index) in searchResult"
      :key="song.id"
      :song="song"
      :index="++index"
    />
  </div>
</template>

<script>
import { useSongStore } from "../stores/song";
import { mapState, mapActions } from "pinia";
import SongRow from "../components/SongRow.vue";

export default {
  data() {
    return {
      search: "",
    };
  },
  components: {
    SongRow,
  },
  computed: {
    ...mapState(useSongStore, ["searchResult"]),
  },
  methods: {
    ...mapActions(useSongStore, ["searchSong"]),
    handleSearch() {
      console.log(this.search);
      this.searchSong(this.search);
    },
  },
};
</script>

<style scoped>
.hov {
  border: 2px;
  color: whitesmoke;
}
input:hover {
  border-style: solid;
  border-color: whitesmoke;
}
.hov:hover {
  border-style: solid;
  border-color: whitesmoke;
}
</style>
