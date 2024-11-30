import { evaluate, parse } from "mathjs";

export const validateExpression = (expr: string): string | null => {
  try {
    parse(expr);
    return null;
  } catch (error) {
    return (error as Error).message;
  }
};

export const evaluateFunction = (
  expr: string,
  x: number,
  y: number,
  z: number
): number => {
  try {
    return evaluate(expr, { x, y, z });
  } catch {
    return 0;
  }
};

export const isPointInFunction = (
  expr: string,
  x: number,
  y: number,
  z: number
): boolean => {
  try {
    const result = evaluateFunction(expr, x, y, z);
    return result >= 0;
  } catch {
    return false;
  }
};
