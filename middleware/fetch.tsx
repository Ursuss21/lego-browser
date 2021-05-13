interface IGetDataParameters {
  folder: string;
  page?: number | undefined;
  page_size?: number | undefined;
  theme_id?: number | undefined;
  part_cat_id?: number | undefined;
  color_id?: number | undefined;
  id?: string | undefined;
}

const getDataFromAPI = async ({
  folder,
  page,
  page_size,
  theme_id,
  part_cat_id,
  color_id,
  id,
}: IGetDataParameters) => {
  const url = process.env.REBRICKABLE_URL;
  const key = process.env.REBRICKABLE_API_KEY;

  let urlString = `${url}${folder}`;

  if (id !== undefined) {
    urlString += `/${id}`;
  }

  urlString += `/?key=${key}`;

  if (page !== undefined) {
    urlString += `&page=${page}`;
  }

  if (page_size !== undefined) {
    urlString += `&page_size=${page_size}`;
  }

  if (theme_id !== undefined) {
    if (theme_id !== 0) {
      urlString += `&theme_id=${theme_id}`;
    }
  }

  if (part_cat_id !== undefined) {
    if (part_cat_id !== 0) {
      urlString += `&part_cat_id=${part_cat_id}`;
    }
  }

  if (color_id !== undefined) {
    if (color_id !== 0) {
      urlString += `&color_id=${color_id}`;
    }
  }

  const res = await fetch(urlString);
  const data = await res.json();

  return data;
};

export default getDataFromAPI;
