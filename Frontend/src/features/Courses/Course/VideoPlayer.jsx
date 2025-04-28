/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

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

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50"
      onClick={() => setIsVideoPlaying(false)}
    >
      <div
        className="bg-[#111] text-white p-5 rounded-xl border border-red-500 w-[90%] max-w-3xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={
            courseContent[currentSectionIndex].subSection[
              currentSubSectionIndex
            ].videoUrl
          }
          controls
          onEnded={handleVideoEnd}
          className="w-full rounded-md border border-red-400"
        >
          Your browser does not support the video tag.
        </video>
        <p className="mt-4 text-lg font-semibold text-red-400">
          {
            courseContent[currentSectionIndex].subSection[
              currentSubSectionIndex
            ].subSectionName
          }
        </p>
      </div>
    </div>
  );
};

export default VideoPlayer;
