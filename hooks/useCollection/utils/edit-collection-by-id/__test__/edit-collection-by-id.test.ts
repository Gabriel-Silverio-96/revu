import { editCollectionById } from "../edit-collection-by-id";

const data = [
  {
    id: "1",
    name: "Math",
    flashcards: [{ id: "1", question: "Where?", answer: "Near" }],
  },
  {
    id: "2",
    name: "History",
    flashcards: [{ id: "2", question: "when?", answer: "long ago" }],
  },
];

describe("editCollectionById()", () => {
  it("update the correct collection by id", () => {
    const updatedCollection = {
      id: "2",
      name: "Updated History",
      flashcards: [{ id: "2", question: "who?", answer: "People" }],
    };

    const result = editCollectionById({
      data,
      id: "2",
      value: updatedCollection,
    });

    expect(result).toEqual([data[0], updatedCollection]);
  });

  it("return original data if id does not match", () => {
    const result = editCollectionById({
      data,
      id: "99",
      value: {
        id: "99",
        name: "Physics",
        flashcards: [],
      },
    });

    expect(result).toEqual(data);
  });

  it("not mutate the original array", () => {
    const original = [...data];
    const newValue = {
      id: "1",
      name: "New Math",
      flashcards: [{ id: "1", question: "new q", answer: "new a" }],
    };

    editCollectionById({ data, id: "1", value: newValue });

    expect(data).toEqual(original);
  });
});
