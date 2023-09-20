<template>
  <VolumeMute v-if="vol == 0" fillColor="#FFFFFF" :size="20" />
  <VolumeHigh v-else fillColor="#FFFFFF" :size="20" />
  <div
    class="flex items-center ml-2 w-[150px] relative mt-2 mb-[23px]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <input
      v-model="vol"
      ref="volume"
      type="range"
      class="mt-[24px] absolute rounded-full my-2 w-full h-0 z-40 appearance-none bg-opacity-100 focus:outline-none accent-white"
      :class="{ rangeDotHidden: !isHover }"
    />
    <div
      class="pointer-events-none mt-[6px] absolute h-[4px] z-10 inset-y-0 left-0 w-0"
      :style="sliderStyle"
      :class="isHover ? 'bg-green-500' : 'bg-white'"
    />
    <div
      class="absolute h-[4px] z-[-0] mt-[6px] inset-y-0 left-0 w-full bg-gray-500 rounded-full"
    />
  </div>
</template>

<script>
import VolumeMute from "vue-material-design-icons/VolumeMute.vue";
import VolumeHigh from "vue-material-design-icons/VolumeHigh.vue";
import { useSongStore } from "../stores/song";
import { mapState } from "pinia";

export default {
  components: {
    VolumeMute,
    VolumeHigh,
  },
  data() {
    return {
      isHover: false,
      vol: 80,
      volume: null,
    };
  },
  computed: {
    ...mapState(useSongStore, ["audio"]),
    sliderStyle() {
      return `width: ${this.vol}%;`;
    },
  },
  methods: {
    onMouseEnter() {
      this.isHover = true;
    },
    onMouseLeave() {
      this.isHover = false;
    },
  },
  mounted() {
    this.$refs.volume.addEventListener("input", (e) => {
      this.audio.volume = e.currentTarget.value / 100;
    });
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
