function categorizePlaywrightError(rawMessage) {
  const normalized = rawMessage
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');

  let category;

  if (normalized.includes('timeout')) {
    category = 'TIMEOUT';
  } else if (normalized.includes('locator')) {
    category = 'LOCATOR';
  } else {
    category = 'GENERAL';
  }

  console.log(category);
  return category;
}