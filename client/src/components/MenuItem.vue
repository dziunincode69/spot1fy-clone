<template>
  <li
    class="flex items-center justify-start pb-4 cursor-pointer"
    @mouseenter="isHover"
    @mouseleave="isHover"
  >
    <img :width="iconSize" :src="`/images/icons/${icon}.png`" />
    <div
      :class="textIsHover ? 'text-white ' : 'text-gray-400'"
      class="font-semibold text-[14px] ml-4 mt-0.5"
    >
      <span :class="route.path == pageUrl ? 'text-white' : ''">{{ name }}</span>
    </div>
  </li>
</template>

<script>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

export default {
  props: {
    iconString: String,
    iconSize: Number,
    pageUrl: String,
    name: String,
  },
  data() {
    return {
      icon: null,
      textIsHover: false,
      route: useRoute(),
    };
  },
  watch: {
    "route.path"() {
      this.checkRoutePath();
    },
  },
  methods: {
    checkRoutePath() {
      if (this.route.path === this.pageUrl) {
        this.icon = this.iconString + "-active";
        this.textIsHover = true;
      } else {
        this.icon = this.iconString + "-inactive";
        this.textIsHover = false;
      }
    },
    isHover() {
      if (this.icon === this.iconString + "-active") return;

      if (this.icon === this.iconString + "-inactive") {
        this.icon = this.iconString + "-inactive-hover";
        this.textIsHover = true;
      } else if (this.icon === this.iconString + "-inactive-hover") {
        this.icon = this.iconString + "-inactive";
        this.textIsHover = false;
      }
    },
  },
  created() {
    this.checkRoutePath();
  },
};
</script>
