import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import prepareQueryString from "../middleware/query";

interface IProps {
  themes: [
    {
      id: number;
      parent_id: number;
      name: string;
    }
  ];
  themesCount: number;
}

interface ITheme {
  id: number;
  parent_id: number;
  name: string;
}

const prepareThemesNames = (
  themes: [
    {
      id: number;
      parent_id: number;
      name: string;
    }
  ]
) => {
  const resultThemes: {
    id: number;
    parent_id: number;
    name: string;
  }[] = [];
  for (const theme of themes) {
    let temp: ITheme = theme;
    let retName: string = temp.name;
    while (temp.parent_id != null) {
      const parent: ITheme | undefined = themes.find((t) => {
        if (t.id === temp.parent_id) {
          return true;
        }
      });
      if (parent !== undefined) {
        retName = `${parent.name} > ${retName}`;
        temp = parent;
      }
    }
    const resObj = { id: theme.id, parent_id: theme.parent_id, name: retName };
    resultThemes.push(resObj);
  }
  return resultThemes;
};

const sortThemesByName = (
  themes: {
    id: number;
    parent_id: number;
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

const prepareThemesArray = (
  themes: [
    {
      id: number;
      parent_id: number;
      name: string;
    }
  ]
) => {
  let resultThemes = prepareThemesNames(themes);
  resultThemes = sortThemesByName(resultThemes);
  return resultThemes;
};

const Theme: FunctionComponent<IProps> = ({ themes, themesCount }) => {
  const preparedThemes = prepareThemesArray(themes);

  const router = useRouter();

  const handleThemeChange = (e: any) => {
    const queryString = prepareQueryString({
      path: router.asPath,
      theme_id: e.target.value,
    });
    router.push(queryString);
  };

  return (
    <div className="theme-dropdown">
      <select onChange={handleThemeChange}>
        <option key={0} value={0}>
          All
        </option>
        {preparedThemes.map((theme) => {
          return (
            <option key={theme.id} value={theme.id}>
              {theme.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Theme;
