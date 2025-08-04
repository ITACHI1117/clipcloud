import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { getUser, LogUserOut } from "@/store/AuthStore";
import { UseQueryResult } from "@tanstack/react-query";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Play,
  Search,
  Volume2,
  VolumeOff,
  ThumbsDown,
  Share,
  Zap,
  MoreHorizontal,
  Pause,
  Maximize,
  Menu,
  Plus,
  Mic,
  ThumbsUp,
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showControls, setShowControls] = useState(true);
  const router = useRouter();

  // user details
  const user = getUser();

  const {
    containerRef,
    videoRefs,
    setVolume,
    setVideoStates,
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
    toggleFollow,
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
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-hide controls on mobile
  useEffect(() => {
    if (isMobile) {
      const timer = setTimeout(() => setShowControls(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, showControls]);

  const isVideoLiked = (Likes, LikeVideo) => {
    if (LikeVideo?.data?.isLiked !== undefined) return LikeVideo.data.isLiked;
    if (!Likes.isPending && Likes?.data?.isLiked !== undefined)
      return Likes.data.isLiked;
    return false;
  };

  if (isSearchOpen) {
    return <SearchComponent setIsSearchOpen={setIsSearchOpen} />;
  }

  const currentVideo = AllVideos.data?.[currentVideoIndex];

  return (
    <div className="h-screen bg-black relative overflow-hidden">
      {/* Desktop/Tablet Layout */}
      {!isMobile ? (
        <div className="flex h-full">
          {/* Left sidebar - Desktop only */}
          <div className="w-16 bg-black border-r border-gray-800 flex flex-col items-center py-4 space-y-6">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <div className="text-white font-bold text-sm">CC</div>
            </div>
            <Menu
              onClick={() => setIsDrawerOpen((prev) => !prev)}
              className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
            />
            <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
            <Search
              onClick={() => router.push("/search")}
              className="w-6 h-6 text-white cursor-pointer hover:text-gray-300"
            />
            <Plus className="w-6 h-6 text-white cursor-pointer hover:text-gray-300" />
          </div>
          {/* Main video area */}
          <div className="flex-1 flex">
            {/* Video container */}
            <div className="flex-1 relative bg-black flex items-center justify-center">
              <div
                ref={containerRef}
                className="relative w-full max-w-md h-full overflow-y-auto snap-y snap-mandatory"
                onScroll={handleScroll}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {AllVideos.data?.map((video, index) => (
                  <div
                    key={video.id}
                    className="w-full h-full snap-start relative bg-black flex items-center justify-center"
                  >
                    {videosToLoad.has(index) ? (
                      <div className="relative w-full h-full max-w-md">
                        <video
                          ref={(el) => (videoRefs.current[index] = el)}
                          src={video?.videoUrl}
                          className="w-full h-full object-contain rounded-lg"
                          muted={isMuted}
                          loop
                          playsInline
                          preload="metadata"
                          onLoadedData={() => handleVideoLoaded(index)}
                          onPlay={() => handleVideoPlay(index)}
                          onPause={() => handleVideoPause(index)}
                        />

                        {/* Video Controls Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                            <div className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                              {video.title}
                            </div>
                            <div className="flex space-x-2">
                              <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                                <Pause className="w-4 h-4" />
                              </button>
                              <button
                                className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70"
                                onClick={toggleMute}
                              >
                                {isMuted ? (
                                  <VolumeOff className="w-4 h-4" />
                                ) : (
                                  <Volume2 className="w-4 h-4" />
                                )}
                              </button>
                              <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                                <Maximize className="w-4 h-4" />
                              </button>
                              <button className="p-2 bg-black/50 rounded-full text-white hover:bg-black/70">
                                <MoreHorizontal className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {!isPlaying && index === currentVideoIndex && (
                            <button
                              onClick={togglePlayPause}
                              className="bg-black/60 rounded-full p-4 hover:bg-black/80 transition-colors"
                            >
                              <Play className="w-8 h-8 text-white fill-white" />
                            </button>
                          )}
                        </div>

                        {/* Progress bar at bottom of video */}
                        {videoProgress[index] && videoDurations[index] && (
                          <div className="absolute bottom-2 left-2 right-2">
                            <div
                              className="w-full bg-white/30 rounded-full h-1 cursor-pointer"
                              onClick={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                const percent =
                                  (e.clientX - rect.left) / rect.width;
                                const seekTime =
                                  percent * videoDurations[index];
                                seekTo(index, seekTime);
                              }}
                            >
                              <div
                                className="bg-red-500 rounded-full h-1 transition-all duration-300"
                                style={{
                                  width: `${
                                    (videoProgress[index].played || 0) * 100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full max-w-md h-96 bg-gray-900 rounded-lg flex items-center justify-center">
                        <div className="text-white/60 text-center">
                          <div className="text-sm">{video.title}</div>
                          <div className="text-xs mt-1">Loading...</div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right sidebar with actions */}
            <div className="w-16 flex flex-col items-center justify-center space-y-6 py-8">
              {/* Like button */}
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className={`w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 ${
                    isVideoLiked(Likes, LikeVideo)
                      ? "bg-blue-500 text-white-"
                      : "text-white"
                  } transition-colors`}
                  onClick={() => LikeVideo.mutate()}
                >
                  <ThumbsUp className={`w-6 h-6 `} />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  {Likes?.data?.totalLikes || "7.4K"}
                </span>
              </motion.div>

              {/* Comments button */}
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setSelectedVideoId(currentVideo?.id);
                    setIsOpen(true);
                  }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  {Comments?.data?.length || "97"}
                </span>
              </motion.div>

              {/* Share button */}
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Share className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  Share
                </span>
              </motion.div>

              {/* Remix button */}
              <motion.div
                className="flex flex-col items-center"
                whileTap={{ scale: 0.9 }}
              >
                <button className="w-12 h-12 rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <Zap className="w-6 h-6 text-white" />
                </button>
                <span className="text-white text-xs font-medium mt-1">
                  Remix
                </span>
              </motion.div>

              {/* Creator avatar */}
              <div className="mt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {currentVideo?.userName?.[0] || "A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Mobile Layout */
        <div
          className="h-full relative"
          onClick={() => setShowControls(!showControls)}
        >
          {/* Mobile top bar */}

          <div className="absolute top-0 left-0 right-0 z-30 bg-gradient-to-b from-black/80 to-transparent pt-safe">
            <div className="flex items-center justify-between p-4 pt-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <div className="text-white font-bold text-xs">CC</div>
                </div>
                <span className="text-white font-medium">Shorts</span>
              </div>
              <div className="flex items-center space-x-4">
                <Search
                  onClick={() => router.push("/search")}
                  className="w-6 h-6 text-white"
                />
                <MoreHorizontal
                  onClick={() => setIsDrawerOpen((prev) => !prev)}
                  className="w-6 h-6 text-white"
                />
              </div>
            </div>
          </div>

          {/* Video feed */}
          <div
            ref={containerRef}
            className="h-full overflow-y-scroll snap-y snap-mandatory"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {AllVideos.data?.map((video, index) => (
              <div
                key={video.id}
                className="w-full h-full snap-start relative bg-black flex items-center justify-center"
              >
                {videosToLoad.has(index) ? (
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={video?.videoUrl}
                    className="w-full h-full object-cover"
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onLoadedData={() => handleVideoLoaded(index)}
                    onPlay={() => handleVideoPlay(index)}
                    onPause={() => handleVideoPause(index)}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <div className="text-white/60 text-center">
                      <div className="text-sm">{video.title}</div>
                      <div className="text-xs mt-1">Loading...</div>
                    </div>
                  </div>
                )}

                {/* Play/Pause overlay */}

                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    isPlaying ? "opacity-0" : "opacity-100"
                  }`}
                >
                  <button
                    onClick={togglePlayPause}
                    className="bg-black/60 rounded-full p-6"
                  >
                    <Play className="w-12 h-12 text-white fill-white" />
                  </button>
                </div>

                {/* Right side actions - Mobile */}
                <div className="absolute right-3 bottom-24 flex flex-col items-center space-y-6">
                  {/* Like button */}
                  <motion.div
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <button
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        isVideoLiked(Likes, LikeVideo)
                          ? "bg-blue-500 text-white-"
                          : "bg-black/40"
                      }`}
                      onClick={() => LikeVideo.mutate()}
                    >
                      <ThumbsUp className={`w-7 h-7 `} />
                    </button>
                    <span className="text-white text-xs font-medium mt-1">
                      {Likes?.data?.totalLikes || "1.9M"}
                    </span>
                  </motion.div>

                  {/* Comments button */}
                  <motion.div
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <button
                      className="w-12 h-12 rounded-full flex items-center justify-center bg-black/40"
                      onClick={() => {
                        setSelectedVideoId(video.id);
                        setIsOpen(true);
                      }}
                    >
                      <MessageCircle className="w-7 h-7 text-white" />
                    </button>
                    <span className="text-white text-xs font-medium mt-1">
                      {Comments?.data?.length || "1,941"}
                    </span>
                  </motion.div>

                  {/* Share button */}
                  <motion.div
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <button className="w-12 h-12 rounded-full flex items-center justify-center bg-black/40">
                      <Share className="w-7 h-7 text-white" />
                    </button>
                    <span className="text-white text-xs font-medium mt-1">
                      Share
                    </span>
                  </motion.div>

                  {/* Remix button */}
                  <motion.div
                    className="flex flex-col items-center"
                    whileTap={{ scale: 0.9 }}
                  >
                    <button className="w-12 h-12 rounded-full flex items-center justify-center bg-black/40">
                      <Zap className="w-7 h-7 text-white" />
                    </button>
                    <span className="text-white text-xs font-medium mt-1">
                      Remix
                    </span>
                  </motion.div>

                  {/* Volume button */}
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <button
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-black/40"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeOff className="w-6 h-6 text-white" />
                      ) : (
                        <Volume2 className="w-6 h-6 text-white" />
                      )}
                    </button>
                  </motion.div>

                  {/* Creator avatar */}
                  <div className="mt-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center border-2 border-white">
                      <span className="text-white font-bold text-sm">
                        {video?.userName?.[0] || "T"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bottom content - Mobile */}
                <div className="absolute bottom-0 left-0 right-20 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-white font-medium">
                      @{video?.userName || "Tigerspit"}
                    </span>
                    <button className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Subscribe
                    </button>
                  </div>

                  <p className="text-white text-sm mb-2 leading-relaxed">
                    {video?.description || "Don't worry, we got you 😉"}
                  </p>

                  <div className="flex items-center space-x-2 text-white text-sm">
                    <span>♫ Free Bird - Lynyrd Skynyrd</span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {video?.tags?.map((tag) => (
                      <span key={tag} className="text-white text-sm">
                        #{tag}
                      </span>
                    )) || (
                      <>
                        <span className="text-white text-sm">
                          #mdtattoostudio
                        </span>
                        <span className="text-white text-sm">#tattooshop</span>
                        <span className="text-white text-sm">#tattoohumor</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
