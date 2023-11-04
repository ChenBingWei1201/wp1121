import { faker } from "@faker-js/faker";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// this utility function is used to merge tailwind classes safely
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// generate a random avatar for a user
export function getAvatar(username?: string | null) {
  faker.seed(username ? getSeed(username) : 42069);
  return faker.internet.avatar();
}

// convert username to a number for consistent seeding
function getSeed(username: string) {
  const code = new TextEncoder().encode(username);
  return Array.from(code).reduce(
    (acc, curr, i) => (acc + curr * i) % 1_000_000,
    0,
  );
}

export function validateHandle(handle?: string | null) {
  if (!handle) return false;
  return handle;
  // return /^[a-z0-9\\._-]{1,25}$/.test(handle);
}

const validateValidDate = (dateStr: string) => {
  const dateObj = dateStr.split("-"); // yyyy/mm/dd

  //列出12個月，每月最大日期限制
  const limitInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const theYear = parseInt(dateObj[0]);
  const theMonth = parseInt(dateObj[1]);
  const dayAndHour = dateObj[2].split(" ");
  const theDay = parseInt(dayAndHour[0]);
  const theHour = parseInt(dayAndHour[1]);
  const isLeap = new Date(theYear, 1, 29).getDate() === 29; // 是否為閏年?

  if (isLeap) {
    // 若為閏年，最大日期限制改為 29
    limitInMonth[1] = 29;
  }

  if (theHour > 23 || theHour < 0) return false;

  // 比對該日是否超過每個月份最大日期限制
  return theDay <= limitInMonth[theMonth - 1];
};

export function validateUsername(username?: string | null) {
  if (!username) return false;
  return username;
  // return /^[a-zA-Z0-9 ]{1,50}$/.test(username);
}

export function validateTitle(title?: string | null) {
  if (!title) return false;
  return true;
  // return /^[a-z0-9\\._-]{1,25}$/.test(title);
}

export function validateFrom(formDate?: string | null) {
  if (!formDate) return false;
  // if (/^\d\d\d\d-\d\d-\d\d\s\d\d$/.test(formDate))
  //   return true;
  if (validateValidDate(formDate)) return true;
  else return false;
}

export function validateTo(toDate?: string | null) {
  if (!toDate) return false;
  // if(/^\d\d\d\d-\d\d-\d\d\s\d\d$/.test(toDate))
  //   return true;
  if (validateValidDate(toDate)) return true;
  else return false;
}
