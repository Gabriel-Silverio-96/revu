import { App } from "@/constants/App";
import { ICollection } from "@/types/app.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Parses and returns collection data from AsyncStorage.
 *
 * Retrieves the stored collection data using the key defined in `App.keyStorage.collections`,
 * parses it as JSON, and returns it as an array of `ICollection`.
 *
 * If the storage is empty or contains invalid JSON, an empty array is returned.
 *
 * @async
 * @function parseData
 * @returns {Promise<ICollection[]>} A promise that resolves to an array of `ICollection` objects.
 */
export async function parseData(): Promise<ICollection[]> {
  const storageData = await AsyncStorage.getItem(App.keyStorage.collections);

  if (storageData) {
    try {
      const data: Array<ICollection> = JSON.parse(storageData);
      return data;
    } catch (error) {
      return [];
    }
  }

  return [];
}
