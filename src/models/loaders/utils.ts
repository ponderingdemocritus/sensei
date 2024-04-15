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
import { PineconeStore } from "@langchain/pinecone";
import { chatModel } from "../index.js";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { StringOutputParser } from "langchain/schema/output_parser";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { ChatPromptTemplate } from "langchain/prompts";
import { Document } from "langchain/document";
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

const prompt =
  ChatPromptTemplate.fromTemplate(`Answer the following question based only on the provided context:

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

// TODO: Generalise this
const retrievalChain = await createRetrievalChain({
  retriever,
  combineDocsChain,
});

export const ragChain = async (
  question: string
): Promise<
  {
    context: Document<Record<string, any>>[];
    answer: string;
  } & {
    [key: string]: unknown;
  }
> => {
  const retrievedDocs = await retriever.getRelevantDocuments(question);

  return await retrievalChain.invoke({
    input: question,
    context: retrievedDocs,
  });
};
