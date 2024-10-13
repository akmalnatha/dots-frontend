import axios, { AxiosResponse } from "axios";

const url = "https://opentdb.com/api.php?";
const urlCat = "https://opentdb.com/api_category.php";

if (!url || !urlCat) {
  throw new Error("Environment variables URL or URL_CAT are not defined.");
}

export const get = async (
  apiData?: string
): Promise<AxiosResponse<any, any>> => {
  return await axios.get(url + apiData);
};

export async function getCategory(): Promise<{ label: string; value: number }[]> {
  const response = await axios.get("https://opentdb.com/api_category.php");
  const questionCategory = response.data.trivia_categories;

  const options = questionCategory.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  return options;
}
