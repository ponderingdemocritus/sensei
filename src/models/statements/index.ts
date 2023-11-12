export const deathStatement = `
    This is the object of an Adventurer who has just perished in a game called Loot Survivor, where players combat perilous beasts. Take the player's name and the beasts that are in the object and craft a one-sentence backstory, infusing it with dark humor and wit in the manner of wise old story teller. Roast them for their ill-fated decisions. Make sure to weave their name contextually into the story. Do not use any copyright material. 

    \n {question}

    The first object represents the adventurer. Ensure that the statement includes a purpose and integrates these elements into its narrative. The next is the beast object, which has claimed the life of the player. Be sure to use the beast's name. If there's a special beast, its unique naming values should be combined accordingly, such as 'Death Tear' Balrog, for example.

    The final object is related to the discovery type. If this is a beast, omit any additional mention, as it would be repetitive with the beast object information. If the death was due to an Obstacle, include this context in the story. For instance, if 'Death Blades' are the cause, you might say the player was decapitated by them.

    Make the story max 4 sentences long.
    
  `;

export const bornStatement =
  "This is the an object of an Adventurer who just joined a game called Loot Surivor, where you fight crazy dangerous beasts, i want you to take the players name and create a 1 sentence backstory, use dark humour, speak like a wise old story teller. Roast them for their bad decisions. \n {question}";

export const questionStatement =
  "You are gandalf, answer this question: \n {question}";

export const deathStatement2 = `
    Here lies the essence of a once-brave soul, the not-so-legendary player of Loot Survivor (), where every fight with mythical creatures was a dicey dance with death. Weave the player’s name into a saga brief yet satirically bleak, echoing the wit of a wizard akin to Gandalf, but less forgiving of their misguided escapades.

    \n {question}

    The first relic speaks of the fallen hero. It must convey a tale that binds their purpose to the artifact’s legacy, threading the chosen elements into a short-lived epic. Following is the monster’s token, the fiend responsible for this untimely demise. Incorporate the creature’s moniker, and for those of notorious repute, like 'Inferno Fang' Wyvern, meld their fearsome title seamlessly.

    The terminal piece concerns the nature of the encounter. Should another beast be the find, let it go unmentioned to avoid echoing the earlier beastly ballad. Yet, if a trap, like the notorious 'Whispering Spikes,' played the executioner, detail the tragicomic end, perhaps a silent, sudden skewering.

    Cap the eulogy at four sentences, lest we drone like the living.
    
  `;

export const deathStatement3 = `
    Behold the vestige of a wayward Adventurer who met their end in the treacherous realms of Loot Survivor (), in battles fraught with danger and ironic folly. Shape the player's moniker into a darkly humorous epithet that would draw a sardonic chuckle even from a sage as stoic as Gandalf, deriding their poor choices in jest.

    \n {question}

    The initial artifact is a tribute to our intrepid but doomed explorer. It should embody a quest, weaving the player's ambition and downfall into the fabric of its lore. Next is the token of the beast, the ghastly nemesis whose name must be etched in this dirge. For a creature of infamy, like the 'Silent Doom' Dragon, blend its infamous appellation artfully.

    The last item pertains to the method of demise. Exclude further beast mentions to steer clear of redundancy, but if a fatal folly like 'Echoing Despair' pits claimed their head, integrate this twist into the narrative, narrating a tale of grim humor and swift end.

    The recount should be succinct; four sentences to honor a death most ludicrous.
    
  `;

export const deathStatement4 = `
    Gather 'round for the chronicle of an Adventurer who has valiantly fallen in Loot Survivor (), where clashes with legendary monsters are as sure as the follies of the fallen. Etch the player's name into a mirthful memory that would make a wizard of Gandalf’s stature guffaw at their fatally flawed tactics.

    \n {question}

    The primary relic bears witness to the adventurer’s ambitions. It’s a testament that should weave their intent into a narrative as profound as it is brief, incorporating the requisite elements. Subsequently comes the beast’s emblem, the adversary who dealt the final blow. Its name should be interwoven, especially if it’s a notable fiend like 'Whisperwind' Griffin, where the title becomes part of the legacy.

    The concluding object defines the encounter’s nature. Omit any beast recapitulation, but if it was an obstruction like 'Shrieking Boulders' that crushed their spirit, include such a demise in the chronicle, depicting a grotesquely comical conclusion.

    Limit the tale to four sentences, for brevity is the soul of wit—even in death.
    
  `;

export const allDeathStatements = [deathStatement];

// get random statement

export const getRandomStatement = () => {
  return allDeathStatements[
    Math.floor(Math.random() * allDeathStatements.length)
  ];
};
