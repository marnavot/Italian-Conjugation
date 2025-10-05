import { GoogleGenAI, Type } from "@google/genai";
import type { Problem, CustomVerb, VerbInfo } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getNewProblem(tenses: string[], usedVerbs: string[], difficulty: string, customVerbs?: CustomVerb[]): Promise<Problem> {
  if (customVerbs && customVerbs.length > 0) {
    const availableCustomVerbs = customVerbs.filter(v => !usedVerbs.includes(v.verb));
    if (availableCustomVerbs.length > 0) {
      const randomVerb = availableCustomVerbs[Math.floor(Math.random() * availableCustomVerbs.length)];
      const randomTense = tenses[Math.floor(Math.random() * tenses.length)];
      return Promise.resolve({
        verb: randomVerb.verb,
        tense: randomTense,
        englishTranslation: randomVerb.englishTranslation,
      });
    }
  }
  
  let difficultyInstruction = '';
  switch (difficulty) {
    case 'Beginner':
      difficultyInstruction = "Provide a common, regular Italian verb suitable for a beginner.";
      break;
    case 'Intermediate':
      difficultyInstruction = "Provide a moderately difficult Italian verb. It could be a common irregular verb or a less common regular verb.";
      break;
    case 'Advanced':
      difficultyInstruction = "Provide a difficult, less common, or complex irregular Italian verb.";
      break;
    default:
      difficultyInstruction = "Provide an Italian verb.";
  }
  
  let prompt = `For an Italian verb conjugation app: ${difficultyInstruction} Randomly select one tense from the following list: ${tenses.join(', ')}. Also provide the English translation for the verb.`;

  if (usedVerbs.length > 0) {
    prompt += ` The verb must NOT be any of the following: ${usedVerbs.join(', ')}.`;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verb: {
              type: Type.STRING,
              description: "An Italian verb in its infinitive form."
            },
            tense: {
              type: Type.STRING,
              description: "One of the provided tenses."
            },
            englishTranslation: {
              type: Type.STRING,
              description: "The English translation of the verb."
            }
          },
          required: ['verb', 'tense', 'englishTranslation']
        }
      }
    });
    const parsedResponse = JSON.parse(response.text.trim());
    return parsedResponse as Problem;
  } catch (error) {
    console.error("Error fetching new problem from Gemini:", error);
    // Fallback in case of API error
    return {
      verb: 'essere',
      tense: tenses[0] || 'Indicativo Presente',
      englishTranslation: 'to be'
    };
  }
}


export async function getVerbInfoBatch(verbs: string[]): Promise<VerbInfo[]> {
  const prompt = `For the following list of Italian verbs, provide their conjugation metadata. For each verb, specify its primary conjugation group (e.g., "are", "ere", "ire", "essere", "avere", or a specific irregular pattern like "-porre"), its auxiliary verb ("essere" or "avere") for compound tenses, and its English translation. Verbs: ${verbs.join(', ')}`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are a precise Italian grammar expert. Your only function is to return a valid JSON array of objects according to the schema. Do not add any extra text or markdown.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              infinitive: { type: Type.STRING, description: "The verb in its infinitive form." },
              group: { type: Type.STRING, description: "The conjugation group of the verb." },
              auxiliary: { type: Type.STRING, description: "The auxiliary verb, either 'essere' or 'avere'." },
              englishTranslation: { type: Type.STRING, description: "The English translation of the verb." }
            },
            required: ['infinitive', 'group', 'auxiliary']
          }
        }
      }
    });

    const parsedResponse = JSON.parse(response.text.trim());
    return parsedResponse as VerbInfo[];
  } catch (error) {
    console.error("Error fetching verb info from Gemini:", error);
    throw new Error("Failed to get verb info from AI.");
  }
}