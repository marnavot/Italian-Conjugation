
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
        'Indicativo Passato Remoto': ['ei', 'esti', 'é', 'emmo', 'este', 'erono'], // Note: some sources use -etti. Sticking to one for now.
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

const commonEssereVerbs = new Set(['essere', 'stare', 'andare', 'venire', 'entrare', 'uscire', 'partire', 'tornare', 'nascere', 'morire', 'piacere', 'sembrare', 'diventare', 'rimanere', 'restare', 'salire', 'scendere', 'cadere', 'esistere']);

const ERE_IRREGULAR_PATTERNS: Record<string, { participio_ending: string, pass_rem_stem_ending: string }> = {
    'cendere':   { participio_ending: 'ceso', pass_rem_stem_ending: 'ces' },
    'fendere':   { participio_ending: 'feso', pass_rem_stem_ending: 'fes' },
    'pendere':   { participio_ending: 'peso', pass_rem_stem_ending: 'pes' },
    'prendere':  { participio_ending: 'preso', pass_rem_stem_ending: 'pres' },
    'rendere':   { participio_ending: 'reso', pass_rem_stem_ending: 'res' },
    'tendere':   { participio_ending: 'teso', pass_rem_stem_ending: 'tes' },
};

const ISC_VERBS = new Set([
  'finire', 'scolpire', 'pulire', 'infastidire', 'intimidire', 'starnutire', 
  'fornire', 'distribuire', 'dimagrire', 'stabilire', 'rifornire', 'perquisire', 
  'snellire', 'fluire', 'istituire', 'rapire', 'gestire', 'ristabilire', 
  'patire', 'abolire', 'differire'
]);


