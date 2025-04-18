import { ICollection } from "@/types/app.types";

interface IEditCollectionById {
  data: Array<ICollection>;
  id: string | string[];
  value: ICollection;
}

export function editCollectionById({ data, id, value }: IEditCollectionById) {
  return data.map((object) => {
    if (object.id === id) {
      return value;
    }
    return object;
  });
}
