import type { SearchParams } from "nuqs/server";

export { cn } from "cn";

export function getNameInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[1]}`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

export function generateURLSearchParams(params: SearchParams) {
  const urlSearchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      value.forEach((v) => {
        urlSearchParams.append(key, v);
      });
    } else {
      urlSearchParams.set(key, value);
    }
  }

  return urlSearchParams;
}
