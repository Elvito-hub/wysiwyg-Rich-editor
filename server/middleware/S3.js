import aws from "aws-sdk";

import crypto from "crypto";
const randomBytes = promisify(crypto.randomBytes);

import dotenv from "dotenv";
import { promisify } from "util";
dotenv.config({ path: "./config.env" });

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const S3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export async function generateUploadURL() {
  console.log(S3);
  const rawBytes = await randomBytes(16);
  const imageName = rawBytes.toString("hex");
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };
  const uploadURL = await S3.getSignedUrlPromise("putObject", params);
  return uploadURL;
}
