import { backendAxiosInstance } from "./QueryClient";
import { IAnnouncement } from "./types/responses";

export const fetchNews = async () => {
  const news = await (
    await backendAxiosInstance.get("/announcement/latest/5")
  ).data;

  return news;
};

export const mutateNewAnnouncement = async (payload: IAnnouncement) => {
  console.log(payload);
  const response = await backendAxiosInstance.post(
    "/announcement/new",
    payload
  );
  return response;
};
