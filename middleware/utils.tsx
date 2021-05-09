interface IItem {
  id: number;
  parent_id: number;
  name: string;
}

const prepareNames = (
  items: [
    {
      id: number;
      parent_id: number;
      name: string;
    }
  ]
) => {
  const results: {
    id: number;
    parent_id?: number;
    name: string;
  }[] = [];
  for (const item of items) {
    let temp: IItem = item;
    let retName: string = temp.name;
    while (temp.parent_id != null) {
      const parent: IItem | undefined = items.find((t) => {
        if (t.id === temp.parent_id) {
          return true;
        }
      });
      if (parent !== undefined) {
        retName = `${parent.name} > ${retName}`;
        temp = parent;
      }
    }
    const resObj = {
      id: item.id,
      parent_id: item.parent_id,
      name: retName,
    };
    results.push(resObj);
  }
  return results;
};

export default prepareNames;
