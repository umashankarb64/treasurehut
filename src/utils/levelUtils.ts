export const generateLevelUrl = (level: number): string => {
  const randomStr = Math.random().toString(36).substring(7);
  return `level-${randomStr}`;
};