import { useGetAllVideos } from "@/queries/video.queries";
import { useEffect } from "react";
import { toast } from "sonner";

export const useAllVideos = () => {
  const AllVideos = useGetAllVideos();

  useEffect(() => {
    if (AllVideos.isError) {
      toast.error("Error Loading videos😢", {
        description:
          "Please check your network and try again. Close this Message to try again",
        duration: AllVideos.isError ? Infinity : 10,
        onDismiss: AllVideos.refetch(),
      });
    }
  }, [AllVideos.isError]);

  return { AllVideos };
};
