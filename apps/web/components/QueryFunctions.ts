import { backendAxiosInstance } from "./QueryClient";

export const fetchNews = async () => {
  const news = await (
    await backendAxiosInstance.get("/announcement/latest/5")
  ).data;

  return news;
};
