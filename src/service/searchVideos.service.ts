import { axiosInstance } from "./axios";

// Search fro videos
export const SearchVideo = async (data) => {
  const params = {
    query: data.query,
    genre: data.genre || "",
    year: data.year || "",
  };
  return await axiosInstance.get("VideoPosts/search", { params });
};
