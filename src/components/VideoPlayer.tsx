import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { getUser, LogUserOut } from "@/store/AuthStore";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ArrowLeft,
  Cloud,
  EllipsisVertical,
  Heart,
  MessageCircle,
  Play,
  Search,
  Video,
  Volume2,
  VolumeOff,
  VolumeX,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import CommentSection from "./CommentSection";
import { setVideoId } from "@/store/CommentStore";
import { useGetLikes, useLikeVideo } from "@/queries/likes.queries";
import { useGetComments } from "@/queries/comment.queries";
import { SearchComponent } from "./SearchComponent";
import { motion } from "framer-motion";
import BottomDrawer from "./BottomDrawer";

export const VideoPlayer = ({
  AllVideos,
  setView,
  view,
}: {
  AllVideos: UseQueryResult<any, Error>;
  setView?: Dispatch<SetStateAction<string>>;
  view?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [isMobile, setIsMobile] = useState("");
  const router = useRouter();
  const render = "once";

  // user details
  const user = getUser();

  // render toast

  const {
    // LikeVideo,
    // ref
    containerRef,
    videoRefs,

    // stateActions
    setVolume,
    setVideoStates,
    //   state
    likedVideos,
    followedUsers,
    videoDurations,
    videoProgress,
    loadedVideos,
    videoStates,
    videosToLoad,
    isMuted,
    isPlaying,
    currentVideoIndex,
    // functions
    // toggleLike,
    toggleFollow,
    // event handlers
    handleScroll,
    handleVideoLoaded,
    handleVideoPlay,
    handleVideoPause,
    handleVideoEnded,
    handleVideoProgress,
    handleVideoDuration,
    handleVideoError,
    togglePlayPause,
    toggleMute,
    seekTo,
  } = useVideoPlayer({ AllVideos });

  const videoId = AllVideos && AllVideos.data[currentVideoIndex].id;
  const Likes = useGetLikes(videoId);
  const LikeVideo = useLikeVideo(videoId);
  const Comments = useGetComments(videoId, { enabled: true });

  useEffect(() => {
    Likes.isSuccess && console.log(Likes.data);
  }, [Likes.isSuccess]);

  const isVideoLiked = (Likes, LikeVideo) => {
    if (LikeVideo?.data?.isLiked !== undefined) return LikeVideo.data.isLiked;
    if (!Likes.isPending && Likes?.data?.isLiked !== undefined)
      return Likes.data.isLiked;
    return false;
  };
  const Screen = window.innerWidth;
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    setIsMobile(isMobile);
  }, [Screen]);

  if (isSearchOpen) {
    return <SearchComponent setIsSearchOpen={setIsSearchOpen} />;
  }

  return (
    <div className="pb-safe h-full bg-black relative overflow-hidden pb-[env(safe-area-inset-bottom)]">
      {/* Top Navigation - Cloud-themed */}
      <div className="absolute -top-2 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent pt-[env(safe-area-inset-top)]">
        <div className="flex  items-center justify-between p-4 pt-5">
          <div className="flex flex-col items-center justify-center text-center space-x-4">
            {view != "video" ? (
              <button className="text-white p-2 hover:bg-white/10 rounded-full transition-colors">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-lg">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                </div>
              </button>
            ) : (
              <button
                onClick={() => setView && setView("dashboard")}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-8 h-8 text-white" />
              </button>
            )}

            {view != "video" && (
              <div className="">
                <h1 className="text-white text-md md:text-lg font-bold">
                  {/* CloudClip */}
                </h1>
                {user && user.role == "Creator" ? (
                  <p className="text-white text-sm"></p>
                ) : (
                  <p className="text-white font-bold text-sm">
                    {/* All videos in one Cloud 🌥️ */}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-1 absolute top-6 right-2">
            {view != "video" && (
              <>
                <button
                  onClick={() => router.push("/search")}
                  className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Search className="w-6 h-6" />
                </button>
                {user?.role == "Creator" ? (
                  <button
                    onClick={() => setIsDrawerOpen((prev) => !prev)}
                    // onClick={() => router.push("creator/my-dashboard")}
                    className="text-white p-1 transition-colors"
                  >
                    <EllipsisVertical />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsDrawerOpen((prev) => !prev)}
                    className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <EllipsisVertical />
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Video Feed - Cloud-themed */}
      <div
        ref={containerRef}
        className="overflow-y-scroll snap-y snap-mandatory"
        onScroll={handleScroll}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          height: "calc(var(--vh, 1vh) * 100)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
      >
        {AllVideos.data?.length > 0 &&
          AllVideos.data?.map((video, index) => (
            <div
              key={video.id}
              className="w-full snap-start relative bg-black"
              style={{
                height: "calc(var(--vh, 1vh) * 100)",
              }}
            >
              {/* Video container with cloud-themed elements */}
              <div className="absolute inset-0">
                {videosToLoad.has(index) ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video?.videoUrl}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    webkit-playsinline="true"
                    onLoadedData={() => handleVideoLoaded(index)}
                    onLoadStart={() =>
                      setVideoStates((prev) => ({
                        ...prev,
                        [index]: "loading",
                      }))
                    }
                    onCanPlay={() =>
                      setVideoStates((prev) => ({ ...prev, [index]: "ready" }))
                    }
                    onPlay={() => handleVideoPlay(index)}
                    onPause={() => handleVideoPause(index)}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: isMobile ? "cover" : "contain",
                      backgroundColor: "#000",
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                    <div className="text-white/60 text-center">
                      <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 mx-auto">
                        <Cloud className="w-8 h-8 text-white/40" />
                      </div>
                      <div className="text-sm font-medium">{video.title}</div>
                      <div className="text-xs mt-1">Scroll to stream</div>
                    </div>
                  </div>
                )}

                {/* Cloud-themed gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-5" />
              </div>

              {/* Loading State */}
              {videosToLoad.has(index) && !loadedVideos.has(index) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-16 h-16">
                      <Cloud className="w-full h-full text-blue-400 animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    </div>
                    <span className="text-white text-sm">
                      Streaming {video.title}...
                    </span>
                  </div>
                </div>
              )}

              {/* Play/Pause Overlay */}
              {videosToLoad.has(index) && (
                <div
                  className="absolute inset-0 flex items-center justify-center z-10"
                  onClick={togglePlayPause}
                >
                  {!isPlaying &&
                    index === currentVideoIndex &&
                    loadedVideos.has(index) && (
                      <div className="bg-black/60 rounded-full p-6 animate-pulse">
                        <Play className="w-16 h-16 text-white fill-white" />
                      </div>
                    )}
                </div>
              )}

              {/* Right Side Actions - Cloud-themed */}
              <div
                className="absolute right-4 flex flex-col items-center space-y-6 z-20"
                style={{ bottom: `calc(2rem + env(safe-area-inset-bottom))` }}
              >
                {/* Clip Action Button */}
                <motion.div
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }} // Press down animation
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    className="w-12 h-12 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    onClick={() => LikeVideo.mutate()}
                  >
                    <motion.div
                      animate={{
                        scale:
                          !Likes.isPending && Likes?.data?.isLiked
                            ? [1, 1.2, 1]
                            : 1,
                        rotate:
                          !Likes.isPending && Likes?.data?.isLiked
                            ? [0, -10, 10, 0]
                            : 0,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Cloud
                        className={`w-7 h-7 transition-all ${
                          !Likes.isPending && Likes?.data?.isLiked
                            ? "fill-blue-400 text-blue-400"
                            : "text-white hover:text-blue-300"
                        }`}
                      />
                    </motion.div>
                  </button>
                  <motion.span
                    className="text-white text-xs font-medium mt-1"
                    animate={{
                      y:
                        !Likes.isPending && Likes.data?.totalLikesChanged
                          ? [0, -3, 0]
                          : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {!Likes.isPending && Likes?.data?.totalLikes} Clips
                  </motion.span>
                </motion.div>

                {/* Comments Button */}
                <motion.div
                  className="flex flex-col items-center"
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    className="w-12 h-12 text-white hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    onClick={() => {
                      setSelectedVideoId(video.id);
                      setIsOpen((prev) => !prev);
                    }}
                  >
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      animate={isOpen ? { rotate: 360 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      <MessageCircle className="w-7 h-7" />
                    </motion.div>
                  </button>
                  <motion.span
                    className="text-white text-xs font-medium mt-1"
                    animate={{
                      scale: Comments?.data?.lengthChanged ? [1, 1.1, 1] : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {Comments && Comments.data?.length}
                  </motion.span>
                </motion.div>

                {/* Volume Control Button */}
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <button
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isMuted
                        ? "text-white/60 hover:bg-white/10"
                        : "text-white hover:bg-white/20"
                    }`}
                    onClick={toggleMute}
                  >
                    <motion.div
                      key={isMuted ? "muted" : "unmuted"}
                      initial={{ scale: 0.8, opacity: 0.6 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      {isMuted ? (
                        <VolumeOff className="w-7 h-7" />
                      ) : (
                        <Volume2 className="w-7 h-7" />
                      )}
                    </motion.div>
                  </button>
                </motion.div>
              </div>

              {/* Bottom Content */}
              <div
                className="absolute left-0 right-20 p-4 z-15"
                style={{
                  bottom: `calc(1rem + env(safe-area-inset-bottom))`,
                }}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10   rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {video.userName[0]}
                  </div>
                  <span className="text-white font-semibold text-lg">
                    {video.userName}
                  </span>
                </div>

                <p className="text-white text-sm mb-3 max-w-md leading-relaxed">
                  {video.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-500/80 text-white px-2 py-1 rounded-full text-xs font-medium hover:bg-white/30 cursor-pointer transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Progress Bar */}
                {videoProgress[index] && videoDurations[index] && (
                  <div className="mb-2">
                    <div className="flex items-center justify-between text-white text-xs mb-1">
                      <span>
                        {Math.floor(
                          (videoProgress[index].playedSeconds || 0) / 60
                        )}
                        :
                        {String(
                          Math.floor(
                            (videoProgress[index].playedSeconds || 0) % 60
                          )
                        ).padStart(2, "0")}
                      </span>
                      <span>
                        {Math.floor(videoDurations[index] / 60)}:
                        {String(
                          Math.floor(videoDurations[index] % 60)
                        ).padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className="w-full bg-white/20 rounded-full h-1 cursor-pointer"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const percent = (e.clientX - rect.left) / rect.width;
                        const seekTime = percent * videoDurations[index];
                        seekTo(index, seekTime);
                      }}
                    >
                      <div
                        className="bg-white rounded-full h-1 transition-all duration-300"
                        style={{
                          width: `${(videoProgress[index].played || 0) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      <CommentSection
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedVideoId={videoId}
      />

      <BottomDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        user={user}
      />
    </div>
  );
};
