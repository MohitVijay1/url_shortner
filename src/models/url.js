import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
  },
  shortUrl: {
    type: String,
  },
});
const Url = mongoose.model("Url", urlSchema);

export default Url;
