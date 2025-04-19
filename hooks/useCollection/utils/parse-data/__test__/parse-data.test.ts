import { ICollection } from "@/types/app.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parseData } from "../parse-data";

jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
}));

const collections: ICollection[] = [
  {
    id: "1",
    name: "History",
    flashcards: [{ id: "1", question: "Who", answer: "She" }],
  },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe("parseData", () => {
  it("return parsed data when AsyncStorage has value", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(
      JSON.stringify(collections)
    );

    const result = await parseData();

    expect(AsyncStorage.getItem).toHaveBeenCalledWith("collections");
    expect(result).toEqual(collections);
    expect(Array.isArray(result)).toBe(true);
  });

  it("return empty array when AsyncStorage has no value", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(null);

    const result = await parseData();

    expect(result).toEqual([]);
    expect(Array.isArray(result)).toBe(true);
  });

  it("handle invalid JSON gracefully", async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce("{invalidJson}");

    const result = await parseData();

    expect(result).toEqual([]);
  });
});
