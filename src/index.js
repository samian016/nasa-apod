const dotEnv = require("dotenv");
dotEnv.config({ path: "./.env" });

const express = require("express");
const expressApp = require("./express-app");
const errorHandler = require("./utils/errors");
const cors = require("cors");
const updateToken = require("./continuesJob/updateToken");
const connect = require("./utils/connection");
const getAndPost = require("./continuesJob/getDataAndPost");

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));
expressApp(app);
errorHandler(app);


const main = async () => {
  console.log("[+] Initializing the APOD api service");
  await connect();
  app.listen(PORT, () => {
    console.log(`[+] listening to port ${PORT}`);
  })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    })
    .on("close", () => {
      // channel.close();
    });
  const itv = await updateToken();
  const postItv = await getAndPost();
  // console.log(`[+] Token update interval started with id: ${itv}`);
  const eventsToHandle = ['SIGTERM', 'SIGINT', 'unhandledRejection', 'uncaughtException', 'SIGUSR2'];
  eventsToHandle.forEach(async e => process.on(e, async orgErr => {
    try {
      console.log(orgErr);
      console.log(`[-] Handling update token and post interval. ${itv} and ${postItv}`);
      clearInterval(itv);
      clearInterval(postItv);
      return process.exit();
    }
    catch (e) {
      console.log(e);
      return process.exit();
    }
  }));
};
main();