import { ICollection, IFlashcard } from "@/types/app.types";

const hasEmptyFlashcardFields = (flashcards: IFlashcard[]): boolean =>
  flashcards.some(({ question, answer }) => !question || !answer);

export function isEmptyFields(collection: ICollection): boolean {
  const hasEmptyName = collection.name?.trim() === "";
  const hasEmptyFieldsInFlashcards = hasEmptyFlashcardFields(
    collection.flashcards
  );

  return hasEmptyName || hasEmptyFieldsInFlashcards;
}
