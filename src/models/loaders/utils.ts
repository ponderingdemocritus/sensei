import { Pinecone } from "@pinecone-database/pinecone";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import {
  JSONLinesLoader,
  JSONLoader,
} from "langchain/document_loaders/fs/json";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { VectorDBQAChain } from "langchain/chains";
import { llm, chatModel } from "../index.js";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "langchain/schema/output_parser";
import { pull } from "langchain/hub";

export const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || "",
});

const PINECONE_INDEX = process.env.PINECONE_INDEX!;
const OPEN_AI_API_KEY = process.env.OPEN_AI_API_KEY!;
const PINECONE_NAMESPACE = process.env.PINECONE_NAMESPACE!;

const pineconeIndex = pinecone.Index(PINECONE_INDEX) as any;

export const embed = async (docs: any) => {
  try {
    console.log("creating vector store...", docs);

    await PineconeStore.fromDocuments(
      docs,
      new OpenAIEmbeddings({
        openAIApiKey: OPEN_AI_API_KEY,
        modelName: "text-embedding-3-large",
      }),
      {
        pineconeIndex,
        namespace: PINECONE_NAMESPACE,
      }
    );
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
};

export const processDocuments = async (dirPath: string) => {
  try {
    const loader = new DirectoryLoader(dirPath, {
      ".json": (path) => new JSONLoader(path, "/texts"),
      ".jsonl": (path) => new JSONLinesLoader(path, "/html"),
      ".txt": (path) => new TextLoader(path),
      ".csv": (path) => new CSVLoader(path, "text"),
      ".pdf": (path) => new PDFLoader(path),
      ".md": (path) => new TextLoader(path),
      ".adoc": (path) => new TextLoader(path),
    });

    const rawDocs = await loader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 600,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);

    await embed(docs);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to ingest your data");
  }
};

export const vectorStore = await PineconeStore.fromExistingIndex(
  new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_API_KEY,
    modelName: "text-embedding-3-large",
  }),
  { pineconeIndex, namespace: PINECONE_NAMESPACE }
);

export const questionChain = VectorDBQAChain.fromLLM(llm, vectorStore, {
  k: 1,
  returnSourceDocuments: true,
});

const retriever = vectorStore.asRetriever();

// const prompt =
//   PromptTemplate.fromTemplate(`Answer the question based only on the following context and keep the response under 2000 characters:
// {context}

// Question: {question}`);

// export const ragChain = RunnableSequence.from([
//   {
//     context: retriever.pipe(formatDocumentsAsString),
//     question: new RunnablePassthrough(),
//   },
//   prompt,
//   llm,
//   new StringOutputParser(),
// ]);

export const ragChain = async (question: string) => {
  const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");

  const ragChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt,
    outputParser: new StringOutputParser(),
  });

  const retrievedDocs = await retriever.getRelevantDocuments(question);

  return await ragChain.invoke({
    question: question,
    context: retrievedDocs,
  });
};
