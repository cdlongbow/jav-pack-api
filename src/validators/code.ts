import type { ValidationTargets } from "hono";
import { validator } from "hono/validator";

import { respondStatus } from "../lib/respond";

export const codeValidator = (target: keyof ValidationTargets, field: string) => {
  return validator(target, (value, c) => {
    const normalized = value?.[field]?.toString().trim().toUpperCase() ?? "";
    return /^[A-Z0-9_-]{4,12}$/.test(normalized) ? { [field]: normalized } : respondStatus(c, 400, 86400);
  });
};
