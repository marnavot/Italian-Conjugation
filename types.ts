export interface CustomVerb {
  verb: string;
  englishTranslation: string;
}

export interface PracticeSettings {
  tenses: string[];
  persons: string[];
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
  auxiliary: 'essere' | 'avere';
  subgroup?: string;
  passatoRemotoStem?: string;
  participioPassato?: string;
  englishTranslation?: string;
  pronounType?: 'si' | 'ci' | 'ne' | 'la' | 'sela' | 'sene' | 'cela' | 'cene';
  baseInfinitive?: string;
}