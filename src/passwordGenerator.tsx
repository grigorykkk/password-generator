// src/passwordGenerator.ts

export type PasswordOptions = {
  length: number;
  lower: boolean;
  upper: boolean;
  digits: boolean;
  symbols: boolean;
  excludeSimilar?: boolean; // исключить похожие символы (0/O, 1/l/I и т.п.)
};

const LOWER_CHARS = "abcdefghijklmnopqrstuvwxyz";
const UPPER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DIGIT_CHARS = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()-_=+[]{};:,.<>/?";

const SIMILAR_CHARS = /[O0Il1]/g;

export function generatePassword(options: PasswordOptions): string {
  const { length, lower, upper, digits, symbols, excludeSimilar } = options;

  let chars = "";
  if (lower) chars += LOWER_CHARS;
  if (upper) chars += UPPER_CHARS;
  if (digits) chars += DIGIT_CHARS;
  if (symbols) chars += SYMBOL_CHARS;

  if (!chars) {
    throw new Error("Нужно выбрать хотя бы один тип символов");
  }

  if (excludeSimilar) {
    chars = chars.replace(SIMILAR_CHARS, "");
  }

  let password = "";
  const array = new Uint32Array(length);

  // crypto.getRandomValues — чтобы было криптографически стойко
  crypto.getRandomValues(array);

  for (let i = 0; i < length; i++) {
    const index = array[i] % chars.length;
    password += chars[index];
  }

  return password;
}
