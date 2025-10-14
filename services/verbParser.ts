
import type { CustomVerb } from '../types';

export const parseVerbsFromText = (text: string): CustomVerb[] => {
  if (!text.trim()) {
    return [];
  }
  const lines = text.split('\n');
  return lines.flatMap(line => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return [];

    let englishPart: string | undefined;
    let verbPart: string | undefined;

    const tabParts = trimmedLine.split('\t');
    if (tabParts.length >= 2 && tabParts[0].trim() && tabParts[1].trim()) {
      englishPart = tabParts[0].trim();
      verbPart = tabParts[1].trim();
    } else {
        const lastCommaIndex = trimmedLine.lastIndexOf(',');
        if (lastCommaIndex > 0 && lastCommaIndex < trimmedLine.length - 1) {
            englishPart = trimmedLine.substring(0, lastCommaIndex).trim();
            verbPart = trimmedLine.substring(lastCommaIndex + 1).trim();
        } else {
            const simpleParts = trimmedLine.split(/,/).map(p => p.trim());
            if (simpleParts.length === 2 && simpleParts[0] && simpleParts[1]) {
                englishPart = simpleParts[0];
                verbPart = simpleParts[1];
            }
        }
    }

    if (englishPart && verbPart) {
      // FIX: Split verb part by "/" to handle multiple verb options on one line.
      const verbs = verbPart.split('/').map(v => v.trim()).filter(Boolean);
      return verbs.map(verb => ({
        englishTranslation: englishPart!,
        verb: verb,
      }));
    }

    return [];
  });
};
