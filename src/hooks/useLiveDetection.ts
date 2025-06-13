import { useState, useRef, useCallback, useEffect, useMemo } from "react";

// Enhanced emotion and sentiment mappings
const EMOTION_MAP = {
  0: "anger",
  1: "disgust",
  2: "fear",
  3: "joy",
  4: "neutral",
  5: "sadness",
  6: "surprise",
} as const;

const SENTIMENT_MAP = {
  0: "negative",
  1: "neutral",
  2: "positive",
} as const;

// ENHANCED: Complex sentence patterns for detection
const SENTENCE_COMPLEXITY_PATTERNS = {
  compound: [
    /\b(and|but|or|yet|so|for|nor)\b/gi,
    /[;,]\s*(?:however|nevertheless|moreover|furthermore|meanwhile|therefore|consequently)/gi,
  ],
  complex: [
    /\b(because|since|although|though|while|whereas|if|unless|when|where|who|which|that)\b/gi,
    /\b(before|after|until|as\s+soon\s+as|in\s+order\s+to)\b/gi,
  ],
  conditional: [/\b(if|unless|provided\s+that|assuming\s+that|suppose)\b/gi],
  comparative: [/\b(better|worse|more|less|as\s+good\s+as|compared\s+to)\b/gi],
  contrastive: [
    /\b(but|however|nevertheless|nonetheless|although|though|despite|in\s+spite\s+of)\b/gi,
  ],
};

