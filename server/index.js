import express from "express";
import { generateUploadURL } from "./middleware/S3.js";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/s3url", async (req, res) => {
  console.log("here");
  const url = await generateUploadURL();
  res.send({ url });
});

app.listen(8080, () => console.log("listen on port 8080"));
