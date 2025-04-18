import { renderHook, act, waitFor } from "@testing-library/react-native";
import { useCollection } from "../useCollection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { App } from "@/constants/App";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.spyOn(Alert, "alert");

beforeEach(() => {
  jest.clearAllMocks();
});

const initialState = {
  id: "123",
  name: "Test Collection",
  flashcards: [],
};

describe("useCollection hook", () => {
  it("initializes with default state when no initialState is provided", () => {
    const { result } = renderHook(() => useCollection());

    expect(result.current.collection.flashcards).toBeDefined();
  });

  it("initializes with provided initialState", () => {
    const { result } = renderHook(() => useCollection({ initialState }));

    expect(result.current.collection.name).toBe("Test Collection");
    expect(result.current.collection.flashcards).toEqual([]);
  });

  it("adds a flashcard", () => {
    const { result } = renderHook(() => useCollection({ initialState }));

    act(() => {
      result.current.handleAddFlashcard();
    });

    expect(result.current.collection.flashcards.length).toBe(1);
  });

  it("deletes a flashcard", () => {
    const flashcard = { id: "123", question: "Q?", answer: "A" };
    const { result } = renderHook(() =>
      useCollection({
        initialState: {
          id: "123",
          name: "With Flashcard",
          flashcards: [flashcard],
        },
      })
    );

    act(() => {
      result.current.handleDeleteQuestion("123");
    });

    expect(result.current.collection.flashcards.length).toBe(0);
  });

  it("saves collection to AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const { result } = renderHook(() => useCollection({ initialState }));

    result.current.handleSave();

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith(
        "Success",
        "Collection saved successfully!"
      );
    });
  });

  it("edits an existing collection and saves to AsyncStorage", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify([initialState])
    );

    const updatedCollection = {
      ...initialState,
      name: "Math - Updated",
    };

    const { result } = renderHook(() =>
      useCollection({ initialState: updatedCollection })
    );

    result.current.handleEditSave("123");

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        App.keyStorage.collections,
        JSON.stringify([updatedCollection])
      );
    });

    expect(Alert.alert).toHaveBeenCalledWith(
      "Success",
      "Collection edited successfully!"
    );
  });

  it("handles error save", async () => {
    (AsyncStorage.getItem as jest.Mock).mockRejectedValueOnce(
      new Error("fail")
    );

    const { result } = renderHook(() => useCollection({ initialState }));

    result.current.handleSave();

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "Failed to save collection"
      );
    });
  });
});
