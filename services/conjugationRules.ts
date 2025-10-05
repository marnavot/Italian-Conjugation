import { VerbInfo } from "../types";

const AVERE = {
    'Indicativo Presente': ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'],
    'Indicativo Imperfetto': ['avevo', 'avevi', 'aveva', 'avevamo', 'avevate', 'avevano'],
    'Indicativo Passato Remoto': ['ebbi', 'avesti', 'ebbe', 'avemmo', 'aveste', 'ebbero'],
    'Indicativo Futuro Semplice': ['avrò', 'avrai', 'avrà', 'avremo', 'avrete', 'avranno'],
    'Congiuntivo Presente': ['abbia', 'abbia', 'abbia', 'abbiamo', 'abbiate', 'abbiano'],
    'Congiuntivo Imperfetto': ['avessi', 'avessi', 'avesse', 'avessimo', 'aveste', 'avessero'],
    'Condizionale Presente': ['avrei', 'avresti', 'avrebbe', 'avremmo', 'avreste', 'avrebbero'],
    'Imperativo': ['', 'abbi', 'abbia', 'abbiamo', 'abbiate', 'abbiano'],
    'Participio Passato': ['avuto'],
    'Participio Presente': ['avente'],
    'Gerundio': ['avendo'],
};

const ESSERE = {
    'Indicativo Presente': ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'],
    'Indicativo Imperfetto': ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'],
    'Indicativo Passato Remoto': ['fui', 'fosti', 'fu', 'fummo', 'foste', 'furono'],
    'Indicativo Futuro Semplice': ['sarò', 'sarai', 'sarà', 'saremo', 'sarete', 'saranno'],
    'Congiuntivo Presente': ['sia', 'sia', 'sia', 'siamo', 'siate', 'siano'],
    'Congiuntivo Imperfetto': ['fossi', 'fossi', 'fosse', 'fossimo', 'foste', 'fossero'],
    'Condizionale Presente': ['sarei', 'saresti', 'sarebbe', 'saremmo', 'sareste', 'sarebbero'],
    'Imperativo': ['', 'sii', 'sia', 'siamo', 'siate', 'siano'],
    'Participio Passato': ['stato'],
    'Participio Presente': ['essente'],
    'Gerundio': ['essendo'],
};

const TENSE_INFO: Record<string, { type: 'simple' | 'compound', auxTense: string }> = {
    'Indicativo Presente': { type: 'simple', auxTense: '' },
    'Indicativo Passato Prossimo': { type: 'compound', auxTense: 'Indicativo Presente' },
    'Indicativo Imperfetto': { type: 'simple', auxTense: '' },
    'Indicativo Trapassato Prossimo': { type: 'compound', auxTense: 'Indicativo Imperfetto' },
    'Indicativo Passato Remoto': { type: 'simple', auxTense: '' },
    'Indicativo Futuro Semplice': { type: 'simple', auxTense: '' },
    'Indicativo Futuro Anteriore': { type: 'compound', auxTense: 'Indicativo Futuro Semplice' },
    'Condizionale Presente': { type: 'simple', auxTense: '' },
    'Condizionale Passato': { type: 'compound', auxTense: 'Condizionale Presente' },
    'Congiuntivo Presente': { type: 'simple', auxTense: '' },
    'Congiuntivo Passato': { type: 'compound', auxTense: 'Congiuntivo Presente' },
    'Congiuntivo Imperfetto': { type: 'simple', auxTense: '' },
    'Congiuntivo Trapassato': { type: 'compound', auxTense: 'Congiuntivo Imperfetto' },
    'Imperativo': { type: 'simple', auxTense: '' },
    'Participio Passato': { type: 'simple', auxTense: '' },
    'Participio Presente': { type: 'simple', auxTense: '' },
    'Gerundio': { type: 'simple', auxTense: '' },
};

