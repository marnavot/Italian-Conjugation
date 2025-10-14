import { VerbInfo } from "../types";

const AVERE = {
    'Indicativo Presente': ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'],
    'Indicativo Imperfetto': ['avevo', 'avevi', 'aveva', 'avevamo', 'avevate', 'avano'],
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

const TENSE_INFO: Record<string, { type: 'simple' | 'compound' | 'progressive', auxTense: string }> = {
    'Indicativo Presente': { type: 'simple', auxTense: '' },
    'Indicativo Presente Progressivo': { type: 'progressive', auxTense: 'Indicativo Presente' },
    'Indicativo Passato Prossimo': { type: 'compound', auxTense: 'Indicativo Presente' },
    'Indicativo Imperfetto': { type: 'simple', auxTense: '' },
    'Indicativo Passato Progressivo': { type: 'progressive', auxTense: 'Indicativo Imperfetto' },
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

// FIX: Added 'ripartire' to this list.
const commonEssereVerbs = new Set(['arrivare', 'essere', 'stare', 'andare', 'venire', 'entrare', 'uscire', 'partire', 'ripartire', 'tornare', 'ritornare', 'nascere', 'morire', 'piacere', 'sembrare', 'diventare', 'rimanere', 'restare', 'salire', 'cadere', 'esistere', 'accorrere', 'parere', 'giacere', 'rimanere', 'permanere', 'recere', 'svanire', 'scappare']);

const ERE_IRREGULAR_PATTERNS: Record<string, { participio_ending: string, pass_rem_stem_ending: string }> = {
    'angere':    { participio_ending: 'anto', pass_rem_stem_ending: 'ans' },
    'cidere':    { participio_ending: 'ciso', pass_rem_stem_ending: 'cis' },
    'cendere':   { participio_ending: 'ceso', pass_rem_stem_ending: 'ces' },
    'eggere':    { participio_ending: 'etto', pass_rem_stem_ending: 'ess' }, // for leggere, reggere...
    'ergere':    { participio_ending: 'erso', pass_rem_stem_ending: 'ers' },
    'figgere':   { participio_ending: 'fitto', pass_rem_stem_ending: 'fiss' },
    'fliggere':  { participio_ending: 'flitto', pass_rem_stem_ending: 'fliss' },
    'fondere':   { participio_ending: 'fuso', pass_rem_stem_ending: 'fus' },
    'frangere':  { participio_ending: 'franto', pass_rem_stem_ending: 'frans' },
    'friggere':  { participio_ending: 'fritto', pass_rem_stem_ending: 'friss' },
    'indere':    { participio_ending: 'isso', pass_rem_stem_ending: 'iss' },
    'ingere':    { participio_ending: 'into', pass_rem_stem_ending: 'ins' },
    'ledere':    { participio_ending: 'leso', pass_rem_stem_ending: 'les' },
    'ligere':    { participio_ending: 'letto', pass_rem_stem_ending: 'less' },
    'ludere':    { participio_ending: 'luso', pass_rem_stem_ending: 'lus' },
    'mergere':   { participio_ending: 'merso', pass_rem_stem_ending: 'mers' },
    'nguere':    { participio_ending: 'nto', pass_rem_stem_ending: 'ns' },
    'ordere':    { participio_ending: 'orso', pass_rem_stem_ending: 'ors' },
    'pandere':   { participio_ending: 'panso', pass_rem_stem_ending: 'pans' },
    'pendere':   { participio_ending: 'peso', pass_rem_stem_ending: 'pes' },
    'piangere':  { participio_ending: 'pianto', pass_rem_stem_ending: 'pians' },
    'plodere':   { participio_ending: 'ploso', pass_rem_stem_ending: 'plos' },
    'prendere':  { participio_ending: 'preso', pass_rem_stem_ending: 'pres' },
    'primere':   { participio_ending: 'presso', pass_rem_stem_ending: 'press' },
    'quidere':   { participio_ending: 'quiso', pass_rem_stem_ending: 'quis' },
    'rendere':   { participio_ending: 'reso', pass_rem_stem_ending: 'res' },
    'rodere':    { participio_ending: 'roso', pass_rem_stem_ending: 'ros' },
    'ruggere':   { participio_ending: 'rutto', pass_rem_stem_ending: 'russ' },
    'sidere':    { participio_ending: 'siso', pass_rem_stem_ending: 'sis' },
    'tendere':   { participio_ending: 'teso', pass_rem_stem_ending: 'tes' },
    'trudere':   { participio_ending: 'truso', pass_rem_stem_ending: 'trus' },
    'uggere':    { participio_ending: 'utto', pass_rem_stem_ending: 'uss' },
    'ulgere':    { participio_ending: 'ulso', pass_rem_stem_ending: 'uls' },
    'ungere':    { participio_ending: 'unto', pass_rem_stem_ending: 'uns' },
    'vadere':    { participio_ending: 'vaso', pass_rem_stem_ending: 'vas' },
    'videre':    { participio_ending: 'viso', pass_rem_stem_ending: 'vis' },
};

// FIX: Added new verbs to the -isc group.
const ISC_VERBS = new Set([
  'capire', 'finire', 'scolpire', 'pulire', 'punire', 'infastidire', 'intimidire', 'starnutire', 
  'fornire', 'distribuire', 'dimagrire', 'stabilire', 'rifornire', 'perquisire', 
  'snellire', 'fluire', 'istituire', 'rapire', 'gestire', 'ristabilire', 
  'patire', 'abolire', 'differire', 'ferire', 'inferire', 'profferire', 'garantire',
  'spedire', 'costruire', 'unire', 'stupire', 'sparire', 'subire', 'svanire',
  'agire', 'restituire', 'tradire', 'sostituire', 'diminuire', 'reagire',
  'suggerire', 'chiarire', 'impedire', 'gradire', 'contribuire', 'proibire', 'ubbidire', 'obbedire', 'fallire', 'tossire', 'condire', 'fiorire', 'impazzire', 'favorire', 'arrossire', 'percepire', 'arricchire', 'gioire', 'aderire', 'acquisire', 'esercire', 'attribuire', 'smarrire'
]);

// FIX: Create an explicit list of 'fare' derivatives to avoid mis-conjugating other verbs.
const fareDerivatives = new Set(['fare', 'assuefare', 'benefare', 'contraffare', 'disfare', 'liquefare', 'misfare', 'prefare', 'rifare', 'soddisfare', 'sopraffare', 'strafare', 'stupefare', 'torrefare', 'tumefare']);

// This internal function handles guessing info for a single verb string without extra words.
function guessVerbInfoInternal(infinitive: string): VerbInfo {
    const pronominalEndings: VerbInfo['pronounType'][] = ['sela', 'sene', 'cela', 'cene', 'si', 'ci', 'ne', 'la'];
    for (const ending of pronominalEndings) {
        if (infinitive.endsWith(ending)) {
            // Reconstruct base infinitive, e.g., "alzarsi" -> "alzare", "farsi" -> "fare"
            const baseInfinitiveStem = infinitive.slice(0, -ending.length);
            const baseInfinitive = baseInfinitiveStem + (baseInfinitiveStem.endsWith('r') ? 'e' : 're');

            const baseInfo = guessVerbInfoInternal(baseInfinitive); // Recursive call with correct base infinitive
            
            let auxiliary = baseInfo.auxiliary;
            // Reflexive verbs (those with 'si') always take 'essere'
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

    const direDerivatives = new Set(['dire', 'disdire', 'ridire', 'predire', 'stramaledire', 'contraddire', 'benedire', 'sdire', 'addire', 'indire', 'maledire', 'interdire']);
    // FIX: Make 'andare' rule more specific, add trasandare.
    const andareDerivatives = new Set(['andare', 'riandare', 'trasandare']);

    // FIX: Add explicit rules for verbs with specific auxiliaries.
    if (infinitive === 'domandare' || infinitive === 'prestare' || infinitive === 'acquistare') {
        return { infinitive, group: 'are', auxiliary: 'avere' };
    }
    if (infinitive === 'nevicare') {
        return {
            infinitive,
            group: 'are',
            auxiliary: 'essere / avere',
        };
    }
    if (infinitive === 'bastare') {
        return {
            infinitive,
            group: 'are',
            auxiliary: 'essere',
        };
    }
    if (infinitive === 'possedere') {
        return { infinitive, group: 'ere', auxiliary: 'avere' };
    }
    
    if (infinitive === 'cambiare') {
        return { infinitive, group: 'are', auxiliary: 'essere / avere' };
    }
    if (infinitive.endsWith('crescere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'crescere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'essere / avere',
            participioPassato: prefix + 'cresciuto',
            passatoRemotoStem: prefix + 'crebb',
        };
    }
    if (infinitive === 'iniziare') {
        return { infinitive, group: 'are', auxiliary: 'essere / avere' };
    }
    if (infinitive.endsWith('scendere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'scendere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'essere / avere',
            participioPassato: prefix + 'sceso',
            passatoRemotoStem: prefix + 'sces',
        };
    }

    if (infinitive.endsWith('sapere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'sapere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'sapere',
            auxiliary: 'avere',
            passatoRemotoStem: prefix + 'sepp',
        };
    }

    if (infinitive.endsWith('potere')) {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'potere',
            auxiliary: 'avere',
        };
    }

    if (infinitive.endsWith('volere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'volere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'volere',
            auxiliary: 'avere',
            passatoRemotoStem: prefix + 'voll',
        };
    }

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

    if (infinitive === 'godere') {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'godere',
            auxiliary: 'avere',
        };
    }

    if (infinitive === 'cernere') {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'credere', // To get the dual-form -ei/-etti passato remoto
            auxiliary: 'avere',
            participioPassato: 'cernito',
        };
    }

    if (infinitive.endsWith('ferire') && infinitive !== 'ferire') {
        const prefix = infinitive.slice(0, infinitive.length - 'ferire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'ferire-deriv',
            auxiliary: 'avere',
            participioPassato: `${prefix}ferito / ${prefix}ferto`,
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

    if (infinitive.endsWith('sigere')) { // for esigere
        const prefix = infinitive.slice(0, infinitive.length - 'igere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'atto',
        };
    }

    if (direDerivatives.has(infinitive)) {
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

    if (andareDerivatives.has(infinitive)) {
        return {
            infinitive,
            group: 'are',
            subgroup: 'andare',
            auxiliary: 'essere',
        }
    }

    if (infinitive.endsWith('trarre')) {
        const prefix = infinitive.slice(0, infinitive.length - 'trarre'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'trarre',
            auxiliary: 'avere',
            participioPassato: prefix + 'tratto',
            passatoRemotoStem: prefix + 'trass',
        };
    }

    if (fareDerivatives.has(infinitive)) {
        const prefix = infinitive.slice(0, infinitive.length - 'fare'.length);
        return {
            infinitive,
            group: 'are',
            subgroup: 'fare',
            auxiliary: 'avere',
            participioPassato: prefix + 'fatto',
        };
    }

    for (const base of ['aprire', 'coprire', 'offrire']) {
        if (infinitive.endsWith(base)) {
            const prefix = infinitive.slice(0, infinitive.length - base.length);
            const stem = base.slice(0, -3); // apr, copr, offr
            return {
                infinitive,
                group: 'ire',
                subgroup: 'erto-ire',
                auxiliary: 'avere',
                participioPassato: prefix + stem + 'erto',
                passatoRemotoStem: prefix + stem + 'ers',
            };
        }
    }

    // FIX: sparire is not part of this group.
    if (infinitive.endsWith('parire') && infinitive !== 'sparire') {
        const prefix = infinitive.slice(0, infinitive.length - 'parire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'parire',
            auxiliary: 'essere',
            participioPassato: prefix + 'parso',
        };
    }
    
    if (infinitive === 'parere') {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'parere',
            auxiliary: 'essere',
            participioPassato: 'parso',
            passatoRemotoStem: 'parv',
        };
    }

    if (infinitive.endsWith('perdere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'perdere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: `${prefix}perso / ${prefix}perduto`,
            passatoRemotoStem: `${prefix}pers`,
        };
    }

    const iacereLikeVerbs = ['piacere', 'giacere', 'tacere'];
    for (const base of iacereLikeVerbs) {
        if (infinitive.endsWith(base)) {
            const prefix = infinitive.slice(0, infinitive.length - base.length);
            const aux = (base === 'tacere') ? 'avere' : 'essere';
            return {
                infinitive,
                group: 'ere',
                subgroup: 'iacere-like',
                auxiliary: aux,
                participioPassato: prefix + base.slice(0, -3) + 'iuto', // piac-iuto
                passatoRemotoStem: prefix + base.slice(0, -4) + 'cqu', // piac -> pia + cqu -> piacqu
            };
        }
    }

    if (infinitive.endsWith('manere')) { // for rimanere, permanere
        const prefix = infinitive.slice(0, infinitive.length - 'manere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'manere',
            auxiliary: 'essere',
            participioPassato: `${prefix}masto`,
            passatoRemotoStem: `${prefix}mas`,
        };
    }

    if (infinitive.endsWith('mentire')) {
        return {
            infinitive,
            group: 'ire',
            subgroup: 'mentire',
            auxiliary: 'avere',
        };
    }

    if (infinitive === 'mescere' || infinitive === 'pascere') {
        return {
           infinitive,
           group: 'ere',
           auxiliary: 'avere',
           participioPassato: infinitive.slice(0, -3) + 'iuto', // mesciuto, pasciuto
       };
   }

    if (infinitive.endsWith('mettere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'mettere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'messo',
            passatoRemotoStem: prefix + 'mis',
        };
    }

    if (infinitive.endsWith('morire')) {
        const prefix = infinitive.slice(0, infinitive.length - 'morire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'morire',
            auxiliary: 'essere',
            participioPassato: prefix + 'morto',
        };
    }
    
    if (infinitive.endsWith('muovere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'muovere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'muovere',
            auxiliary: 'avere', // muoversi is essere
            participioPassato: prefix + 'mosso',
            passatoRemotoStem: prefix + 'moss',
        };
    }
    
    if (infinitive.endsWith('nascere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'nascere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'nascere',
            auxiliary: 'essere',
            participioPassato: prefix + 'nato',
            passatoRemotoStem: prefix + 'nacq',
        };
    }

    if (infinitive.endsWith('nuocere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'nuocere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'nuocere',
            auxiliary: 'avere',
            participioPassato: prefix + 'nuociuto / ' + prefix + 'nociuto',
            passatoRemotoStem: prefix + 'nocq',
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

    const stareLikeVerbs = new Set(['stare', 'ristare', 'soprastare', 'sottostare']);
    if (stareLikeVerbs.has(infinitive)) {
        const prefix = infinitive.slice(0, infinitive.length - 'stare'.length);
        return {
            infinitive,
            group: 'are',
            subgroup: 'stare',
            auxiliary: 'essere',
            participioPassato: prefix + 'stato',
        };
    }

    if (infinitive.endsWith('suadere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'suadere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: `${prefix}suaso`,
            passatoRemotoStem: `${prefix}suas`,
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

    if (infinitive.endsWith('vellere')) { // for svellere, divellere
        const prefix = infinitive.slice(0, infinitive.length - 'vellere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'velto',
            passatoRemotoStem: prefix + 'vels',
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

    const bereDerivatives = new Set(['bere', 'ribere', 'strabere', 'imbevere']);
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

    if (infinitive.endsWith('scegliere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'scegliere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'scegliere',
            auxiliary: 'avere',
            participioPassato: prefix + 'scelto',
            passatoRemotoStem: prefix + 'scels',
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

    if (infinitive === 'pendere') {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'credere', // Re-uses the dual passato remoto logic
            auxiliary: 'avere',
            participioPassato: 'penduto',
        };
    }
    const credereTypeVerbs = new Set(['credere', 'stridere', 'ricredere', 'scandere', 'scernere', 'cernere']);
    if (credereTypeVerbs.has(infinitive)) {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'credere',
            auxiliary: 'avere',
        };
    }

    const vendereTypeVerbs = new Set(['vendere', 'rivendere', 'compravendere', 'svendere', 'mietere']);
    if (vendereTypeVerbs.has(infinitive)) {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'vendere',
            auxiliary: 'avere',
        };
    }
    if (infinitive.endsWith('fendere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'fendere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'vendere', // To get the -ett passato remoto
            auxiliary: 'avere',
            participioPassato: prefix + 'feso',
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

    if (infinitive.endsWith('orgere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'orgere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'orto',
            passatoRemotoStem: prefix + 'ors',
        };
    }

    // FIX: Correctly handle '-surgere' verbs by preserving the 's' in the prefix.
    if (infinitive.endsWith('surgere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'urgere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'orto',
            passatoRemotoStem: prefix + 'ors',
        };
    }

    if (infinitive.endsWith('piovere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'piovere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'piovere',
            auxiliary: 'essere / avere',
            participioPassato: prefix + 'piovuto',
            passatoRemotoStem: prefix + 'piovv',
        };
    }

    if (infinitive.endsWith('porre')) {
        const prefix = infinitive.slice(0, infinitive.length - 'porre'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'porre',
            auxiliary: 'avere',
            participioPassato: prefix + 'posto',
            passatoRemotoStem: prefix + 'pos',
        };
    }

    if (infinitive.endsWith('radere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'radere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'raso',
            passatoRemotoStem: prefix + 'ras',
        };
    }
    
    if (infinitive.endsWith('ridere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'ridere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'riso',
            passatoRemotoStem: prefix + 'ris',
        };
    }

    if (infinitive === 'recere') {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'recere',
            auxiliary: 'essere',
            participioPassato: 'reciuto',
        };
    }

    if (infinitive === 'redigere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'redatto',
            passatoRemotoStem: 'redass',
        };
    }
    
    // FIX: Add rule for dirigere
    if (infinitive === 'dirigere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'diretto',
            passatoRemotoStem: 'diress',
        };
    }

    if (infinitive === 'transigere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'transatto',
            passatoRemotoStem: 'transass',
        };
    }
    
    if (infinitive === 'redimere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'redento',
            passatoRemotoStem: 'redens',
        };
    }

    if (infinitive.endsWith('stringere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'stringere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'stretto',
            passatoRemotoStem: prefix + 'strins',
        };
    }

    if (infinitive === 'riempire') {
        return {
            infinitive,
            group: 'ire',
            subgroup: 'riempire',
            auxiliary: 'avere',
            participioPassato: 'riempito',
        };
    }
    
    if (infinitive.endsWith('riavere')) {
        return {
            infinitive,
            group: 'avere',
            subgroup: 'riavere',
            auxiliary: 'avere',
            participioPassato: 'riavuto',
        };
    }
    
    if (infinitive.endsWith('ridare')) {
        return {
            infinitive,
            group: 'are',
            subgroup: 'ridare',
            auxiliary: 'avere',
            participioPassato: 'ridato',
        };
    }
    
    if (infinitive.endsWith('rompere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'rompere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'rotto',
            passatoRemotoStem: prefix + 'rupp',
        };
    }
    
    if (infinitive.endsWith('salire')) {
        return {
            infinitive,
            group: 'ire',
            subgroup: 'salire',
            auxiliary: 'essere / avere',
            participioPassato: 'salito',
        };
    }

    if (infinitive === 'sciare') {
        return {
            infinitive,
            group: 'are',
            subgroup: 'sciare',
            auxiliary: 'avere',
        };
    }

    if (infinitive.endsWith('scrivere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'scrivere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'scritto',
            passatoRemotoStem: prefix + 'scriss',
        };
    }
    
    if (infinitive.endsWith('scuotere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'scuotere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'scuotere',
            auxiliary: 'avere',
            participioPassato: prefix + 'scosso',
            passatoRemotoStem: prefix + 'scoss',
        };
    }

    if (infinitive.endsWith('sedere')) {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'sedere',
            auxiliary: 'essere / avere', // Sedersi is 'essere', sedere is 'avere'
        };
    }

    if (infinitive.endsWith('seppellire')) {
        const prefix = infinitive.slice(0, infinitive.length - 'seppellire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'isc',
            auxiliary: 'avere',
            participioPassato: `${prefix}sepolto / ${prefix}seppellito`,
        };
    }

    if (infinitive === 'solere') {
        return {
            infinitive,
            group: 'ere',
            subgroup: 'solere',
            auxiliary: 'avere',
        };
    }

    if (infinitive.endsWith('spargere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'spargere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'sparso',
            passatoRemotoStem: prefix + 'spars',
        };
    }
    
    if (infinitive === 'spegnere') {
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: 'spento',
            passatoRemotoStem: 'spens',
        };
    }

    if (infinitive.endsWith('tenere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'tenere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'tenere',
            auxiliary: 'avere',
            passatoRemotoStem: prefix + 'tenn',
        };
    }

    if (infinitive.endsWith('torcere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'torcere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'torto',
            passatoRemotoStem: prefix + 'tors',
        };
    }

    if (infinitive === 'udire' || infinitive === 'riudire') {
        return {
            infinitive,
            group: 'ire',
            subgroup: 'udire',
            auxiliary: 'avere',
        };
    }

    if (infinitive.endsWith('uscire')) {
        return {
            infinitive,
            group: 'ire',
            subgroup: 'uscire',
            auxiliary: 'essere',
        };
    }
    
    if (infinitive.endsWith('valere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'valere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'valere',
            auxiliary: 'essere / avere',
            participioPassato: `${prefix}valso / ${prefix}valuto`,
            passatoRemotoStem: prefix + 'vals',
        };
    }

    if (infinitive.endsWith('vedere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'vedere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'vedere',
            auxiliary: 'avere',
            participioPassato: `${prefix}visto / ${prefix}veduto`,
            passatoRemotoStem: `${prefix}vid`,
        };
    }

    if (infinitive.endsWith('venire')) {
        const prefix = infinitive.slice(0, infinitive.length - 'venire'.length);
        return {
            infinitive,
            group: 'ire',
            subgroup: 'venire',
            auxiliary: 'essere',
            participioPassato: prefix + 'venuto',
            passatoRemotoStem: prefix + 'venn',
        };
    }

    if (infinitive.endsWith('vincere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'vincere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'vinto',
            passatoRemotoStem: prefix + 'vins',
        };
    }

    if (infinitive.endsWith('vivere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'vivere'.length);
        return {
            infinitive,
            group: 'ere',
            subgroup: 'vivere',
            auxiliary: 'essere / avere',
            participioPassato: prefix + 'vissuto',
            passatoRemotoStem: prefix + 'viss',
        };
    }

    if (infinitive.endsWith('volgere')) {
        const prefix = infinitive.slice(0, infinitive.length - 'volgere'.length);
        return {
            infinitive,
            group: 'ere',
            auxiliary: 'avere',
            participioPassato: prefix + 'volto',
            passatoRemotoStem: prefix + 'vols',
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


export function guessVerbInfo(infinitive: string): VerbInfo {
    const originalInfinitive = infinitive.trim();
    const parts = originalInfinitive.split(/\s+/);
    const verbPart = parts[0];
    const extraWords = parts.slice(1).join(' ');

    const coreInfo = guessVerbInfoInternal(verbPart);

    return {
        ...coreInfo,
        infinitive: originalInfinitive,
        extraWords: extraWords.length > 0 ? extraWords : undefined,
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

    const tenseInfoForPronominal = TENSE_INFO[tense];
    if (tenseInfoForPronominal && tenseInfoForPronominal.type === 'progressive') {
        const baseVerbInfo = guessVerbInfo(baseInfinitive);
        const gerundioArray = conjugateInternal(baseVerbInfo, 'Gerundio');
        if (!gerundioArray || gerundioArray.length === 0) return [];
        const gerundio = gerundioArray[0];

        const stareInfo = guessVerbInfoInternal('stare');
        const stareConjugation = conjugateInternal(stareInfo, tenseInfoForPronominal.auxTense);
        
        let pronouns: string[] = [];

        switch (pronounType) {
            case 'si':
                pronouns = REFLEXIVE_PRONOUNS;
                break;
            case 'ci':
                pronouns = Array(6).fill('ci');
                break;
            case 'ne':
                pronouns = Array(6).fill('ne');
                break;
            case 'la':
                pronouns = Array(6).fill('la');
                break;
            case 'sela':
                pronouns = DOUBLE_PRONOUNS_FIRST.map(p => `${p} la`);
                break;
            case 'sene':
                pronouns = DOUBLE_PRONOUNS_FIRST.map(p => `${p} ne`);
                break;
            case 'cela':
                pronouns = Array(6).fill('ce la');
                break;
            case 'cene':
                pronouns = Array(6).fill('ce ne');
                break;
            default:
                // Should not happen if guessVerbInfo is exhaustive, but as a fallback:
                pronouns = REFLEXIVE_PRONOUNS;
                break;
        }

        return stareConjugation.map((stareForm, index) => {
            if (!stareForm) return '';
            return `${pronouns[index]} ${stareForm} ${gerundio}`;
        });
    }

    const baseVerbInfo = { ...guessVerbInfo(baseInfinitive), auxiliary };
    
    if (tense === 'Participio Passato') {
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

    let conjugationToProcess = baseConjugation;
    const tenseInfo = TENSE_INFO[tense];

    if (tenseInfo && tenseInfo.type === 'compound' && (pronounType === 'sela' || pronounType === 'cela')) {
        // Agreement with direct object 'la' is mandatory for compound tenses, making the participle feminine singular.
        conjugationToProcess = baseConjugation.map(form => {
            if (!form) return '';
            
            const forms = form.split(' / ');
            const newForms = forms.map(singleForm => {
                const parts = singleForm.trim().split(' ');
                const auxPart = parts.slice(0, -1).join(' ');
                let participioPart = parts[parts.length - 1];

                if (participioPart.endsWith('o') || participioPart.endsWith('i') || participioPart.endsWith('e')) {
                     participioPart = participioPart.slice(0, -1) + 'a';
                }
                return `${auxPart} ${participioPart}`;
            });
            return Array.from(new Set(newForms)).join(' / ');
        });
    }


    if (tense === 'Imperativo') {
        const result = [...conjugationToProcess];
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
    
    const finalForms: string[] = [];
    for (let index = 0; index < conjugationToProcess.length; index++) {
        const form = conjugationToProcess[index];
        if (!form) {
            finalForms.push('');
            continue;
        }

        const baseForms = form.split(' / ').map(s => s.trim());
        const personForms = new Set<string>();

        baseForms.forEach(baseForm => {
            const p1 = pronouns[index];
            const p2 = secondPronoun;

            // This handles compound tenses where baseForm is "auxiliary participio"
            const verbParts = baseForm.split(' ');
            const firstWord = verbParts[0];
            const restOfVerb = verbParts.slice(1).join(' ');

            const startsWithEI = /^[eièé]/i.test(firstWord);
            const startsWithVowelOrH = /^[aeiouhàèéìòù]/i.test(firstWord);

            const buildVerb = (pronounPart: string) => {
                const combinedVerb = pronounPart.endsWith("'")
                    ? `${pronounPart}${firstWord}`
                    : `${pronounPart} ${firstWord}`;
                return combinedVerb + (restOfVerb ? ` ${restOfVerb}` : '');
            };

            switch (pronounType) {
                case 'si':
                case 'ci':
                case 'ne':
                    personForms.add(buildVerb(p1));
                    if (startsWithEI) {
                        personForms.add(buildVerb(`${p1.slice(0, 1)}'`));
                    }
                    break;
                case 'sene':
                case 'cene':
                    personForms.add(buildVerb(`${p1} ${p2}`));
                    if (startsWithEI) {
                        personForms.add(buildVerb(`${p1} n'`));
                    }
                    break;
                case 'la':
                    if (startsWithVowelOrH) {
                        personForms.add(buildVerb("l'"));
                    } else {
                        personForms.add(buildVerb(p1));
                    }
                    break;
                case 'sela':
                case 'cela':
                    personForms.add(buildVerb(`${p1} ${p2}`));
                     if (startsWithVowelOrH) {
                        personForms.add(buildVerb(`${p1} l'`));
                    }
                    break;
                default:
                    personForms.add(buildVerb(p1));
            }
        });

        finalForms.push(Array.from(personForms).join(' / '));
    }
    return finalForms;
}

function conjugateInternal(verbInfo: VerbInfo, tense: string): string[] {
    const { infinitive, group, auxiliary } = verbInfo;

    if (verbInfo.pronounType) {
        return conjugatePronominal(verbInfo, tense);
    }

    const tenseInfo = TENSE_INFO[tense];
    if (!tenseInfo) return [];

    if (tenseInfo.type === 'progressive') {
        const gerundioArray = conjugateInternal(verbInfo, 'Gerundio');
        if (!gerundioArray || gerundioArray.length === 0) return [];
        const gerundio = gerundioArray[0];

        const stareInfo = guessVerbInfoInternal('stare');
        const stareConjugation = conjugateInternal(stareInfo, tenseInfo.auxTense);
        
        return stareConjugation.map(stareForm => stareForm ? `${stareForm} ${gerundio}` : '');
    }

    if (verbInfo.subgroup === 'sapere') {
        const prefix = infinitive.slice(0, infinitive.length - 'sapere'.length);
        const syncopatedStem = prefix + 'sapr';
        const congStem = prefix + 'sappi';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    prefix + 'so',
                    prefix + 'sai',
                    prefix + 'sa',
                    prefix + 'sappiamo',
                    prefix + 'sapete',
                    prefix + 'sanno',
                ];
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem;
                if (!irregularStem) return []; // Should exist from guessVerbInfo
                const regularStem = prefix + 'sap';
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
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    congStem + 'a',
                    congStem + 'a',
                    congStem + 'a',
                    prefix + 'sappiamo',
                    prefix + 'sappiate',
                    congStem + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    prefix + 'sappi',
                    congStem + 'a',
                    prefix + 'sappiamo',
                    prefix + 'sappiate',
                    congStem + 'ano',
                ];
            case 'Participio Presente':
                const pp = prefix + 'sapiente';
                return [pp, pp.slice(0, -1) + 'i'];
        }
    }

    if (verbInfo.subgroup === 'potere') {
        const prefix = infinitive.slice(0, infinitive.length - 'potere'.length);
        const syncopatedStem = prefix + 'potr';
        const congStem = prefix + 'poss';

        switch (tense) {
            case 'Indicativo Presente':
                return [
                    congStem + 'o',
                    prefix + 'puoi',
                    prefix + 'può',
                    prefix + 'possiamo',
                    prefix + 'potete',
                    congStem + 'ono',
                ];
            case 'Indicativo Passato Remoto':
                const stem = prefix + 'pot';
                const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
                if (!regularEndings) return [];
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
            case 'Indicativo Futuro Semplice':
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    congStem + 'a',
                    congStem + 'a',
                    congStem + 'a',
                    prefix + 'possiamo',
                    prefix + 'possiate',
                    congStem + 'ano',
                ];
            case 'Imperativo':
                return []; // No imperative
        }
    }

    if (verbInfo.subgroup === 'volere') {
        const prefix = infinitive.slice(0, infinitive.length - 'volere'.length);
        const syncopatedStem = prefix + 'vorr';
        const presStem1 = prefix + 'vogli';
        const presStem2 = prefix + 'vuo';
        const presStem3 = prefix + 'vol';

        switch (tense) {
            case 'Indicativo Presente':
                return [
                    presStem1 + 'o', // voglio
                    presStem2 + 'i', // vuoi
                    presStem2 + 'le', // vuole
                    presStem3 + 'iamo', // vogliamo
                    presStem3 + 'ete', // volete
                    presStem1 + 'ono', // vogliono
                ];
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem;
                if (!irregularStem) return []; // Should exist from guessVerbInfo
                const regularStem = prefix + 'vol';
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
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    presStem1 + 'a',
                    presStem1 + 'a',
                    presStem1 + 'a',
                    presStem3 + 'iamo',
                    presStem1 + 'ate',
                    presStem1 + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    presStem1,
                    presStem1 + 'a',
                    presStem3 + 'iamo',
                    presStem1 + 'ate',
                    presStem1 + 'ano',
                ];
        }
    }


    if (verbInfo.subgroup === 'ferire-deriv' && tense === 'Indicativo Passato Remoto') {
        const prefix = verbInfo.infinitive.slice(0, verbInfo.infinitive.length - 'ferire'.length);
        const regularStem = prefix + 'fer';
        const irregularStem = prefix + 'fers';
        const regularEndings = ENDINGS['ire']['Indicativo Passato Remoto'];
        if (!regularEndings) return [];
    
        const regularForms = regularEndings.map(e => regularStem + e);
        return [
            `${regularForms[0]} / ${irregularStem}i`,
            regularForms[1],
            `${regularForms[2]} / ${irregularStem}e`,
            regularForms[3],
            regularForms[4],
            `${regularForms[5]} / ${irregularStem}ero`,
        ];
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

    if (verbInfo.subgroup === 'trarre') {
        const prefix = infinitive.slice(0, infinitive.length - 'trarre'.length);
        const stemTragg = prefix + 'tragg';
        const stemTra = prefix + 'tra';
        const stemTraev = prefix + 'traev';
        const stemTrarr = prefix + 'trarr';
    
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemTragg + 'o',
                    stemTra + 'i',
                    stemTra + 'e',
                    stemTra + 'iamo',
                    stemTra + 'ete',
                    stemTragg + 'ono'
                ];
            case 'Indicativo Imperfetto':
                const imperfettoEndings = ['o', 'i', 'a', 'amo', 'ate', 'ano'];
                return imperfettoEndings.map(e => stemTraev + e);
            case 'Indicativo Futuro Semplice':
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => stemTrarr + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => stemTrarr + e);
            case 'Congiuntivo Presente':
                return [
                    stemTragg + 'a',
                    stemTragg + 'a',
                    stemTragg + 'a',
                    stemTra + 'iamo',
                    stemTra + 'iate',
                    stemTragg + 'ano'
                ];
            case 'Congiuntivo Imperfetto':
                return ENDINGS['ere']['Congiuntivo Imperfetto'].map(e => stemTra + e);
            case 'Imperativo':
                return [
                    '',
                    stemTra + 'i',
                    stemTragg + 'a',
                    stemTra + 'iamo',
                    stemTra + 'ete',
                    stemTragg + 'ano'
                ];
            case 'Gerundio':
                return [stemTra + 'endo'];
            case 'Participio Presente':
                const ppres = stemTra + 'ente';
                return [ppres, ppres.slice(0, -1) + 'i'];
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

    if (verbInfo.subgroup === 'godere') {
        const syncopatedStem = 'godr';
        if (tense === 'Indicativo Futuro Semplice') {
            const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
            return futuroEndings.map(e => syncopatedStem + e);
        }
        if (tense === 'Condizionale Presente') {
            const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
            return condizionaleEndings.map(e => syncopatedStem + e);
        }
        if (tense === 'Indicativo Passato Remoto') {
            const stem = 'god';
            const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
            if (!regularEndings) return [];
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

    if (verbInfo.subgroup === 'scegliere') {
        const prefix = infinitive.slice(0, infinitive.length - 'scegliere'.length);
        const stemScegli = prefix + 'scegli';
        const stemScelg = prefix + 'scelg';
        switch(tense) {
            case 'Indicativo Presente':
                return [
                    stemScelg + 'o',
                    stemScegli,
                    stemScegli + 'e',
                    stemScegli + 'amo',
                    stemScegli + 'ete',
                    stemScelg + 'ono',
                ];
            case 'Congiuntivo Presente':
                return [
                    stemScelg + 'a',
                    stemScelg + 'a',
                    stemScelg + 'a',
                    stemScegli + 'amo',
                    stemScegli + 'ate',
                    stemScelg + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemScegli,
                    stemScelg + 'a',
                    stemScegli + 'amo',
                    stemScegli + 'ete',
                    stemScelg + 'ano',
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

    if (verbInfo.subgroup === 'battere' || verbInfo.subgroup === 'cedere' || verbInfo.subgroup === 'credere' || verbInfo.subgroup === 'vendere') {
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
                    thirdPerson,
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

    if (verbInfo.subgroup === 'erto-ire') {
        if (tense === 'Indicativo Passato Remoto') {
            const regularStem = infinitive.slice(0, -3);
            const regularEndings = ENDINGS['ire']['Indicativo Passato Remoto'];
            const regularForms = regularEndings.map(e => regularStem + e);

            const irregularStem = verbInfo.passatoRemotoStem;
            if (!irregularStem) return regularForms;

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

    if (verbInfo.subgroup === 'iacere-like') {
        const stem = infinitive.slice(0, -3); // piac, giac, tac
        const stemCci = stem + 'ci';
        const stemCc = stem + 'c';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemCc + 'io', // piaccio
                    stemCci,       // piaci
                    stem + 'e',      // piace
                    stemCci + 'amo', // piacciamo
                    stem + 'ete',    // piacete
                    stemCc + 'iono', // piacciono
                ];
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem; // piacqu
                if (!irregularStem) return [];
                const regularStem = stem;
                const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
                return [
                    irregularStem + 'i',
                    regularStem + regularEndings[1],
                    irregularStem + 'e',
                    regularStem + regularEndings[3],
                    regularStem + regularEndings[4],
                    irregularStem + 'ero',
                ];
            case 'Congiuntivo Presente':
                return [
                    stemCc + 'ia',
                    stemCc + 'ia',
                    stemCc + 'ia',
                    stemCci + 'amo',
                    stemCci + 'ate',
                    stemCc + 'iano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemCci,
                    stemCc + 'ia',
                    stemCci + 'amo',
                    stem + 'ete',
                    stemCc + 'iano',
                ];
        }
    }

    if (verbInfo.subgroup === 'parere') {
        switch (tense) {
            case 'Indicativo Presente':
                return ['paio', 'pari', 'pare', 'paiamo', 'parete', 'paiono'];
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem; // parv
                if (!irregularStem) return [];
                const regularStem = 'par';
                return [
                    irregularStem + 'vi',
                    regularStem + 'esti',
                    irregularStem + 've',
                    regularStem + 'emmo',
                    regularStem + 'este',
                    irregularStem + 'vero',
                ];
            case 'Indicativo Futuro Semplice':
                const futStem = 'parr';
                const futEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futEndings.map(e => futStem + e);
            case 'Condizionale Presente':
                const condStem = 'parr';
                const condEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condEndings.map(e => condStem + e);
            case 'Congiuntivo Presente':
                return ['paia', 'paia', 'paia', 'paiamo', 'paiate', 'paiano'];
            case 'Imperativo':
                return []; // No imperative
            case 'Participio Presente':
                const ppres = 'parvente';
                return [ppres, ppres.slice(0, -1) + 'i'];
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

    if (verbInfo.subgroup === 'manere') {
        const prefix = infinitive.slice(0, infinitive.length - 'manere'.length);
        const stemMang = prefix + 'mang';
        const stemMan = prefix + 'man';
        const syncopatedStem = prefix + 'marr';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemMang + 'o',
                    stemMan + 'i',
                    stemMan + 'e',
                    stemMan + 'iamo',
                    stemMan + 'ete',
                    stemMang + 'ono',
                ];
            case 'Indicativo Futuro Semplice':
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    stemMang + 'a',
                    stemMang + 'a',
                    stemMang + 'a',
                    stemMan + 'iamo',
                    stemMan + 'iate',
                    stemMang + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemMan + 'i',
                    stemMang + 'a',
                    stemMan + 'iamo',
                    stemMan + 'ete',
                    stemMang + 'ano',
                ];
        }
    }

    if (verbInfo.subgroup === 'mentire') {
        const stem = infinitive.slice(0, -3); // ment
        const endingsIre = ENDINGS['ire'];
        
        const getCombined = (tenseKey: string, isc: boolean) => {
            const regularEndings = endingsIre[tenseKey];
            const regularForms = regularEndings.map(e => stem + e);
            
            if (!isc) return regularForms;

            const iscForms = [...regularForms];
            iscForms[0] = stem + 'isc' + regularEndings[0];
            iscForms[1] = stem + 'isc' + regularEndings[1];
            iscForms[2] = stem + 'isc' + regularEndings[2];
            iscForms[5] = stem + 'isc' + regularEndings[5];

            if (tenseKey === 'Imperativo') {
                iscForms[0] = '';
            }

            return regularForms.map((reg, i) => {
                const iscForm = iscForms[i];
                // If the forms are identical (e.g., for noi/voi), just return one.
                if (reg === iscForm) {
                    return reg;
                }
                return `${reg} / ${iscForm}`;
            });
        };

        switch (tense) {
            case 'Indicativo Presente': return getCombined('Indicativo Presente', true);
            case 'Congiuntivo Presente': return getCombined('Congiuntivo Presente', true);
            case 'Imperativo': return getCombined('Imperativo', true);
        }
    }

    if (verbInfo.subgroup === 'morire') {
        const prefix = infinitive.slice(0, infinitive.length - 'morire'.length);
        const stemMor = prefix + 'mor';
        const stemMuo = prefix + 'muo';

        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemMuo + 'io', // muoio
                    stemMuo + 'ri', // muori
                    stemMuo + 're', // muore
                    stemMor + 'iamo',
                    stemMor + 'ite',
                    stemMuo + 'iono', // muoiono
                ];
            case 'Congiuntivo Presente':
                return [
                    stemMuo + 'ia', // muoia
                    stemMuo + 'ia',
                    stemMuo + 'ia',
                    stemMor + 'iamo',
                    stemMor + 'iate',
                    stemMuo + 'iano', // muoiano
                ];
            case 'Imperativo':
                return [
                    '',
                    stemMuo + 'ri', // muori
                    stemMuo + 'ia', // muoia
                    stemMor + 'iamo',
                    stemMor + 'ite',
                    stemMuo + 'iano', // muoiano
                ];
        }
    }

    if (verbInfo.subgroup === 'muovere') {
        const prefix = infinitive.slice(0, infinitive.length - 'muovere'.length);
        const stemMuov = prefix + 'muov';
        const stemMov = prefix + 'mov';
        const endingsEre = ENDINGS['ere'];

        const buildDualForms = (endings: string[]): string[] => {
            return endings.map(e => `${stemMuov}${e} / ${stemMov}${e}`);
        };
        
        switch (tense) {
            case 'Indicativo Presente':
                const presEndings = endingsEre['Indicativo Presente'];
                return [
                    stemMuov + presEndings[0],
                    stemMuov + presEndings[1],
                    stemMuov + presEndings[2],
                    `${stemMuov}iamo / ${stemMov}iamo`,
                    `${stemMuov}ete / ${stemMov}ete`,
                    stemMuov + presEndings[5],
                ];
            case 'Indicativo Imperfetto':
                return buildDualForms(endingsEre['Indicativo Imperfetto']);
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem; // moss
                if (!irregularStem) return [];
                const prEndings = endingsEre['Indicativo Passato Remoto'];
                return [
                    irregularStem + 'i',
                    `${stemMuov}${prEndings[1]} / ${stemMov}${prEndings[1]}`,
                    irregularStem + 'e',
                    `${stemMuov}${prEndings[3]} / ${stemMov}${prEndings[3]}`,
                    `${stemMuov}${prEndings[4]} / ${stemMov}${prEndings[4]}`,
                    irregularStem + 'ero',
                ];
            case 'Indicativo Futuro Semplice':
                const futStemMuov = prefix + 'muover';
                const futStemMov = prefix + 'mover';
                const futEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futEndings.map(e => `${futStemMuov}${e} / ${futStemMov}${e}`);
            case 'Condizionale Presente':
                return buildDualForms(endingsEre['Condizionale Presente']);
            case 'Congiuntivo Presente':
                const congPresEndings = endingsEre['Congiuntivo Presente'];
                return [
                    stemMuov + congPresEndings[0],
                    stemMuov + congPresEndings[1],
                    stemMuov + congPresEndings[2],
                    `${stemMuov}iamo / ${stemMov}iamo`,
                    `${stemMuov}iate / ${stemMov}iate`,
                    stemMuov + congPresEndings[5],
                ];
            case 'Congiuntivo Imperfetto':
                return buildDualForms(endingsEre['Congiuntivo Imperfetto']);
            case 'Imperativo':
                const impEndings = endingsEre['Imperativo'];
                return [
                    '',
                    stemMuov + impEndings[1],
                    stemMuov + impEndings[2],
                    `${stemMuov}iamo / ${stemMov}iamo`,
                    `${stemMuov}ete / ${stemMov}ete`,
                    stemMuov + impEndings[5],
                ];
            case 'Participio Presente':
                const ppres1 = stemMuov + 'ente';
                const ppres2 = stemMov + 'ente';
                const plural1 = ppres1.slice(0, -1) + 'i';
                const plural2 = ppres2.slice(0, -1) + 'i';
                return [`${ppres1} / ${ppres2}`, `${plural1} / ${plural2}`];
            case 'Gerundio':
                return [`${stemMuov}endo / ${stemMov}endo`];
        }
    }
    
    if (verbInfo.subgroup === 'nascere') {
        if (tense === 'Indicativo Passato Remoto') {
            const irregularStem = verbInfo.passatoRemotoStem; // nacq
            if (!irregularStem) return [];
            const regularStem = infinitive.slice(0, -3); // nasc
            const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
            return [
                irregularStem + 'ui',
                regularStem + regularEndings[1],
                irregularStem + 'ue',
                regularStem + regularEndings[3],
                regularStem + regularEndings[4],
                irregularStem + 'uero',
            ];
        }
    }
    
    if (verbInfo.subgroup === 'nuocere') {
        const prefix = infinitive.slice(0, infinitive.length - 'nuocere'.length);
        const stemNuoc = prefix + 'nuoc';
        const stemNoc = prefix + 'noc';
        const endingsEre = ENDINGS['ere'];

        const buildDualForms = (tenseKey: string): string[] => {
            const endings = endingsEre[tenseKey];
            if (!endings) return [];
            return endings.map(e => `${stemNuoc}${e} / ${stemNoc}${e}`);
        };

        const buildDualSingleForm = (tenseKey: string): string[] => {
            const endings = endingsEre[tenseKey];
            if (!endings || endings.length === 0) return [];
            return [`${stemNuoc}${endings[0]} / ${stemNoc}${endings[0]}`];
        };
        
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    `${stemNuoc}cio / ${stemNoc}cio`,
                    stemNuoc + 'i',
                    stemNuoc + 'e',
                    `${stemNuoc}iamo / ${stemNoc}iamo`,
                    `${stemNuoc}ete / ${stemNoc}ete`,
                    `${stemNuoc}ciono / ${stemNoc}ciono`,
                ];
            case 'Indicativo Imperfetto':
                return buildDualForms('Indicativo Imperfetto');
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem; // nocq
                if (!irregularStem) return [];
                const prEndings = endingsEre['Indicativo Passato Remoto'];
                return [
                    irregularStem + 'ui', // nocqui
                    `${stemNuoc}${prEndings[1]} / ${stemNoc}${prEndings[1]}`,
                    irregularStem + 'ue', // nocque
                    `${stemNuoc}${prEndings[3]} / ${stemNoc}${prEndings[3]}`,
                    `${stemNuoc}${prEndings[4]} / ${stemNoc}${prEndings[4]}`,
                    irregularStem + 'uero', // nocquero
                ];
            case 'Indicativo Futuro Semplice':
                return buildDualForms('Indicativo Futuro Semplice');
            case 'Condizionale Presente':
                return buildDualForms('Condizionale Presente');
            case 'Congiuntivo Presente':
                return [
                    `${stemNuoc}cia / ${stemNoc}cia`,
                    `${stemNuoc}cia / ${stemNoc}cia`,
                    `${stemNuoc}cia / ${stemNoc}cia`,
                    `${stemNuoc}iamo / ${stemNoc}iamo`,
                    `${stemNuoc}iate / ${stemNoc}iate`,
                    `${stemNuoc}ciano / ${stemNoc}ciano`,
                ];
            case 'Congiuntivo Imperfetto':
                return buildDualForms('Congiuntivo Imperfetto');
            case 'Imperativo':
                const impEndings = endingsEre['Imperativo'];
                return [
                    '',
                    stemNuoc + impEndings[1],
                    `${stemNuoc}${impEndings[2]} / ${stemNoc}${impEndings[2]}`,
                    `${stemNuoc}${impEndings[3]} / ${stemNoc}${impEndings[3]}`,
                    `${stemNuoc}${impEndings[4]} / ${stemNoc}${impEndings[4]}`,
                    `${stemNuoc}${impEndings[5]} / ${stemNoc}${impEndings[5]}`,
                ];
            case 'Gerundio':
                return buildDualSingleForm('Gerundio');
            case 'Participio Presente':
                const ppresEndings = endingsEre['Participio Presente'];
                if (!ppresEndings) return [];
                const singolare = `${stemNuoc}${ppresEndings[0]} / ${stemNoc}${ppresEndings[0]}`;
                const plurale = `${stemNuoc}enti / ${stemNoc}enti`;
                return [singolare, plurale];
        }
    }

    if (verbInfo.subgroup === 'piovere') {
        if (tense === 'Indicativo Passato Remoto') {
            const irregularStem = verbInfo.passatoRemotoStem; // piovv
            if (!irregularStem) return [];
            const regularStem = infinitive.slice(0, -3); // piov
            const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
            return [
                irregularStem + 'i',
                regularStem + regularEndings[1],
                irregularStem + 'e',
                regularStem + regularEndings[3],
                regularStem + regularEndings[4],
                irregularStem + 'ero',
            ];
        }
    }

    if (verbInfo.subgroup === 'porre') {
        const prefix = infinitive.slice(0, infinitive.length - 'porre'.length);
        const stemPon = prefix + 'pon';
        const stemPong = prefix + 'pong';
        const stemPorr = prefix + 'porr';

        switch (tense) {
            case 'Indicativo Presente':
                return [stemPong + 'o', stemPon + 'i', stemPon + 'e', stemPon + 'iamo', prefix + 'ponete', stemPong + 'ono'];
            case 'Indicativo Imperfetto':
                return ENDINGS['ere']['Indicativo Imperfetto'].map(e => stemPon + e);
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem; // pos
                if (!irregularStem) return [];
                const regularStem = stemPon;
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
                const futEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futEndings.map(e => stemPorr + e);
            case 'Condizionale Presente':
                const condEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condEndings.map(e => stemPorr + e);
            case 'Congiuntivo Presente':
                return [stemPong + 'a', stemPong + 'a', stemPong + 'a', stemPon + 'iamo', prefix + 'poniate', stemPong + 'ano'];
            case 'Congiuntivo Imperfetto':
                 return ENDINGS['ere']['Congiuntivo Imperfetto'].map(e => stemPon + e);
            case 'Imperativo':
                return ['', stemPon + 'i', stemPong + 'a', stemPon + 'iamo', prefix + 'ponete', stemPong + 'ano'];
            case 'Gerundio':
                return [stemPon + 'endo'];
            case 'Participio Presente':
                const ppres = stemPon + 'ente';
                return [ppres, ppres.slice(0, -1) + 'i'];
        }
    }

    if (verbInfo.subgroup === 'recere') {
        const stem = 'rec';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stem + 'io',   // recio
                    stem + 'i',    // reci
                    stem + 'e',    // rece
                    stem + 'iamo', // reciamo
                    stem + 'ete',  // recete
                    stem + 'iono', // reciono
                ];
            case 'Indicativo Passato Remoto': {
                // Logic from 'credere' subgroup
                const regularEndings = ENDINGS['ere']['Indicativo Passato Remoto'];
                if (!regularEndings) return [];
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
                    stem + 'i',
                    stem + 'ia',
                    stem + 'iamo',
                    stem + 'ete',
                    stem + 'iano',
                ];
        }
    }

    if (verbInfo.subgroup === 'riempire') {
        const stem = 'riemp';
        const iStem = 'riempi';
        switch (tense) {
            case 'Indicativo Presente':
                return [iStem + 'o', iStem, iStem + 'e', iStem + 'amo', stem + 'ite', iStem + 'ono'];
            case 'Congiuntivo Presente':
                return [iStem + 'a', iStem + 'a', iStem + 'a', iStem + 'amo', iStem + 'ate', iStem + 'ano'];
            case 'Imperativo':
                return ['', iStem, iStem + 'a', iStem + 'amo', stem + 'ite', iStem + 'ano'];
            case 'Gerundio':
                return [iStem + 'endo'];
            case 'Participio Presente':
                const ppres = iStem + 'ente';
                return [ppres, ppres.slice(0, -1) + 'i'];
        }
    }
    
    // Explicit rule for transigere passato remoto to override any general patterns
    if ((verbInfo.baseInfinitive || verbInfo.infinitive.split(' ')[0]) === 'transigere' && tense === 'Indicativo Passato Remoto') {
        return ['transassi', 'transigesti', 'transasse', 'transigemmo', 'transigeste', 'transassero'];
    }

    if (verbInfo.subgroup === 'riavere') {
        const tenseInfo = TENSE_INFO[tense];
        if (tenseInfo && tenseInfo.type === 'simple') {
            const prefix = infinitive.slice(0, infinitive.length - 'avere'.length); // ri
            if (tense === 'Indicativo Presente') {
                return [
                    prefix + 'ò',
                    prefix + 'ai',
                    prefix + 'à',
                    prefix + 'abbiamo',
                    prefix + 'avete',
                    prefix + 'anno',
                ];
            }
            // For other simple tenses, conjugate 'avere' and add the prefix
            const avereConjugation = conjugateInternal({ infinitive: 'avere', group: 'avere', auxiliary: 'avere' }, tense);
            return avereConjugation.map(form => prefix + form);
        }
    }
    
    if (verbInfo.subgroup === 'ridare') {
        const tenseInfo = TENSE_INFO[tense];
        if (tenseInfo && tenseInfo.type === 'simple') {
            const prefix = infinitive.slice(0, infinitive.length - 'dare'.length); // ri
            // For ridare, simple tenses are just prefix + dare conjugation
            const dareConjugation = conjugateInternal(guessVerbInfoInternal('dare'), tense);
            return dareConjugation.map(form => {
                if (!form) return '';
                // Handle special imperative "da' / dai" for dare -> "rida' / ridai" for ridare
                if (form.includes('/')) {
                    return form.split(' / ').map(part => prefix + part).join(' / ');
                }
                return prefix + form;
            });
        }
    }
    
    if (verbInfo.subgroup === 'salire') {
        const prefix = infinitive.slice(0, infinitive.length - 'salire'.length);
        const stemSal = prefix + 'sal';
        const stemSalg = prefix + 'salg';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemSalg + 'o',
                    stemSal + 'i',
                    stemSal + 'e',
                    stemSal + 'iamo',
                    stemSal + 'ite',
                    stemSalg + 'ono',
                ];
            case 'Congiuntivo Presente':
                return [
                    stemSalg + 'a',
                    stemSalg + 'a',
                    stemSalg + 'a',
                    stemSal + 'iamo',
                    stemSal + 'iate',
                    stemSalg + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemSal + 'i',
                    stemSalg + 'a',
                    stemSal + 'iamo',
                    stemSal + 'ite',
                    stemSalg + 'ano',
                ];
            case 'Participio Presente':
                 const ppres1 = prefix + 'salente';
                 const ppres2 = prefix + 'saliente';
                 return [`${ppres1} / ${ppres2}`, `${ppres1.slice(0,-1)}i / ${ppres2.slice(0,-1)}i`];
        }
    }
    
    if (verbInfo.subgroup === 'sciare') {
        switch (tense) {
            case 'Indicativo Presente':
                return ['scio', 'scii', 'scia', 'sciamo', 'sciate', 'sciano'];
            case 'Congiuntivo Presente':
                return ['scii', 'scii', 'scii', 'sciamo', 'sciate', 'sciino'];
            case 'Imperativo':
                return ['', 'scia', 'scii', 'sciamo', 'sciate', 'sciino'];
        }
    }

    if (verbInfo.subgroup === 'scuotere') {
        const prefix = infinitive.slice(0, infinitive.length - 'scuotere'.length);
        const stemScuot = prefix + 'scuot';
        const stemScot = prefix + 'scot';
        const endingsEre = ENDINGS['ere'];

        const buildDual = (regularForm: string, syncopatedForm: string, isRegularOnly: boolean): string => {
            return isRegularOnly ? regularForm : `${regularForm} / ${syncopatedForm}`;
        };

        switch(tense) {
            case 'Indicativo Presente': {
                const endings = endingsEre['Indicativo Presente'];
                const regForms = endings.map(e => stemScuot + e);
                const syncForms = endings.map(e => stemScot + e);
                return regForms.map((reg, i) => buildDual(reg, syncForms[i], i === 1 || i === 5));
            }
            case 'Congiuntivo Presente': {
                const endings = endingsEre['Congiuntivo Presente'];
                const regForms = endings.map(e => stemScuot + e);
                const syncForms = endings.map(e => stemScot + e);
                return regForms.map((reg, i) => buildDual(reg, syncForms[i], i === 0 || i === 1 || i === 2 || i === 5));
            }
            case 'Imperativo': {
                const endings = endingsEre['Imperativo'];
                const regForms = endings.map(e => stemScuot + e);
                const syncForms = endings.map(e => stemScot + e);
                const dualForms = regForms.map((reg, i) => buildDual(reg, syncForms[i], i === 5));
                dualForms[0] = '';
                return dualForms;
            }
        }
    }

    if (verbInfo.subgroup === 'sedere') {
        const prefix = infinitive.slice(0, infinitive.length - 'sedere'.length);
        const stemSed = prefix + 'sed';
        const stemSied = prefix + 'sied';
        const stemSegg = prefix + 'segg';
    
        switch(tense) {
            case 'Indicativo Presente':
                return [
                    `${stemSied}o / ${stemSegg}o`,
                    `${stemSied}i`,
                    `${stemSied}e`,
                    `${stemSed}iamo`,
                    `${stemSed}ete`,
                    `${stemSied}ono / ${stemSegg}ono`,
                ];
            case 'Indicativo Passato Remoto':
                return [
                    `${stemSed}ei / ${stemSed}etti`,
                    `${stemSed}esti`,
                    `${stemSed}é / ${stemSed}ette`,
                    `${stemSed}emmo`,
                    `${stemSed}este`,
                    `${stemSed}erono / ${stemSed}ettero`,
                ];
            case 'Indicativo Futuro Semplice':
                const futEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futEndings.map(e => `${stemSed}er${e} / ${stemSied}er${e}`);
            case 'Condizionale Presente':
                const condEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condEndings.map(e => `${stemSed}er${e} / ${stemSied}er${e}`);
            case 'Congiuntivo Presente':
                return [
                    `${stemSied}a / ${stemSegg}a`,
                    `${stemSied}a / ${stemSegg}a`,
                    `${stemSied}a / ${stemSegg}a`,
                    `${stemSed}iamo`,
                    `${stemSed}iate`,
                    `${stemSied}ano / ${stemSegg}ano`,
                ];
            case 'Imperativo':
                return [
                    '',
                    `${stemSied}i`,
                    `${stemSied}a / ${stemSegg}a`,
                    `${stemSed}iamo`,
                    `${stemSed}ete`,
                    `${stemSied}ano / ${stemSegg}ano`,
                ];
            case 'Gerundio':
                return [`${stemSed}endo / ${stemSegg}endo`];
        }
    }
    
    if (verbInfo.subgroup === 'solere') {
        switch (tense) {
            case 'Indicativo Presente':
                return ['soglio', 'suoli', 'suole', 'sogliamo', 'solete', 'sogliono'];
            case 'Congiuntivo Presente':
                return ['soglia', 'soglia', 'soglia', 'sogliamo', 'sogliate', 'sogliano'];
            case 'Indicativo Imperfetto':
                return ['solevo', 'solevi', 'soleva', 'solevamo', 'solevate', 'solevano'];
            default:
                return [];
        }
    }

    if (verbInfo.subgroup === 'tenere') {
        const prefix = infinitive.slice(0, infinitive.length - 'tenere'.length);
        const stemTien = prefix + 'tien';
        const stemTeng = prefix + 'teng';
        const stemTen = prefix + 'ten';
        const syncopatedStem = prefix + 'terr';
    
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemTeng + 'o',
                    stemTien + 'i',
                    stemTien + 'e',
                    stemTen + 'iamo',
                    prefix + 'tenete',
                    stemTeng + 'ono',
                ];
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem;
                if (!irregularStem) return [];
                const regularStem = prefix + 'ten';
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
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    stemTeng + 'a',
                    stemTeng + 'a',
                    stemTeng + 'a',
                    stemTen + 'iamo',
                    prefix + 'teniate',
                    stemTeng + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemTien + 'i',
                    stemTeng + 'a',
                    stemTen + 'iamo',
                    prefix + 'tenete',
                    stemTeng + 'ano',
                ];
        }
    }
    
    if (verbInfo.subgroup === 'udire') {
        const prefix = infinitive.slice(0, infinitive.length - 'udire'.length);
        const stemOd = prefix + 'od';
        const stemUd = prefix + 'ud';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemOd + 'o',
                    stemOd + 'i',
                    stemOd + 'e',
                    stemUd + 'iamo',
                    stemUd + 'ite',
                    stemOd + 'ono',
                ];
            case 'Congiuntivo Presente':
                return [
                    stemOd + 'a',
                    stemOd + 'a',
                    stemOd + 'a',
                    stemUd + 'iamo',
                    stemUd + 'iate',
                    stemOd + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemOd + 'i',
                    stemOd + 'a',
                    stemUd + 'iamo',
                    stemUd + 'ite',
                    stemOd + 'ano',
                ];
        }
    }

    if (verbInfo.subgroup === 'uscire') {
        const prefix = infinitive.slice(0, infinitive.length - 'uscire'.length);
        const stemEsc = prefix + 'esc';
        const stemUsc = prefix + 'usc';
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemEsc + 'o',
                    stemEsc + 'i',
                    stemEsc + 'e',
                    stemUsc + 'iamo',
                    stemUsc + 'ite',
                    stemEsc + 'ono',
                ];
            case 'Congiuntivo Presente':
                return [
                    stemEsc + 'a',
                    stemEsc + 'a',
                    stemEsc + 'a',
                    stemUsc + 'iamo',
                    stemUsc + 'iate',
                    stemEsc + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemEsc + 'i',
                    stemEsc + 'a',
                    stemUsc + 'iamo',
                    stemUsc + 'ite',
                    stemEsc + 'ano',
                ];
        }
    }

    if (verbInfo.subgroup === 'stare') {
        const prefix = infinitive.slice(0, infinitive.length - 'stare'.length);
        const syncopatedStem = prefix + 'star';

        switch (tense) {
            case 'Indicativo Presente':
                // For derivatives like 'ristare', 1st and 3rd person singular are accented.
                const sto = prefix ? prefix + 'stò' : 'sto';
                const sta = prefix ? prefix + 'stà' : 'sta';
                return [sto, prefix + 'stai', sta, prefix + 'stiamo', prefix + 'state', prefix + 'stanno'];
            case 'Indicativo Passato Remoto':
                const prStem = prefix + 'st';
                return [
                    prStem + 'etti', prStem + 'esti', prStem + 'ette',
                    prStem + 'emmo', prStem + 'este', prStem + 'ettero'
                ];
            case 'Indicativo Futuro Semplice':
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                const congStem = prefix + 'sti';
                return [congStem + 'a', congStem + 'a', congStem + 'a', prefix + 'stiamo', prefix + 'stiate', congStem + 'ano'];
            case 'Congiuntivo Imperfetto':
                const congImpfStem = prefix + 'stess';
                return [
                    congImpfStem + 'i', congImpfStem + 'i', congImpfStem + 'e',
                    congImpfStem + 'imo', prefix + 'steste', congImpfStem + 'ero'
                ];
            case 'Imperativo':
                const tuImperativo = prefix + "sta' / " + prefix + "stai";
                return ['', tuImperativo, prefix + 'stia', prefix + 'stiamo', prefix + 'state', prefix + 'stiano'];
        }
    }
    
    if (verbInfo.subgroup === 'valere') {
        const prefix = infinitive.slice(0, infinitive.length - 'valere'.length);
        const syncopatedStem = prefix + 'varr';
        const stemValg = prefix + 'valg';
        const stemVagli = prefix + 'vagli';
        const stemVal = prefix + 'val';

        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemValg + 'o',
                    stemVal + 'i',
                    stemVal + 'e',
                    `${stemVal}iamo / ${stemValg}hiamo`,
                    `${stemVal}ete`,
                    `${stemValg}ono / ${stemVagli}ono`,
                ];
            case 'Indicativo Futuro Semplice':
                const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    `${stemValg}a / ${stemVagli}a`,
                    `${stemValg}a / ${stemVagli}a`,
                    `${stemValg}a / ${stemVagli}a`,
                    `${stemVal}iamo / ${stemValg}hiamo`,
                    `${stemVal}iate / ${stemValg}hiate`,
                    stemValg + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemVal + 'i',
                    `${stemValg}a / ${stemVagli}a`,
                    `${stemVal}iamo / ${stemValg}hiamo`,
                    `${stemVal}ete`,
                    `${stemValg}ano / ${stemVagli}ano`,
                ];
        }
    }

    if (verbInfo.subgroup === 'vedere') {
        const prefix = infinitive.slice(0, infinitive.length - 'vedere'.length);
        const syncopatedStem = prefix + 'vedr';
        if (tense === 'Indicativo Futuro Semplice') {
            const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
            return futuroEndings.map(e => syncopatedStem + e);
        }
        if (tense === 'Condizionale Presente') {
            const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
            return condizionaleEndings.map(e => syncopatedStem + e);
        }
    }

    if (verbInfo.subgroup === 'venire') {
        const prefix = infinitive.slice(0, infinitive.length - 'venire'.length);
        const stemVien = prefix + 'vien';
        const stemVeng = prefix + 'veng';
        const stemVen = prefix + 'ven';
        const syncopatedStem = prefix + 'verr';
    
        switch (tense) {
            case 'Indicativo Presente':
                return [
                    stemVeng + 'o',
                    stemVien + 'i',
                    stemVien + 'e',
                    stemVen + 'iamo',
                    prefix + 'venite',
                    stemVeng + 'ono',
                ];
            case 'Indicativo Passato Remoto':
                const irregularStem = verbInfo.passatoRemotoStem;
                if (!irregularStem) return [];
                const regularStem = prefix + 'ven';
                const regularEndings = ENDINGS['ire']['Indicativo Passato Remoto'];
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
                return futuroEndings.map(e => syncopatedStem + e);
            case 'Condizionale Presente':
                const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
                return condizionaleEndings.map(e => syncopatedStem + e);
            case 'Congiuntivo Presente':
                return [
                    stemVeng + 'a',
                    stemVeng + 'a',
                    stemVeng + 'a',
                    stemVen + 'iamo',
                    prefix + 'veniate',
                    stemVeng + 'ano',
                ];
            case 'Imperativo':
                return [
                    '',
                    stemVien + 'i',
                    stemVeng + 'a',
                    stemVen + 'iamo',
                    prefix + 'venite',
                    stemVeng + 'ano',
                ];
        }
    }

    if (verbInfo.subgroup === 'vivere') {
        const prefix = infinitive.slice(0, infinitive.length - 'vivere'.length);
        const syncopatedStem = prefix + 'vivr';
        if (tense === 'Indicativo Futuro Semplice') {
            const futuroEndings = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
            return futuroEndings.map(e => syncopatedStem + e);
        }
        if (tense === 'Condizionale Presente') {
            const condizionaleEndings = ['ei', 'esti', 'ebbe', 'emmo', 'este', 'ebbero'];
            return condizionaleEndings.map(e => syncopatedStem + e);
        }
    }


    // --- Handle compound tenses first for ALL verbs ---
    if (tenseInfo.type === 'compound') {
        const participio = getParticipioPassato(verbInfo);
        const auxTense = tenseInfo.auxTense;

        const auxiliaries = (auxiliary.includes(' / ')
            ? auxiliary.split(' / ').map(a => a.trim())
            : [auxiliary]) as ('avere' | 'essere')[];

        let finalCombinedConjugation: string[] | null = null;

        for (const currentAux of auxiliaries) {
            const auxVerbInfo = guessVerbInfo(currentAux);
            const auxConjugation = conjugate(auxVerbInfo, auxTense);
            
            let currentConjugation: string[];

            if (currentAux === 'avere') {
                const finalForms: string[] = [];
                const participioOptions = participio.split(' / ').map(p => p.trim());
                for (let i = 0; i < auxConjugation.length; i++) {
                    const auxForm = auxConjugation[i];
                    if (!auxForm) {
                        finalForms.push('');
                        continue;
                    }
                    const auxOptions = auxForm.split(' / ').map(a => a.trim());
                    const personForms = new Set<string>();
                    auxOptions.forEach(aux => {
                        participioOptions.forEach(p => personForms.add(`${aux} ${p}`));
                    });
                    finalForms.push(Array.from(personForms).join(' / '));
                }
                currentConjugation = finalForms;
            } else { // 'essere'
                const finalForms: string[] = [];
                for (let index = 0; index < auxConjugation.length; index++) {
                    const auxForm = auxConjugation[index];
                    if (!auxForm) {
                        finalForms.push('');
                        continue;
                    }
                    const auxOptions = auxForm.split(' / ').map(s => s.trim());
                    const participioOptions = participio.split(' / ').map(s => s.trim());
                    const personForms = new Set<string>();
                    auxOptions.forEach(aux => {
                        participioOptions.forEach(p => {
                            if (!p.endsWith('o')) {
                                personForms.add(`${aux} ${p}`); // Invariable
                            } else {
                                const stem = p.slice(0, -1);
                                if (index < 3) { // Singular
                                    personForms.add(`${aux} ${stem}o`);
                                    personForms.add(`${aux} ${stem}a`);
                                } else { // Plural
                                    personForms.add(`${aux} ${stem}i`);
                                    personForms.add(`${aux} ${stem}e`);
                                }
                            }
                        });
                    });
                    finalForms.push(Array.from(personForms).join(' / '));
                }
                currentConjugation = finalForms;
            }

            if (finalCombinedConjugation === null) {
                finalCombinedConjugation = currentConjugation;
            } else {
                for (let i = 0; i < finalCombinedConjugation.length; i++) {
                    if (finalCombinedConjugation[i] && currentConjugation[i]) {
                        finalCombinedConjugation[i] += ` / ${currentConjugation[i]}`;
                    } else {
                        finalCombinedConjugation[i] = finalCombinedConjugation[i] || currentConjugation[i] || '';
                    }
                }
            }
        }
        return finalCombinedConjugation || [];
    }

    // --- Handle simple tenses ---

    const handleParticipioPassato = (participio: string): string[] => {
         // Handle multiple options like "empiuto / empito"
        const options = participio.split(' / ');
        const finalForms = new Set<string>();

        options.forEach(option => {
            const cleanOption = option.trim();
            if (cleanOption.endsWith('o')) {
                const stem = cleanOption.slice(0, -1);
                finalForms.add(cleanOption);       // singolare maschile
                finalForms.add(stem + 'a');   // singolare femminile
                finalForms.add(stem + 'i');   // plurale maschile
                finalForms.add(stem + 'e');    // plurale femminile
            } else {
                finalForms.add(cleanOption); // Invariable
            }
        });

        const mainParticipio = options[0].trim();
        if (mainParticipio.endsWith('o')) {
            const stem = mainParticipio.slice(0, -1);
            return [mainParticipio, stem + 'a', stem + 'i', stem + 'e'];
        }
        return [mainParticipio]; // For invariable
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
    if (verbInfo.subgroup === 'isc' || verbInfo.subgroup === 'ferire-deriv') {
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

    // Special case for -iare verbs
    const iareExceptions = new Set(['spiare', 'sciare', 'striare', 'espiare', 'desiare', 'obliare']);
    if (infinitive.endsWith('iare')) {
        const isException = infinitive.endsWith('viare') || iareExceptions.has(infinitive);
        const baseStem = infinitive.slice(0, -3); // e.g., arrabbi, invi
        
        if (isException) {
            // Exceptions like 'inviare' keep the stem 'i' for 2sg (invii),
            // but drop it for 1pl (inviamo) and 2pl (inviate).
            return endings.map((ending) => {
                if (ending && (ending.startsWith('iamo') || ending.startsWith('iate'))) {
                    // Drop the stem's 'i'
                    const modifiedStem = baseStem.slice(0, -1); // invi -> inv
                    return modifiedStem + ending; // inv + iamo -> inviamo
                }
                return baseStem + ending;
            });
        } else {
            // Regular -iare verbs like 'arrabbiare' drop the stem 'i' before another 'i'.
            return endings.map(ending => {
                if (ending && ending.startsWith('i')) {
                    const modifiedStem = baseStem.slice(0, -1); // e.g., arrabbi -> arrabb
                    return modifiedStem + ending;
                }
                return baseStem + ending;
            });
        }
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


export function conjugate(verbInfo: VerbInfo, tense: string): string[] {
    const conjugatedForms = conjugateInternal(verbInfo, tense);

    // FIX: Do not append extra words to non-finite verb forms.
    const nonFiniteTenses = new Set(['Participio Passato', 'Participio Presente', 'Gerundio']);

    if (verbInfo.extraWords && !nonFiniteTenses.has(tense)) {
        return conjugatedForms.map(form => {
            if (!form) return '';
            const trimmedForm = form.trim();
            // FIX: Correctly append extra words to all variations of a conjugation.
            if (trimmedForm.includes(' / ')) {
                return trimmedForm
                    .split(' / ')
                    .map(part => `${part.trim()} ${verbInfo.extraWords}`)
                    .join(' / ');
            } else {
                return `${trimmedForm} ${verbInfo.extraWords}`;
            }
        });
    }

    return conjugatedForms;
}