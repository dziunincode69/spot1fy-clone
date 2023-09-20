<template>
  <div id="SideNav" class="h-[100%] p-6 w-[240px] fixed z-50 bg-black">
    <RouterLink to="/">
      <img width="125" src="/images/icons/spotify-logo.png" />
    </RouterLink>
    <div class="my-8"></div>
    <ul>
      <RouterLink to="/">
        <MenuItem
          class="ml-[1px]"
          :iconSize="23"
          name="Home"
          iconString="home"
          pageUrl="/"
        />
      </RouterLink>
      <RouterLink to="/search">
        <MenuItem
          class="ml-[1px]"
          :iconSize="24"
          name="Search"
          iconString="search"
          pageUrl="/search"
        />
      </RouterLink>
      <RouterLink to="/library">
        <MenuItem
          class="ml-[2px]"
          :iconSize="23"
          name="New Release"
          iconString="library"
          pageUrl="/library"
        />
      </RouterLink>
      <div class="py-3.5"></div>
    </ul>
    <div class="border-b border-b-gray-700"></div>
  </div>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import MenuItem from "./MenuItem.vue";
// music_note
import Music from "vue-material-design-icons/Music.vue";

import MusicPlayer from "./MusicPlayer.vue";
export default {
  components: {
    Music,
    MenuItem,
    MusicPlayer,
  },
};
</script>

<style scoped></style>
