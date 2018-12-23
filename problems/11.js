/**
 * 
 * This problem was asked by Twitter.
 * 
 * Implement an autocomplete system. That is, given a query string s and a set of all possible query strings, return all strings in the set that have s as a prefix.
 * 
 * For example, given the query string de and the set of strings [dog, deer, deal], return [deer, deal].
 * 
*/

function solution1() {

    function setDictionary(words) {
        function buildDict(words, level = 0) {
            const dictionary = {
                words
            },
                lettersDict = {};
            if (words.length > 1) {

                for (const word of words) {
                    if (word.length > level) {
                        const letter = word[level];
                        if (typeof lettersDict[letter] === 'undefined')
                            lettersDict[letter] = [word];
                        else
                            lettersDict[letter].push(word);
                    }
                }
                for (const letter in lettersDict) {
                    if (lettersDict.hasOwnProperty(letter)) {
                        const wordsForLetter = lettersDict[letter];
                        dictionary[letter] = buildDict(wordsForLetter, level + 1)
                    }
                }
            }
            return dictionary;
        }
        this.dictionary = buildDict(words);
    }

    function autocomplete(head) {
        function find(dictionary, level = 0) {
            if (head.length === level)
                return dictionary.words
            if (head.length > level) {
                const letter = head[level];
                if (dictionary.hasOwnProperty(letter)) {
                    return find(dictionary[letter], level + 1);
                }
            }
        }
        return find(this.dictionary);
    }

    return {
        setDictionary,
        autocomplete
    };
}

const
    words1 = ['dog', 'deer', 'deal'];

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);

    const system = solution();
    system.setDictionary(words1);
    let completed;
    completed = system.autocomplete("de");
    console.log(`[${words1}] for 'de' -> ${completed}`)
    completed = system.autocomplete("x");
    console.log(`[${words1}] for 'x' -> ${completed}`)
    completed = system.autocomplete("dz");
    console.log(`[${words1}] for 'dz' -> ${completed}`)
    completed = system.autocomplete("d");
    console.log(`[${words1}] for 'd' -> ${completed}`)
    completed = system.autocomplete("");
    console.log(`[${words1}] for '' -> ${completed}`)

}

testUsing(solution1);
