/**
 * 
 * This problem was asked by Google.
 * 
 * Suppose we represent our file system by a string in the following manner:
 * 
 * The string "dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext" represents:
 * 
 * dir
 *     subdir1
 *     subdir2
 *         file.ext
 * The directory dir contains an empty sub-directory subdir1 and a sub-directory subdir2 containing a file file.ext.
 * 
 * The string "dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext" represents:
 * 
 * dir
 *     subdir1
 *         file1.ext
 *         subsubdir1
 *     subdir2
 *         subsubdir2
 *             file2.ext
 * The directory dir contains two sub-directories subdir1 and subdir2. subdir1 contains a file file1.ext and an empty second-level sub-directory subsubdir1. subdir2 contains a second-level sub-directory subsubdir2 containing a file file2.ext.
 * 
 * We are interested in finding the longest (number of characters) absolute path to a file within our file system. For example, in the second example above, the longest absolute path is "dir/subdir2/subsubdir2/file2.ext", and its length is 32 (not including the double quotes).
 * 
 * Given a string representing the file system in the above format, return the length of the longest absolute path to a file in the abstracted file system. If there is no file in the system, return 0.
 * 
 * Note:
 * 
 * The name of a file contains at least a period and an extension.
 * 
 * The name of a directory or sub-directory will not contain a period.
 * 
 */

function solution1(fileSystem) {
    function checkLevel(subFS, level = 0, length = 0) {
        const
            splitByForCurrentDir = new RegExp("\n" + new Array(level).fill("\t").join('') + "(?=[^\t])", 'g'),
            splitByForNextDir = new RegExp("\n" + new Array(level + 1).fill("\t").join('') + "(?=[^\t])", 'g'),
            contents = subFS.split(splitByForCurrentDir);
        let maxLen = 0;
        if (contents.length > 0) {
            contents.forEach(content => {
                const nexts = content.split(splitByForNextDir),
                    core = nexts.shift();
                if (nexts.length === 0 && /\..+/.test(core)) {
                    maxLen = Math.max(core.length + length, maxLen);
                } else {
                    nexts.forEach(dir => {
                        maxLen = Math.max(checkLevel(dir, level + 1, length + 1 + core.length), maxLen);
                    })
                }
            })
        }
        return maxLen;
    }
    return checkLevel(fileSystem);
}

function testUsing(solution) {
    console.log(`TESTING ${solution.name}`);
    function test(fileSystem, expectedResult) {
        const res = solution(fileSystem);
        console.log(`${fileSystem}\n-> ${res} (${expectedResult})`);
    }
    test("dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext", 20);
    test("dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext", 32);
}

testUsing(solution1);
