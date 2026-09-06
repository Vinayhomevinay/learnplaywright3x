function createUserObjects(names, roles) {
  if (names.length !== roles.length) {
    throw new Error('names and roles arrays must be the same length');
  }

  return names.map((name, index) => {
    const username = name.trim().toLowerCase().replace(/\s+/g, '_');
    const email = `${username}@playwrightbatch.com`;
    const role = roles[index];

    return { username, email, role };
  });
}