// ENHANCED: Advanced contextual phrase patterns with weights
const CONTEXTUAL_PATTERNS = {
  // Negation + positive words = negative sentiment
  negative_contexts: [
    {
      pattern:
        /not\s+(good|great|amazing|wonderful|excellent|fantastic|awesome|perfect|brilliant|superb)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /don't\s+(like|love|enjoy|appreciate|want|need)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /can't\s+(stand|bear|handle|take|believe)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /won't\s+(work|help|do|go|come)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /isn't\s+(working|good|right|fair|nice)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /doesn't\s+(work|help|matter|care|look\s+good)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /never\s+(again|works|helps|good|right)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /nothing\s+(good|works|helps|right)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /no\s+(way|good|hope|chance|point)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern:
        /not\s+(at\s+all|really|very|quite|exactly)\s+(good|nice|great)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3.5,
    },

    // Situation-based negative contexts
    {
      pattern:
        /situation\s+(is|looks?|seems?)\s+(not\s+)?(good|looking\s+good|great|promising)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern:
        /(things?|everything|situation)\s+(are|is)\s+(not\s+)?(working|going\s+well|looking\s+good)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /(getting|going|becoming)\s+worse/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /not\s+looking\s+good(\s+at\s+all)?/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /looking\s+(bad|terrible|awful|horrible)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /going\s+(downhill|wrong|badly)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /falling\s+apart/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /out\s+of\s+control/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3.5,
    },

    // Complex negative patterns
    {
      pattern: /should\s+have\s+been\s+(better|different|easier)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern:
        /wish\s+(it|things|everything)\s+(were|was)\s+(better|different)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern:
        /if\s+only\s+(it|things|everything)\s+(were|was)\s+(better|different)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /not\s+what\s+I\s+(expected|hoped|wanted)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /far\s+from\s+(perfect|ideal|good|satisfactory)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },

    // Worry and concern patterns
    {
      pattern: /(worried|concerned|anxious|nervous)\s+about/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /(afraid|scared|terrified)\s+(of|that)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /don't\s+know\s+what\s+to\s+do/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /losing\s+(hope|faith|confidence)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /giving\s+up/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },

    // Frustration patterns
    {
      pattern: /fed\s+up\s+with/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /sick\s+(of|and\s+tired)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /had\s+enough/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /can't\s+take\s+it\s+anymore/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /driving\s+me\s+(crazy|insane|mad)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3,
    },
  ],

  // Positive contexts with intensifiers
  positive_contexts: [
    {
      pattern:
        /absolutely\s+(amazing|wonderful|fantastic|incredible|perfect|brilliant)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /really\s+(love|enjoy|like|appreciate|happy|excited)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3,
    },
    {
      pattern: /so\s+(happy|excited|thrilled|pleased|glad|grateful)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /extremely\s+(happy|pleased|satisfied|excited|thrilled)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /over\s+the\s+moon/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /on\s+cloud\s+nine/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /walking\s+on\s+air/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /tickled\s+pink/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /jumping\s+for\s+joy/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /couldn't\s+be\s+happier/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /best\s+(day|time|moment|experience)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /feeling\s+(great|amazing|wonderful|fantastic)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3,
    },

    // Success and achievement patterns
    {
      pattern: /(finally|at\s+last)\s+(worked|succeeded|made\s+it)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /dream\s+come\s+true/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /exceeded\s+expectations/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /beyond\s+my\s+wildest\s+dreams/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 4,
    },
    {
      pattern: /couldn't\s+ask\s+for\s+more/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },

    // Complex positive patterns
    {
      pattern: /even\s+better\s+than\s+(expected|hoped|imagined)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /turned\s+out\s+(perfect|great|amazing|wonderful)/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3,
    },
    {
      pattern: /glad\s+(it|things|everything)\s+worked\s+out/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3,
    },
    {
      pattern: /happy\s+with\s+how\s+(it|things|everything)\s+turned\s+out/gi,
      emotion: "joy",
      sentiment: "positive",
      weight: 3,
    },
  ],

  // Fear and anxiety patterns
  fear_contexts: [
    {
      pattern: /scared\s+to\s+death/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /frightened\s+out\s+of\s+my\s+wits/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /shaking\s+like\s+a\s+leaf/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /heart\s+(racing|pounding|in\s+my\s+throat)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /breaking\s+out\s+in\s+cold\s+sweat/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /paralyzed\s+with\s+fear/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /frozen\s+with\s+terror/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /nightmare\s+(scenario|situation)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /worst\s+case\s+scenario/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /what\s+if\s+(something|everything)\s+goes\s+wrong/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /can't\s+stop\s+worrying/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /keeps\s+me\s+up\s+at\s+night/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 3,
    },
  ],

  // Anger and frustration patterns
  anger_contexts: [
    {
      pattern: /makes\s+my\s+blood\s+boil/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /seeing\s+red/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /lost\s+my\s+temper/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /blew\s+my\s+top/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /hit\s+the\s+roof/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /steam\s+coming\s+out\s+of\s+my\s+ears/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /want\s+to\s+(scream|punch|throw)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /drives\s+me\s+(crazy|insane|up\s+the\s+wall)/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /gets\s+on\s+my\s+nerves/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /pushes\s+my\s+buttons/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /last\s+straw/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /breaking\s+point/gi,
      emotion: "anger",
      sentiment: "negative",
      weight: 3.5,
    },
  ],

  // Sadness and disappointment patterns
  sadness_contexts: [
    {
      pattern: /heart\s+(broken|shattered|crushed)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /tears\s+in\s+my\s+eyes/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /crying\s+my\s+eyes\s+out/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /feeling\s+(down|blue|low|depressed)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /hit\s+rock\s+bottom/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /lost\s+all\s+hope/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /nothing\s+to\s+live\s+for/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /world\s+is\s+falling\s+apart/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /drowning\s+in\s+sorrow/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /heavy\s+heart/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /can't\s+stop\s+crying/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3.5,
    },
  ],

  // Surprise patterns
  surprise_contexts: [
    {
      pattern: /can't\s+believe\s+(my\s+eyes|it|this)/gi,
      emotion: "surprise",
      sentiment: "neutral",
      weight: 3.5,
    },
    {
      pattern: /jaw\s+dropped/gi,
      emotion: "surprise",
      sentiment: "neutral",
      weight: 3.5,
    },
    {
      pattern: /mind\s+(blown|blowing)/gi,
      emotion: "surprise",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /knocked\s+my\s+socks\s+off/gi,
      emotion: "surprise",
      sentiment: "positive",
      weight: 3.5,
    },
    {
      pattern: /out\s+of\s+the\s+blue/gi,
      emotion: "surprise",
      sentiment: "neutral",
      weight: 3,
    },
    {
      pattern: /came\s+out\s+of\s+nowhere/gi,
      emotion: "surprise",
      sentiment: "neutral",
      weight: 3,
    },
    {
      pattern: /caught\s+me\s+off\s+guard/gi,
      emotion: "surprise",
      sentiment: "neutral",
      weight: 3,
    },
    {
      pattern: /never\s+saw\s+it\s+coming/gi,
      emotion: "surprise",
      sentiment: "neutral",
      weight: 3,
    },
    {
      pattern: /speechless/gi,
      emotion: "surprise",
      sentiment: "neutral",
      weight: 2.5,
    },
    {
      pattern: /blown\s+away/gi,
      emotion: "surprise",
      sentiment: "positive",
      weight: 3,
    },
  ],

  // Disgust patterns
  disgust_contexts: [
    {
      pattern: /makes\s+me\s+(sick|nauseous|want\s+to\s+throw\s+up)/gi,
      emotion: "disgust",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /turns\s+my\s+stomach/gi,
      emotion: "disgust",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /want\s+to\s+puke/gi,
      emotion: "disgust",
      sentiment: "negative",
      weight: 3.5,
    },
    {
      pattern: /absolutely\s+(disgusting|revolting|repulsive)/gi,
      emotion: "disgust",
      sentiment: "negative",
      weight: 4,
    },
    {
      pattern: /can't\s+stomach\s+it/gi,
      emotion: "disgust",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /gross\s+me\s+out/gi,
      emotion: "disgust",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern: /makes\s+me\s+gag/gi,
      emotion: "disgust",
      sentiment: "negative",
      weight: 3.5,
    },
  ],

  // Complex mixed sentiment patterns
  mixed_contexts: [
    {
      pattern:
        /but\s+(not|never|no|nothing)\s+(good|great|amazing|wonderful)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern:
        /although\s+(good|great|nice)\s+but\s+(not|never|terrible|awful)/gi,
      emotion: "neutral",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern:
        /even\s+though\s+(good|great|nice)\s+(still|but|however)\s+(bad|terrible|awful)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
    {
      pattern:
        /was\s+(good|great|nice)\s+until\s+(it|things|everything)\s+(went|got|became)\s+(bad|wrong|terrible)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 3,
    },
  ],

  // Conditional contexts
  conditional_contexts: [
    {
      pattern:
        /if\s+only\s+(it|things|everything)\s+(were|was)\s+(better|different|good)/gi,
      emotion: "sadness",
      sentiment: "negative",
      weight: 2.5,
    },
    {
      pattern: /would\s+be\s+(better|great|perfect)\s+if\s+(only|just)/gi,
      emotion: "neutral",
      sentiment: "neutral",
      weight: 2,
    },
    {
      pattern:
        /unless\s+(something|things|everything)\s+(changes|improves|gets\s+better)/gi,
      emotion: "fear",
      sentiment: "negative",
      weight: 2.5,
    },
  ],
};

// Enhanced negation patterns with scope detection
const NEGATION_PATTERNS = [
  {
    pattern:
      /\b(not|no|never|nothing|nobody|nowhere|neither|nor|none|cannot|can't|won't|wouldn't|shouldn't|couldn't|mustn't|needn't|daren't|mayn't|oughtn't|mightn't)\b/gi,
    strength: 1.0,
    scope: 5, // words after negation
  },
  {
    pattern:
      /\b(don't|doesn't|didn't|isn't|aren't|wasn't|weren't|haven't|hasn't|hadn't)\b/gi,
    strength: 1.0,
    scope: 5,
  },
  {
    pattern: /\b(barely|hardly|scarcely|seldom|rarely)\b/gi,
    strength: 0.7,
    scope: 4,
  },
  {
    pattern: /\b(without|lacking|missing|absent|fail|failed|unable)\b/gi,
    strength: 0.8,
    scope: 4,
  },
];

// Intensifier patterns with weights
const INTENSIFIERS = {
  strong: {
    patterns: [
      /\b(extremely|absolutely|completely|totally|utterly|incredibly|amazingly|tremendously|enormously|exceptionally)\b/gi,
    ],
    weight: 2.0,
  },
  medium: {
    patterns: [
      /\b(very|really|quite|pretty|fairly|rather|somewhat|considerably|significantly)\b/gi,
    ],
    weight: 1.5,
  },
  weak: {
    patterns: [
      /\b(a\s+bit|slightly|kind\s+of|sort\s+of|a\s+little|mildly)\b/gi,
    ],
    weight: 0.7,
  },
};

// Comprehensive keyword database
const EMOTION_KEYWORDS = {
  anger: [
    // Basic level
    "angry",
    "mad",
    "hate",
    "furious",
    "rage",
    "upset",
    "annoyed",
    "irritated",
    "pissed",
    // Intermediate level
    "frustrated",
    "outraged",
    "livid",
    "enraged",
    "infuriated",
    "aggravated",
    "exasperated",
    "resentful",
    "hostile",
    "bitter",
    "indignant",
    "wrathful",
    "incensed",
    "irate",
    // Advanced level
    "apoplectic",
    "choleric",
    "truculent",
    "bellicose",
    "belligerent",
    "cantankerous",
    "irascible",
    "petulant",
    "querulous",
    "rancorous",
    "vindictive",
    "vitriolic",
    // Contextual additions
    "seething",
    "boiling",
    "steaming",
    "fuming",
    "raging",
    "storming",
    "exploding",
    "snapping",
    "losing it",
    "fed up",
    "sick of",
    "had enough",
    "breaking point",
    "last straw",
    "drives crazy",
    "gets nerves",
    "pushes buttons",
    "ticks off",
    "cheesed off",
    "hacked off",
    "bent shape",
    "hot bothered",
    "seeing red",
    "blood boiling",
    "steam ears",
    "hit roof",
    "blew top",
    "lost temper",
    // Situational anger
    "unfair",
    "unjust",
    "ridiculous",
    "outrageous",
    "unacceptable",
    "intolerable",
    "infuriating",
    "maddening",
    "aggravating",
    "irritating",
    "annoying",
    "frustrating",
  ],

  disgust: [
    // Basic level
    "gross",
    "yuck",
    "eww",
    "nasty",
    "sick",
    "disgusting",
    "awful",
    "terrible",
    "horrible",
    // Intermediate level
    "revolting",
    "repulsive",
    "repugnant",
    "nauseating",
    "sickening",
    "appalling",
    "abhorrent",
    "loathsome",
    "detestable",
    "despicable",
    "contemptible",
    "odious",
    // Advanced level
    "abominable",
    "execrable",
    "heinous",
    "atrocious",
    "ghastly",
    "macabre",
    "grotesque",
    "monstrous",
    "vile",
    "putrid",
    "fetid",
    "rancid",
    "noisome",
    "noxious",
    "pestilent",
    // Contextual additions
    "stomach turning",
    "makes sick",
    "want puke",
    "gag reflex",
    "dry heave",
    "bile rising",
    "stomach churning",
    "feel queasy",
    "turn nose",
    "hold nose",
    "can't stomach",
    "makes gag",
    "want throw up",
    "feel nauseous",
    "sick stomach",
    // Sensory disgust
    "stinks",
    "reeks",
    "smells awful",
    "foul odor",
    "rotten",
    "spoiled",
    "moldy",
    "slimy",
    "grimy",
    "filthy",
    "dirty",
    "contaminated",
    "polluted",
    "tainted",
    "rank",
    "funky",
    "sketchy",
    "shady",
    "creepy",
    "weird",
    "bizarre",
    "freaky",
  ],

  fear: [
    // Basic level
    "scared",
    "afraid",
    "frightened",
    "worried",
    "nervous",
    "anxious",
    "panic",
    "terror",
    // Intermediate level
    "terrified",
    "petrified",
    "horrified",
    "alarmed",
    "startled",
    "spooked",
    "unnerved",
    "apprehensive",
    "fearful",
    "timid",
    "trembling",
    "shaking",
    "quaking",
    "cowering",
    // Advanced level
    "trepidation",
    "consternation",
    "perturbation",
    "disquietude",
    "foreboding",
    "premonition",
    "misgiving",
    "qualm",
    "compunction",
    "pusillanimous",
    "craven",
    // Contextual additions
    "heart racing",
    "cold sweat",
    "butterflies",
    "knot stomach",
    "goosebumps",
    "hair standing",
    "shaking leaf",
    "scared death",
    "frightened wits",
    "scared stiff",
    "frozen fear",
    "paralyzed terror",
    "white sheet",
    "heart throat",
    "breaking sweat",
    "nightmare scenario",
    "worst case",
    "what if",
    "can't stop worrying",
    "keeps up night",
    // Situational fear
    "dangerous",
    "threatening",
    "menacing",
    "ominous",
    "sinister",
    "eerie",
    "spooky",
    "haunting",
    "chilling",
    "bone chilling",
    "spine tingling",
    "hair raising",
    "blood curdling",
    "nerve wracking",
    "gut wrenching",
    "heart stopping",
  ],

  joy: [
    // Basic level
    "happy",
    "glad",
    "excited",
    "cheerful",
    "joyful",
    "pleased",
    "delighted",
    "thrilled",
    // Intermediate level
    "ecstatic",
    "elated",
    "euphoric",
    "exhilarated",
    "overjoyed",
    "jubilant",
    "exuberant",
    "radiant",
    "beaming",
    "glowing",
    "sparkling",
    "bubbling",
    "bouncing",
    "dancing",
    // Advanced level
    "rapturous",
    "rhapsodic",
    "effervescent",
    "vivacious",
    "ebullient",
    "buoyant",
    "sanguine",
    "optimistic",
    "upbeat",
    "spirited",
    "animated",
    "lively",
    "energetic",
    // Contextual additions
    "cloud nine",
    "over moon",
    "walking air",
    "flying high",
    "top world",
    "seventh heaven",
    "tickled pink",
    "pleased punch",
    "happy clam",
    "grinning ear",
    "jumping joy",
    "dancing happiness",
    "clapping hands",
    "pumping fist",
    "couldn't happier",
    "best day",
    "dream come true",
    "exceeded expectations",
    "beyond wildest dreams",
    "couldn't ask more",
    "feeling great",
    "absolutely amazing",
    "really love",
    // Celebratory
    "celebrating",
    "partying",
    "cheering",
    "whooping",
    "hollering",
    "rejoicing",
    "festive",
    "merry",
    "jolly",
    "jovial",
    "gleeful",
    "mirthful",
    "lighthearted",
  ],

  sadness: [
    // Basic level
    "sad",
    "unhappy",
    "depressed",
    "down",
    "blue",
    "upset",
    "hurt",
    "crying",
    "tears",
    // Intermediate level
    "melancholy",
    "sorrowful",
    "mournful",
    "grieving",
    "heartbroken",
    "devastated",
    "despondent",
    "dejected",
    "crestfallen",
    "downcast",
    "downhearted",
    "disheartened",
    // Advanced level
    "inconsolable",
    "disconsolate",
    "lugubrious",
    "doleful",
    "woeful",
    "plaintive",
    "elegiac",
    "lachrymose",
    "morose",
    "sullen",
    "glum",
    "forlorn",
    "bereft",
    // Contextual additions
    "heart broken",
    "tears eyes",
    "crying eyes out",
    "feeling down",
    "hit rock bottom",
    "lost hope",
    "nothing live for",
    "world falling apart",
    "drowning sorrow",
    "heavy heart",
    "can't stop crying",
    "feeling blue",
    "down dumps",
    "under weather",
    "doldrums",
    "broken up",
    "torn apart",
    "falling apart",
    "coming undone",
    "rock bottom",
    // Grief and loss
    "mourning",
    "grieving",
    "lamenting",
    "bereaved",
    "orphaned",
    "widowed",
    "lost",
    "missing",
    "longing",
    "yearning",
    "pining",
    "aching",
    "hurting",
    "suffering",
    "lonely",
    "alone",
    "isolated",
    "abandoned",
    "forsaken",
    "rejected",
    "excluded",
  ],

  surprise: [
    // Basic level
    "surprised",
    "shocked",
    "amazed",
    "astonished",
    "stunned",
    "startled",
    "wow",
    "whoa",
    // Intermediate level
    "astounded",
    "flabbergasted",
    "dumbfounded",
    "bewildered",
    "perplexed",
    "confounded",
    "taken aback",
    "caught guard",
    "blindsided",
    "speechless",
    "breathless",
    // Advanced level
    "stupefied",
    "nonplussed",
    "discombobulated",
    "thunderstruck",
    "awestruck",
    "bamboozled",
    "befuddled",
    "mystified",
    "baffled",
    "puzzled",
    "perturbed",
    // Contextual additions
    "jaw dropped",
    "eyes wide",
    "mouth agape",
    "can't believe",
    "no way",
    "are kidding",
    "you're joking",
    "get out",
    "shut up",
    "seriously",
    "for real",
    "oh god",
    "holy cow",
    "good grief",
    "mind blown",
    "blown away",
    "knocked socks off",
    "out blue",
    "came nowhere",
    "caught off guard",
    "never saw coming",
    "speechless",
    "absolutely stunned",
    "completely flabbergasted",
    "totally blown away",
    "utterly astounded",
  ],

  neutral: [
    // Basic states
    "okay",
    "fine",
    "alright",
    "normal",
    "regular",
    "usual",
    "typical",
    "average",
    // Calm states
    "calm",
    "peaceful",
    "relaxed",
    "composed",
    "collected",
    "tranquil",
    "serene",
    "placid",
    "unruffled",
    "undisturbed",
    "unperturbed",
    "steady",
    "stable",
    // Indifferent
    "indifferent",
    "apathetic",
    "uninterested",
    "unconcerned",
    "detached",
    "distant",
    "aloof",
    "removed",
    "uninvolved",
    "dispassionate",
    "impartial",
    "objective",
    // Balanced
    "balanced",
    "even",
    "level",
    "moderate",
    "measured",
    "controlled",
    "restrained",
    "temperate",
    "reasonable",
    "rational",
    "logical",
    "sensible",
    "practical",
  ],
};

// Enhanced sentiment keywords
const SENTIMENT_KEYWORDS = {
  positive: [
    ...EMOTION_KEYWORDS.joy,
    "good",
    "great",
    "excellent",
    "wonderful",
    "amazing",
    "fantastic",
    "awesome",
    "brilliant",
    "superb",
    "outstanding",
    "magnificent",
    "marvelous",
    "spectacular",
    "phenomenal",
    "incredible",
    "unbelievable",
    "extraordinary",
    "remarkable",
    "impressive",
    "stunning",
    "beautiful",
    "lovely",
    "gorgeous",
    "perfect",
    "ideal",
    "flawless",
    "pristine",
    "immaculate",
    "spotless",
    "pure",
    "clean",
    // Success and achievement
    "successful",
    "victorious",
    "triumphant",
    "winning",
    "accomplished",
    "achieved",
    "fulfilled",
    "satisfied",
    "content",
    "blessed",
    "fortunate",
    "lucky",
    "grateful",
  ],
  negative: [
    ...EMOTION_KEYWORDS.anger,
    ...EMOTION_KEYWORDS.disgust,
    ...EMOTION_KEYWORDS.fear,
    ...EMOTION_KEYWORDS.sadness,
    "bad",
    "terrible",
    "awful",
    "horrible",
    "disgusting",
    "revolting",
    "appalling",
    "dreadful",
    "atrocious",
    "abysmal",
    "deplorable",
    "despicable",
    "contemptible",
    "detestable",
    "loathsome",
    "repugnant",
    "repulsive",
    "vile",
    "foul",
    "rotten",
    // Failure and disappointment
    "failed",
    "failure",
    "disaster",
    "catastrophe",
    "nightmare",
    "tragedy",
    "crisis",
    "problem",
    "issue",
    "trouble",
    "difficulty",
    "struggle",
    "challenge",
    "obstacle",
  ],
  neutral: [
    ...EMOTION_KEYWORDS.neutral,
    ...EMOTION_KEYWORDS.surprise,
    "think",
    "believe",
    "consider",
    "suppose",
    "assume",
    "presume",
    "imagine",
    "wonder",
    "question",
    "doubt",
    "maybe",
    "perhaps",
    "possibly",
    "probably",
    "seems",
    "appears",
    "looks",
    "sounds",
    "feels",
    "might",
    "could",
    "would",
  ],
};

// ENHANCED: Complex sentence analysis functions
const detectSentenceComplexity = (sentence: string): string => {
  const text = sentence.toLowerCase();

  if (
    SENTENCE_COMPLEXITY_PATTERNS.compound.some((pattern) => pattern.test(text))
  ) {
    return "compound";
  }
  if (
    SENTENCE_COMPLEXITY_PATTERNS.complex.some((pattern) => pattern.test(text))
  ) {
    return "complex";
  }
  if (
    SENTENCE_COMPLEXITY_PATTERNS.conditional.some((pattern) =>
      pattern.test(text),
    )
  ) {
    return "conditional";
  }
  if (
    SENTENCE_COMPLEXITY_PATTERNS.comparative.some((pattern) =>
      pattern.test(text),
    )
  ) {
    return "comparative";
  }
  if (
    SENTENCE_COMPLEXITY_PATTERNS.contrastive.some((pattern) =>
      pattern.test(text),
    )
  ) {
    return "contrastive";
  }

  return "simple";
};

const splitIntoSentences = (text: string): string[] => {
  // Enhanced sentence splitting that handles complex punctuation
  return text
    .replace(/([.!?]+)\s+/g, "$1|")
    .split("|")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
};

const splitCompoundSentence = (sentence: string): string[] => {
  const segments: string[] = [];
  let currentSegment = "";
  const words = sentence.split(/\s+/);

  for (let i = 0; i < words.length; i++) {
    const word = words[i]!.toLowerCase();

    // Check for coordinating conjunctions
    if (["and", "but", "or", "yet", "so", "for", "nor"].includes(word)) {
      if (currentSegment.trim()) {
        segments.push(currentSegment.trim());
        currentSegment = "";
      }
    } else {
      currentSegment += (currentSegment ? " " : "") + words[i];
    }
  }

  if (currentSegment.trim()) {
    segments.push(currentSegment.trim());
  }

  return segments.length > 1 ? segments : [sentence];
};

const analyzeNegationContext = (text: string) => {
  const negationScopes: Array<{
    start: number;
    end: number;
    strength: number;
  }> = [];

  NEGATION_PATTERNS.forEach(({ pattern, strength, scope }) => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const scopeEnd = Math.min(text.length, match.index + scope * 10); // approximate word boundaries
      negationScopes.push({
        start: match.index,
        end: scopeEnd,
        strength,
      });
    }
  });

  return negationScopes;
};

const analyzeIntensifiers = (text: string) => {
  let intensifierMultiplier = 1;

  Object.entries(INTENSIFIERS).forEach(([level, { patterns, weight }]) => {
    patterns.forEach((pattern) => {
      if (pattern.test(text)) {
        intensifierMultiplier = Math.max(intensifierMultiplier, weight);
      }
    });
  });

  return intensifierMultiplier;
};

const analyzeContextualPatterns = (text: string, baseWeight: number) => {
  const emotionScores = {
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    sadness: 0,
    surprise: 0,
    neutral: 0,
  };
  const sentimentScores = { positive: 0, negative: 0, neutral: 0 };
  const detectedPatterns: string[] = [];

  Object.entries(CONTEXTUAL_PATTERNS).forEach(([category, patterns]) => {
    patterns.forEach(({ pattern, emotion, sentiment, weight }) => {
      const matches = text.match(pattern);
      if (matches) {
        const adjustedWeight = weight * baseWeight;
        emotionScores[emotion as keyof typeof emotionScores] += adjustedWeight;
        sentimentScores[sentiment as keyof typeof sentimentScores] +=
          adjustedWeight;
        detectedPatterns.push(matches[0]);
      }
    });
  });

  return { emotionScores, sentimentScores, detectedPatterns };
};

const analyzeKeywords = (text: string, baseWeight: number) => {
  const emotionScores = {
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    sadness: 0,
    surprise: 0,
    neutral: 0,
  };
  const sentimentScores = { positive: 0, negative: 0, neutral: 0 };
  const detectedKeywords: string[] = [];

  const words = text
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0);

  words.forEach((word) => {
    // Check emotion keywords
    Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
      if (keywords.includes(word)) {
        detectedKeywords.push(word);
        emotionScores[emotion as keyof typeof emotionScores] += baseWeight;
      }
    });

    // Check sentiment keywords
    Object.entries(SENTIMENT_KEYWORDS).forEach(([sentiment, keywords]) => {
      if (keywords.includes(word)) {
        sentimentScores[sentiment as keyof typeof sentimentScores] +=
          baseWeight;
      }
    });
  });

  return { emotionScores, sentimentScores, detectedKeywords };
};

