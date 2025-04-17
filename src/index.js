import experss from "express";
import client from "./db/redisDb.js";
import md5 from "md5";
import connectDB from "./db/mongoDb.js";
import Url from "./models/url.js";

const app = experss();

app.use(experss.json());

app.get("/shrturl/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  console.log(shortUrl);
  try {
    const value = await client.get(shortUrl);
    if (value) {
      return res.redirect(301, value);
    } else {
      const { url } = await Url.findOne({ shortUrl });

      await client.set(shortUrl, url);
      return res.redirect(301, url);
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      err: err.message,
    });
  }
});

app.post("/short-url", async (req, res) => {
  const { url } = req.body;
  console.log("url", url);
  try {
    const value = await client.get(url);
    if (value) {
      res.status(201).json({
        status: "success",
        message: "Url generated successfully",
        shortUrl: value,
        url: url,
      });
    } else {
      const shortUrl = md5(url);
      const data = new Url({
        url: url,
        shortUrl: shortUrl.slice(0, 6),
      });
      const response = await data.save();
      res.status(201).json({
        status: "success",
        message: "Url generated successfully",
        shortUrl: shortUrl.slice(0, 6),
        url: url,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failure",
      err: err.message,
    });
  }
});

app.listen(4000, () => {
  console.log(`Server started at port 4000`);
  connectDB();
});
