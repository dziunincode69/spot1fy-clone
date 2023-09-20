const { spotify } = require("../helpers/spotify");
const { User } = require("../models");
class SpotifyController {
  static async isPremium(req, res) {
    try {
      const { email } = req.user;
      const data = await User.findOne({ where: { email } });
      res.status(200).json({ isPremium: data.ispremium });
    } catch (error) {
      console.log(error);
    }
  }
  static async searchTracks(req, res) {
    try {
      const response = [];
      const { search } = req.query;
      const spotifyApi = await spotify();
      const songs = await spotifyApi.searchTracks(`${search}`);
      console.log(songs.body.tracks);
      songs.body.tracks.items.forEach((el) => {
        const dataSong = {
          artistId: el.artists[0].id,
          artistName: el.artists[0].name,
          artistUrl: "https://open.spotify.com/artist/" + el.artists[0].id,
          albumId: el.album.id,
          albumName: el.album.name,
          popularity: el.popularity,
          albumImage: el.album.images[0].url,
          songId: el.id,
          songName: el.name,
          songDuration: el.duration_ms,
        };
        response.push(dataSong);
      });

      res
        .status(200)
        .json(response.sort((a, b) => b.popularity - a.popularity));
    } catch (err) {
      next(err);
    }
  }
  static async getAlbum(req, res, next) {
    try {
      const resp = {};
      const spotifyApi = await spotify();
      const { albumId } = req.query;
      const data = await spotifyApi.getAlbum(albumId);

      resp.id = data.body.id;
      resp.name = data.body.name;
      resp.imageUrl = data.body.images[0].url;
      resp.artist = data.body.artists[0].name;
      resp.artistId = data.body.artists[0].id;
      res.status(200).json(resp);
    } catch (error) {
      next(error);
    }
  }

  static async getNewReleases(req, res, next) {
    try {
      const responseResult = [];
      const spotifyApi = await spotify();
      const newRelease = await spotifyApi.getNewReleases();
      newRelease.body.albums.items.forEach((item) => {
        const obj = {
          artistId: item.artists[0].id, // Only getting the first artist as mentioned
          artist: item.artists[0].name, // Only getting the first artist as mentioned
          albumId: item.id, // Assuming you want the first image (largest resolution)
          albumImage: item.images[0].url, // Assuming you want the first image (largest resolution)
          albumName: item.name,
          total_track: item.total_tracks,
        };
        responseResult.push(obj);
      });
      res.status(200).json(responseResult);
    } catch (err) {
      next(err);
    }
  }
  static async getSongFromAlbum(req, res, next) {
    try {
      const responseResult = [];
      const { albumId } = req.query;
      const spotifyApi = await spotify();
      const songs = await spotifyApi.getAlbumTracks(albumId);
      songs.body.items.forEach((el) => {
        const songData = {
          artistId: el.artists[0].id,
          artistName: el.artists[0].name,
          artistUrl: el.artists[0].external_urls.spotify,
          songName: el.name,
          songId: el.id,
          songDuration: el.duration_ms,
        };
        responseResult.push(songData);
      });
      res.status(200).json(responseResult);
    } catch (err) {
      next(err);
    }
  }
  static async getSongFromPlaylist(req, res, next) {
    try {
      const responseResult = [];
      const { playlistId } = req.query;
      const spotifyApi = await spotify();
      const songs = await spotifyApi.getPlaylistTracks(playlistId);
      songs.body.items.forEach((el) => {
        const songData = {
          albumName: el.track.album.name,
          albumId: el.track.album.id,
          albumImage:
            el.track.album.images.length > 0
              ? el.track.album.images[0].url
              : "",
          albumUrl: "https://api.spotify.com/v1/albums/" + el.track.album.id,
          artistId: el.track.artists[0].id,
          artistName: el.track.artists[0].name,
          artistUrl: el.track.artists[0].external_urls.spotify,
          songName: el.track.name,
          songId: el.track.id,
          duration: el.duration_ms,
        };
        responseResult.push(songData); // Push the collected song data into the array
      });
      res.status(200).json(responseResult);
    } catch (err) {
      next(err);
    }
  }
  static async getPlaylistDetail(req, res, next) {
    try {
      const resp = {};
      const { playlistId } = req.query;
      const spotifyApi = await spotify();
      const data = await spotifyApi.getPlaylist(playlistId);
      resp.id = data.body.id;
      resp.owner = data.body.owner.display_name;
      resp.name = data.body.name;
      resp.imageUrl = data.body.images[0].url;
      res.status(200).json(resp);
    } catch (err) {
      next(err);
    }
  }

  static async getGenreList(req, res, next) {
    try {
      const responseResult = [];
      const spotifyApi = await spotify();
      const pop = await spotifyApi.searchPlaylists("pop", {
        country: "ID",
        limit: 5,
        offset: 0,
      });
      const rock = await spotifyApi.searchPlaylists("rock", {
        country: "ID",
        limit: 5,
        offset: 0,
      });
      const jazz = await spotifyApi.searchPlaylists("jazz", {
        country: "ID",
        limit: 5,
        offset: 0,
      });
      const hiphop = await spotifyApi.searchPlaylists("hip-hop", {
        country: "ID",
        limit: 5,
        offset: 0,
      });
      const allPlaylist = [pop, rock, hiphop, jazz];
      allPlaylist.forEach((category) => {
        category.body.playlists.items.forEach((playlist) => {
          const data = {
            id: playlist.id,
            name: playlist.name,
            imageUrl: playlist.images[0].url,
            owner: playlist.owner.display_name,
          };
          responseResult.push(data);
        });
      });
      res.status(200).json(responseResult);
    } catch (err) {
      next(err);
    }
  }
  static async getTracks(req, res, next) {
    try {
      const { trackid } = req.body;
      const spotifyApi = await spotify();
      const data = await spotifyApi.getTracks([trackid], {
        market: "US",
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}
module.exports = SpotifyController;
