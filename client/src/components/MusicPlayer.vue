<script>
import MusicPlayerVolume from "../components/MusicPlayerVolume.vue";
import Heart from "vue-material-design-icons/Heart.vue";
import PictureInPictureBottomRight from "vue-material-design-icons/PictureInPictureBottomRight.vue";
import Play from "vue-material-design-icons/Play.vue";
import Pause from "vue-material-design-icons/Pause.vue";
import SkipBackward from "vue-material-design-icons/SkipBackward.vue";
import SkipForward from "vue-material-design-icons/SkipForward.vue";
import { useSongStore } from "../stores/song";
import { mapActions, mapState } from "pinia";
export default {
  computed: {
    ...mapState(useSongStore, [
      "isPlaying",
      "audio",
      "currentDataSong",
      "songList",
      "songListAlbum",
      "searchResult",
    ]),
  },

  components: {
    MusicPlayerVolume,
    Heart,
    PictureInPictureBottomRight,
    Play,
    Pause,
    SkipBackward,
    SkipForward,
  },
  data() {
    return {
      isHover: false,
      isTrackTimeCurrent: null,
      isTrackTimeTotal: null,
      range: 0,
      seeker: null,
      seekerContainer: {},
    };
  },
  watch: {
    audio: "handleAudioUpdate",
    //   isTrackTimeCurrent: "checkSongEnd",
    range(newval, oldval) {
      // console.log(this.audio.currentTime, this.audio.duration);
      if (this.audio.currentTime === this.audio.duration) {
        this.nextSong();
      }
    },
  },
  methods: {
    nextSong() {
      const indexnewsong = this.searchResult.findIndex(
        (item) => item.songName === this.currentDataSong.songName
      );
      console.log(this.songList);
      console.log(this.currentDataSong.songName);
      console.log(
        this.searchResult[indexnewsong],
        this.searchResult[indexnewsong + 1]
      );
      this.pauseSongAndPlayOtherMusic(this.searchResult[indexnewsong + 1]);
    },
    updateAudioDuration() {
      this.audio.currentTime = (this.range / 100) * this.audio.duration;
    },
    ...mapActions(useSongStore, [
      "pauseClickedSong",
      "playClickedSong",
      "pauseSongAndPlayOtherMusic",
    ]),
    updateSongCurrentTime() {
      this.audio.currentTime = this.audio.duration / 2;
    },
    handleAudioUpdate() {
      this.timeupdate();
      this.loadmetadata();
    },
    //   checkSongEnd(time) {
    //     if (time && time == this.isTrackTimeTotal) {
    //       this.useSong.nextSong(this.currentTrack);
    //     }
    //   },
    resetMusic() {
      this.audio.currentTime = 0;
      this.audio.play();
    },
    timeupdate() {
      this.audio.addEventListener("timeupdate", () => {
        var minutes = Math.floor(this.audio.currentTime / 60);
        var seconds = Math.floor(this.audio.currentTime - minutes * 60);
        this.isTrackTimeCurrent =
          minutes + ":" + seconds.toString().padStart(2, "0");
        const value = (100 / this.audio.duration) * this.audio.currentTime;
        this.range = value;
      });
    },
    loadmetadata() {
      this.audio.addEventListener("loadedmetadata", () => {
        const duration = this.audio.duration;
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);
        this.isTrackTimeTotal =
          minutes + ":" + seconds.toString().padStart(2, "0");
      });
    },
  },
};
</script>

<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>

<template>
  <div
    id="MusicPlayer"
    v-if="audio"
    class="fixed flex items-center justify-between bottom-0 w-full z-50 h-[90px] bg-[#181818] border-t border-t-[#272727]"
  >
    <div class="flex items-center w-1/4">
      <div class="flex items-center ml-4">
        <img
          class="rounded-sm shadow-2xl"
          width="55"
          :src="currentDataSong.albumImage"
        />
        <div class="ml-4">
          <div class="text-[14px] text-white">
            {{ currentDataSong.songName }}
          </div>
          <div
            class="text-[11px] text-gray-500 hover:underline hover:text-white"
          >
            {{ currentDataSong.artistName }}
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[35%] mx-auto w-2/4 mb-3">
      <div class="flex-col items-center justify-center">
        <div class="buttons flex items-center justify-center h-[30px]">
          <button class="mx-2">
            <SkipBackward
              fillColor="#FFFFFF"
              :size="25"
              @click="resetMusic()"
            />
          </button>
          <button
            class="p-1 rounded-full mx-3 bg-white"
            @click="pauseClickedSong(currentDataSong)"
          >
            <Play v-if="!isPlaying" fillColor="#181818" :size="25" />
            <Pause v-else fillColor="#181818" :size="25" />
          </button>
          <button class="mx-2">
            <SkipForward fillColor="#FFFFFF" :size="25" @click="nextSong()" />
          </button>
        </div>

        <div class="flex items-center h-[25px]">
          <div
            v-if="isTrackTimeCurrent"
            class="text-white text-[12px] pr-2 pt-[11px]"
          >
            {{ isTrackTimeCurrent }}
          </div>
          <div
            ref="seekerContainer"
            class="w-full relative mt-2 mb-3"
            @mouseenter="isHover = true"
            @mouseleave="isHover = false"
          >
            <input
              v-model="range"
              ref="seeker"
              type="range"
              class="absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
              :class="{ rangeDotHidden: !isHover }"
              @input="updateAudioDuration"
            />
            <div
              class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
              :style="`width: ${range}%;`"
              :class="isHover ? 'bg-green-500' : 'bg-white'"
            />
            <div
              class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
            />
          </div>
          <div
            v-if="isTrackTimeTotal"
            class="text-white text-[12px] pl-2 pt-[11px]"
          >
            {{ isTrackTimeTotal }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center w-1/4 justify-end pr-10">
      <MusicPlayerVolume />
    </div>
  </div>
</template>

<style>
.rangeDotHidden[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0;
  height: 0;
}
</style>