const combineAnalysisResults = (analysisData: any) => {
  const {
    contextual,
    keywords,
    negation,
    intensifier,
    complexity,
    baseWeight,
  } = analysisData;

  // Combine emotion scores
  const emotionScores = {
    anger: 0,
    disgust: 0,
    fear: 0,
    joy: 0,
    sadness: 0,
    surprise: 0,
    neutral: 0,
  };
  const sentimentScores = { positive: 0, negative: 0, neutral: 0 };

  // Add contextual scores (higher priority)
  Object.keys(emotionScores).forEach((emotion) => {
    emotionScores[emotion as keyof typeof emotionScores] +=
      contextual.emotionScores[emotion] * 1.5;
  });

  Object.keys(sentimentScores).forEach((sentiment) => {
    sentimentScores[sentiment as keyof typeof sentimentScores] +=
      contextual.sentimentScores[sentiment] * 1.5;
  });

  // Add keyword scores (lower priority)
  Object.keys(emotionScores).forEach((emotion) => {
    emotionScores[emotion as keyof typeof emotionScores] +=
      keywords.emotionScores[emotion] * 0.8;
  });

  Object.keys(sentimentScores).forEach((sentiment) => {
    sentimentScores[sentiment as keyof typeof sentimentScores] +=
      keywords.sentimentScores[sentiment] * 0.8;
  });

  // Apply negation
  const hasNegation = negation.length > 0;
  if (hasNegation) {
    // Flip positive to negative and reduce negative
    const originalPositive = sentimentScores.positive;
    const originalJoy = emotionScores.joy;

    sentimentScores.negative += originalPositive * 0.8;
    sentimentScores.positive *= 0.3;

    emotionScores.sadness += originalJoy * 0.8;
    emotionScores.joy *= 0.3;
  }

  // Apply intensifier
  Object.keys(emotionScores).forEach((emotion) => {
    emotionScores[emotion as keyof typeof emotionScores] *= intensifier;
  });

  Object.keys(sentimentScores).forEach((sentiment) => {
    sentimentScores[sentiment as keyof typeof sentimentScores] *= intensifier;
  });

  // Calculate dominant emotion and sentiment
  const topEmotion = Object.entries(emotionScores).reduce((a, b) =>
    emotionScores[a[0] as keyof typeof emotionScores] >
    emotionScores[b[0] as keyof typeof emotionScores]
      ? a
      : b,
  );

  const topSentiment = Object.entries(sentimentScores).reduce((a, b) =>
    sentimentScores[a[0] as keyof typeof sentimentScores] >
    sentimentScores[b[0] as keyof typeof sentimentScores]
      ? a
      : b,
  );

  // Calculate confidence
  const totalEmotionScore = Object.values(emotionScores).reduce(
    (sum, score) => sum + Math.max(0, score),
    0,
  );
  const totalSentimentScore = Object.values(sentimentScores).reduce(
    (sum, score) => sum + Math.max(0, score),
    0,
  );

  const emotionConfidence =
    totalEmotionScore > 0
      ? Math.max(
          0,
          emotionScores[topEmotion[0] as keyof typeof emotionScores],
        ) / totalEmotionScore
      : 0.1;
  const sentimentConfidence =
    totalSentimentScore > 0
      ? Math.max(
          0,
          sentimentScores[topSentiment[0] as keyof typeof sentimentScores],
        ) / totalSentimentScore
      : 0.1;

  // Apply complexity penalty
  const complexityPenalty = {
    simple: 0,
    compound: 0.1,
    complex: 0.15,
    conditional: 0.2,
    comparative: 0.12,
    contrastive: 0.18,
  };

  const penalty =
    complexityPenalty[complexity as keyof typeof complexityPenalty] || 0;

  const finalEmotionConfidence = Math.max(
    0.1,
    Math.min(1.0, emotionConfidence - penalty),
  );
  const finalSentimentConfidence = Math.max(
    0.1,
    Math.min(1.0, sentimentConfidence - penalty),
  );

  return {
    emotion: topEmotion[0],
    sentiment: topSentiment[0],
    emotionConfidence: finalEmotionConfidence,
    sentimentConfidence: finalSentimentConfidence,
    detectedKeywords: [
      ...contextual.detectedPatterns,
      ...keywords.detectedKeywords,
    ],
    emotionScores,
    sentimentScores,
    complexity,
    hasNegation,
    intensifierMultiplier: intensifier,
  };
};

