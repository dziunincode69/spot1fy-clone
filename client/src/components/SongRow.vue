<script>
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import { useSongStore } from "../stores/song";
import { mapState, mapActions, mapWritableState } from "pinia";
import LoadingComponent from "./LoadingComponent.vue";
export default {
  props: ["song", "index"],
  components: {
    LoadingComponent,
    Play,
    Pause,
  },
  data() {
    return {
      isHover: false,
    };
  },
  computed: {
    ...mapState(useSongStore, [
      "currentTrack",
      "currentArtist",
      "isPlaying",
      "audio",
      "currentMusicYoutubeId",
      "currentDataSong",
      "isSongFetched",
    ]),
    ...mapWritableState(useSongStore, [
      "currentTrack",
      "currentArtist",
      "isPlaying",
      "isSongFetched",
      "audio",
      "currentDataSong",
      "pausedSong",
    ]),
  },
  methods: {
    ...mapActions(useSongStore, [
      "playOrPauseSong",
      "Music",
      "loadSong",
      "pauseClickedSong",
      "playClickedSong",
      "pauseSongAndPlayOtherMusic",
    ]),
    async handlePlaybtn(song) {
      console.log("play clicked");
      this.currentDataSong = song;
      await this.playClickedSong();
    },
    async handleSecondPlaybtn(song) {
      console.log(song);
      this.isPlaying = false;
      console.log("Pause first song and play clicked song");
      this.currentDataSong = song;
      await this.pauseSongAndPlayOtherMusic();
    },
    async handlePausebtn(song) {
      console.log("pause clicked");
      console.log(song);
      this.pauseClickedSong();
      this.pausedSong = song;
    },
  },
};
</script>

<template>
  <li
    class="flex items-center justify-between rounded-md hover:bg-[#2A2929]"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
    v-if="isSongFetched"
  >
    <div class="flex items-center w-full py-1.5">
      <div v-if="isHover" class="w-[40px] ml-[14px] mr-[6px] cursor-pointer">
        <Play
          v-if="!isPlaying"
          fillColor="#FFFFFF"
          :size="25"
          @click="handlePlaybtn(song)"
        />
        <Play
          v-else-if="isPlaying && currentDataSong.songName !== song.songName"
          fillColor="#FFFFFF"
          :size="25"
          @click="handleSecondPlaybtn(song)"
        />

        <Pause
          v-else
          fillColor="#FFFFFF"
          :size="25"
          @click="handlePausebtn(song)"
        />
      </div>
      <div v-else class="text-white font-semibold w-[40px] ml-5">
        <span
          :class="{
            'text-green-500': currentTrack && currentTrack === song.songName,
          }"
        >
          {{ index }}
        </span>
      </div>
      <div>
        <div
          :class="{
            'text-green-500': currentTrack && currentTrack === song.songName,
          }"
          class="text-white fonts"
        >
          {{ song.songName }}
        </div>
        <div class="text-sm font-semibold text-gray-400">
          {{ song.artistName }}
        </div>
      </div>
    </div>
    <div class="flex items-center">
      <button type="button" v-if="isHover"></button>
      <!-- <div v-if="isTrackTime" class="text-xs mx-5 text-gray-400">
        {{ isTrackTime }}
      </div> -->
    </div>
  </li>
  <div v-else-if="!isSongFetched">
    <LoadingComponent />
  </div>
</template>

<style scoped>
.fonts {
  font-family: var(
    --font-family,
    CircularSp,
    CircularSp-Arab,
    CircularSp-Hebr,
    CircularSp-Cyrl,
    CircularSp-Grek,
    CircularSp-Deva,
    var(--fallback-fonts, sans-serif)
  );
}
</style>
