import {
  createVideoPost,
  deleteVideoByID,
  getAllVideos,
  getMyVideos,
  getVideoByID,
} from "@/service/videos.service";
import { useMutation, useQuery } from "@tanstack/react-query";

// get all videos
export const useGetAllVideos = () => {
  return useQuery({
    queryKey: ["get-all-videos"],
    queryFn: async () => {
      const response = await getAllVideos();
      return response;
    },
  });
};

// create anew video post
export const useCreateVideoPosts = (onProgress) => {
  return useMutation({
    mutationFn: (data) => createVideoPost(data, onProgress),
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
};

// get video by id
export const useGetVideoByID = (id) => {
  return useQuery({
    queryKey: ["get-video-by-id", id],
    queryFn: () => getVideoByID(id),
  });
};

// delete video by id
export const useDeleteVideoByID = () => {
  return useMutation({
    mutationFn: (id) => deleteVideoByID(id),
    onSuccess: (response) => {
      return response;
    },
    onError: (error) => {
      throw error;
    },
  });
};

// get my videos (creator role only)
export const useGetMyVideos = () => {
  return useQuery({
    queryKey: ["get-video-by-id"],
    queryFn: async () => {
      const response = await getMyVideos();
      return response.data;
    },
  });
};
