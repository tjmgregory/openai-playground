import "./config.ts";
import { Configuration, OpenAIApi } from "openai";
import { createReadStream } from "fs";
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANISATION,
  apiKey: process.env.OPENAI_SECRET,
});
const openai = new OpenAIApi(configuration);

const {
  data: { text: transcriptionResponse },
} = await openai.createTranscription(
  // @ts-expect-error https://github.com/openai/openai-node/issues/77
  createReadStream("assets/questions_for_arnie.m4a"),
  "whisper-1"
);

// const transcriptionResponse = `Hey Arnie, just two very quick questions. Just reading your email about the super deductions ending in the end of March. I recently made a £1400 purchase for my personal account for this laptop that is my work laptop. I was wondering if I need to do anything about that between now and the end of March. Secondly, quick question on being at these co-working, co-living spaces around the world. Is there anything I should be doing to keep track of the expenses I pay towards these co-working spaces? And if they're a co-living space where it's also set up for a work environment, is there anything I should be doing differently there? Thanks. Cheers buddy, I hope you're having a fucking cracking day.`;

console.debug("Transcription:");
console.debug(transcriptionResponse);
console.debug("");

const summaryResponse = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content:
        "You summarise long messages into a numbered list of all the topics found in the message. Each topic can be maximum 5 words in length. Respond with only the list.",
    },
    {
      role: "user",
      content: transcriptionResponse,
    },
  ],
});
console.debug("Summary:");
console.debug(summaryResponse.data.choices[0].message?.content);
