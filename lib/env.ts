export function getEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value) {
    console.warn(`Environment variable ${name} is not set.`);
  }
  return value;
}
