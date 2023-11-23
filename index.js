import { z } from "zod";
import { ChatOpenAI } from "langchain/chat_models/openai";
import dotenv from "dotenv";
dotenv.config();
import { PDFLoader } from "langchain/document_loaders/fs/pdf";

import { createExtractionChainFromZod } from "langchain/chains";

// Schema for W2 document
const zodSchema = z.object({
  name: z.string(),
  address: z.string(),
  ssn: z.string(),
  employer: z.string(),
  wages: z.number(),
});
const chatModel = new ChatOpenAI({
  modelName: "gpt-3.5-turbo-0613",
  temperature: 0,
});

const loader = new PDFLoader("W2.pdf");

const docs = await loader.load();
const chain = createExtractionChainFromZod(zodSchema, chatModel);

const data = await chain.run(docs);