const analyzeComplexSentiment = (text: string) => {
  const sentences = splitIntoSentences(text);
  const sentimentSegments: Array<{
    text: string;
    emotion: string;
    sentiment: string;
    emotionConfidence: number;
    sentimentConfidence: number;
    complexity: string;
  }> = [];

  sentences.forEach((sentence) => {
    const complexity = detectSentenceComplexity(sentence);
    const segments =
      complexity === "compound" ? splitCompoundSentence(sentence) : [sentence];

    segments.forEach((segment) => {
      const analysis = analyzeSegmentSentiment(segment, complexity);
      sentimentSegments.push({
        text: segment,
        ...analysis,
      });
    });
  });

  return aggregateSentiments(sentimentSegments);
};

const analyzeSegmentSentiment = (segment: string, complexity: string) => {
  const textLower = segment.toLowerCase();

  // Apply complexity-specific analysis weights
  const complexityWeights = {
    simple: 1.0,
    compound: 0.8,
    complex: 0.7,
    conditional: 0.6,
    comparative: 0.75,
    contrastive: 0.65,
  };

  const baseWeight =
    complexityWeights[complexity as keyof typeof complexityWeights] || 1.0;

  const contextualResults = analyzeContextualPatterns(textLower, baseWeight);
  const keywordResults = analyzeKeywords(textLower, baseWeight);
  const negationImpact = analyzeNegationContext(textLower);
  const intensifierImpact = analyzeIntensifiers(textLower);

  return combineAnalysisResults({
    contextual: contextualResults,
    keywords: keywordResults,
    negation: negationImpact,
    intensifier: intensifierImpact,
    complexity,
    baseWeight,
  });
};

