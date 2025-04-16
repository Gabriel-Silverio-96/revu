import { IFlashcard } from "@/types/app.types";

interface IDefineEditField {
  flashcards: Array<IFlashcard>;
  id: string;
  field: string;
  value: string;
}

export function defineEditField({
  flashcards,
  id,
  field,
  value,
}: IDefineEditField): Array<IFlashcard> {
  return flashcards.map((card) => {
    const isSameId = card.id === id;

    if (isSameId) {
      return { ...card, [field]: value };
    }

    return card;
  });
}
