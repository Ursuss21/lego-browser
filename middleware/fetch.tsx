interface IGetDataParameters {
  folder: string;
  page?: number | undefined;
  page_size?: number | undefined;
  theme_id?: number | undefined;
  id?: string | undefined;
}

const getDataFromAPI = async ({
  folder,
  page,
  page_size,
  theme_id,
  id,
}: IGetDataParameters) => {
  const url = process.env.REBRICKABLE_URL;
  const key = process.env.REBRICKABLE_API_KEY;

  let urlString = `${url}${folder}`;

  if (typeof id !== "undefined") {
    urlString += `/${id}`;
  }

  urlString += `/?key=${key}`;

  if (typeof page !== "undefined") {
    urlString += `&page=${page}`;
  }

  if (typeof page_size !== "undefined") {
    urlString += `&page_size=${page_size}`;
  }

  if (typeof theme_id !== "undefined") {
    if (theme_id !== 0) {
      urlString += `&theme_id=${theme_id}`;
    }
  }
  console.log(urlString);
  const res = await fetch(urlString);
  const data = await res.json();

  return data;
};

export default getDataFromAPI;
