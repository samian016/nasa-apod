const { Token } = require("../model");
const request = require("../utils/req");

const updateToken = async () => {
  return setInterval(async () => {
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
      return console.log('Token updated');
    }
  }, 2147483647);//24.8 days in milliseconds
}

module.exports = updateToken;