const ENDINGS: Record<string, Record<string, string[]>> = {
    'are': {
        'Indicativo Presente': ['o', 'i', 'a', 'iamo', 'ate', 'ano'],
        'Indicativo Imperfetto': ['avo', 'avi', 'ava', 'avamo', 'avate', 'avano'],
        'Indicativo Passato Remoto': ['ai', 'asti', 'ò', 'ammo', 'aste', 'arono'],
        'Indicativo Futuro Semplice': ['erò', 'erai', 'erà', 'eremo', 'erete', 'eranno'],
        'Congiuntivo Presente': ['i', 'i', 'i', 'iamo', 'iate', 'ino'],
        'Congiuntivo Imperfetto': ['assi', 'assi', 'asse', 'assimo', 'aste', 'assero'],
        'Condizionale Presente': ['erei', 'eresti', 'erebbe', 'erremmo', 'ereste', 'erebbero'],
        'Imperativo': ['', 'a', 'i', 'iamo', 'ate', 'ino'],
        'Participio Passato': ['ato'],
        'Participio Presente': ['ante'],
        'Gerundio': ['ando'],
    },
    'ere': {
        'Indicativo Presente': ['o', 'i', 'e', 'iamo', 'ete', 'ono'],
        'Indicativo Imperfetto': ['evo', 'evi', 'eva', 'evamo', 'evate', 'evano'],
        'Indicativo Passato Remoto': ['ei', 'esti', 'é', 'emmo', 'este', 'erono'],
        'Indicativo Futuro Semplice': ['erò', 'erai', 'erà', 'eremo', 'erete', 'eranno'],
        'Congiuntivo Presente': ['a', 'a', 'a', 'iamo', 'iate', 'ano'],
        'Congiuntivo Imperfetto': ['essi', 'essi', 'esse', 'essimo', 'este', 'essero'],
        'Condizionale Presente': ['erei', 'eresti', 'erebbe', 'erremmo', 'ereste', 'erebbero'],
        'Imperativo': ['', 'i', 'a', 'iamo', 'ete', 'ano'],
        'Participio Passato': ['uto'],
        'Participio Presente': ['ente'],
        'Gerundio': ['endo'],
    },
    'ire': {
        'Indicativo Presente': ['o', 'i', 'e', 'iamo', 'ite', 'ono'],
        'Indicativo Imperfetto': ['ivo', 'ivi', 'iva', 'ivamo', 'ivate', 'ivano'],
        'Indicativo Passato Remoto': ['ii', 'isti', 'ì', 'immo', 'iste', 'irono'],
        'Indicativo Futuro Semplice': ['irò', 'irai', 'irà', 'iremo', 'irete', 'iranno'],
        'Congiuntivo Presente': ['a', 'a', 'a', 'iamo', 'iate', 'ano'],
        'Congiuntivo Imperfetto': ['issi', 'issi', 'isse', 'issimo', 'iste', 'issero'],
        'Condizionale Presente': ['irei', 'iresti', 'irebbe', 'iremmo', 'ireste', 'irebbero'],
        'Imperativo': ['', 'i', 'a', 'iamo', 'ite', 'ano'],
        'Participio Passato': ['ito'],
        'Participio Presente': ['ente'],
        'Gerundio': ['endo'],
    }
};

const REFLEXIVE_PRONOUNS = ['mi', 'ti', 'si', 'ci', 'vi', 'si'];
const DOUBLE_PRONOUNS_FIRST = ['me', 'te', 'se', 'ce', 've', 'se'];

const commonEssereVerbs = new Set(['essere', 'stare', 'andare', 'venire', 'entrare', 'uscire', 'partire', 'tornare', 'nascere', 'morire', 'piacere', 'sembrare', 'diventare', 'rimanere', 'restare', 'salire', 'scendere', 'cadere']);

export function guessVerbInfo(infinitive: string): VerbInfo {
    const pronominalEndings: VerbInfo['pronounType'][] = ['sela', 'sene', 'cela', 'si', 'ci', 'ne', 'la'];
    for (const ending of pronominalEndings) {
        if (infinitive.endsWith(ending)) {
            // Reconstruct base infinitive, e.g., "alzarsi" -> "alzare", "farsi" -> "fare"
            const baseInfinitiveStem = infinitive.slice(0, -ending.length);
            const baseInfinitive = baseInfinitiveStem + 'e';

            const baseInfo = guessVerbInfo(baseInfinitive); // Recursive call with correct base infinitive
            
            let auxiliary = baseInfo.auxiliary;
            // Reflexive verbs always take 'essere'
            if (['si', 'sela', 'sene'].includes(ending)) {
                auxiliary = 'essere';
            }
            // Handle specific case like 'esserci'
            if (baseInfinitive === 'essere') {
                auxiliary = 'essere';
            }

            return {
                infinitive,
                baseInfinitive,
                pronounType: ending,
                group: baseInfo.group,
                auxiliary: auxiliary,
                // Pass through participio and remote stems if base verb has them
                participioPassato: baseInfo.participioPassato,
                passatoRemotoStem: baseInfo.passatoRemotoStem,
            };
        }
    }
    
    // Non-pronominal verb logic
    if (infinitive === 'avere') return { infinitive, group: 'avere', auxiliary: 'avere' };
    if (infinitive === 'essere') return { infinitive, group: 'essere', auxiliary: 'essere' };

    let group = 'unknown';
    if (infinitive.endsWith('are')) group = 'are';
    else if (infinitive.endsWith('ere')) group = 'ere';
    else if (infinitive.endsWith('ire')) group = 'ire';
    
    return {
        infinitive,
        group,
        auxiliary: commonEssereVerbs.has(infinitive) ? 'essere' : 'avere'
    };
}

