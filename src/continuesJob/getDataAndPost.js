const { Token, ApodPost } = require("../model");
const formatPostCaption = require("../utils/formatCaption");
const request = require("../utils/req");

const getAndPost = async () => {
  const config = await Token.findOne();
  if (!config) {
    console.error("[-] No token found for initial post!");
  }
  const { nasaToken, access_token } = config._doc;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${nasaToken}`;
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const dateToday = `${year}-${month}-${day}`;
  const existInitialApod = await ApodPost.findOne({ date: dateToday });
  if (existInitialApod) {
    console.log("[-] APOD already exist");
  } else {
    try {
      const initialResp = await request('GET', url);
      const { hdurl } = initialResp;
      const messageStr = formatPostCaption(initialResp);
      console.log("[+] title created");
      const fbUrl = `https://graph.facebook.com/v21.0/482510824938423/photos?access_token=${access_token}`;
      const initialPost = await request('POST', fbUrl, {
        message: messageStr,
        url: hdurl
      });
      if (initialPost.post_id) {
        console.log("[+] Post On Facebook success");
        const schema = ApodPost(initialResp)
        if (!schema) {
          console.log("[-]Post not saved");
        }
        await schema.save()
      }
    } catch (er) {
      console.log(er.message);
    }

  }
  return setInterval(async () => {
    const configInterval = await Token.findOne();
    const { access_token: access_tokenInterval, nasaToken: nasaTokenInterval } = configInterval._doc;
    if (configInterval) {
      return console.log("[-] No token found");
    } else {
      const date = new Date();
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const dateToday = `${year}-${month}-${day}`;
      const existApod = await ApodPost.findOne({ date: dateToday });
      if (!existApod) {
        return console.log("[-] APOD already exist");
      };
      try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${nasaTokenInterval}`;
        const resp = await request('GET', url);
        const { hdurl: intervalUrl } = resp;
        const messageStrInterval = formatPostCaption(resp);
        console.log("[+] title created");
        const fbUrlInterval = `https://graph.facebook.com/v21.0/482510824938423/photos?access_token=${access_tokenInterval}`;
        const post = await request('POST', fbUrlInterval, {
          message: messageStrInterval,
          url: intervalUrl
        });
        if (post.post_id) {
          console.log("[+] Post On Facebook success");
          const postData = ApodPost(resp)
          if (!postData) {
            console.log("[-]Post not saved");
          }
          await postData.save()
        }
      } catch (err) {
        return console.log(err.message);
      }
    }
  }, 43200000);//312 hours in milliseconds
}

module.exports = getAndPost;