/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { useState, useRef, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUpdateCourseProgressMutation } from "../../../reducers/api/courseProgressApi";

const VideoPlayer = ({
  setIsVideoPlaying,
  section = "",
  currentSectionIndex,
  setCurrentSectionIndex,
  currentSubSectionIndex,
  setCurrentSubSectionIndex,
  courseContent = "",
}) => {
  const { courseId } = useParams();
  const [updateCourseProgress] = useUpdateCourseProgressMutation();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('ended', handleVideoEnd);
      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('ended', handleVideoEnd);
      };
    }
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      const progress = (video.currentTime / video.duration) * 100;
      onProgressUpdate(progress);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleVideoEnd = async () => {
    try {
      await updateCourseProgress({
        courseId,
        subSectionId:
          courseContent[currentSectionIndex].subSection[currentSubSectionIndex]
            ._id,
      });

      toast.success("Progress updated!", {
        style: {
          background: "#000",
          color: "#ff4747",
          border: "1px solid #ff4747",
        },
      });
    } catch (error) {
      toast.error("Failed to update progress", {
        style: {
          background: "#000",
          color: "#ff4747",
          border: "1px solid #ff4747",
        },
      });
    }

    // Progressing to next video logic
    if (currentSubSectionIndex + 1 < section.subSection.length) {
      setCurrentSubSectionIndex(currentSubSectionIndex + 1);
    } else {
      if (currentSectionIndex + 1 < courseContent.length) {
        setCurrentSubSectionIndex(0);
        setCurrentSectionIndex(currentSectionIndex + 1);
      } else {
        setCurrentSubSectionIndex(0);
        setCurrentSectionIndex(0);
      }
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (video) {
      const time = (e.target.value / 100) * video.duration;
      video.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const video = videoRef.current;
    if (video) {
      const newVolume = parseFloat(e.target.value);
      video.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handlePlaybackRateChange = (rate) => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (video) {
      if (!document.fullscreenElement) {
        video.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden group">
      <video
        ref={videoRef}
        src={
          courseContent[currentSectionIndex].subSection[
            currentSubSectionIndex
          ].videoUrl
        }
        className="w-full aspect-video"
        onClick={togglePlay}
        onMouseMove={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      />

      {/* Video Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-600 rounded-full mb-2 cursor-pointer">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={(currentTime / duration) * 100}
            onChange={handleSeek}
            className="absolute top-0 left-0 w-full h-1 opacity-0 cursor-pointer"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button onClick={togglePlay} className="text-white hover:text-blue-400">
              {isPlaying ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                </svg>
              )}
            </button>

            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="w-20"
              />
            </div>

            <div className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="text-white hover:text-blue-400">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
              <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg p-2 hidden group-hover:block">
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handlePlaybackRateChange(rate)}
                    className={`block w-full px-2 py-1 text-sm text-white hover:bg-gray-700 rounded ${
                      playbackRate === rate ? 'bg-blue-600' : ''
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            </div>

            <button onClick={toggleFullscreen} className="text-white hover:text-blue-400">
              {isFullscreen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Video Title */}
      <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 to-transparent">
        <h2 className="text-white text-lg font-semibold">
          {
            courseContent[currentSectionIndex].subSection[
              currentSubSectionIndex
            ].subSectionName
          }
        </h2>
      </div>
    </div>
  );
};

export default VideoPlayer;
