function runStep(stepName, actionFn) {
  console.log(`Starting step: ${stepName}`);

  try {
    actionFn();
    return {
      stepName,
      passed: true,
      message: 'Step completed successfully'
    };
  } catch (error) {
    return {
      stepName,
      passed: false,
      message: error.message
    };
  }
}