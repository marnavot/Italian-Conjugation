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

const commonEssereVerbs = new Set(['essere', 'stare', 'andare', 'venire', 'entrare', 'uscire', 'partire', 'tornare', 'nascere', 'morire', 'piacere', 'sembrare', 'diventare', 'rimanere', 'restare', 'salire', 'scendere', 'cadere', 'esistere', 'accorrere', 'trascorrere']);

const ERE_IRREGULAR_PATTERNS: Record<string, { participio_ending: string, pass_rem_stem_ending: string }> = {
    'cidere':    { participio_ending: 'ciso', pass_rem_stem_ending: 'cis' },
    'videre':    { participio_ending: 'viso', pass_rem_stem_ending: 'vis' },
    'quidere':   { participio_ending: 'quiso', pass_rem_stem_ending: 'quis' },
    'sidere':    { participio_ending: 'siso', pass_rem_stem_ending: 'sis' },
    'cendere':   { participio_ending: 'ceso', pass_rem_stem_ending: 'ces' },
    'fendere':   { participio_ending: 'feso', pass_rem_stem_ending: 'fes' },
    'ingere':    { participio_ending: 'into', pass_rem_stem_ending: 'ins' },
    'nguere':    { participio_ending: 'nto', pass_rem_stem_ending: 'ns' },
    'pendere':   { participio_ending: 'peso', pass_rem_stem_ending: 'pes' },
    'prendere':  { participio_ending: 'preso', pass_rem_stem_ending: 'pres' },
    'primere':   { participio_ending: 'presso', pass_rem_stem_ending: 'press' },
    'rendere':   { participio_ending: 'reso', pass_rem_stem_ending: 'res' },
    'tendere':   { participio_ending: 'teso', pass_rem_stem_ending: 'tes' },
    'ergere':    { participio_ending: 'erso', pass_rem_stem_ending: 'ers' },
    'mergere':   { participio_ending: 'merso', pass_rem_stem_ending: 'mers' },
    'ulgere':    { participio_ending: 'ulso', pass_rem_stem_ending: 'uls' },
    'ligere':    { participio_ending: 'letto', pass_rem_stem_ending: 'less' },
    'ruggere':   { participio_ending: 'rutto', pass_rem_stem_ending: 'russ' },
    'uggere':    { participio_ending: 'utto', pass_rem_stem_ending: 'uss' },
    'ludere':    { participio_ending: 'luso', pass_rem_stem_ending: 'lus' },
    'pandere':   { participio_ending: 'panso', pass_rem_stem_ending: 'pans' },
    'plodere':   { participio_ending: 'ploso', pass_rem_stem_ending: 'plos' },
    'rodere':    { participio_ending: 'roso', pass_rem_stem_ending: 'ros' },
    'trudere':   { participio_ending: 'truso', pass_rem_stem_ending: 'trus' },
    'vadere':    { participio_ending: 'vaso', pass_rem_stem_ending: 'vas' },
    'fondere':   { participio_ending: 'fuso', pass_rem_stem_ending: 'fus' },
    'fliggere':  { participio_ending: 'flitto', pass_rem_stem_ending: 'fliss' },
    'figgere':   { participio_ending: 'fitto', pass_rem_stem_ending: 'fiss' },
    'friggere':  { participio_ending: 'fritto', pass_rem_stem_ending: 'friss' },
};

const ISC_VERBS = new Set([
  'finire', 'scolpire', 'pulire', 'infastidire', 'intimidire', 'starnutire', 
  'fornire', 'distribuire', 'dimagrire', 'stabilire', 'rifornire', 'perquisire', 
  'snellire', 'fluire', 'istituire', 'rapire', 'gestire', 'ristabilire', 
  'patire', 'abolire', 'differire'
]);


