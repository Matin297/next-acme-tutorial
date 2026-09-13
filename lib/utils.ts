export { cn } from "cn";

export function getNameInitials(name: string) {
  const [firstName, lastName] = name.split(" ");
  return `${firstName[0]}${lastName[1]}`;
}

export function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}
