export function redirectSystemPath({
  path,
}: {
  path: string;
  initial: boolean;
}): string {
  try {
    return path;
  } catch {
    return '/';
  }
}
