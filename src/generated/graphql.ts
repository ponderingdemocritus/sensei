import { GraphQLClient } from "graphql-request";
// import { any } from 'graphql-request/build/cjs/types';
import { print } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AttackerValue: { input: any; output: any };
  BeastValue: { input: any; output: any };
  DiscoveryValue: { input: any; output: any };
  FeltValue: { input: any; output: any };
  HexValue: { input: any; output: any };
  ItemValue: { input: any; output: any };
  ObstacleValue: { input: any; output: any };
  SlotValue: { input: any; output: any };
  Special1Value: { input: any; output: any };
  Special2Value: { input: any; output: any };
  Special3Value: { input: any; output: any };
  StringValue: { input: any; output: any };
  SubDiscoveryValue: { input: any; output: any };
  U256Value: { input: any; output: any };
};

export type Adventurer = {
  __typename?: "Adventurer";
  actionsPerBlock?: Maybe<Scalars["FeltValue"]["output"]>;
  beastHealth?: Maybe<Scalars["FeltValue"]["output"]>;
  charisma?: Maybe<Scalars["FeltValue"]["output"]>;
  chest?: Maybe<Scalars["ItemValue"]["output"]>;
  createdTime?: Maybe<Scalars["String"]["output"]>;
  dexterity?: Maybe<Scalars["FeltValue"]["output"]>;
  foot?: Maybe<Scalars["ItemValue"]["output"]>;
  gold?: Maybe<Scalars["FeltValue"]["output"]>;
  hand?: Maybe<Scalars["ItemValue"]["output"]>;
  head?: Maybe<Scalars["ItemValue"]["output"]>;
  health?: Maybe<Scalars["FeltValue"]["output"]>;
  id?: Maybe<Scalars["FeltValue"]["output"]>;
  intelligence?: Maybe<Scalars["FeltValue"]["output"]>;
  lastAction?: Maybe<Scalars["FeltValue"]["output"]>;
  lastUpdatedTime?: Maybe<Scalars["String"]["output"]>;
  luck?: Maybe<Scalars["FeltValue"]["output"]>;
  name?: Maybe<Scalars["StringValue"]["output"]>;
  neck?: Maybe<Scalars["ItemValue"]["output"]>;
  owner?: Maybe<Scalars["HexValue"]["output"]>;
  revealBlock?: Maybe<Scalars["FeltValue"]["output"]>;
  ring?: Maybe<Scalars["ItemValue"]["output"]>;
  startBlock?: Maybe<Scalars["FeltValue"]["output"]>;
  statUpgrades?: Maybe<Scalars["FeltValue"]["output"]>;
  strength?: Maybe<Scalars["FeltValue"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
  vitality?: Maybe<Scalars["FeltValue"]["output"]>;
  waist?: Maybe<Scalars["ItemValue"]["output"]>;
  weapon?: Maybe<Scalars["ItemValue"]["output"]>;
  wisdom?: Maybe<Scalars["FeltValue"]["output"]>;
  xp?: Maybe<Scalars["FeltValue"]["output"]>;
};

export type AdventurersFilter = {
  actionsPerBlock?: InputMaybe<FeltValueFilter>;
  beastHealth?: InputMaybe<FeltValueFilter>;
  charisma?: InputMaybe<FeltValueFilter>;
  chest?: InputMaybe<FeltValueFilter>;
  createdTime?: InputMaybe<OrderByInput>;
  dexterity?: InputMaybe<FeltValueFilter>;
  foot?: InputMaybe<FeltValueFilter>;
  gold?: InputMaybe<FeltValueFilter>;
  hand?: InputMaybe<FeltValueFilter>;
  head?: InputMaybe<FeltValueFilter>;
  health?: InputMaybe<FeltValueFilter>;
  id?: InputMaybe<FeltValueFilter>;
  intelligence?: InputMaybe<FeltValueFilter>;
  lastAction?: InputMaybe<FeltValueFilter>;
  lastUpdatedTime?: InputMaybe<DateTimeFilter>;
  luck?: InputMaybe<FeltValueFilter>;
  name?: InputMaybe<StringFilter>;
  neck?: InputMaybe<FeltValueFilter>;
  owner?: InputMaybe<HexValueFilter>;
  revealBlock?: InputMaybe<FeltValueFilter>;
  ring?: InputMaybe<FeltValueFilter>;
  startBlock?: InputMaybe<FeltValueFilter>;
  statUpgrades?: InputMaybe<FeltValueFilter>;
  strength?: InputMaybe<FeltValueFilter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  vitality?: InputMaybe<FeltValueFilter>;
  waist?: InputMaybe<FeltValueFilter>;
  weapon?: InputMaybe<FeltValueFilter>;
  wisdom?: InputMaybe<FeltValueFilter>;
  xp?: InputMaybe<FeltValueFilter>;
};

export type AdventurersOrderByInput = {
  actionsPerBlock?: InputMaybe<OrderByInput>;
  beastHealth?: InputMaybe<OrderByInput>;
  charisma?: InputMaybe<OrderByInput>;
  chest?: InputMaybe<OrderByInput>;
  createdTime?: InputMaybe<OrderByInput>;
  dexterity?: InputMaybe<OrderByInput>;
  foot?: InputMaybe<OrderByInput>;
  gold?: InputMaybe<OrderByInput>;
  hand?: InputMaybe<OrderByInput>;
  head?: InputMaybe<OrderByInput>;
  health?: InputMaybe<OrderByInput>;
  id?: InputMaybe<OrderByInput>;
  intelligence?: InputMaybe<OrderByInput>;
  lastAction?: InputMaybe<OrderByInput>;
  lastUpdatedTime?: InputMaybe<OrderByInput>;
  level?: InputMaybe<OrderByInput>;
  luck?: InputMaybe<OrderByInput>;
  name?: InputMaybe<OrderByInput>;
  neck?: InputMaybe<OrderByInput>;
  owner?: InputMaybe<OrderByInput>;
  revealBlock?: InputMaybe<OrderByInput>;
  ring?: InputMaybe<OrderByInput>;
  startBlock?: InputMaybe<OrderByInput>;
  statUpgrades?: InputMaybe<OrderByInput>;
  strength?: InputMaybe<OrderByInput>;
  timestamp?: InputMaybe<OrderByInput>;
  vitality?: InputMaybe<OrderByInput>;
  waist?: InputMaybe<OrderByInput>;
  weapon?: InputMaybe<OrderByInput>;
  wisdom?: InputMaybe<OrderByInput>;
  xp?: InputMaybe<OrderByInput>;
};

export type AttackerFilter = {
  eq?: InputMaybe<Scalars["AttackerValue"]["input"]>;
};

export type Battle = {
  __typename?: "Battle";
  adventurerHealth?: Maybe<Scalars["FeltValue"]["output"]>;
  adventurerId?: Maybe<Scalars["FeltValue"]["output"]>;
  attacker?: Maybe<Scalars["AttackerValue"]["output"]>;
  beast?: Maybe<Scalars["BeastValue"]["output"]>;
  beastHealth?: Maybe<Scalars["FeltValue"]["output"]>;
  beastLevel?: Maybe<Scalars["FeltValue"]["output"]>;
  blockTime?: Maybe<Scalars["String"]["output"]>;
  criticalHit?: Maybe<Scalars["Boolean"]["output"]>;
  damageDealt?: Maybe<Scalars["FeltValue"]["output"]>;
  damageLocation?: Maybe<Scalars["SlotValue"]["output"]>;
  damageTaken?: Maybe<Scalars["FeltValue"]["output"]>;
  discoveryTime?: Maybe<Scalars["String"]["output"]>;
  fled?: Maybe<Scalars["Boolean"]["output"]>;
  goldEarned?: Maybe<Scalars["FeltValue"]["output"]>;
  seed?: Maybe<Scalars["HexValue"]["output"]>;
  special1?: Maybe<Scalars["Special1Value"]["output"]>;
  special2?: Maybe<Scalars["Special2Value"]["output"]>;
  special3?: Maybe<Scalars["Special3Value"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
  txHash?: Maybe<Scalars["HexValue"]["output"]>;
  xpEarnedAdventurer?: Maybe<Scalars["FeltValue"]["output"]>;
  xpEarnedItems?: Maybe<Scalars["FeltValue"]["output"]>;
};

export type BattlesFilter = {
  adventurerHealth?: InputMaybe<FeltValueFilter>;
  adventurerId?: InputMaybe<FeltValueFilter>;
  attacker?: InputMaybe<AttackerFilter>;
  beast?: InputMaybe<BeastFilter>;
  beastHealth?: InputMaybe<FeltValueFilter>;
  beastLevel?: InputMaybe<FeltValueFilter>;
  blockTime?: InputMaybe<DateTimeFilter>;
  criticalHit?: InputMaybe<BooleanFilter>;
  damageDealt?: InputMaybe<FeltValueFilter>;
  damageLocation?: InputMaybe<SlotFilter>;
  damageTaken?: InputMaybe<FeltValueFilter>;
  discoveryTime?: InputMaybe<DateTimeFilter>;
  fled?: InputMaybe<BooleanFilter>;
  goldEarned?: InputMaybe<FeltValueFilter>;
  seed?: InputMaybe<HexValueFilter>;
  special1?: InputMaybe<Special1Filter>;
  special2?: InputMaybe<Special2Filter>;
  special3?: InputMaybe<Special3Filter>;
  txHash?: InputMaybe<HexValueFilter>;
  xpEarnedAdventurer?: InputMaybe<FeltValueFilter>;
  xpEarnedItems?: InputMaybe<FeltValueFilter>;
};

export type BattlesOrderByInput = {
  adventurerHealth?: InputMaybe<OrderByInput>;
  adventurerId?: InputMaybe<OrderByInput>;
  attacker?: InputMaybe<OrderByInput>;
  beast?: InputMaybe<OrderByInput>;
  beastHealth?: InputMaybe<OrderByInput>;
  beastLevel?: InputMaybe<OrderByInput>;
  blockTime?: InputMaybe<OrderByInput>;
  criticalHit?: InputMaybe<OrderByInput>;
  damageDealt?: InputMaybe<OrderByInput>;
  damageLocation?: InputMaybe<OrderByInput>;
  damageTaken?: InputMaybe<OrderByInput>;
  discoveryTime?: InputMaybe<OrderByInput>;
  fled?: InputMaybe<OrderByInput>;
  goldEarned?: InputMaybe<OrderByInput>;
  seed?: InputMaybe<OrderByInput>;
  special1?: InputMaybe<OrderByInput>;
  special2?: InputMaybe<OrderByInput>;
  special3?: InputMaybe<OrderByInput>;
  timestamp?: InputMaybe<OrderByInput>;
  txHash?: InputMaybe<OrderByInput>;
  xpEarnedAdventurer?: InputMaybe<OrderByInput>;
  xpEarnedItems?: InputMaybe<OrderByInput>;
};

export type Beast = {
  __typename?: "Beast";
  adventurerId?: Maybe<Scalars["FeltValue"]["output"]>;
  beast?: Maybe<Scalars["BeastValue"]["output"]>;
  createdTime?: Maybe<Scalars["String"]["output"]>;
  health?: Maybe<Scalars["FeltValue"]["output"]>;
  lastUpdatedTime?: Maybe<Scalars["String"]["output"]>;
  level?: Maybe<Scalars["FeltValue"]["output"]>;
  seed?: Maybe<Scalars["HexValue"]["output"]>;
  slainOnTime?: Maybe<Scalars["String"]["output"]>;
  special1?: Maybe<Scalars["Special1Value"]["output"]>;
  special2?: Maybe<Scalars["Special2Value"]["output"]>;
  special3?: Maybe<Scalars["Special3Value"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
};

export type BeastFilter = {
  In?: InputMaybe<Array<Scalars["BeastValue"]["input"]>>;
  contains?: InputMaybe<Scalars["BeastValue"]["input"]>;
  endsWith?: InputMaybe<Scalars["BeastValue"]["input"]>;
  eq?: InputMaybe<Scalars["BeastValue"]["input"]>;
  gt?: InputMaybe<Scalars["BeastValue"]["input"]>;
  gte?: InputMaybe<Scalars["BeastValue"]["input"]>;
  lt?: InputMaybe<Scalars["BeastValue"]["input"]>;
  lte?: InputMaybe<Scalars["BeastValue"]["input"]>;
  notIn?: InputMaybe<Scalars["BeastValue"]["input"]>;
  startsWith?: InputMaybe<Scalars["BeastValue"]["input"]>;
};

export type BeastsFilter = {
  adventurerId?: InputMaybe<FeltValueFilter>;
  beast?: InputMaybe<BeastFilter>;
  createdTime?: InputMaybe<DateTimeFilter>;
  health?: InputMaybe<FeltValueFilter>;
  lastUpdatedTime?: InputMaybe<DateTimeFilter>;
  level?: InputMaybe<FeltValueFilter>;
  seed?: InputMaybe<HexValueFilter>;
  slainOnTime?: InputMaybe<DateTimeFilter>;
  special1?: InputMaybe<Special1Filter>;
  special2?: InputMaybe<Special2Filter>;
  special3?: InputMaybe<Special3Filter>;
  timestamp?: InputMaybe<DateTimeFilter>;
};

export type BeastsOrderByInput = {
  adventurerId?: InputMaybe<OrderByInput>;
  beast?: InputMaybe<OrderByInput>;
  createdTime?: InputMaybe<OrderByInput>;
  health?: InputMaybe<OrderByInput>;
  lastUpdatedTime?: InputMaybe<OrderByInput>;
  level?: InputMaybe<OrderByInput>;
  seed?: InputMaybe<OrderByInput>;
  slainOnTime?: InputMaybe<OrderByInput>;
  special1?: InputMaybe<OrderByInput>;
  special2?: InputMaybe<OrderByInput>;
  special3?: InputMaybe<OrderByInput>;
  timestamp?: InputMaybe<OrderByInput>;
};

export type BooleanFilter = {
  eq?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type DateTimeFilter = {
  In?: InputMaybe<Array<Scalars["String"]["input"]>>;
  eq?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
};

export type DiscoveriesFilter = {
  adventurerHealth?: InputMaybe<FeltValueFilter>;
  adventurerId?: InputMaybe<FeltValueFilter>;
  ambushed?: InputMaybe<BooleanFilter>;
  damageLocation?: InputMaybe<SlotFilter>;
  damageTaken?: InputMaybe<FeltValueFilter>;
  discoveryTime?: InputMaybe<DateTimeFilter>;
  disoveryType?: InputMaybe<StringFilter>;
  dodgedObstacle?: InputMaybe<BooleanFilter>;
  entity?: InputMaybe<FeltValueFilter>;
  entityHealth?: InputMaybe<FeltValueFilter>;
  entityLevel?: InputMaybe<FeltValueFilter>;
  obstacle?: InputMaybe<ObstacleFilter>;
  obstacleLevel?: InputMaybe<FeltValueFilter>;
  outputAmount?: InputMaybe<FeltValueFilter>;
  seed?: InputMaybe<HexValueFilter>;
  special1?: InputMaybe<Special1Filter>;
  special2?: InputMaybe<Special2Filter>;
  special3?: InputMaybe<Special3Filter>;
  subDiscoveryType?: InputMaybe<StringFilter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  txHash?: InputMaybe<HexValueFilter>;
  xpEarnedAdventurer?: InputMaybe<FeltValueFilter>;
  xpEarnedItems?: InputMaybe<FeltValueFilter>;
};

export type DiscoveriesOrderByInput = {
  adventurerHealth?: InputMaybe<OrderByInput>;
  adventurerId?: InputMaybe<OrderByInput>;
  ambushed?: InputMaybe<OrderByInput>;
  damageLocation?: InputMaybe<OrderByInput>;
  damageTaken?: InputMaybe<OrderByInput>;
  discoveryTime?: InputMaybe<OrderByInput>;
  disoveryType?: InputMaybe<OrderByInput>;
  dodgedObstacle?: InputMaybe<OrderByInput>;
  entity?: InputMaybe<OrderByInput>;
  entityHealth?: InputMaybe<OrderByInput>;
  entityLevel?: InputMaybe<OrderByInput>;
  obstacle?: InputMaybe<OrderByInput>;
  obstacleLevel?: InputMaybe<OrderByInput>;
  outputAmount?: InputMaybe<OrderByInput>;
  seed?: InputMaybe<OrderByInput>;
  special1?: InputMaybe<OrderByInput>;
  special2?: InputMaybe<OrderByInput>;
  special3?: InputMaybe<OrderByInput>;
  subDiscoveryType?: InputMaybe<OrderByInput>;
  timestamp?: InputMaybe<OrderByInput>;
  txHash?: InputMaybe<OrderByInput>;
  xpEarnedAdventurer?: InputMaybe<OrderByInput>;
  xpEarnedItems?: InputMaybe<OrderByInput>;
};

export type Discovery = {
  __typename?: "Discovery";
  adventurerHealth?: Maybe<Scalars["FeltValue"]["output"]>;
  adventurerId?: Maybe<Scalars["FeltValue"]["output"]>;
  ambushed?: Maybe<Scalars["Boolean"]["output"]>;
  damageLocation?: Maybe<Scalars["SlotValue"]["output"]>;
  damageTaken?: Maybe<Scalars["FeltValue"]["output"]>;
  discoveryTime?: Maybe<Scalars["String"]["output"]>;
  discoveryType?: Maybe<Scalars["DiscoveryValue"]["output"]>;
  dodgedObstacle?: Maybe<Scalars["Boolean"]["output"]>;
  entity?: Maybe<Scalars["BeastValue"]["output"]>;
  entityHealth?: Maybe<Scalars["FeltValue"]["output"]>;
  entityLevel?: Maybe<Scalars["FeltValue"]["output"]>;
  obstacle?: Maybe<Scalars["ObstacleValue"]["output"]>;
  obstacleLevel?: Maybe<Scalars["FeltValue"]["output"]>;
  outputAmount?: Maybe<Scalars["FeltValue"]["output"]>;
  seed?: Maybe<Scalars["HexValue"]["output"]>;
  special1?: Maybe<Scalars["Special1Value"]["output"]>;
  special2?: Maybe<Scalars["Special2Value"]["output"]>;
  special3?: Maybe<Scalars["Special3Value"]["output"]>;
  subDiscoveryType?: Maybe<Scalars["SubDiscoveryValue"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
  txHash?: Maybe<Scalars["HexValue"]["output"]>;
  xpEarnedAdventurer?: Maybe<Scalars["FeltValue"]["output"]>;
  xpEarnedItems?: Maybe<Scalars["FeltValue"]["output"]>;
};

export type FeltValueFilter = {
  In?: InputMaybe<Array<Scalars["FeltValue"]["input"]>>;
  eq?: InputMaybe<Scalars["FeltValue"]["input"]>;
  gt?: InputMaybe<Scalars["FeltValue"]["input"]>;
  gte?: InputMaybe<Scalars["FeltValue"]["input"]>;
  lt?: InputMaybe<Scalars["FeltValue"]["input"]>;
  lte?: InputMaybe<Scalars["FeltValue"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["FeltValue"]["input"]>>;
};

export type HexValueFilter = {
  In?: InputMaybe<Array<Scalars["HexValue"]["input"]>>;
  eq?: InputMaybe<Scalars["HexValue"]["input"]>;
  gt?: InputMaybe<Scalars["HexValue"]["input"]>;
  gte?: InputMaybe<Scalars["HexValue"]["input"]>;
  lt?: InputMaybe<Scalars["HexValue"]["input"]>;
  lte?: InputMaybe<Scalars["HexValue"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["HexValue"]["input"]>>;
};

export type Item = {
  __typename?: "Item";
  adventurerId?: Maybe<Scalars["FeltValue"]["output"]>;
  equipped?: Maybe<Scalars["Boolean"]["output"]>;
  isAvailable?: Maybe<Scalars["Boolean"]["output"]>;
  item?: Maybe<Scalars["ItemValue"]["output"]>;
  owner?: Maybe<Scalars["Boolean"]["output"]>;
  ownerAddress?: Maybe<Scalars["HexValue"]["output"]>;
  purchasedTime?: Maybe<Scalars["String"]["output"]>;
  special1?: Maybe<Scalars["Special1Value"]["output"]>;
  special2?: Maybe<Scalars["Special2Value"]["output"]>;
  special3?: Maybe<Scalars["Special3Value"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
  xp?: Maybe<Scalars["FeltValue"]["output"]>;
};

export type ItemFilter = {
  In?: InputMaybe<Array<Scalars["ItemValue"]["input"]>>;
  contains?: InputMaybe<Scalars["ItemValue"]["input"]>;
  endsWith?: InputMaybe<Scalars["ItemValue"]["input"]>;
  eq?: InputMaybe<Scalars["ItemValue"]["input"]>;
  gt?: InputMaybe<Scalars["ItemValue"]["input"]>;
  gte?: InputMaybe<Scalars["ItemValue"]["input"]>;
  lt?: InputMaybe<Scalars["ItemValue"]["input"]>;
  lte?: InputMaybe<Scalars["ItemValue"]["input"]>;
  notIn?: InputMaybe<Scalars["ItemValue"]["input"]>;
  startsWith?: InputMaybe<Scalars["ItemValue"]["input"]>;
};

export type ItemsFilter = {
  adventurerId?: InputMaybe<FeltValueFilter>;
  equipped?: InputMaybe<BooleanFilter>;
  isAvailable?: InputMaybe<BooleanFilter>;
  item?: InputMaybe<ItemFilter>;
  owner?: InputMaybe<BooleanFilter>;
  ownerAddress?: InputMaybe<HexValueFilter>;
  purchasedTime?: InputMaybe<DateTimeFilter>;
  special1?: InputMaybe<Special1Filter>;
  special2?: InputMaybe<Special2Filter>;
  special3?: InputMaybe<Special3Filter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  xp?: InputMaybe<FeltValueFilter>;
};

export type ItemsOrderByInput = {
  adventurerId?: InputMaybe<OrderByInput>;
  equipped?: InputMaybe<OrderByInput>;
  isAvailable?: InputMaybe<OrderByInput>;
  item?: InputMaybe<OrderByInput>;
  owner?: InputMaybe<OrderByInput>;
  ownerAddress?: InputMaybe<OrderByInput>;
  purchasedTime?: InputMaybe<OrderByInput>;
  special1?: InputMaybe<OrderByInput>;
  special2?: InputMaybe<OrderByInput>;
  special3?: InputMaybe<OrderByInput>;
  timestamp?: InputMaybe<OrderByInput>;
  xp?: InputMaybe<OrderByInput>;
};

export type ObstacleFilter = {
  In?: InputMaybe<Array<Scalars["ObstacleValue"]["input"]>>;
  contains?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  endsWith?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  eq?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  gt?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  gte?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  lt?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  lte?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  notIn?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
  startsWith?: InputMaybe<Scalars["ObstacleValue"]["input"]>;
};

export type OrderByInput = {
  asc?: InputMaybe<Scalars["Boolean"]["input"]>;
  desc?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Query = {
  __typename?: "Query";
  adventurers: Array<Adventurer>;
  battles: Array<Battle>;
  beasts: Array<Beast>;
  discoveries: Array<Discovery>;
  items: Array<Item>;
  scores: Array<Score>;
};

export type QueryAdventurersArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<AdventurersOrderByInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<AdventurersFilter>;
};

export type QueryBattlesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BattlesOrderByInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BattlesFilter>;
};

export type QueryBeastsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<BeastsOrderByInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<BeastsFilter>;
};

export type QueryDiscoveriesArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<DiscoveriesOrderByInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<DiscoveriesFilter>;
};

export type QueryItemsArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ItemsOrderByInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ItemsFilter>;
};

export type QueryScoresArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  orderBy?: InputMaybe<ScoresOrderByInput>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  where?: InputMaybe<ScoresFilter>;
};

export type Score = {
  __typename?: "Score";
  adventurerId?: Maybe<Scalars["FeltValue"]["output"]>;
  timestamp?: Maybe<Scalars["String"]["output"]>;
  totalPayout?: Maybe<Scalars["U256Value"]["output"]>;
};

export type ScoresFilter = {
  adventurerId?: InputMaybe<FeltValueFilter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  totalPayout?: InputMaybe<U256ValueFilter>;
};

export type ScoresOrderByInput = {
  adventurerId?: InputMaybe<OrderByInput>;
  timestamp?: InputMaybe<OrderByInput>;
  totalPayout?: InputMaybe<OrderByInput>;
};

export type SlotFilter = {
  In?: InputMaybe<Array<Scalars["SlotValue"]["input"]>>;
  contains?: InputMaybe<Scalars["SlotValue"]["input"]>;
  endsWith?: InputMaybe<Scalars["SlotValue"]["input"]>;
  eq?: InputMaybe<Scalars["SlotValue"]["input"]>;
  gt?: InputMaybe<Scalars["SlotValue"]["input"]>;
  gte?: InputMaybe<Scalars["SlotValue"]["input"]>;
  lt?: InputMaybe<Scalars["SlotValue"]["input"]>;
  lte?: InputMaybe<Scalars["SlotValue"]["input"]>;
  notIn?: InputMaybe<Scalars["SlotValue"]["input"]>;
  startsWith?: InputMaybe<Scalars["SlotValue"]["input"]>;
};

export type Special1Filter = {
  In?: InputMaybe<Array<Scalars["Special1Value"]["input"]>>;
  contains?: InputMaybe<Scalars["Special1Value"]["input"]>;
  endsWith?: InputMaybe<Scalars["Special1Value"]["input"]>;
  eq?: InputMaybe<Scalars["Special1Value"]["input"]>;
  gt?: InputMaybe<Scalars["Special1Value"]["input"]>;
  gte?: InputMaybe<Scalars["Special1Value"]["input"]>;
  lt?: InputMaybe<Scalars["Special1Value"]["input"]>;
  lte?: InputMaybe<Scalars["Special1Value"]["input"]>;
  notIn?: InputMaybe<Scalars["Special1Value"]["input"]>;
  startsWith?: InputMaybe<Scalars["Special1Value"]["input"]>;
};

export type Special2Filter = {
  In?: InputMaybe<Array<Scalars["Special2Value"]["input"]>>;
  contains?: InputMaybe<Scalars["Special2Value"]["input"]>;
  endsWith?: InputMaybe<Scalars["Special2Value"]["input"]>;
  eq?: InputMaybe<Scalars["Special2Value"]["input"]>;
  gt?: InputMaybe<Scalars["Special2Value"]["input"]>;
  gte?: InputMaybe<Scalars["Special2Value"]["input"]>;
  lt?: InputMaybe<Scalars["Special2Value"]["input"]>;
  lte?: InputMaybe<Scalars["Special2Value"]["input"]>;
  notIn?: InputMaybe<Scalars["Special2Value"]["input"]>;
  startsWith?: InputMaybe<Scalars["Special2Value"]["input"]>;
};

export type Special3Filter = {
  In?: InputMaybe<Array<Scalars["Special3Value"]["input"]>>;
  contains?: InputMaybe<Scalars["Special3Value"]["input"]>;
  endsWith?: InputMaybe<Scalars["Special3Value"]["input"]>;
  eq?: InputMaybe<Scalars["Special3Value"]["input"]>;
  gt?: InputMaybe<Scalars["Special3Value"]["input"]>;
  gte?: InputMaybe<Scalars["Special3Value"]["input"]>;
  lt?: InputMaybe<Scalars["Special3Value"]["input"]>;
  lte?: InputMaybe<Scalars["Special3Value"]["input"]>;
  notIn?: InputMaybe<Scalars["Special3Value"]["input"]>;
  startsWith?: InputMaybe<Scalars["Special3Value"]["input"]>;
};

export type StringFilter = {
  In?: InputMaybe<Array<Scalars["StringValue"]["input"]>>;
  contains?: InputMaybe<Scalars["StringValue"]["input"]>;
  endsWith?: InputMaybe<Scalars["StringValue"]["input"]>;
  eq?: InputMaybe<Scalars["StringValue"]["input"]>;
  gt?: InputMaybe<Scalars["StringValue"]["input"]>;
  gte?: InputMaybe<Scalars["StringValue"]["input"]>;
  lt?: InputMaybe<Scalars["StringValue"]["input"]>;
  lte?: InputMaybe<Scalars["StringValue"]["input"]>;
  notIn?: InputMaybe<Scalars["StringValue"]["input"]>;
  startsWith?: InputMaybe<Scalars["StringValue"]["input"]>;
};

export type U256ValueFilter = {
  In?: InputMaybe<Array<Scalars["U256Value"]["input"]>>;
  eq?: InputMaybe<Scalars["U256Value"]["input"]>;
  gt?: InputMaybe<Scalars["U256Value"]["input"]>;
  gte?: InputMaybe<Scalars["U256Value"]["input"]>;
  lt?: InputMaybe<Scalars["U256Value"]["input"]>;
  lte?: InputMaybe<Scalars["U256Value"]["input"]>;
  notIn?: InputMaybe<Array<Scalars["U256Value"]["input"]>>;
};

export type GetTopAdventurersQueryVariables = Exact<{ [key: string]: never }>;

export type GetTopAdventurersQuery = {
  __typename?: "Query";
  adventurers: Array<{
    __typename?: "Adventurer";
    xp?: any | null;
    id?: any | null;
    name?: any | null;
  }>;
};

export type GetAliveAdventurersQueryVariables = Exact<{ [key: string]: never }>;

export type GetAliveAdventurersQuery = {
  __typename?: "Query";
  adventurers: Array<{ __typename?: "Adventurer"; id?: any | null }>;
};

export type GetLastActionsBeforeDeathQueryVariables = Exact<{
  id: Scalars["FeltValue"]["input"];
}>;

export type GetLastActionsBeforeDeathQuery = {
  __typename?: "Query";
  adventurers: Array<{
    __typename?: "Adventurer";
    id?: any | null;
    name?: any | null;
    xp?: any | null;
    gold?: any | null;
    health?: any | null;
    lastAction?: any | null;
    beastHealth?: any | null;
  }>;
  beasts: Array<{
    __typename?: "Beast";
    beast?: any | null;
    adventurerId?: any | null;
    special1?: any | null;
    special2?: any | null;
    special3?: any | null;
    timestamp?: string | null;
    health?: any | null;
    slainOnTime?: string | null;
    level?: any | null;
  }>;
  discoveries: Array<{
    __typename?: "Discovery";
    adventurerId?: any | null;
    ambushed?: boolean | null;
    damageLocation?: any | null;
    damageTaken?: any | null;
    obstacleLevel?: any | null;
    obstacle?: any | null;
    subDiscoveryType?: any | null;
    outputAmount?: any | null;
    adventurerHealth?: any | null;
    special1?: any | null;
    special2?: any | null;
    special3?: any | null;
    dodgedObstacle?: boolean | null;
    discoveryType?: any | null;
    timestamp?: string | null;
  }>;
};

export type GetNewSurvivorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetNewSurvivorsQuery = {
  __typename?: "Query";
  adventurers: Array<{
    __typename?: "Adventurer";
    id?: any | null;
    name?: any | null;
    xp?: any | null;
    gold?: any | null;
    health?: any | null;
  }>;
};

export type GetDeadSurvivorsQueryVariables = Exact<{ [key: string]: never }>;

export type GetDeadSurvivorsQuery = {
  __typename?: "Query";
  adventurers: Array<{
    __typename?: "Adventurer";
    id?: any | null;
    name?: any | null;
    xp?: any | null;
    gold?: any | null;
    health?: any | null;
  }>;
};

export const GetTopAdventurersDocument = gql`
  query getTopAdventurers {
    adventurers(limit: 3, orderBy: { xp: { desc: true } }) {
      xp
      id
      name
    }
  }
`;
export const GetAliveAdventurersDocument = gql`
  query getAliveAdventurers {
    adventurers(limit: 300, where: { health: { gt: 0 } }) {
      id
    }
  }
`;
export const GetLastActionsBeforeDeathDocument = gql`
  query getLastActionsBeforeDeath($id: FeltValue!) {
    adventurers(
      limit: 1
      where: { id: { eq: $id }, health: { eq: 0 } }
      orderBy: { id: { desc: true } }
    ) {
      id
      name
      xp
      gold
      health
      lastAction
      beastHealth
    }
    beasts(
      limit: 1
      orderBy: { createdTime: { desc: true } }
      where: { adventurerId: { eq: $id } }
    ) {
      beast
      adventurerId
      special1
      special2
      special3
      timestamp
      health
      slainOnTime
      level
    }
    discoveries(limit: 1, where: { adventurerId: { eq: $id } }) {
      adventurerId
      ambushed
      damageLocation
      damageTaken
      obstacleLevel
      obstacle
      subDiscoveryType
      outputAmount
      adventurerHealth
      special1
      special2
      special3
      dodgedObstacle
      discoveryType
      timestamp
    }
  }
`;
export const GetNewSurvivorsDocument = gql`
  query getNewSurvivors {
    adventurers(limit: 3, orderBy: { id: { desc: true } }) {
      id
      name
      xp
      gold
      health
    }
  }
`;
export const GetDeadSurvivorsDocument = gql`
  query getDeadSurvivors {
    adventurers(
      limit: 2
      where: { health: { eq: 0 } }
      orderBy: { timestamp: { desc: true } }
    ) {
      id
      name
      xp
      gold
      health
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType
) => action();
const GetTopAdventurersDocumentString = print(GetTopAdventurersDocument);
const GetAliveAdventurersDocumentString = print(GetAliveAdventurersDocument);
const GetLastActionsBeforeDeathDocumentString = print(
  GetLastActionsBeforeDeathDocument
);
const GetNewSurvivorsDocumentString = print(GetNewSurvivorsDocument);
const GetDeadSurvivorsDocumentString = print(GetDeadSurvivorsDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    getTopAdventurers(
      variables?: GetTopAdventurersQueryVariables,
      requestHeaders?: any
    ): Promise<{
      data: GetTopAdventurersQuery;
      extensions?: any;
      headers: any;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetTopAdventurersQuery>(
            GetTopAdventurersDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "getTopAdventurers",
        "query"
      );
    },
    getAliveAdventurers(
      variables?: GetAliveAdventurersQueryVariables,
      requestHeaders?: any
    ): Promise<{
      data: GetAliveAdventurersQuery;
      extensions?: any;
      headers: any;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetAliveAdventurersQuery>(
            GetAliveAdventurersDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "getAliveAdventurers",
        "query"
      );
    },
    getLastActionsBeforeDeath(
      variables: GetLastActionsBeforeDeathQueryVariables,
      requestHeaders?: any
    ): Promise<{
      data: GetLastActionsBeforeDeathQuery;
      extensions?: any;
      headers: any;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetLastActionsBeforeDeathQuery>(
            GetLastActionsBeforeDeathDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "getLastActionsBeforeDeath",
        "query"
      );
    },
    getNewSurvivors(
      variables?: GetNewSurvivorsQueryVariables,
      requestHeaders?: any
    ): Promise<{
      data: GetNewSurvivorsQuery;
      extensions?: any;
      headers: any;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetNewSurvivorsQuery>(
            GetNewSurvivorsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "getNewSurvivors",
        "query"
      );
    },
    getDeadSurvivors(
      variables?: GetDeadSurvivorsQueryVariables,
      requestHeaders?: any
    ): Promise<{
      data: GetDeadSurvivorsQuery;
      extensions?: any;
      headers: any;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetDeadSurvivorsQuery>(
            GetDeadSurvivorsDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "getDeadSurvivors",
        "query"
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
