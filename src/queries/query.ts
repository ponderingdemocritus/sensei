export interface Query {
  query: string;
}

export const getDeadSurvivors = {
  query: `
      query{
        adventurers(
          limit: 3
          where: {health: {eq: 0}}
          orderBy: {timestamp: {desc: true}}
        ) {
          id
          name
          xp
          gold
          health
        }
      }
    `,
};

export const getBornSurvivors = {
  query: `
      query{
        adventurers(
          limit: 3
          orderBy: {id: {desc: true}}
        ) {
          id
          name
          xp
          gold
          health
        }
      }
    `,
};

export const LAST_ACTION_BEFORE_DEATH_QUERY = `
  query Adventurer($id: FeltValue!) {
    adventurers(
      limit: 1
      where: {id: {eq: $id}, health: {eq: 0}}
      orderBy: {id: {desc: true}}
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
      orderBy: {createdTime: {desc: true}}
      where: {adventurerId: {eq: $id}}
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
    discoveries(limit: 1, where: {adventurerId: {eq: $id}}) {
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

export const ALIVE_ADVENTURERS = {
  query: `
    query {
      adventurers(limit:300, where: {health: {gt: 0}}) {
        id
      }
    }
  `,
};
