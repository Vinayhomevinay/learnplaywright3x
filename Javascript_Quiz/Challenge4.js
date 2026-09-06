function getExecutionPlan(allBrowsers, blockedBrowsers) {
  const blockedSet = new Set(blockedBrowsers);

  const runnable = allBrowsers.filter(browser => !blockedSet.has(browser));
  const blocked = allBrowsers.filter(browser => blockedSet.has(browser));

  const runPart = runnable.length > 0 ? `Run on: ${runnable.join(', ')}` : 'Run on: none';
  const skipPart = blocked.length > 0 ? `Skip: ${blocked.join(', ')}` : 'Skip: none';

  const executionPlan = `${runPart} | ${skipPart}`;

  return { runnable, blocked, executionPlan };
}