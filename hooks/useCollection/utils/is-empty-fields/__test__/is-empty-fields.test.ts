import { ICollections } from "@/types/app.types";
import { isEmptyFields } from "@/hooks/useCollection/utils/is-empty-fields";

describe("isEmptyFields", () => {
  it("returns true when the collection name is empty", () => {
    const collection: ICollections = {
      id: "1",
      name: "",
      flashcards: [],
    };

    expect(isEmptyFields(collection)).toBe(true);
  });

  it("returns false when the collection name is not empty and there are no flashcards", () => {
    const collection: ICollections = {
      id: "1",
      name: "Valid Name",
      flashcards: [],
    };

    expect(isEmptyFields(collection)).toBe(false);
  });

  it("returns true when a flashcard has an empty question", () => {
    const collection: ICollections = {
      id: "1",
      name: "Valid Name",
      flashcards: [{ id: "1", question: "", answer: "Answer" }],
    };

    expect(isEmptyFields(collection)).toBe(true);
  });

  it("returns true when a flashcard has an empty answer", () => {
    const collection: ICollections = {
      id: "1",
      name: "Valid Name",
      flashcards: [{ id: "1", question: "Question", answer: "" }],
    };

    expect(isEmptyFields(collection)).toBe(true);
  });

  it("returns false when all flashcards have valid questions and answers", () => {
    const collection: ICollections = {
      id: "1",
      name: "Valid Name",
      flashcards: [{ id: "1", question: "Question", answer: "Answer" }],
    };

    expect(isEmptyFields(collection)).toBe(false);
  });
});
