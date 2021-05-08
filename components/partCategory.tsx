import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import prepareQueryString from "../middleware/query";

interface IProps {
  partCategories: [
    {
      id: number;
      name: string;
    }
  ];
  partCategoriesCount: number;
}

const sortPartCategoriesByName = (
  themes: {
    id: number;
    name: string;
  }[]
) => {
  themes.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return themes;
};

const preparePartCategoriesArray = (
  partCategories: [
    {
      id: number;
      name: string;
    }
  ]
) => {
  // let resultPartCategories = preparePartCategoriesNames(partCategories);
  const resultPartCategories = sortPartCategoriesByName(partCategories);
  return resultPartCategories;
};

const PartCategory: FunctionComponent<IProps> = ({
  partCategories,
  partCategoriesCount,
}) => {
  const preparedPartCategories = preparePartCategoriesArray(partCategories);

  const router = useRouter();

  const handleThemeChange = (e: any) => {
    const queryString = prepareQueryString({
      path: router.asPath,
      part_cat_id: e.target.value,
    });
    router.push(queryString);
  };

  return (
    <div className="theme-dropdown">
      <select onChange={handleThemeChange}>
        <option key={0} value={0}>
          All
        </option>
        {preparedPartCategories.map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PartCategory;
