const removeDiacritics = require('diacritic').clean;

export interface SuggestionMatchPart {
    text: string;
    highlight: boolean;
}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_special_characters
const specialCharsRegex = /[.*+?^${}()|[\]\\]/g;

// http://www.ecma-international.org/ecma-262/5.1/#sec-15.10.2.6
const wordCharacterRegex = /[a-z0-9_]/i;

const whitespacesRegex = /\s+/;

export function getMatches(text: string, query: string): number[][] {
    text = removeDiacritics(text);
    query = removeDiacritics(query);

    return (
        query
            .trim()
            .split(whitespacesRegex)
            .filter(word => word.length > 0)
            .reduce(function (result, word) {
                const wordLen = word.length;
                const regex = new RegExp(escapeRegexCharacters(word), 'ig');
                let match: RegExpExecArray;
                while(match = regex.exec(text)) {
                    result.push([match.index, match.index + wordLen]);
                }
                const index = text.search(regex);
                return result;
            }, [])
            .sort(function (match1, match2) {
                return match1[0] - match2[0];
            })
    );
}

function escapeRegexCharacters(str) {
    return str.replace(specialCharsRegex, '\\$&');
}