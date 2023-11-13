import { getSdk } from "./generated/graphql.js";
import { GraphQLClient } from "graphql-request";
import { TwitterApi } from "twitter-api-v2";

if (!process.env.TWITTER_ACCESS_TOKEN) {
  throw new Error("TWITTER_BEARER_TOKEN is not defined");
}

if (!process.env.TWITTER_ACCESS_TOKEN_SECRET) {
  throw new Error("TWITTER_BEARER_TOKEN is not defined");
}

if (!process.env.TWITTER_APP_KEY) {
  throw new Error("TWITTER_APP_KEY is not defined");
}

if (!process.env.TWITTER_APP_SECRET) {
  throw new Error("TWITTER_APP_SECRET is not defined");
}

export const GRAPHQL_ENDPOINT =
  "https://survivor-mainnet-indexer.realms.world/graphql";

export const POLL_INTERVAL = 3000;

export const sdk = getSdk(new GraphQLClient(GRAPHQL_ENDPOINT));

export const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