function getParticipioPassato(verbInfo: VerbInfo): string {
    if (verbInfo.participioPassato) return verbInfo.participioPassato;
    const baseInfinitive = verbInfo.baseInfinitive || verbInfo.infinitive;
    const baseVerbInfo = guessVerbInfo(baseInfinitive);
    
    if (baseVerbInfo.group === 'essere') return ESSERE['Participio Passato'][0];
    if (baseVerbInfo.group === 'avere') return AVERE['Participio Passato'][0];
    
    const endings = ENDINGS[baseVerbInfo.group];
    if (endings && endings['Participio Passato']) {
        const stem = baseInfinitive.slice(0, -3);
        return stem + endings['Participio Passato'][0];
    }
    throw new Error(`Cannot determine participio passato for ${verbInfo.infinitive}`);
}

function conjugatePronominal(verbInfo: VerbInfo, tense: string): string[] {
    const { pronounType, baseInfinitive, auxiliary } = verbInfo;
    if (!pronounType || !baseInfinitive) return [];

    const baseVerbInfo = { ...guessVerbInfo(baseInfinitive), auxiliary };
    
    if (tense === 'Participio Passato') {
        if (pronounType === 'sela' || pronounType === 'cela') {
            const baseParticipio = getParticipioPassato(baseVerbInfo);
            const femSing = baseParticipio.endsWith('o') ? baseParticipio.slice(0, -1) + 'a' : baseParticipio;
            return [femSing + pronounType];
        }
        return conjugate(baseVerbInfo, tense);
    }
    
    if (tense === 'Participio Presente') {
        const ppBaseInfo = guessVerbInfo(baseInfinitive);
        return conjugate(ppBaseInfo, 'Participio Presente');
    }
    
    if (tense === 'Gerundio') {
        const baseConjugation = conjugate(baseVerbInfo, tense);
        if (baseConjugation.length > 0) {
            return [baseConjugation[0] + pronounType];
        }
        return [];
    }
    
    let pronouns: string[] = [];
    let secondPronoun: string | null = null;
    
    switch (pronounType) {
        case 'si': pronouns = REFLEXIVE_PRONOUNS; break;
        case 'ci': pronouns = Array(6).fill('ci'); break;
        case 'ne': pronouns = Array(6).fill('ne'); break;
        case 'la': pronouns = Array(6).fill('la'); break;
        case 'sela': pronouns = DOUBLE_PRONOUNS_FIRST; secondPronoun = 'la'; break;
        case 'sene': pronouns = DOUBLE_PRONOUNS_FIRST; secondPronoun = 'ne'; break;
        case 'cela': pronouns = Array(6).fill('ce'); secondPronoun = 'la'; break;
    }

    const baseConjugation = conjugate(baseVerbInfo, tense);

    if (tense === 'Imperativo') {
        const result = [...baseConjugation];
        const combinedPronounAttached = (p1: string) => secondPronoun ? p1 + secondPronoun : p1;
        
        // Informal (tu, noi, voi) - attached
        if (result[1]) result[1] = result[1] + combinedPronounAttached(pronouns[1] === 'ti' ? 'te' : pronouns[1]);
        if (result[3]) result[3] = result[3] + combinedPronounAttached(pronouns[3] === 'ci' ? 'ce' : pronouns[3]);
        if (result[4]) result[4] = result[4] + combinedPronounAttached(pronouns[4]);

        // Formal (Lei, Loro) - detached
        const combinedPronounDetached = (idx: number) => secondPronoun ? `${pronouns[idx]} ${secondPronoun}` : pronouns[idx];
        if (result[2]) result[2] = `${combinedPronounDetached(2)} ${result[2]}`;
        if (result[5]) result[5] = `${combinedPronounDetached(5)} ${result[5]}`;
        return result;
    }
    
    let conjugated = baseConjugation.map((form, index) => {
        if (!form) return '';
        const p1 = pronouns[index];
        const verbPart = form;
        const verbOrAux = verbPart.split(' ')[0];
        
        const startsWithVowel = /^[aeiouhè]/i.test(verbOrAux);
        const startsWithEI = /^[eiè]/i.test(verbOrAux);

        // Double pronoun elision
        if (secondPronoun) {
            if (secondPronoun === 'la' && startsWithVowel) {
                return `${p1} l'${verbOrAux} ${verbPart.split(' ').slice(1).join(' ')}`.trim();
            }
            if (secondPronoun === 'ne' && startsWithEI) {
                return `${p1} n'${verbOrAux} ${verbPart.split(' ').slice(1).join(' ')}`.trim();
            }
            // No elision, return full form
            return `${p1} ${secondPronoun} ${verbPart}`;
        }

        // Single pronoun elision
        const pronoun = p1;
        if (['mi', 'ti', 'si', 'vi', 'la'].includes(pronoun) && startsWithVowel) {
            return `${pronoun.slice(0, 1)}'${verbOrAux} ${verbPart.split(' ').slice(1).join(' ')}`.trim();
        }
        if (pronoun === 'ci' && startsWithEI) {
            return `c'${verbOrAux} ${verbPart.split(' ').slice(1).join(' ')}`.trim();
        }
        
        // No elision, return full form
        return `${pronoun} ${verbPart}`;
    });
    
    // Feminine participio for -sela, -cela
    if (TENSE_INFO[tense].type === 'compound' && (pronounType === 'sela' || pronounType === 'cela')) {
        conjugated = conjugated.map(form => {
            const parts = form.split(' ');
            const lastPart = parts[parts.length - 1];
            if (lastPart.endsWith('o')) {
                return form.slice(0, -1) + 'a';
            }
            return form;
        });
    }

    return conjugated;
}


