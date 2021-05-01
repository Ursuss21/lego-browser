interface IGetDataParameters {
  folder: string;
  page?: number | undefined;
  page_size?: number | undefined;
  id?: string | undefined;
}

export default async function getDataFromAPI({
  folder,
  page,
  page_size,
  id,
}: IGetDataParameters) {
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
  console.log(urlString);
  const res = await fetch(urlString);
  const data = await res.json();

  return data;
}
