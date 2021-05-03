import React, { FunctionComponent } from "react";

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
  return (
    <div className="theme-dropdown">
      <select>
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
