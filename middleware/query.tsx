interface IGetDataParameters {
  path: string | undefined;
  page_size?: number | undefined;
  theme_id?: string | undefined;
  color_id?: number | undefined;
  part_cat_id?: number | undefined;
}

const updateQuery = (
  argument: string,
  queryArray: string[] | undefined,
  value: string | undefined
) => {
  if (value !== undefined) {
    const temp = `${argument}=${value}`;
    const replacementIndex = queryArray?.findIndex((pgSize) => {
      if (pgSize.includes(argument)) {
        return true;
      }
    });
    if (
      queryArray !== undefined &&
      replacementIndex !== undefined &&
      replacementIndex !== -1
    ) {
      queryArray[replacementIndex] = temp;
    } else if (queryArray !== undefined && replacementIndex !== undefined) {
      queryArray.push(temp);
    } else {
      queryArray = [temp];
    }
  }
  return queryArray;
};

const prepareQueryString = ({
  path,
  page_size,
  theme_id,
  color_id,
  part_cat_id,
}: IGetDataParameters) => {
  let basePath;
  let queryString;
  let queryArray;
  let resultString;
  if (path !== undefined) {
    basePath = path.split("?")[0];
    queryString = path.split("?")[1];
    if (queryString !== undefined) {
      queryArray = queryString.split("&");
    }
  }
  const basePathArray = basePath?.split("/");
  if (basePathArray !== undefined) {
    basePathArray[2] = "1";
    basePath = basePathArray.join("/");
  }
  resultString = `${basePath}?`;
  queryArray = updateQuery("page_size", queryArray, page_size?.toString());
  queryArray = updateQuery("theme_id", queryArray, theme_id);
  queryArray = updateQuery("part_cat_id", queryArray, part_cat_id?.toString());
  queryArray = updateQuery("color_id", queryArray, color_id?.toString());
  queryString = queryArray?.join("&");
  resultString = `${resultString}${queryString}`;
  return resultString;
};

export default prepareQueryString;
