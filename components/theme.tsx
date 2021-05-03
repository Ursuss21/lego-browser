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

// const prepareThemeNames = (
//   themes: [
//     {
//       id: number;
//       parent_id: number;
//       name: string;
//     }
//   ]
// ) => {
//   for (let theme of themes) {
//     let temp: string = theme.name;
//   }
// };

const Theme: FunctionComponent<IProps> = ({ themes, themesCount }) => {
  //prepareThemeNames(themes);
  return (
    <div className="theme-dropdown">
      <select>
        {themes.map((theme) => {
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
