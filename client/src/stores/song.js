import { defineStore } from "pinia";
import axios from "axios";

export const useSongStore = defineStore("counter", {
  state: () => {
    return {
      clickedFrom: "",

      username: "",
      page: "auth",
      isPlaying: false,
      audio: null,
      isPremium: false,

      isAlbumfetched: false,
      isSongFetched: false,
      isFetched: false,

      pausedSong: {},
      audioSrc: "",
      alreadyPlaying: false,
      currentMusicYoutubeId: "",
      currentPlaylist: "",
      currentMetadataSong: "",
      currentPlaylistData: {},
      currentDataSong: {},
      currentAlbumData: {},

      searchResult: [],
      newRelease: [],
      songListAlbum: [],
      songList: [],
      dataGenre: [],
      BASE_URL: "http://localhost:3000",
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    toast(message, color) {
      Toastify({
        text: message,
        duration: 4000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: color,
        },
        onClick: function () {}, // Callback after click
      }).showToast();
    },
    async checkStatus() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/ispremium",
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.isPremium = response.data.isPremium;
        localStorage.setItem("isPremium", response.data.isPremium);
      } catch (error) {
        console.log(error);
      }
    },
    async updateStatus(orderid) {
      try {
        const response = await axios.get(
          "http://localhost:3000/pay/update-status?orderid=" + orderid,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        localStorage.setItem("isPremium", "true");
        this.isPremium = true;
      } catch (error) {
        console.log(error);
      }
    },
    async loginAccount(form) {
      try {
        const response = await axios.post(
          "http://localhost:3000/login",
          "email=" + form.email + "&password=" + form.password,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log(response.data);
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("isPremium", response.data.isPremium);
        this.toast("Login Success", "#00b894");
        this.router.push("/");
        this.page = "home";
        this.username = form.email.split("@")[0];
      } catch (error) {
        this.toast(error.response.data.message, "#d63031");
      }
    },
    async registerAccount(form) {
      try {
        const response = await axios.post(
          "http://localhost:3000/register",
          "email=" + form.email + "&password=" + form.password,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        localStorage.setItem("email", form.email);
        localStorage.setItem("access_token", response.data.access_token);
        this.toast("Please Check your email for verification", "#00b894");
        this.toast("Register Success", "#00b894");
      } catch (error) {
        this.toast(error.response.data.message, "#d63031");
      }
    },
    play() {
      this.audio.play();
    },
    resetState() {
      this.currentMusicYoutubeId = "";
      this.currentMetadataSong = "";
      this.currentPlaylistData = {};
      this.currentDataSong = {};
      this.currentAlbumData = {};
      this.searchResult = [];
      this.newRelease = [];
      this.isPlaying = false;
      this.alreadyPlaying = true;
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
    },
    async playClickedSong() {
      this.isPlaying = true;
      if (!this.alreadyPlaying) {
        await this.Music(this.currentDataSong);
      }
      this.play();
    },
    async pauseSongAndPlayOtherMusic() {
      this.audio.pause();
      this.isPlaying = true;
      await this.Music(this.currentDataSong);
      this.play();
    },
    async pauseClickedSong() {
      if (this.audio.paused) {
        this.isPlaying = true;
        this.alreadyPlaying = true;
        this.audio.play();
      } else {
        this.isPlaying = false;
        this.alreadyPlaying = true;
        this.audio.pause();
      }
    },

    async getPaymentUri() {
      try {
        const response = await axios.get(
          "http://localhost:3000/pay/get-payment",
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async Music(song) {
      if (
        localStorage.getItem("isPremium") === "true" ||
        localStorage.getItem("isPremium") === true
      ) {
        await this.youtubeSearch(`${song.songName} - ${song.artistName}`);
        await this.youtubeGetAudio(this.currentMusicYoutubeId);
        this.convertToAudio();
      } else {
        await this.getPreviewUrl(song.songId);
        await this.audioPreview();
      }
    },
    async getPreviewUrl(id) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-song?trackid=" + id,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.audioSrc = response.data.resp[0].preview_url;
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async youtubeGetAudio(id) {
      try {
        const response = await axios.get(
          "http://localhost:3000/youtube/getAudio?id=" + id,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.currentMetadataSong = response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    async youtubeSearch(keyword) {
      try {
        const response = await axios.get(
          "http://localhost:3000/youtube/search?query=" + keyword,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.currentMusicYoutubeId = response.data[0].id;
        await this.youtubeGetAudio(this.currentMusicYoutubeId);
      } catch (error) {
        console.log(error);
      }
    },
    async searchSong(keyword) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/search?search=" + keyword,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.searchResult = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSongFetched = true;
      }
    },
    async getAlbumDetail(id) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-album?albumId=" + id,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.currentAlbumData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getSongFromAlbum(id) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-song-from-album?albumId=" + id,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.songListAlbum = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSongFetched = true;
      }
    },
    async getDetailPlaylist(id) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-playlist?playlistId=" + id,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.currentPlaylistData = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getNewRelease() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-new-release",
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.newRelease = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isAlbumfetched = true;
      }
    },
    async getSongFromPlaylists(id) {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-song-from-playlist?playlistId=" + id,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.songList = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isSongFetched = true;
      }
    },

    async getDataGenre() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/get-genre",
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );
        this.dataGenre = response.data;
      } catch (error) {
        console.log(error);
      } finally {
        this.isFetched = true;
      }
    },
    async convertToAudio() {
      const snd = new Audio(
        "data:audio/wav;base64," + this.currentMetadataSong
      );
      this.audio = snd;
    },
    async audioPreview() {
      const snd = new Audio(this.audioSrc);
      this.audio = snd;
    },
  },
});
