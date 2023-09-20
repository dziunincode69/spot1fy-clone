const axios = require("axios");
const { spotifyScrapper } = require("../helpers/spotify");
class SpotifyScrapperController {
  static async getPreviewUrl(req, res) {
    try {
      const resp = [];
      const { trackid } = req.query;
      const access_token = await spotifyScrapper();
      const response = await axios.get(
        `https://api.spotify.com/v1/tracks?ids=${trackid}&market=from_token`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15) Gecko/20100101 Firefox/116.0",
            Authorization: "Bearer " + access_token,
          },
        }
      );
      response.data.tracks.forEach((el) => {
        const { preview_url } = el; // preview
        const albumName = el["album"]["name"];
        const albumId = el["album"]["id"];
        const artistName = el["artists"][0]["name"];
        const artistId = el["artists"][0]["id"];
        resp.push({ albumName, albumId, artistName, artistId, preview_url });
      });
      return res.status(200).json({ resp });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = SpotifyScrapperController;
