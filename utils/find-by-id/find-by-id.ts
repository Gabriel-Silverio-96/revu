interface IFindById {
  data: any;
  id?: string | string[];
}

export function findById({ data, id }: IFindById) {
  if (!data || !id) return null;

  return data.find((object: any) => object.id === id);
}
