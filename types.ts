
export interface CustomVerb {
  verb: string;
  englishTranslation: string;
}

export interface PracticeSettings {
  tenses: string[];
  persons:string[];
  difficulty: string;
  customVerbs?: CustomVerb[];
}

export interface GradingResult {
  person: string;
  correctAnswer: string;
  isCorrect: boolean;
}

export interface Problem {
  verb: string;
  tense: string;
  englishTranslation: string;
}

export interface VerbInfo {
  infinitive: string;
  group: string;
  // FIX: Allow 'essere / avere' for verbs that use both auxiliary verbs.
  auxiliary: 'essere' | 'avere' | 'essere / avere';
  subgroup?: string;
  passatoRemotoStem?: string;
  participioPassato?: string;
  englishTranslation?: string;
  pronounType?: 'si' | 'ci' | 'ne' | 'la' | 'sela' | 'sene' | 'cela' | 'cene';
  baseInfinitive?: string;
  extraWords?: string;
}

export interface SavedList {
  name: string;
  content: string;
}