const aggregateSentiments = (segments: any[]) => {
  if (segments.length === 1) {
    return segments[0];
  }

  // Weighted aggregation based on confidence scores
  let totalEmotionWeight = 0;
  let totalSentimentWeight = 0;
  const emotionVotes: Record<string, number> = {};
  const sentimentVotes: Record<string, number> = {};
  const allKeywords: string[] = [];

  segments.forEach((segment) => {
    const emotionWeight = segment.emotionConfidence;
    const sentimentWeight = segment.sentimentConfidence;

    emotionVotes[segment.emotion] =
      (emotionVotes[segment.emotion] || 0) + emotionWeight;
    sentimentVotes[segment.sentiment] =
      (sentimentVotes[segment.sentiment] || 0) + sentimentWeight;

    totalEmotionWeight += emotionWeight;
    totalSentimentWeight += sentimentWeight;
    allKeywords.push(...segment.detectedKeywords);
  });

  // Find dominant emotion and sentiment
  const dominantEmotion = Object.entries(emotionVotes).reduce((a, b) =>
    a[1] > b[1] ? a : b,
  );
  const dominantSentiment = Object.entries(sentimentVotes).reduce((a, b) =>
    a[1] > b[1] ? a : b,
  );

  return {
    emotion: dominantEmotion[0],
    sentiment: dominantSentiment[0],
    emotionConfidence:
      totalEmotionWeight > 0 ? dominantEmotion[1] / totalEmotionWeight : 0.1,
    sentimentConfidence:
      totalSentimentWeight > 0
        ? dominantSentiment[1] / totalSentimentWeight
        : 0.1,
    detectedKeywords: [...new Set(allKeywords)],
    segments: segments.length,
    complexity: segments.some((s) => s.complexity !== "simple")
      ? "complex"
      : "simple",
  };
};