export function conjugate(verbInfo: VerbInfo, tense: string): string[] {
    const { infinitive, group, auxiliary } = verbInfo;

    if (verbInfo.pronounType) {
        return conjugatePronominal(verbInfo, tense);
    }

    const handleParticipioPassato = (participio: string): string[] => {
        if (participio.endsWith('o')) {
            const stem = participio.slice(0, -1);
            return [
                participio, // singolare maschile
                stem + 'a',   // singolare femminile
                stem + 'i',   // plurale maschile
                stem + 'e'    // plurale femminile
            ];
        }
        return [participio]; // Invariable
    };

    const handleParticipioPresente = (participio: string): string[] => {
        const plurale = participio.slice(0, -1) + 'i';
        return [participio, plurale];
    };

    if (group === 'essere') {
        if (tense === 'Participio Passato') return handleParticipioPassato(ESSERE['Participio Passato'][0]);
        if (tense === 'Participio Presente') return handleParticipioPresente(ESSERE['Participio Presente'][0]);
        return ESSERE[tense as keyof typeof ESSERE] || [];
    }
    if (group === 'avere') {
        if (tense === 'Participio Passato') return handleParticipioPassato(AVERE['Participio Passato'][0]);
        if (tense === 'Participio Presente') return handleParticipioPresente(AVERE['Participio Presente'][0]);
        return AVERE[tense as keyof typeof AVERE] || [];
    }

    const tenseInfo = TENSE_INFO[tense];
    if (!tenseInfo) return [];

    if (tenseInfo.type === 'compound') {
        const auxVerb = auxiliary === 'essere' ? ESSERE : AVERE;
        const auxConjugation = auxVerb[tenseInfo.auxTense as keyof typeof auxVerb];
        const participio = getParticipioPassato(verbInfo);
        
        // Basic compound tense, doesn't handle agreement for 'essere' verbs yet
        return auxConjugation.map(aux => `${aux} ${participio}`);
    }

    if (tense === 'Participio Passato') {
        return handleParticipioPassato(getParticipioPassato(verbInfo));
    }

    const groupEndings = ENDINGS[group];
    if (!groupEndings || !groupEndings[tense]) {
        return [];
    }

    const endings = groupEndings[tense];
    const stem = infinitive.slice(0, -3);

    if (tense === 'Participio Presente') {
        const singolare = stem + endings[0];
        return handleParticipioPresente(singolare);
    }
    
    if (endings.length === 1) { // For Gerundio
        return [stem + endings[0]];
    }

    const conjugation = endings.map(ending => stem + ending);

    // Special case for -care, -gare verbs to maintain hard C/G sound
    if ((infinitive.endsWith('care') || infinitive.endsWith('gare'))) {
        if (['Indicativo Futuro Semplice', 'Condizionale Presente'].includes(tense)) {
             return conjugation.map(c => c.replace(/er/,'her'));
        }
        if (['Indicativo Presente', 'Congiuntivo Presente', 'Imperativo'].includes(tense)) {
            return conjugation.map((c, index) => {
                 // tu, noi for -care/-gare
                if (index === 1 || index === 3) return stem + 'h' + endings[index];
                 // Loro for -care/-gare in Congiuntivo/Imperativo
                if (tense !== 'Indicativo Presente' && index === 5) return stem + 'h' + endings[index];
                return c;
            });
        }
    }

    return conjugation;
}