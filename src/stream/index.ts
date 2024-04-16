import { WebSocketServer } from "ws";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "langchain/schema/output_parser";
import { chatModel } from "../models/index.js";
import { vectorStore } from "../models/loaders/utils.js";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "langchain/prompts";
import http from "http";

export function setupWebSocketServer(server: http.Server) {
  const wss = new WebSocketServer({
    server,
    path: "/ws",
    verifyClient: ({ origin }, callback) => {
      // Allow all origins
      callback(true);
    },
  });

  wss.on("connection", (ws: any) => {
    ws.on("message", async (message: string) => {
      console.log("received: %s", JSON.parse(message));
      try {
        const prompt =
          ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context, respond like Gandalf:

<context>
{context}
</context>

Question: {input}`);

        const combineDocsChain = await createStuffDocumentsChain({
          llm: chatModel,
          prompt,
          outputParser: new StringOutputParser(),
        });

        const retriever = vectorStore.asRetriever();
        const retrievalChain = await createRetrievalChain({
          retriever,
          combineDocsChain,
        });

        const stream = await retrievalChain.stream({
          input: JSON.parse(message).text,
        });

        for await (const chunk of stream) {
          console.log(JSON.stringify(chunk, null, 2));
          console.log("------");
          ws.send(JSON.stringify(chunk));
        }
      } catch (error) {
        console.error("Error:", error);
        ws.send("ERROR");
      }
    });
  });
}