export function guessVerbInfo(infinitive: string): VerbInfo {
    const pronominalEndings: VerbInfo['pronounType'][] = ['sela', 'sene', 'cela', 'si', 'ci', 'ne', 'la'];
    for (const ending of pronominalEndings) {
        if (infinitive.endsWith(ending)) {
            // Reconstruct base infinitive, e.g., "alzarsi" -> "alzare", "farsi" -> "fare"
            const baseInfinitiveStem = infinitive.slice(0, -ending.length);
            const baseInfinitive = baseInfinitiveStem + (baseInfinitiveStem.endsWith('r') ? 'e' : 're');

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
                subgroup: baseInfo.subgroup,
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

    if (infinitive.endsWith('andare')) {
        return {
            infinitive,
            group: 'are',
            subgroup: 'andare',
            auxiliary: 'essere',
        }
    }

    if (infinitive.endsWith('fare')) {
        const prefix = infinitive.slice(0, infinitive.length - 'fare'.length);
        return {
            infinitive,
            group: 'are',
            subgroup: 'fare',
            auxiliary: 'avere',
            participioPassato: prefix + 'fatto',
        };
    }

    if (infinitive.endsWith('parire')) {
        const prefix = infinitive.slice(0, infinitive.length - 'parire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'parire',
            auxiliary: 'essere',
            participioPassato: prefix + 'parso',
        };
    }

    if (infinitive.endsWith('aprire')) {
        const prefix = infinitive.slice(0, infinitive.length - 'aprire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'aprire',
            auxiliary: 'avere',
            participioPassato: prefix + 'aperto',
        };
    }
    
    if (infinitive.endsWith('scondere')) {
        if (infinitive === 'ascondere') {
            return {
                infinitive,
                group: 'ere',
                auxiliary: 'avere',
                participioPassato: 'ascoso',
                passatoRemotoStem: 'ascos',
            };
        }
        // This covers 'nascondere'
        const prefix = infinitive.slice(0, infinitive.length - 'scondere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'scosto', // e.g. na + scosto -> nascosto
            passatoRemotoStem: prefix + 'scos',   // e.g. na + scos -> nascos
        };
    }
    
    if (infinitive.endsWith('spondere')) { // for rispondere, corrispondere
        const prefix = infinitive.slice(0, infinitive.length - 'spondere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'sposto',
            passatoRemotoStem: prefix + 'spos',
        };
    }

    if (infinitive.endsWith('ardere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'ardere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere', // ardersi will be corrected to 'essere' by pronominal logic
            participioPassato: prefix + 'arso',
            passatoRemotoStem: prefix + 'ars',
        };
    }

    if (infinitive.endsWith('sistere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'sistere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: commonEssereVerbs.has(infinitive) ? 'essere' : 'avere',
            participioPassato: prefix + 'sistito',
        };
    }

    if (infinitive.endsWith('solvere') || infinitive === 'asciolvere') {
        const stem = infinitive.slice(0, -'vere'.length); // e.g., risol, assol, asciol
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: stem + 'to',
            passatoRemotoStem: stem + 's',
        };
    }

    if (infinitive.endsWith('ellere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'ellere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'ulso',
            passatoRemotoStem: prefix + 'uls',
        };
    }

    if (infinitive.endsWith('sumere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'sumere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'sunto',
            passatoRemotoStem: prefix + 'suns',
        };
    }

    const bereDerivatives = new Set(['bere', 'ribere', 'strabere']);
    if (bereDerivatives.has(infinitive)) {
        const prefix = infinitive.slice(0, infinitive.length - 'bere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'bere',
            auxiliary: 'avere',
            participioPassato: prefix + 'bevuto',
        };
    }

    if (infinitive.endsWith('battere')) {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'battere',
            auxiliary: 'avere',
        };
    }

    if (infinitive.endsWith('empiere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'empiere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'empiere',
            auxiliary: 'avere',
            participioPassato: `${prefix}empiuto / ${prefix}empito`,
        };
    }

    let group = 'unknown';
    if (infinitive.endsWith('are')) group = 'are';
    else if (infinitive.endsWith('ere')) group = 'ere';
    else if (infinitive.endsWith('ire')) group = 'ire';
    
    if (group === 'ire') {
        for (const iscRoot of ISC_VERBS) {
            if (infinitive.endsWith(iscRoot)) {
                return {
                    infinitive,
                    group: 'ire',
                    subgroup: 'isc',
                    auxiliary: commonEssereVerbs.has(infinitive) ? 'essere' : 'avere'
                };
            }
        }
    }

    if (group === 'ere') {
        if (infinitive.endsWith('figgere')) {
            const prefix = infinitive.slice(0, infinitive.length - 'figgere'.length);
            return {
                infinitive,
                group: 'ere',
                auxiliary: 'avere',
                participioPassato: infinitive === 'figgere' ? 'fitto' : prefix + 'fisso',
                passatoRemotoStem: prefix + 'fiss',
            };
        }

        // Sort keys by length descending to match longer endings first (e.g., 'prendere' before 'rendere')
        const sortedPatterns = Object.keys(ERE_IRREGULAR_PATTERNS).sort((a, b) => b.length - a.length);
        
        for (const ending of sortedPatterns) {
            if (infinitive.endsWith(ending)) {
                const prefix = infinitive.slice(0, infinitive.length - ending.length);
                const rules = ERE_IRREGULAR_PATTERNS[ending];
                return {
                    infinitive,
                    group: 'ere',
                    auxiliary: 'avere', // Most of these take 'avere'
                    participioPassato: prefix + rules.participio_ending,
                    passatoRemotoStem: prefix + rules.pass_rem_stem_ending,
                };
            }
        }
    }

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

    if (verbInfo.subgroup === 'bere') {
        const prefix = infinitive.slice(0, infinitive.length - 'bere'.length);
        switch (tense) {
            case 'Indicativo Presente':
                const presStem = prefix + 'bev';
                return [presStem + 'o', presStem + 'i', presStem + 'e', presStem + 'iamo', prefix + 'bevete', presStem + 'ono'];
            case 'Indicativo Imperfetto':
                const imperfStem = prefix + 'bevev';
                const imperfEndings = ['o', 'i', 'a', 'amo', 'ate', 'ano'];
                return imperfEndings.map(e => imperfStem + e);
            case 'Indicativo Passato Remoto':
                const prStem = prefix + 'bev';
                const prStem2 = prefix + 'bevv';
                const prStem3 = prefix + 'bevett';
                return [
                    `${prStem2}i / ${prStem3}i`,
                    `${prStem}esti`,
                    `${prStem2}e / ${prStem3}e`,
                    `${prStem}emmo`,
                    `${prStem}este`,
                    `${prStem2}ero / ${prStem3}ero`,
                ];
            case 'Indicativo Futuro Semplice':
                const futStem = prefix + 'berr';
                const futEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futEndings.map(e => futStem + e);
            case 'Condizionale Presente':
                const condStem = prefix + 'berr';
                const condEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condEndings.map(e => condStem + e);
            case 'Congiuntivo Presente':
                const congPresStem = prefix + 'bev';
                return [
                    congPresStem + 'a',
                    congPresStem + 'a',
                    congPresStem + 'a',
                    congPresStem + 'iamo',
                    prefix + 'beviate',
                    congPresStem + 'ano'
                ];
            case 'Congiuntivo Imperfetto':
                const congImpfStem = prefix + 'bev';
                const congImpfEndings = ['essi', 'essi', 'esse', 'essimo', 'este', 'essero'];
                return congImpfEndings.map(e => congImpfStem + e);
            case 'Imperativo':
                 return [
                    '',
                    prefix + 'bevi',
                    prefix + 'beva',
                    prefix + 'beviamo',
                    prefix + 'bevete',
                    prefix + 'bevano'
                ];
            case 'Gerundio':
                return [prefix + 'bevendo'];
            case 'Participio Presente':
                return [prefix + 'bevente'];
        }
    }

    if (verbInfo.subgroup === 'battere') {
        if (tense === 'Indicativo Passato Remoto') {
            const stem = infinitive.slice(0, -3);
            const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
            const regularForms = regularEndings.map(e => stem + e);

            const irregularStem = stem + 'ett';
            
            return [
                `${regularForms[0]} / ${irregularStem}i`,
                regularForms[1],
                `${regularForms[2]} / ${irregularStem}e`,
                regularForms[3],
                regularForms[4],
                `${regularForms[5]} / ${irregularStem}ero`,
            ];
        }
    }

    if (verbInfo.subgroup === 'fare') {
        const prefix = infinitive.slice(0, infinitive.length - 'fare'.length);
        switch (tense) {
            case 'Indicativo Presente':
                const thirdPerson = infinitive === 'fare' ? 'fa' : 'fà';
                return [
                    prefix + 'faccio',
                    prefix + 'fai',
                    prefix + thirdPerson,
                    prefix + 'facciamo',
                    prefix + 'fate',
                    prefix + 'fanno'
                ];
            case 'Indicativo Imperfetto':
                const imperfettoStem = prefix + 'facev';
                const imperfettoEndings = ['o', 'i', 'a', 'amo', 'ate', 'ano'];
                return imperfettoEndings.map(e => imperfettoStem + e);
            case 'Indicativo Passato Remoto':
                const prIrregularStem = prefix + 'fec';
                const prRegularStem = prefix + 'fac';
                return [
                    prIrregularStem + 'i',
                    prRegularStem + 'esti',
                    prIrregularStem + 'e',
                    prRegularStem + 'emmo',
                    prRegularStem + 'este',
                    prIrregularStem + 'ero',
                ];
            case 'Indicativo Futuro Semplice':
                const futuroStem = prefix + 'far';
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => futuroStem + e);
            case 'Congiuntivo Presente':
                return [
                    prefix + 'faccia',
                    prefix + 'faccia',
                    prefix + 'faccia',
                    prefix + 'facciamo',
                    prefix + 'facciate',
                    prefix + 'facciano'
                ];
            case 'Congiuntivo Imperfetto':
                const congImpfStem = prefix + 'fac';
                const congImpfEndings = ['essi', 'essi', 'esse', 'essimo', 'este', 'essero'];
                return congImpfEndings.map(e => congImpfStem + e);
            case 'Condizionale Presente':
                const condizionaleStem = prefix + 'far';
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => condizionaleStem + e);
            case 'Imperativo':
                return [
                    '',
                    prefix + "fa' / " + prefix + "fai",
                    prefix + 'faccia',
                    prefix + 'facciamo',
                    prefix + 'fate',
                    prefix + 'facciano'
                ];
            case 'Gerundio':
                return [prefix + 'facendo'];
            case 'Participio Presente':
                return [prefix + 'facente'];
        }
    }

    if (verbInfo.subgroup === 'aprire') {
        const prefix = infinitive.slice(0, infinitive.length - 'aprire'.length);
        if (tense === 'Indicativo Passato Remoto') {
            const regularStem = infinitive.slice(0, -3);
            const regularEndings = ENDINGS['ire']['Indicativo Passato Remoto'];
            const regularForms = regularEndings.map(e => regularStem + e);

            const irregularStem = prefix + 'apers';
            return [
                `${regularForms[0]} / ${irregularStem}i`,
                regularForms[1],
                `${regularForms[2]} / ${irregularStem}e`,
                regularForms[3],
                regularForms[4],
                `${regularForms[5]} / ${irregularStem}ero`,
            ];
        }
    }

    if (verbInfo.subgroup === 'parire') {
        const prefix = infinitive.slice(0, infinitive.length - 'parire'.length);
        const stemPai = prefix + 'pai';
        const stemPar = prefix + 'par';
        const stemPari = prefix + 'pari';

        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemPai + 'o',
                    stemPari,
                    stemPar + 'e',
                    stemPari + 'amo',
                    stemPari + 'te',
                    stemPai + 'ono',
                ];
            case 'Indicativo Passato Remoto':
                const regularStem = infinitive.slice(0, -3);
                const regularEndings = ENDINGS['ire']['Indicativo Passato Remoto'];
                const regularForms = regularEndings.map(e => regularStem + e);
                
                const irregularStem = prefix + 'parv';
                return [
                    `${irregularStem}i / ${regularForms[0]}`,
                    regularForms[1],
                    `${irregularStem}e / ${regularForms[2]}`,
                    regularForms[3],
                    regularForms[4],
                    `${irregularStem}ero / ${regularForms[5]}`,
                ];
            case 'Congiuntivo Presente':
                return [
                    stemPai + 'a',
                    stemPai + 'a',
                    stemPai + 'a',
                    stemPari + 'amo',
                    stemPari + 'ate',
                    stemPai + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemPari,
                    stemPai + 'a',
                    stemPari + 'amo',
                    stemPari + 'te',
                    stemPai + 'ano',
                ];
        }
    }

    if (verbInfo.subgroup === 'andare') {
        const prefix = infinitive.slice(0, infinitive.length - 'andare'.length);
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    prefix + 'vado',
                    prefix + 'vai',
                    prefix + 'va',
                    prefix + 'andiamo',
                    prefix + 'andate',
                    prefix + 'vanno',
                ];
            case 'Indicativo Futuro Semplice':
                const futuroStem = prefix + 'andr';
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => futuroStem + e);
            case 'Condizionale Presente':
                const condizionaleStem = prefix + 'andr';
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => condizionaleStem + e);
            case 'Congiuntivo Presente':
                 return [
                    prefix + 'vada',
                    prefix + 'vada',
                    prefix + 'vada',
                    prefix + 'andiamo',
                    prefix + 'andiate',
                    prefix + 'vadano',
                ];
            case 'Imperativo':
                 return [
                    '',
                    prefix + "va' / " + prefix + "vai",
                    prefix + 'vada',
                    prefix + 'andiamo',
                    prefix + 'andate',
                    prefix + 'vadano',
                ];
        }
    }

    if (verbInfo.subgroup === 'empiere') {
        const prefix = infinitive.slice(0, infinitive.length - 'empiere'.length);
        const iscStem = prefix + 'emp';
        const iStem = prefix + 'empi';
        
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    `${iStem}o / ${iscStem}isco`,
                    `${iStem} / ${iscStem}isci`,
                    `${iStem}e / ${iscStem}isce`,
                    `${iStem}amo`,
                    `${iscStem}ite`,
                    `${iStem}ono / ${iscStem}iscono`
                ];
            case 'Indicativo Imperfetto':
                const impfEndings1 = ['ivo', 'ivi', 'iva', 'ivamo', 'ivate', 'ivano'];
                const impfEndings2 = ['ievo', 'ievi', 'ieva', 'ievamo', 'ievate', 'ievano'];
                return impfEndings1.map((e1, index) => `${iscStem}${e1} / ${iscStem}${impfEndings2[index]}`);
            case 'Futuro Semplice':
                const futuroEndings = ['erò', 'erai', 'erà', 'eremo', 'erete', 'eranno'];
                return futuroEndings.map(e => `${iStem}${e}`);
            case 'Condizionale Presente':
                const condizionaleEndings = ['irei', 'iresti', 'irebbe', 'iremmo', 'ireste', 'irebbero'];
                return condizionaleEndings.map(e => `${iscStem}${e}`);
            case 'Congiuntivo Presente':
                return [
                    `${iStem}a / ${iscStem}isca`,
                    `${iStem}a / ${iscStem}isca`,
                    `${iStem}a / ${iscStem}isca`,
                    `${iStem}amo`,
                    `${iStem}ate`,
                    `${iStem}ano / ${iscStem}iscano`
                ];
            case 'Congiuntivo Imperfetto':
                const congImpfEndings = ['issi', 'issi', 'isse', 'issimo', 'iste', 'issero'];
                return congImpfEndings.map(e => `${iscStem}${e}`);
            case 'Imperativo':
                return [
                    '',
                    `${iStem} / ${iscStem}isci`,
                    `${iStem}a / ${iscStem}isca`,
                    `${iStem}amo`,
                    `${iscStem}ite`,
                    `${iStem}ano / ${iscStem}iscano`
                ];
            case 'Participio Presente':
                return [`${iStem}ente`];
            case 'Gerundio':
                return [`${iStem}endo`];
        }
    }


    const tenseInfo = TENSE_INFO[tense];
    if (!tenseInfo) return [];

    // --- Handle compound tenses first for ALL verbs ---
    if (tenseInfo.type === 'compound') {
        const participio = getParticipioPassato(verbInfo);
        
        const auxTense = tenseInfo.auxTense;
        const auxVerbInfo = guessVerbInfo(auxiliary);
        const auxConjugation = conjugate(auxVerbInfo, auxTense);

        if (auxiliary === 'avere') {
            return auxConjugation.map(aux => `${aux} ${participio}`);
        } else { // auxiliary is 'essere'
            // Handle multiple participio options (e.g., from -empiere verbs)
            const participioOptions = participio.split(' / ');
            const mainParticipio = participioOptions[0];

            if (!mainParticipio.endsWith('o')) {
                // Invariable participio, just combine
                return auxConjugation.map(aux => `${aux} ${participio}`);
            }
            
            const participioStems = participioOptions.map(p => p.slice(0, -1));
            
            // Participle agrees with subject for 'essere' verbs, showing both M/F options
            return auxConjugation.map((aux, index) => {
                const isSingular = index < 3;
                
                const conjugationOptions = participioStems.map(stem => {
                    if (isSingular) {
                        return `${stem}o/${stem}a`; // e.g., "andato/andata"
                    } else {
                        return `${stem}i/${stem}e`; // e.g., "andati/andate"
                    }
                }).join(' / ');

                return `${aux} ${conjugationOptions}`;
            });
        }
    }

    // --- Handle simple tenses ---

    const handleParticipioPassato = (participio: string): string[] => {
         // Handle multiple options like "empiuto / empito"
        const options = participio.split(' / ');
        const results: string[] = [];

        options.forEach(option => {
            if (option.endsWith('o')) {
                const stem = option.slice(0, -1);
                results.push(
                    option,       // singolare maschile
                    stem + 'a',   // singolare femminile
                    stem + 'i',   // plurale maschile
                    stem + 'e'    // plurale femminile
                );
            } else {
                results.push(option); // Invariable
            }
        });

        // If multiple options, interleave them or just return the first set?
        // Let's just return the first set to avoid complexity in the UI. The main form is fine.
        if (options.length > 1) {
            const firstOption = options[0];
             if (firstOption.endsWith('o')) {
                const stem = firstOption.slice(0, -1);
                return [
                    firstOption, stem + 'a', stem + 'i', stem + 'e'
                ];
            }
            return [firstOption];
        }

        return results;
    };

    const handleParticipioPresente = (participio: string): string[] => {
        const plurale = participio.slice(0, -1) + 'i';
        return [participio, plurale];
    };

    // Handle simple tenses for 'essere' and 'avere'
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

    // Handle irregular Passato Remoto
    if (tense === 'Indicativo Passato Remoto' && verbInfo.passatoRemotoStem) {
        const irregularStem = verbInfo.passatoRemotoStem;
        const regularStem = verbInfo.infinitive.slice(0, -3);

        const regularEndings = ENDINGS[group as 'are' | 'ere' | 'ire']['Indicativo Passato Remoto'];
        if (!regularEndings) return [];

        return [
            irregularStem + 'i',                // io (1sg)
            regularStem + regularEndings[1],    // tu (2sg) - regular
            irregularStem + 'e',                // lui/lei (3sg)
            regularStem + regularEndings[3],    // noi (1pl) - regular
            regularStem + regularEndings[4],    // voi (2pl) - regular
            irregularStem + 'ero',              // loro (3pl)
        ];
    }
    
    // Handle -isc- subgroup for -ire verbs
    if (verbInfo.subgroup === 'isc') {
        const stem = infinitive.slice(0, -3);
        const endings = ENDINGS['ire'][tense];
        if (!endings) return [];

        const applyIsc = (base: string, ending: string) => base + 'isc' + ending;

        if (tense === 'Indicativo Presente') {
            return [
                applyIsc(stem, endings[0]),
                applyIsc(stem, endings[1]),
                applyIsc(stem, endings[2]),
                stem + endings[3],
                stem + endings[4],
                applyIsc(stem, endings[5]),
            ];
        }
        if (tense === 'Congiuntivo Presente') {
            return [
                applyIsc(stem, endings[0]),
                applyIsc(stem, endings[1]),
                applyIsc(stem, endings[2]),
                stem + endings[3],
                stem + endings[4],
                applyIsc(stem, endings[5]),
            ];
        }
        if (tense === 'Imperativo') {
            return [
                endings[0], // io is blank
                applyIsc(stem, endings[1]),
                applyIsc(stem, endings[2]),
                stem + endings[3],
                stem + endings[4],
                applyIsc(stem, endings[5]),
            ];
        }
    }


    // Handle special simple tenses that are not person-based
    if (tense === 'Participio Passato') {
        return handleParticipioPassato(getParticipioPassato(verbInfo));
    }
    
    // Handle all other simple tenses for regular verbs
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
