/**
 * 
 * This problem was asked by Microsoft.
 * 
 * Given a dictionary of words and a string made up of those words (no spaces), return the original sentence in a list. If there is more than one possible reconstruction, return any of them. If there is no possible reconstruction, then return null.
 * 
 * For example, given the set of words 'quick', 'brown', 'the', 'fox', and the string "thequickbrownfox", you should return ['the', 'quick', 'brown', 'fox'].
 * 
 * Given the set of words 'bed', 'bath', 'bedbath', 'and', 'beyond', and the string "bedbathandbeyond", return either ['bed', 'bath', 'and', 'beyond] or ['bedbath', 'and', 'beyond'].
 * 
 */

function solution1(dictionary, string) {
    const matches = [];
    for (const word of dictionary) {
        const
            regExp = new RegExp(word, 'gm');
        let match;
        while ((match = regExp.exec(string)) !== null) {
            matches.push(match);
        }
    }
    let lastIndex = -1;
    const matchesByIndex = matches.sort((a, b) => a.index - b.index);
    function findSentance(matchIdx = 0, charIdx = 0) {
        if (charIdx === string.length) return [];
        let match, res;
        while ((match = matchesByIndex[matchIdx]) && match.index < charIdx) matchIdx++;
        while ((match = matchesByIndex[matchIdx]) && match.index === charIdx) {
            res = findSentance(matchIdx + 1, match.index + match.toString().length)
            if (!!res) {
                return [match.toString(), ...res];
            }
            matchIdx++
        }
        return null;
    }
    return findSentance();
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(dictionary, string, results) {
        const res = solution(dictionary, string);
        console.log(`[${dictionary}], '${string}' -> [${res}]`)
        console.log(`possible results are: ${results.map(result => `[${result.join(',')}]`)}`)
    }
    test(
        ['quick', 'brown', 'the', 'fox'],
        "thequickbrownfox",
        [['the', 'quick', 'brown', 'fox']]
    );
    test(
        ['quick', 'brown', 'the', 'fox', 'is'],
        "thequickbrownfoxisquick",
        [['the', 'quick', 'brown', 'fox']]
    );
    test(
        ['bed', 'bath', 'bedbath', 'and', 'beyond'],
        "bedbathandbeyond",
        [['bed', 'bath', 'and', 'beyond'], ['bedbath', 'and', 'beyond']]
    );
}

testUsing(solution1);
