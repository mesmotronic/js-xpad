
export const computeInputValue = (values: number | undefined | (number | undefined)[], inputThreshold: number = 0.15): number => {
  if (!Array.isArray(values)) {
    values = [values];
  }

  let value = 0;
  let { length } = values;

  for (let i = 0; i < length; i++) {
    value = values[i] ?? 0;
    value = Math.max(-1, Math.min(1, Math.abs(value) < inputThreshold ? 0 : value));
    if (value) return value;
  }

  return 0;
};
