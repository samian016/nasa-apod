const mongoose = require("mongoose");
const paginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
const ApodPostSchema = new Schema(
  {
    copyright: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    explanation: {
      type: String,
      required: true,
    },
    hdurl: {
      type: String,
      required: true,
    },
    media_type: {
      type: String,
      required: true,
    },
    service_version: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: false,
  }
);
ApodPostSchema.plugin(paginate);
module.exports = mongoose.model("ApodPost", ApodPostSchema);