// Performance monitoring interface
interface PerformanceMetrics {
  recordingStartTime: number | null;
  analysisCount: number;
  averageConfidence: number;
  totalProcessingTime: number;
}

// Enhanced state interface
interface LiveDetectionState {
  isRecording: boolean;
  isAnalyzing: boolean;
  duration: number;
  currentEmotion: string;
  currentSentiment: string;
  transcriptText: string;
  isListening: boolean;
  error: string | null;
  performance: PerformanceMetrics;
  emotionConfidence: number;
  sentimentConfidence: number;
  detectedKeywords: string[];
}

interface LiveDetectionActions {
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  startListening: () => void;
  stopListening: () => void;
  resetSession: () => void;
  getVideoBlob: () => Blob | null;
  getPerformanceMetrics: () => PerformanceMetrics;
}

// Optimized MIME type detection with caching
const getMimeTypeCache = new Map<string, boolean>();

const getSupportedMimeType = (): string => {
  const types = [
    "video/mp4;codecs=h264,aac",
    "video/mp4",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm",
  ];

  for (const type of types) {
    if (!getMimeTypeCache.has(type)) {
      getMimeTypeCache.set(type, MediaRecorder.isTypeSupported(type));
    }

    if (getMimeTypeCache.get(type)) {
      console.log(`✅ Using MIME type: ${type}`);
      return type;
    }
  }

  console.warn("⚠️ No supported MIME type found, using default");
  return "";
};

// Debounce utility
function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

