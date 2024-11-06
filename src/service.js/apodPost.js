const { ApodPost, Token } = require('../model/index');
const request = require('../utils/req');

const getAllPost = async (req, res) => {
  const paginate = req.query.paginate === 'true' ? true : false;
  delete req.query.paginate;
  const apodPost = await ApodPost.paginate({
    ...req.query,
  }, {
    pagination: paginate,
  });
  res.send(apodPost);
};

const updateToken = async (req, res) => {
  const { token, validator, client_id, client_secret } = req.body;
  if (!validator || !token || !client_id || !client_secret) {
    return res.status(400).send('You are not samian, go away!');
  }
  else if (validator !== '45454') {
    return res.status(400).send('You are not samian, go away!');
  }
  let resp;
  try {
    resp = await request('GET', `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${token}`);
  } catch (err) {
    console.log(err);
  }
  if (!resp) {
    return res.status(400).send('something went wrong');
  }
  const { access_token, expires_in, token_type } = resp;
  const config = await Token.findOne();
  if (!config) {
    resp = await Token.create({ token, access_token, expires_in, token_type });
  } else {
    resp = await Token.findByIdAndUpdate(config._id.toString(), { token, access_token, expires_in, token_type, client_id, client_secret }, { new: true });
  }
  return res.status(200).send(resp);
}


const schedulerUpdateToken = async (req, res) => {
  console.log("[+] Scheduler Update Token");
  if (req.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }
  const config = await Token.findOne();
  const { access_token, client_id, client_secret } = config._doc;
  // console.log("access_token")
  if (!config) {
    return console.log("[-] No token found");
  } else {
    let resp;
    try {
      resp = await request('GET', `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${client_id}&client_secret=${client_secret}&fb_exchange_token=${access_token}`);
    } catch (err) {
      return console.log(err);
    }
    await Token.findByIdAndUpdate(config._id.toString(), { token: resp.token, access_token: resp.access_token, expires_in: resp.expires_in, token_type: resp.token_type }, { new: true });
    console.log('Token updated');
    return res.status(200).send('Token updated');
  }
}

const schedulerPost = async (req, res) => {
  console.log("[+] Scheduler Post");
  if (req.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }
  const config = await Token.findOne();
  if (!config) {
    console.error("[-] No token found for initial post!");
  }
  const { nasaToken, access_token } = config._doc;
  const url = `https://api.nasa.gov/planetary/apod?api_key=${nasaToken}`;
  const dateToday = getUSADate();
  const existInitialApod = await ApodPost.findOne({ date: dateToday });
  if (existInitialApod) {
    console.log("[-] APOD already exist");
    res.status(200).send("[-] APOD already exist");
  } else {
    try {
      const initialResp = await request('GET', url);
      const { hdurl } = initialResp;
      const messageStr = formatPostCaption(initialResp);

      console.log("[+] title created");
      const fbUrl = `https://graph.facebook.com/v21.0/${process.env.PAGE_ID}/photos?access_token=${access_token}`;
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
      return res.status(200).send("[+] Post On Facebook success");
    } catch (er) {
      console.log(er.message);
      return res.status(400).send(er.message);
    }
  }
}

module.exports = {
  getAllPost,
  updateToken,
  schedulerUpdateToken,
  schedulerPost
}