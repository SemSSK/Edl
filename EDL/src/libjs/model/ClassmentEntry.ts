import { hasFields } from "../core";

export type ClassmentEntry = {
  email: string;
  name: string;
  classment: number;
  avg?: number;
};

const classmentEntryFields = ["email", "classment", "avg"];

export function isClassmentEntry(x: unknown): boolean {
  return hasFields(x, classmentEntryFields);
}

export function isClassmentEntryArray(x: unknown): boolean {
  return (
    Array.isArray(x) && x.reduce((acc, x) => acc && isClassmentEntry(x), true)
  );
}