export function useLiveDetection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const speechRecognitionRef = useRef<SpeechRecognition | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedBlobRef = useRef<Blob | null>(null);
  const performanceRef = useRef<PerformanceMetrics>({
    recordingStartTime: null,
    analysisCount: 0,
    averageConfidence: 0,
    totalProcessingTime: 0,
  });

  const [state, setState] = useState<LiveDetectionState>({
    isRecording: false,
    isAnalyzing: false,
    duration: 0,
    currentEmotion: "neutral",
    currentSentiment: "neutral",
    transcriptText: "",
    isListening: false,
    error: null,
    performance: performanceRef.current,
    emotionConfidence: 0,
    sentimentConfidence: 0,
    detectedKeywords: [],
  });

  // ENHANCED: Advanced contextual sentiment analysis with complex sentence support
  const analyzeTextSentiment = useMemo(() => {
    return (text: string) => {
      console.log("🔍 Analyzing complex text:", text);

      // Check if it's a complex sentence
      const complexity = detectSentenceComplexity(text);
      console.log(`📊 Sentence complexity: ${complexity}`);

      if (
        complexity === "compound" ||
        complexity === "complex" ||
        complexity === "contrastive"
      ) {
        return analyzeComplexSentiment(text);
      } else {
        // Use existing simple analysis for basic sentences
        return analyzeSimpleSentiment(text);
      }
    };
  }, []);

  // Simple sentence analysis (optimized version of your existing logic)
  const analyzeSimpleSentiment = (text: string) => {
    const originalText = text;
    const textLower = text.toLowerCase();

    console.log("🔍 Analyzing simple text:", text);

    const detectedKeywords: string[] = [];
    const emotionScores = {
      anger: 0,
      disgust: 0,
      fear: 0,
      joy: 0,
      sadness: 0,
      surprise: 0,
      neutral: 0,
    };

    const sentimentScores = {
      positive: 0,
      negative: 0,
      neutral: 0,
    };

    // STEP 1: Check for contextual patterns first (highest priority)
    let contextualMatchFound = false;
    Object.entries(CONTEXTUAL_PATTERNS).forEach(([category, patterns]) => {
      patterns.forEach(({ pattern, emotion, sentiment, weight }) => {
        const matches = textLower.match(pattern);
        if (matches) {
          contextualMatchFound = true;
          console.log(
            `🎯 Contextual match found: "${matches[0]}" -> ${emotion}/${sentiment} (weight: ${weight})`,
          );

          detectedKeywords.push(matches[0]);
          emotionScores[emotion as keyof typeof emotionScores] += weight;
          sentimentScores[sentiment as keyof typeof sentimentScores] += weight;
        }
      });
    });

    // STEP 2: Check for negation patterns
    let hasNegation = false;
    NEGATION_PATTERNS.forEach(({ pattern }) => {
      if (pattern.test(textLower)) {
        hasNegation = true;
        console.log("❌ Negation detected:", pattern);
      }
    });

    // STEP 3: Calculate intensifier multiplier
    let intensityMultiplier = 1;
    Object.entries(INTENSIFIERS).forEach(([level, { patterns, weight }]) => {
      patterns.forEach((pattern) => {
        if (pattern.test(textLower)) {
          intensityMultiplier = weight;
          console.log(
            `📈 Intensifier detected (${level}): multiplier = ${weight}`,
          );
        }
      });
    });

    // STEP 4: Individual word analysis (lower priority if contextual match found)
    const words = textLower
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 0);

    const wordWeight = contextualMatchFound ? 0.3 : 1; // Reduce individual word impact if contextual patterns found

    words.forEach((word) => {
      // Check emotion keywords
      Object.entries(EMOTION_KEYWORDS).forEach(([emotion, keywords]) => {
        if (keywords.includes(word)) {
          detectedKeywords.push(word);
          let score = wordWeight * intensityMultiplier;

          // Apply negation
          if (hasNegation && (emotion === "joy" || emotion === "surprise")) {
            // Negate positive emotions
            emotionScores.sadness += score;
            emotionScores[emotion as keyof typeof emotionScores] -= score * 0.5;
          } else if (
            hasNegation &&
            (emotion === "anger" ||
              emotion === "sadness" ||
              emotion === "fear" ||
              emotion === "disgust")
          ) {
            // Reduce negative emotions with negation
            emotionScores[emotion as keyof typeof emotionScores] += score * 0.3;
          } else {
            emotionScores[emotion as keyof typeof emotionScores] += score;
          }
        }
      });

      // Check sentiment keywords
      Object.entries(SENTIMENT_KEYWORDS).forEach(([sentiment, keywords]) => {
        if (keywords.includes(word)) {
          let score = wordWeight * intensityMultiplier;

          // Apply negation
          if (hasNegation && sentiment === "positive") {
            sentimentScores.negative += score;
            sentimentScores.positive -= score * 0.5;
          } else if (hasNegation && sentiment === "negative") {
            sentimentScores.positive += score * 0.3;
            sentimentScores.negative += score * 0.3;
          } else {
            sentimentScores[sentiment as keyof typeof sentimentScores] += score;
          }
        }
      });
    });

    // STEP 5: Determine dominant emotion and sentiment
    const topEmotion = Object.entries(emotionScores).reduce((a, b) =>
      emotionScores[a[0] as keyof typeof emotionScores] >
      emotionScores[b[0] as keyof typeof emotionScores]
        ? a
        : b,
    );

    const topSentiment = Object.entries(sentimentScores).reduce((a, b) =>
      sentimentScores[a[0] as keyof typeof sentimentScores] >
      sentimentScores[b[0] as keyof typeof sentimentScores]
        ? a
        : b,
    );

    // STEP 6: Calculate confidence scores
    const totalEmotionScore = Object.values(emotionScores).reduce(
      (sum, score) => sum + Math.max(0, score),
      0,
    );
    const totalSentimentScore = Object.values(sentimentScores).reduce(
      (sum, score) => sum + Math.max(0, score),
      0,
    );

    const emotionConfidence =
      totalEmotionScore > 0
        ? Math.max(
            0,
            emotionScores[topEmotion[0] as keyof typeof emotionScores],
          ) / totalEmotionScore
        : 0.1;
    const sentimentConfidence =
      totalSentimentScore > 0
        ? Math.max(
            0,
            sentimentScores[topSentiment[0] as keyof typeof sentimentScores],
          ) / totalSentimentScore
        : 0.1;

    // STEP 7: Apply confidence thresholds
    const finalEmotion = emotionConfidence > 0.2 ? topEmotion[0] : "neutral";
    const finalSentiment =
      sentimentConfidence > 0.2 ? topSentiment[0] : "neutral";

    console.log("📊 Simple analysis results:", {
      text: originalText,
      emotion: finalEmotion,
      sentiment: finalSentiment,
      emotionConfidence: emotionConfidence.toFixed(3),
      sentimentConfidence: sentimentConfidence.toFixed(3),
      contextualMatch: contextualMatchFound,
      hasNegation,
      intensityMultiplier,
      emotionScores,
      sentimentScores,
      detectedKeywords,
    });

    return {
      emotion: finalEmotion,
      sentiment: finalSentiment,
      emotionConfidence: Math.min(emotionConfidence, 1.0),
      sentimentConfidence: Math.min(sentimentConfidence, 1.0),
      detectedKeywords: [...new Set(detectedKeywords)],
      emotionScores,
      sentimentScores,
      complexity: "simple",
    };
  };

  // Enhanced speech recognition setup
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        console.log("🎤 Speech recognition started");
        setState((prev) => ({ ...prev, isListening: true, error: null }));
      };

      recognition.onend = () => {
        console.log("🎤 Speech recognition ended");
        setState((prev) => ({ ...prev, isListening: false }));
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        setState((prev) => ({
          ...prev,
          isListening: false,
          error: `Speech recognition error: ${event.error}`,
        }));
      };

      // Enhanced result processing with debouncing
      let debounceTimer: NodeJS.Timeout;
      recognition.onresult = (event: any) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          let finalTranscript = "";
          let interimTranscript = "";

          try {
            for (let i = event.resultIndex; i < event.results.length; i++) {
              const result = event.results[i];
              if (result && result.length > 0 && result[0]) {
                const transcript = result[0].transcript;
                if (result.isFinal) {
                  finalTranscript += transcript;
                } else {
                  interimTranscript += transcript;
                }
              }
            }

            const fullText = finalTranscript + interimTranscript;
            setState((prev) => ({ ...prev, transcriptText: fullText }));

            // Enhanced sentiment analysis with performance tracking
            if (fullText.trim()) {
              const startTime = performance.now();
              const analysis = analyzeTextSentiment(fullText);
              const processingTime = performance.now() - startTime;

              // Update performance metrics
              performanceRef.current.analysisCount++;
              performanceRef.current.totalProcessingTime += processingTime;
              performanceRef.current.averageConfidence =
                (performanceRef.current.averageConfidence +
                  analysis.emotionConfidence) /
                2;

              console.log(
                `🧠 Enhanced Analysis: ${analysis.emotion} (${(analysis.emotionConfidence * 100).toFixed(1)}%) | ${analysis.sentiment} (${(analysis.sentimentConfidence * 100).toFixed(1)}%) | Complexity: ${analysis.complexity}`,
              );

              setState((prev) => ({
                ...prev,
                currentSentiment: analysis.sentiment,
                currentEmotion: analysis.emotion,
                emotionConfidence: analysis.emotionConfidence,
                sentimentConfidence: analysis.sentimentConfidence,
                detectedKeywords: analysis.detectedKeywords,
                performance: { ...performanceRef.current },
              }));
            }
          } catch (error) {
            console.error("Speech recognition result processing error:", error);
          }
        }, 100); // 100ms debounce
      };

      speechRecognitionRef.current = recognition;
    }

    return () => {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch (error) {
          console.warn("Cleanup speech recognition stop failed:", error);
        }
      }
    };
  }, [analyzeTextSentiment]);

  // Enhanced duration timer with auto-stop
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.isRecording) {
      interval = setInterval(() => {
        setState((prev) => {
          const newDuration = prev.duration + 1;

          // Auto-stop at 60 seconds
          if (newDuration >= 60) {
            setTimeout(() => {
              if (
                mediaRecorderRef.current &&
                mediaRecorderRef.current.state === "recording"
              ) {
                mediaRecorderRef.current.stop();
              }
            }, 100);
          }

          return { ...prev, duration: newDuration };
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isRecording]);

  const startCamera = useCallback(async (): Promise<void> => {
    try {
      setState((prev) => ({ ...prev, error: null }));

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 },
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      streamRef.current = stream;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to access camera";
      setState((prev) => ({ ...prev, error: errorMessage }));
    }
  }, []);

  const stopCamera = useCallback((): void => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const startRecording = useCallback(async (): Promise<void> => {
    if (!streamRef.current) return;

    try {
      chunksRef.current = [];
      recordedBlobRef.current = null;

      performanceRef.current = {
        recordingStartTime: Date.now(),
        analysisCount: 0,
        averageConfidence: 0,
        totalProcessingTime: 0,
      };

      const mimeType = getSupportedMimeType();
      const mediaRecorderOptions: any = {};
      if (mimeType) {
        mediaRecorderOptions.mimeType = mimeType;
      }

      const mediaRecorder = new MediaRecorder(
        streamRef.current,
        mediaRecorderOptions,
      );

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const finalBlob = new Blob(chunksRef.current, { type: "video/mp4" });
          recordedBlobRef.current = finalBlob;
          console.log(
            `📹 Recording complete: ${(finalBlob.size / 1024 / 1024).toFixed(2)}MB`,
          );
        }

        setState((prev) => ({ ...prev, isRecording: false }));
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);

      setState((prev) => ({
        ...prev,
        isRecording: true,
        duration: 0,
        isAnalyzing: true,
        performance: performanceRef.current,
      }));

      if (speechRecognitionRef.current && !state.isListening) {
        try {
          speechRecognitionRef.current.start();
        } catch (speechError) {
          console.warn("Speech recognition start failed:", speechError);
        }
      }
    } catch (error) {
      console.error("Failed to start recording:", error);
      setState((prev) => ({
        ...prev,
        error: `Failed to start recording: ${error instanceof Error ? error.message : "Unknown error"}`,
      }));
    }
  }, [state.isListening]);

  const stopRecording = useCallback((): void => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
    }

    if (speechRecognitionRef.current && state.isListening) {
      try {
        speechRecognitionRef.current.stop();
      } catch (error) {
        console.warn("Failed to stop speech recognition:", error);
      }
    }

    setState((prev) => ({ ...prev, isAnalyzing: false, isListening: false }));
  }, [state.isRecording, state.isListening]);

  const startListening = useCallback((): void => {
    if (speechRecognitionRef.current && !state.isListening) {
      try {
        speechRecognitionRef.current.start();
      } catch (error) {
        console.warn("Speech recognition start failed:", error);
      }
    }
  }, [state.isListening]);

  const stopListening = useCallback((): void => {
    if (speechRecognitionRef.current && state.isListening) {
      try {
        speechRecognitionRef.current.stop();
      } catch (error) {
        console.warn("Speech recognition stop failed:", error);
      }
    }
  }, [state.isListening]);

  const getVideoBlob = useCallback((): Blob | null => {
    return recordedBlobRef.current;
  }, []);

  const getPerformanceMetrics = useCallback((): PerformanceMetrics => {
    return { ...performanceRef.current };
  }, []);

  const resetSession = useCallback((): void => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop();
    }

    if (speechRecognitionRef.current && state.isListening) {
      try {
        speechRecognitionRef.current.stop();
      } catch (error) {
        console.warn("Failed to stop speech recognition during reset:", error);
      }
    }

    stopCamera();

    chunksRef.current = [];
    recordedBlobRef.current = null;
    performanceRef.current = {
      recordingStartTime: null,
      analysisCount: 0,
      averageConfidence: 0,
      totalProcessingTime: 0,
    };

    setState({
      isRecording: false,
      isAnalyzing: false,
      duration: 0,
      currentEmotion: "neutral",
      currentSentiment: "neutral",
      transcriptText: "",
      isListening: false,
      error: null,
      performance: performanceRef.current,
      emotionConfidence: 0,
      sentimentConfidence: 0,
      detectedKeywords: [],
    });
  }, [stopCamera, state.isRecording, state.isListening]);

  const actions: LiveDetectionActions = {
    startCamera,
    stopCamera,
    startRecording,
    stopRecording,
    startListening,
    stopListening,
    resetSession,
    getVideoBlob,
    getPerformanceMetrics,
  };

  return {
    state,
    actions,
    videoRef,
    hasRecording: recordedBlobRef.current !== null,
    cameraActive: !!streamRef.current,
  };
}
