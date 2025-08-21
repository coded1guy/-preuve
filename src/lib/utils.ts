import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (value: string, dp = 4) => {
  const sanitize = (value: string) => {
    value = value
      .replace(/[^\d.]/g, "")
      .replace(/^0+(?=\d)/, "")
      .replace(/(\..*?)\..*/g, "$1")
      .replace(/^\.([0-9])/, "0.$1")
      .replace(/(\.\d{4})\d+$/, "$1");

    return value;
  };

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: dp,
  });
  const forward = () => {
    value = sanitize(value);
    if (!value) return "0";

    const valArr = value.split(".");

    return valArr.length <= 1
      ? formatter.format(Number(valArr[0]))
      : `${formatter.format(Number(valArr[0]))}.${valArr[1]}`;
  };

  const backward = () => {
    value = sanitize(value);
    if (!value) return 0;

    return Number(value);
  };

  const limitBy = (limit: string) => {
    value = sanitize(value);
    limit = sanitize(limit);

    if (!value || !limit) return "";

    const limitValue = Number(limit) / 1.075;

    return Number(value) >= limitValue ? `${limitValue}` : value;
  };

  const dropIrrelevantZeros = () => {
    value = sanitize(value);

    if (!value) return "";

    return Number(value) === 0 ? "0" : null;
  };
  return { forward, backward, limitBy, dropIrrelevantZeros };
};