export function guessVerbInfo(infinitive: string): VerbInfo {
    const pronominalEndings: VerbInfo['pronounType'][] = ['sela', 'sene', 'cela', 'cene', 'si', 'ci', 'ne', 'la'];
    for (const ending of pronominalEndings) {
        if (infinitive.endsWith(ending)) {
            // Reconstruct base infinitive, e.g., "alzarsi" -> "alzare", "farsi" -> "fare"
            const baseInfinitiveStem = infinitive.slice(0, -ending.length);
            const baseInfinitive = baseInfinitiveStem + (baseInfinitiveStem.endsWith('r') ? 'e' : 're');

            const baseInfo = guessVerbInfo(baseInfinitive); // Recursive call with correct base infinitive
            
            let auxiliary = baseInfo.auxiliary;
            // Reflexive verbs always take 'essere'
            if (['si', 'sela', 'sene', 'cela', 'cene'].includes(ending)) {
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

    if (infinitive === 'dare') {
        return {
            infinitive,
            group: 'are',
            subgroup: 'dare',
            auxiliary: 'avere',
        };
    }

    if (infinitive === 'eccellere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'eccelso',
            passatoRemotoStem: 'eccels',
        };
    }
    
    if (infinitive === 'elidere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'eliso',
            passatoRemotoStem: 'elis',
        };
    }

    if (infinitive === 'eseguire') {
        return {
            infinitive,
            group: 'ire',
            subgroup: 'eseguire',
            auxiliary: 'avere',
        };
    }
    
    if (infinitive === 'evolvere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'evoluto',
            passatoRemotoStem: 'evols',
        };
    }

    if (infinitive.endsWith('flettere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'flettere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'flettere',
            auxiliary: 'avere',
            participioPassato: prefix + 'flesso',
            passatoRemotoStem: prefix + 'fless',
        };
    }

    if (infinitive.endsWith('sigere')) { // for esigere, transigere
        const prefix = infinitive.slice(0, infinitive.length - 'igere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'atto',
        };
    }

    if (infinitive.endsWith('dire')) {
        const prefix = infinitive.slice(0, infinitive.length - 'dire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'dire',
            auxiliary: 'avere',
            participioPassato: prefix + 'detto',
            passatoRemotoStem: prefix + 'diss',
        };
    }

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

    if (infinitive.endsWith('volvere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'volvere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'voluto',
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

    if (infinitive.endsWith('cadere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'cadere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'cadere',
            auxiliary: 'essere',
            passatoRemotoStem: prefix + 'cadd',
        };
    }

    if (infinitive === 'succedere' || infinitive === 'concedere') {
        const prefix = infinitive.slice(0, -6); // suc, con
        return {
            infinitive,
            group: 'ere',
            auxiliary: infinitive === 'succedere' ? 'essere' : 'avere',
            participioPassato: prefix + 'cesso',
            passatoRemotoStem: prefix + 'cess',
        };
    }

    if (infinitive.endsWith('cedere')) {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'cedere',
            auxiliary: 'avere',
        };
    }

    if (infinitive.endsWith('chiedere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'chiedere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'chiesto',
            passatoRemotoStem: prefix + 'chies',
        };
    }

    if (infinitive.endsWith('chiudere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'chiudere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'chiuso',
            passatoRemotoStem: prefix + 'chius',
        };
    }

    if (infinitive.endsWith('ogliere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'ogliere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'ogliere',
            auxiliary: 'avere',
            participioPassato: prefix + 'olto',
            passatoRemotoStem: prefix + 'ols',
        };
    }

    if (infinitive.endsWith('compiere') || infinitive.endsWith('compire')) {
        const prefix = infinitive.endsWith('compiere') 
            ? infinitive.slice(0, -'compiere'.length) 
            : infinitive.slice(0, -'compire'.length);
        
        return {
            infinitive,
            group: 'ere',
            subgroup: 'compiere',
            auxiliary: 'avere',
            participioPassato: prefix + 'compiuto',
        };
    }

    if (infinitive.endsWith('nettere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'nettere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'nettere',
            auxiliary: 'avere',
            participioPassato: prefix + 'nesso',
            passatoRemotoStem: prefix + 'ness',
        };
    }

    if (infinitive.endsWith('onoscere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'onoscere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'onosciuto',
            passatoRemotoStem: prefix + 'onobb',
        };
    }

    if (infinitive.endsWith('correre')) {
        const prefix = infinitive.slice(0, infinitive.length - 'correre'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: commonEssereVerbs.has(infinitive) ? 'essere' : 'avere',
            participioPassato: prefix + 'corso',
            passatoRemotoStem: prefix + 'cors',
        };
    }

    if (infinitive.endsWith('cuocere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'cuocere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'cuocere',
            auxiliary: 'avere',
            participioPassato: prefix + 'cotto',
            passatoRemotoStem: prefix + 'coss',
        };
    }

    const credereTypeVerbs = new Set(['credere', 'stridere', 'ricredere', 'scandere', 'scernere']);
    if (credereTypeVerbs.has(infinitive)) {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'credere',
            auxiliary: 'avere',
        };
    }

    if (infinitive.endsWith('durre')) {
        const prefix = infinitive.slice(0, infinitive.length - 'durre'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'durre',
            auxiliary: 'avere',
            participioPassato: prefix + 'dotto',
            passatoRemotoStem: prefix + 'duss',
        };
    }

    if (infinitive.endsWith('dolere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'dolere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'dolere',
            auxiliary: 'avere', // dolersi will be 'essere'
            participioPassato: prefix + 'doluto',
            passatoRemotoStem: prefix + 'dols',
        };
    }

    if (infinitive === 'dovere') {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'dovere',
            auxiliary: 'avere',
            participioPassato: 'dovuto',
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
        if (infinitive.endsWith('cire') && !infinitive.endsWith('uscire')) { // Excluding 'uscire' which is highly irregular (esco)
            return {
                infinitive,
                group: 'ire',
                subgroup: 'cire',
                auxiliary: 'avere',
            };
        }
    }

    if (group === 'ere') {
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
        case 'cene': pronouns = Array(6).fill('ce'); secondPronoun = 'ne'; break;
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
        const p2 = secondPronoun;
        const verbPart = form;
        const verbOrAux = verbPart.split(' ')[0];
        const restOfVerb = verbPart.split(' ').slice(1).join(' ');

        const startsWithEI = /^[eièé]/i.test(verbOrAux);
        const startsWithVowelOrH = /^[aeiouhàèéìòù]/i.test(verbOrAux);

        const fullForm = p2 ? `${p1} ${p2} ${verbPart}` : `${p1} ${verbPart}`;

        const generateAlternativeForms = () => {
             // Handle cases like "si è alzato/alzata" where the participle has alternatives
            const participleAlternatives = restOfVerb.split(' / ');
            const primaryParticiple = participleAlternatives[0];
            
            const longForm = `${p1} ${verbOrAux} ${restOfVerb}`;
            
            const shortenedForms = participleAlternatives.map(participle => {
                return `${p1.slice(0, 1)}'${verbOrAux}${participle ? ' ' + participle : ''}`;
            });
            const shortForm = shortenedForms.join(' / ');
            
            return { longForm, shortForm };
        };


        switch (pronounType) {
            case 'si': {
                if (startsWithEI) {
                    const { longForm, shortForm } = generateAlternativeForms();
                    return `${longForm} / ${shortForm}`;
                }
                return fullForm;
            }

            case 'ci':
            case 'ne': {
                if (startsWithEI) {
                    const { longForm, shortForm } = generateAlternativeForms();
                    return `${shortForm} / ${longForm}`;
                }
                return fullForm;
            }
            
            case 'sene':
            case 'cene': { // p2 is 'ne'
                 if (startsWithEI) {
                    const { longForm, shortForm } = generateAlternativeForms();
                    return `${shortForm} / ${longForm}`;
                }
                return fullForm;
            }

            case 'la': {
                if (startsWithVowelOrH) {
                    return `l'${verbPart}`;
                }
                return fullForm;
            }

            case 'sela':
            case 'cela': { // p2 is 'la'
                if (startsWithVowelOrH) {
                    return `${p1} l'${verbPart}`;
                }
                return fullForm;
            }

            default:
                return fullForm;
        }
    });
    
    // Feminine participio for -sela, -cela
    if (TENSE_INFO[tense].type === 'compound' && (pronounType === 'sela' || pronounType === 'cela')) {
        conjugated = conjugated.map(formWithPronounSlash => {
            // Handle pronoun alternatives first
            return formWithPronounSlash.split(' / ').map(form => {
                const parts = form.split(' ');
                const lastPart = parts[parts.length - 1]; // This is the participle, e.g., "lavato/lavata"
                if (lastPart.includes('/')) {
                    const femPart = lastPart.split('/')[1]; // "lavata"
                    parts[parts.length - 1] = femPart;
                    return parts.join(' ');
                }
                if(lastPart.endsWith('o')) {
                    return form.slice(0, -1) + 'a';
                }
                return form;
            }).join(' / ');
        });
    }

    return conjugated;
}


