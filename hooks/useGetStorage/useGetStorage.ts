import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

const INITIAL_DATA = null;

interface useGetStorage {
  key: string;
}

export function useGetStorage<T = null>({ key }: useGetStorage) {
  const [data, setData] = useState<T | null>(INITIAL_DATA);

  useFocusEffect(
    useCallback(() => {
      const getItemStorage = async () => {
        try {
          const storedCollections = await AsyncStorage.getItem(key);

          if (storedCollections !== null) {
            const parsed: T = JSON.parse(storedCollections);

            setData(parsed);
            return;
          }

          setData(INITIAL_DATA);
        } catch (error) {
          Alert.alert("Error", "Failed to load data");
        }
      };

      getItemStorage();
    }, [])
  );

  return { data, setData };
}
