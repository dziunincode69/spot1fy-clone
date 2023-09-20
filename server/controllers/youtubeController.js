const ytdl = require("ytdl-core");
const yt = require("@citoyasha/yt-search");

class youtubeController {
  static async getAudio(req, res, next) {
    try {
      const audioId = req.query.id;
      const audioStream = ytdl(`https://www.youtube.com/watch?v=${audioId}`, {
        filter: "audioonly",
      });
      let audioData = [];
      audioStream.on("data", (chunk) => {
        audioData.push(chunk);
      });

      audioStream.on("end", () => {
        const base64Audio = Buffer.concat(audioData).toString("base64");
        res.status(200).json({ data: base64Audio });
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async searchVideo(req, res, next) {
    try {
      const { query } = req.query;
      const r = await yt.search(query, 2);
      res.status(200).json(r);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = youtubeController;
