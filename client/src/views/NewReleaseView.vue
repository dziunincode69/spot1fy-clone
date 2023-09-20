<script>
import AlbumCard from "../components/AlbumCard.vue";
import { useSongStore } from "../stores/song";
import { mapState, mapActions } from "pinia";
export default {
  data() {
    return {
      albumData: {},
    };
  },
  components: {
    AlbumCard,
  },
  computed: {
    ...mapState(useSongStore, ["newRelease"]),
  },
  methods: {
    ...mapActions(useSongStore, ["getNewRelease"]),
  },
  created() {
    this.getNewRelease();
  },
};
</script>

<style></style>

<template>
  <div>
    <div class="p-8">
      <a
        class="text-white text-2xl font-semibold hover:underline cursor-pointer"
      >
        New Release
      </a>
      <div class="py-1.5"></div>
      <div class="flex items-center">
        <AlbumCard
          v-for="item in this.newRelease.splice(0, 5)"
          :key="item.id"
          :data="item"
        />
      </div>

      <div class="py-1.5"></div>
      <div class="flex items-center">
        <AlbumCard
          v-for="item in this.newRelease.slice(5, 10)"
          :key="item.id"
          :data="item"
        />
      </div>

      <div class="py-1.5"></div>

      <div class="flex items-center">
        <AlbumCard
          v-for="item in this.newRelease.slice(10, 15)"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>
