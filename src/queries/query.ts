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
