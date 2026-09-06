function printStepSummary(steps) {
  const total = steps.length;

  const passed = steps.filter(step => step.status === 'passed');
  const failed = steps.filter(step => step.status === 'failed');
  const skipped = steps.filter(step => step.status === 'skipped');

  const totalDurationMs = steps.reduce((sum, step) => sum + step.durationMs, 0);

  const failedNames = failed.map(step => step.name).join(', ');

  const summary = {
    totalSteps: total,
    passedCount: passed.length,
    failedCount: failed.length,
    skippedCount: skipped.length,
    totalDurationMs,
    failedStepNames: failedNames
  };

  console.log('--- Step Summary Report ---');
  console.log(`Total Steps   : ${summary.totalSteps}`);
  console.log(`Passed        : ${summary.passedCount}`);
  console.log(`Failed        : ${summary.failedCount}`);
  console.log(`Skipped       : ${summary.skippedCount}`);
  console.log(`Total Duration: ${summary.totalDurationMs}ms`);
  console.log(`Failed Steps  : ${summary.failedStepNames || 'None'}`);
  console.log('----------------------------');

  return summary;
}