import type { VerbInfo } from '../types';
import { getVerb, saveVerb } from './verbDb';
import { conjugate, guessVerbInfo } from './conjugationRules';
import { ALL_TENSES } from '../constants';
import { getVerbInfoBatch } from './geminiService';

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

export async function syncAuxiliaryVerbs(verbList: string[]): Promise<void> {
    if (verbList.length === 0) return;

    // Get the latest info from the AI
    const verbInfosFromGemini = await getVerbInfoBatch(verbList);

    for (const geminiInfo of verbInfosFromGemini) {
        if (!geminiInfo.infinitive || !geminiInfo.auxiliary) continue;

        // Get the existing data from the DB, or guess it if it's not present.
        // This preserves all the detailed, hand-coded rules from conjugationRules.ts
        const existingInfo = await getVerb(geminiInfo.infinitive) ?? guessVerbInfo(geminiInfo.infinitive);
        
        // CRITICAL: Only update the auxiliary verb property, leaving everything else intact.
        existingInfo.auxiliary = geminiInfo.auxiliary;

        // Save the updated record back to the DB.
        await saveVerb(existingInfo);
    }
}
