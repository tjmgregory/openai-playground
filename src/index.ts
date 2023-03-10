import "./config.ts";
import { Configuration, OpenAIApi } from "openai";
import { createReadStream } from "fs";
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANISATION,
  apiKey: process.env.OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createTranscription(
  // @ts-expect-error https://github.com/openai/openai-node/issues/77
  createReadStream("assets/test_headphones_1.m4a"),
  "whisper-1"
);
console.log(response.data);
