const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const TokenSchema = new Schema(
  {
    nasaToken: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    expires_in: {
      type: Number,
      required: true,
    },
    token_type: {
      type: String,
      required: true,
    },
    client_id: {
      type: String,
      required: true,
    },
    client_secret: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = mongoose.model("Token", TokenSchema);