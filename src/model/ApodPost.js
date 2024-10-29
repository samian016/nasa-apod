const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const ApodPostSchema = new Schema(
  {
    copyright: {
      type: String,
      required: false,
    },
    date: {
      type: String,
      required: false,
    },
    explanation: {
      type: String,
      required: false,
    },
    hdurl: {
      type: String,
      required: false,
    },
    media_type: {
      type: String,
      required: false,
    },
    service_version: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: false,
  }
);
ApodPostSchema.plugin(paginate);
module.exports = mongoose.model("ApodPost", ApodPostSchema);