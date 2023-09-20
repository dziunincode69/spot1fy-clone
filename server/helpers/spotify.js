const axios = require("axios");
const SpotifyWebApi = require("spotify-web-api-node");

const spotify = async () => {
  const spotifyApi = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  });
  const data = await spotifyApi.clientCredentialsGrant();
  spotifyApi.setAccessToken(data.body["access_token"]);
  return spotifyApi;
};

const spotifyScrapper = async () => {
  try {
    const response = await axios.get("https://open.spotify.com/", {
      params: {
        flow_ctx: "d8a4d92b-3905-4c47-8172-0c1d0fb0e61b:1693105589",
      },
      headers: {
        Host: "open.spotify.com",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/116.0",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
        "Accept-Encoding": "gzip, deflate",
        Referer: "https://accounts.spotify.com/",
        "Upgrade-Insecure-Requests": "1",
        "Sec-Fetch-Dest": "document",
        "Sec-Fetch-Mode": "navigate",
        "Sec-Fetch-Site": "same-site",
        "Sec-Fetch-User": "?1",
        Te: "trailers",
        Cookie:
          "OptanonConsent=isIABGlobal=false&datestamp=" +
          new Date() +
          "&version=6.26.0&hosts=&landingPath=NotLandingPage&groups=s00%3A1%2Cf00%3A1%2Cm00%3A1%2Ct00%3A1%2Ci00%3A1%2Cf11%3A1&AwaitingReconsent=false&geolocation=ID%3BJK; _ga_ZWRF3NLZJZ=GS1.1.1693023276.1.0.1693023277.0.0.0; _ga=GA1.2.432225100.1693023277; sp_t=a37fbd0c8d0e56da2cd712c421516b7d; sp_landing=https%3A%2F%2Fopen.spotify.com%2Fplaylist%2F37i9dQZF1DXcBWIGoYBM5M%3Fsp_cid%3Da37fbd0c8d0e56da2cd712c421516b7d%26device%3Ddesktop; _gcl_au=1.1.228824976.1693083583; _ga_ZWG1NSHWD8=GS1.1.1693083583.1.1.1693083989.0.0.0; sp_adid=47898755-65f2-4b9e-9acc-5e44148eced6; _gid=GA1.2.1846775619.1693083584; OptanonAlertBoxClosed=2023-08-26T21:01:20.937Z; sss=1; _gat_UA-5784146-31=1; _gat=1; sp_dc=AQC0pFgtzGdIf1YvBb-gB2aJgJhs1mpB3b0H1I1B52AbwLPkQ6h8J6-MBl4bDU68zo9Wa2yNSFyO3sSvSbA2tXHtke-VGNmdoTMmZFbdWZJs6cnN8JeQPyJldcbJfv1s_SEQvp8XqVW0Slyxudm8x82k_pfZMjvp; sp_key=d767b2c5-1417-4f53-adf9-5c9515ef760d",
      },
    });
    const access_token = response.data.match(/"accessToken":"(.*?)"/);
    return access_token[1];
  } catch (error) {}
};

module.exports = { spotify, spotifyScrapper };
