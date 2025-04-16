import * as Crypto from "expo-crypto";

export function generateCollection() {
  return {
    id: Crypto.randomUUID(),
    name: "",
    flashcards: [
      {
        id: Crypto.randomUUID(),
        question: "",
        answer: "",
      },
    ],
  };
}