export function conjugate(verbInfo: VerbInfo, tense: string): string[] {
    const { infinitive, group, auxiliary } = verbInfo;

    if (verbInfo.pronounType) {
        return conjugatePronominal(verbInfo, tense);
    }

    if (verbInfo.subgroup === 'eseguire') {
        const stem = 'esegu';
        const iscStem = 'eseguisc';
    
        const getCombined = (regularForm: string, iscForm: string, isRegularOnly: boolean): string => {
            return isRegularOnly ? regularForm : `${regularForm} / ${iscForm}`;
        };
    
        switch (tense) {
            case 'Indicativo Presente': {
                const regularForms = ENDINGS['ire']['Indicativo Presente'].map(e => stem + e);
                const iscForms = [
                    iscStem + 'o',
                    iscStem + 'i',
                    iscStem + 'e',
                    stem + 'iamo',
                    stem + 'ite',
                    iscStem + 'ono'
                ];
                return regularForms.map((regForm, i) => getCombined(regForm, iscForms[i], i === 3 || i === 4));
            }
            case 'Congiuntivo Presente': {
                const regularForms = ENDINGS['ire']['Congiuntivo Presente'].map(e => stem + e);
                const iscForms = [
                    iscStem + 'a',
                    iscStem + 'a',
                    iscStem + 'a',
                    stem + 'iamo',
                    stem + 'iate',
                    iscStem + 'ano'
                ];
                return regularForms.map((regForm, i) => getCombined(regForm, iscForms[i], i === 3 || i === 4));
            }
            case 'Imperativo': {
                const regularForms = ENDINGS['ire']['Imperativo'].map(e => stem + e);
                const iscForms = [
                    '',
                    iscStem + 'i',
                    iscStem + 'a',
                    stem + 'iamo',
                    stem + 'ite',
                    iscStem + 'ano'
                ];
                const combined = regularForms.map((regForm, i) => getCombined(regForm, iscForms[i], i === 3 || i === 4));
                combined[0] = ''; // io is blank
                return combined;
            }
        }
    }

    if (verbInfo.subgroup === 'dire') {
        const prefix = infinitive.slice(0, infinitive.length - 'dire'.length);
        const stemDic = prefix + 'dic';
        const stemDicev = prefix + 'dicev';

        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemDic + 'o',
                    stemDic + 'i',
                    stemDic + 'e',
                    stemDic + 'iamo',
                    prefix + 'dite',
                    stemDic + 'ono'
                ];
            case 'Indicativo Imperfetto':
                const imperfettoEndings = ['o', 'i', 'a', 'amo', 'ate', 'ano'];
                return imperfettoEndings.map(e => stemDicev + e);
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem;
                if (!irregularStem) return [];
                return [
                    irregularStem + 'i',
                    stemDic + 'esti',
                    irregularStem + 'e',
                    stemDic + 'emmo',
                    stemDic + 'este',
                    irregularStem + 'ero',
                ];
            case 'Indicativo Futuro Semplice':
                const futStem = prefix + 'dir';
                const futEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futEndings.map(e => futStem + e);
            case 'Congiuntivo Presente':
                return [
                    stemDic + 'a',
                    stemDic + 'a',
                    stemDic + 'a',
                    stemDic + 'iamo',
                    stemDic + 'iate',
                    stemDic + 'ano'
                ];
            case 'Congiuntivo Imperfetto':
                const congImpfEndings = ['essi', 'essi', 'esse', 'essimo', 'este', 'essero'];
                return congImpfEndings.map(e => stemDic + e);
            case 'Condizionale Presente':
                const condStem = prefix + 'dir';
                const condEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condEndings.map(e => condStem + e);
            case 'Imperativo':
                 const tuImperativo = infinitive === 'dire' ? prefix + "di'" : stemDic + 'i';
                 return [
                    '',
                    tuImperativo,
                    stemDic + 'a',
                    stemDic + 'iamo',
                    prefix + 'dite',
                    stemDic + 'ano'
                ];
            case 'Gerundio':
                return [stemDic + 'endo'];
            case 'Participio Presente':
                return [stemDic + 'ente'];
        }
    }

    if (verbInfo.subgroup === 'dare') {
        switch (tense) {
            case 'Indicativo Presente':
                return ['do', 'dai', 'dà', 'diamo', 'date', 'danno'];
            case 'Indicativo Passato Remoto':
                return [
                    'diedi / detti',
                    'desti',
                    'diede / dette',
                    'demmo',
                    'deste',
                    'diedero / dettero'
                ];
            case 'Indicativo Futuro Semplice':
                const futStem = 'dar';
                const futEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futEndings.map(e => futStem + e);
            case 'Condizionale Presente':
                const condStem = 'dar';
                const condEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condEndings.map(e => condStem + e);
            case 'Congiuntivo Presente':
                return ['dia', 'dia', 'dia', 'diamo', 'diate', 'diano'];
            case 'Congiuntivo Imperfetto':
                return ['dessi', 'dessi', 'desse', 'dessimo', 'deste', 'dessero'];
            case 'Imperativo':
                return ['', "da' / dai", 'dia', 'diamo', 'date', 'diano'];
        }
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

    if (verbInfo.subgroup === 'durre') {
        const prefix = infinitive.slice(0, infinitive.length - 'durre'.length);
        const stemDuc = prefix + 'duc';
        const stemDurr = prefix + 'durr';

        switch (tense) {
            case 'Indicativo Presente':
                return ENDINGS['ere']['Indicativo Presente'].map(e => stemDuc + e);
            case 'Indicativo Imperfetto':
                return ENDINGS['ere']['Indicativo Imperfetto'].map(e => stemDuc + e);
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem;
                if (!irregularStem) return [];
                const regularStem = stemDuc;
                const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
                return [
                    irregularStem + 'i',
                    regularStem + regularEndings[1],
                    irregularStem + 'e',
                    regularStem + regularEndings[3],
                    regularStem + regularEndings[4],
                    irregularStem + 'ero',
                ];
            case 'Indicativo Futuro Semplice':
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => stemDurr + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => stemDurr + e);
            case 'Congiuntivo Presente':
                return ENDINGS['ere']['Congiuntivo Presente'].map(e => stemDuc + e);
            case 'Congiuntivo Imperfetto':
                return ENDINGS['ere']['Congiuntivo Imperfetto'].map(e => stemDuc + e);
            case 'Imperativo':
                return ENDINGS['ere']['Imperativo'].map(e => stemDuc + e);
            case 'Gerundio':
                 return [stemDuc + ENDINGS['ere']['Gerundio'][0]];
            case 'Participio Presente':
                const participioEndings = ENDINGS['ere']['Participio Presente'];
                if (!participioEndings || participioEndings.length === 0) return [];
                const singolare = stemDuc + participioEndings[0];
                return [singolare, singolare.slice(0, -1) + 'i'];
        }
    }

    if (verbInfo.subgroup === 'dolere') {
        const prefix = infinitive.slice(0, infinitive.length - 'dolere'.length);
        const stemDolg = prefix + 'dolg';
        const stemDuol = prefix + 'duol';
        const stemDol = prefix + 'dol';

        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemDolg + 'o',
                    stemDuol + 'i',
                    stemDuol + 'e',
                    stemDol + 'iamo',
                    stemDol + 'ete',
                    stemDolg + 'ono'
                ];
            case 'Congiuntivo Presente':
                return [
                    stemDolg + 'a',
                    stemDolg + 'a',
                    stemDolg + 'a',
                    stemDol + 'iamo',
                    stemDol + 'iate',
                    stemDolg + 'ano'
                ];
            case 'Imperativo':
                return [
                    '',
                    stemDuol + 'i',
                    stemDolg + 'a',
                    stemDol + 'iamo',
                    stemDol + 'ete',
                    stemDolg + 'ano'
                ];
        }
    }

    if (verbInfo.subgroup === 'dovere') {
        const syncopatedStem = 'dovr';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    'devo / debbo',
                    'devi',
                    'deve',
                    'dobbiamo',
                    'dovete',
                    'devono / debbono'
                ];
            case 'Indicativo Passato Remoto':
                 return [
                    'dovei / dovetti',
                    'dovesti',
                    'dové / dovette',
                    'dovemmo',
                    'doveste',
                    'doverono / dovettero'
                ];
            case 'Indicativo Futuro Semplice':
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    'deva / debba',
                    'deva / debba',
                    'deva / debba',
                    'dobbiamo',
                    'dobbiate',
                    'devano / debbano'
                ];
            case 'Imperativo':
                return []; // No imperative
        }
    }

    if (verbInfo.subgroup === 'cuocere') {
        const prefix = infinitive.slice(0, infinitive.length - 'cuocere'.length);
        const stem = prefix + 'cuoc';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stem + 'io',   // cuocio
                    stem + 'i',    // cuoci
                    stem + 'e',    // cuoce
                    stem + 'iamo', // cuociamo
                    stem + 'ete',  // cuocete
                    stem + 'iono', // cuociono
                ];
            case 'Congiuntivo Presente':
                return [
                    stem + 'ia',
                    stem + 'ia',
                    stem + 'ia',
                    stem + 'iamo',
                    stem + 'iate',
                    stem + 'iano',
                ];
            case 'Imperativo':
                 return [
                    '',
                    stem + 'i',      // tu
                    stem + 'ia',     // Lei
                    stem + 'iamo',   // noi
                    stem + 'ete',    // voi
                    stem + 'iano',   // Loro
                ];
        }
    }

    if (verbInfo.subgroup === 'ogliere') {
        const stem = infinitive.slice(0, -7); // cogliere -> c
        const regularStem = stem + 'ogli'; // c + ogli -> cogli
        const irregularStem = stem + 'olg'; // c + olg -> colg
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    irregularStem + 'o',     // colgo
                    regularStem,           // cogli
                    regularStem + 'e',       // coglie
                    regularStem + 'amo',     // cogliamo
                    regularStem + 'ete',     // cogliete
                    irregularStem + 'ono',   // colgono
                ];
            case 'Congiuntivo Presente':
                return [
                    irregularStem + 'a',
                    irregularStem + 'a',
                    irregularStem + 'a',
                    regularStem + 'amo',
                    regularStem + 'ate',
                    irregularStem + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    regularStem,
                    irregularStem + 'a',
                    regularStem + 'amo',
                    regularStem + 'ete',
                    irregularStem + 'ano',
                ];
        }
    }

    if (verbInfo.subgroup === 'cire') {
        const stem = infinitive.slice(0, -3); // cucire -> cuc
        
        if (tense === 'Indicativo Presente') {
            return [
                stem + 'io',
                stem + 'i',
                stem + 'e',
                stem + 'iamo',
                stem + 'ite',
                stem + 'iono',
            ];
        }
        if (tense === 'Congiuntivo Presente') {
            return [
                stem + 'ia',
                stem + 'ia',
                stem + 'ia',
                stem + 'iamo',
                stem + 'iate',
                stem + 'iano',
            ];
        }
    }

    if (verbInfo.subgroup === 'compiere') {
        const prefix = verbInfo.infinitive.endsWith('compiere') 
            ? verbInfo.infinitive.slice(0, -'compiere'.length) 
            : verbInfo.infinitive.slice(0, -'compire'.length);
        
        const stem = prefix + 'comp';
        const iStem = prefix + 'compi';

        switch (tense) {
            case 'Indicativo Presente':
                return [iStem + 'o', iStem, iStem + 'e', stem + 'iamo', stem + 'ite', iStem + 'ono'];
            case 'Indicativo Imperfetto':
                return ENDINGS['ire']['Indicativo Imperfetto'].map(e => stem + e);
            case 'Indicativo Passato Remoto':
                return ENDINGS['ire']['Indicativo Passato Remoto'].map(e => stem + e);
            case 'Indicativo Futuro Semplice':
                return ENDINGS['ire']['Indicativo Futuro Semplice'].map(e => stem + e);
            case 'Congiuntivo Presente':
                return [iStem + 'a', iStem + 'a', iStem + 'a', stem + 'iamo', stem + 'iate', iStem + 'ano'];
            case 'Congiuntivo Imperfetto':
                return ENDINGS['ire']['Congiuntivo Imperfetto'].map(e => stem + e);
            case 'Condizionale Presente':
                return ENDINGS['ire']['Condizionale Presente'].map(e => stem + e);
            case 'Imperativo':
                return ['', iStem, iStem + 'a', stem + 'iamo', stem + 'ite', iStem + 'ano'];
            case 'Gerundio':
                return [stem + 'endo'];
            case 'Participio Presente':
                return [stem + 'iente', stem + 'ienti'];
        }
    }

    if (verbInfo.subgroup === 'battere' || verbInfo.subgroup === 'cedere' || verbInfo.subgroup === 'credere') {
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

    if (verbInfo.subgroup === 'cadere') {
        const syncopatedStem = infinitive.slice(0, -3) + 'r';
        if (tense === 'Indicativo Futuro Semplice') {
            const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
            return futuroEndings.map(e => syncopatedStem + e);
        }
        if (tense === 'Condizionale Presente') {
            const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
            return condizionaleEndings.map(e => syncopatedStem + e);
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
    
    // Handle Passato Remoto with regular and irregular forms
    if (tense === 'Indicativo Passato Remoto' && (verbInfo.subgroup === 'flettere' || verbInfo.subgroup === 'nettere')) {
        const irregularStem = verbInfo.passatoRemotoStem;
        if (!irregularStem) return [];

        const regularStem = verbInfo.infinitive.slice(0, -3);
        const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
        if (!regularEndings) return [];
        const regularForms = regularEndings.map(e => regularStem + e);

        return [
            `${irregularStem}i / ${regularForms[0]}`,
            regularForms[1],
            `${irregularStem}e / ${regularForms[2]}`,
            regularForms[3],
            regularForms[4],
            `${irregularStem}ero / ${regularForms[5]}`,
        ];
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

    // Special case for -ciare, -giare verbs to drop the stem 'i' before 'e' or 'i' endings.
    if (infinitive.endsWith('ciare') || infinitive.endsWith('giare')) {
        const baseStem = infinitive.slice(0, -3); // e.g., cominci-, mangi-
        return endings.map(ending => {
            if (ending && (ending.startsWith('e') || ending.startsWith('i'))) {
                const modifiedStem = baseStem.slice(0, -1); // e.g., cominc-, mang-
                return modifiedStem + ending;
            }
            return baseStem + ending;
        });
    }

    // Special case for -care, -gare verbs to maintain hard C/G sound
    if (infinitive.endsWith('care') || infinitive.endsWith('gare')) {
        return endings.map(ending => {
            if (ending && (ending.startsWith('e') || ending.startsWith('i'))) {
                return stem + 'h' + ending;
            }
            return stem + ending;
        });
    }
    
    return endings.map(ending => stem + ending);
}