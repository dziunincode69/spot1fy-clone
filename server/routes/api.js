const express = require("express");
const router = express.Router();
const SpotifyController = require("../controllers/spotifyController");
const SpotifyScrapperController = require("../controllers/spotifyScrapperController");

router.get("/ispremium", SpotifyController.isPremium);
router.get("/get-playlist", SpotifyController.getPlaylistDetail);
router.get("/get-album", SpotifyController.getAlbum);
router.get("/search", SpotifyController.searchTracks);
router.get("/get-genre", SpotifyController.getGenreList);
router.get("/get-song", SpotifyScrapperController.getPreviewUrl);
router.get("/get-new-release", SpotifyController.getNewReleases);
router.get("/get-song-from-playlist", SpotifyController.getSongFromPlaylist);
router.get("/get-song-from-album", SpotifyController.getSongFromAlbum);

module.exports = router;
