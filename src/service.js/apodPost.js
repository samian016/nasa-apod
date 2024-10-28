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

module.exports = {
  getAllPost,
  updateToken
}