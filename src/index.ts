import "./config.ts";
import { Configuration, OpenAIApi } from "openai";
import { createReadStream } from "fs";
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANISATION,
  apiKey: process.env.OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createTranscription(
  createReadStream("assets/test_headphones_1.m4a") as any,
  "whisper-1"
);
console.log(response.data);
