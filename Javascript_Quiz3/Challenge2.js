function questionName(input) {
  
//Test Case Result Counter
//After a test suite runs, you receive an array of test results (strings: "pass", "fail", "skip"). Write a JavaScript program using a for loop that counts how many tests passed, failed, and were skipped. Print a test report with total tests, counts, pass rate percentage, and a verdict (all passed → ready for release, ≤2 failures → review, >2 failures → block release).
//testResults = ["pass", "pass", "fail", "pass", "skip", "pass", "fail", "pass"]
//Assuming an input as testResults having array of strings with values
let passCount = 0;
let failCount = 0;
let skipCount = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === "pass") {
    passCount++;
  } else if (input[i] === "fail") {
    failCount++;
  } else if (input[i] === "skip") {
    skipCount++;
  }
}

const totalTests = testResults.length;
const passRate = (passCount / totalTests) * 100;

if (failCount === 0) {
  Verdict=(`Total Tests: ${totalTests} Passed: ${passCount} Failed: ${failCount} Skipped: ${skipCount} Pass Rate: ${passRate.toFixed(2)}% VERDICT: Ready for release.`);
} else if (failCount <= 2) {
  Verdict=(`Total Tests: ${totalTests} Passed: ${passCount} Failed: ${failCount} Skipped: ${skipCount} Pass Rate: ${passRate.toFixed(2)}% VERDICT: Minor failures. Review before release.`);
} else {
  Verdict=(`Total Tests: ${totalTests} Passed: ${passCount} Failed: ${failCount} Skipped: ${skipCount} Pass Rate: ${passRate.toFixed(2)}% VERDICT: Major failures. Block release.`);
}


return Verdict;
}

