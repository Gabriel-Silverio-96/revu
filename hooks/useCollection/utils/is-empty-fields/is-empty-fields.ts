import { ICollections, IFlashcard } from "@/types/app.types";

const hasEmptyFlashcardFields = (flashcards: IFlashcard[]): boolean =>
  flashcards.some(({ question, answer }) => !question || !answer);

export function isEmptyFields(collection: ICollections): boolean {
  const hasEmptyName = collection.name?.trim() === "";
  const hasEmptyFieldsInFlashcards = hasEmptyFlashcardFields(
    collection.flashcards
  );

  return hasEmptyName || hasEmptyFieldsInFlashcards;
}
