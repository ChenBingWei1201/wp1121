import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// this utility function is used to merge tailwind classes safely
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const validateUsername = (username?: string | null) => {
  if (!username) return false;
  return /^[a-zA-Z0-9 ]{1,50}$/.test(username);
};

// validate all kind of student ids in NTU.
export const validateStudentId = (studentId?: string | null) => {
  if (!studentId) return false;
  return /[BRDTACPJFQDHKS]\d{2}[1-9ABE][0-4][0-9][0-3]\d{2}/.test(studentId);
};
