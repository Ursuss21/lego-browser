import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import prepareQueryString from "../middleware/query";

interface IItem {
  id: number;
  parent_id?: number | undefined;
  name: string;
}

interface IProps {
  items: IItem[];
  queryTarget: string;
}

const Dropdown: FunctionComponent<IProps> = ({ items, queryTarget }) => {
  const sortByName = (resultItems: IItem[]) => {
    resultItems.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    return resultItems;
  };

  const prepareArray = () => {
    return sortByName(items);
  };

  const router = useRouter();
  const handleChange = (e: any) => {
    let queryString;
    switch (queryTarget) {
      case "part_cat_id":
        queryString = prepareQueryString({
          path: router.asPath,
          part_cat_id: e.target.value,
        });
        break;
      case "theme_id":
        queryString = prepareQueryString({
          path: router.asPath,
          theme_id: e.target.value,
        });
        break;
      case "color_id":
        queryString = prepareQueryString({
          path: router.asPath,
          color_id: e.target.value,
        });
        break;
      default:
        queryString = prepareQueryString({
          path: router.asPath,
        });
    }
    router.push(queryString);
  };

  const preparedItems = prepareArray();

  return (
    <div className="items-dropdown">
      <select onChange={handleChange}>
        <option key={0} value={0}>
          All
        </option>
        {preparedItems.map((item) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Dropdown;
