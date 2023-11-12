import { getSdk } from "./generated/graphql.js";
import { GraphQLClient } from "graphql-request";

export const GRAPHQL_ENDPOINT =
  "https://survivor-mainnet-indexer.realms.world/graphql";
export const POLL_INTERVAL = 3000;

export const sdk = getSdk(new GraphQLClient(GRAPHQL_ENDPOINT));
