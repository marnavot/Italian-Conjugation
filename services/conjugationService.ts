import type { VerbInfo } from '../types';
import { getVerb } from './verbDb';
import { conjugate, guessVerbInfo } from './conjugationRules';
import { ALL_TENSES } from '../constants';

export type ConjugationResult = Record<string, string[]>;

export interface FullConjugationResult {
    info: VerbInfo;
    conjugations: ConjugationResult;
}

async function getVerbInfo(infinitive: string): Promise<VerbInfo> {
    const storedVerb = await getVerb(infinitive);
    if (storedVerb) {
        return storedVerb;
    }
    return guessVerbInfo(infinitive);
}

export async function getConjugationForTense(infinitive: string, tense: string): Promise<string[]> {
    const verbInfo = await getVerbInfo(infinitive);
    return conjugate(verbInfo, tense);
}

export async function getFullConjugation(infinitive: string): Promise<FullConjugationResult> {
    const verbInfo = await getVerbInfo(infinitive);
    const allConjugations: ConjugationResult = {};
    
    for (const tense of ALL_TENSES) {
        try {
            const result = conjugate(verbInfo, tense);
            if (result && result.length > 0 && result.some(form => form !== '')) {
                allConjugations[tense] = result;
            }
        } catch (e) {
            // This tense might not exist for this verb (e.g. Imperativo for some)
            // console.warn(`Could not conjugate ${infinitive} in ${tense}`, e);
        }
    }
    
    return { info: verbInfo, conjugations: allConjugations };
}