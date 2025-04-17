export interface IFlashcard {
  id: string;
  question: string;
  answer: string;
}

export interface ICollection {
  id: string;
  name: string;
  flashcards: Array<IFlashcard> | [];
}

export interface HandleChangeValue {
  id: string;
  field: keyof IFlashcard;
  value: string;
}
