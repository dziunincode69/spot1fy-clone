<script>
import HomeCard from "../components/HomeCard.vue";
import HomeCardLoading from "../components/HomeCardLoading.vue";
import { useSongStore } from "../stores/song";
import { mapState, mapActions, mapWritableState } from "pinia";
export default {
  components: {
    HomeCard,
    HomeCardLoading,
  },
  computed: {
    ...mapState(useSongStore, ["dataGenre", "isFetched"]),
    ...mapWritableState(useSongStore, ["isFetched"]),
  },
  methods: {
    ...mapActions(useSongStore, ["getDataGenre", "toast"]),
  },
  created() {
    const verified = this.$route.query.verified;
    if (verified) {
      this.toast("Email Verified", "#00b894");
    }
    this.isFetched = false;
    this.getDataGenre();
  },
};
</script>

<style></style>

<template>
  <div>
    <div class="p-8">
      <a class="text-white text-2xl font-semibold"> Pop Album </a>

      <div class="py-1.5"></div>
      <div class="flex items-center">
        <HomeCardLoading v-if="!isFetched" v-for="index in 5" :key="index" />
        <HomeCard
          v-else
          v-for="item in dataGenre.splice(0, 5)"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
    <div class="p-8">
      <a class="text-white text-2xl font-semibold"> Rock Album </a>

      <div class="py-1.5"></div>

      <div class="flex items-center">
        <HomeCardLoading v-if="!isFetched" v-for="index in 5" :key="index" />
        <HomeCard
          v-else
          v-for="item in dataGenre.splice(0, 5)"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
    <div class="p-8">
      <a class="text-white text-2xl font-semibold"> Hip-Hop </a>

      <div class="py-1.5"></div>

      <div class="flex items-center">
        <HomeCardLoading v-if="!isFetched" v-for="index in 5" :key="index" />
        <HomeCard
          v-else
          v-for="item in dataGenre.splice(0, 5)"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
    <div class="p-8">
      <a class="text-white text-2xl font-semibold"> Jazz </a>

      <div class="py-1.5"></div>

      <div class="flex items-center">
        <HomeCardLoading v-if="!isFetched" v-for="index in 5" :key="index" />
        <HomeCard
          v-else
          v-for="item in dataGenre.splice(0, 5)"
          :key="item.id"
          :data="item"
        />
      </div>
    </div>
  </div>
</template>
