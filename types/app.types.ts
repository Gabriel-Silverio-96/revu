export interface IFlashcard {
  id: string;
  question: string;
  answer: string;
}

export interface ICollections {
  id: string;
  name: string;
  flashcards: Array<IFlashcard> | [];
}
