export const FromEnvironment = (variable) => {
  const result = process.env[variable];
  if (result !== undefined) {
    return result;
  }
  throw new Error(
    `ERROR : Unable to find environment variable ${variable} [Environment Configuration Failure]`,
  );
};
