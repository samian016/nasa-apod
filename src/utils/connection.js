const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/express-app";
const connect = async () => {
  try {
    await mongoose.connect(DB_URL, {});
    return console.log('[+] mongodb connected!');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

module.exports = connect;

/* 

const { connect } = require("mongoose");
const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/express-app";
(async () => {
  try {
    const resp = await
      connect(DB_URL, {
      });
    // .then(() => {
    //   console.log("[+] Database connected successfully");
    // })
    // .catch((err) => {
    //   console.error(" Mongodb connection error", err);
    // });
    console.log('resp')
  } catch (error) {
    console.error("[+] Error ============ ON DB Connection");
    console.error(error);
  }
})()

// module.exports = connect;


*/