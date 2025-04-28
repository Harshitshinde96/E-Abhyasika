import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuMonitorPlay } from "react-icons/lu";
import { AiOutlineTrophy } from "react-icons/ai";
import { SlGlobe } from "react-icons/sl";
import { Rating } from "@smastrom/react-rating";
import CourseProgress from "./CourseProgress";
import Spinner from "../../../components/Spinner";
import Checkout from "./Checkout";
import RatingAndReview from "./RatingAndReview";
import VideoPlayer from "./VideoPlayer";
import { useGetUserProgressQuery } from "../../../reducers/api/courseProgressApi";
import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import useAuth from "../../../hooks/useAuth";
import InstructorInfo from "./InstructorInfo";

const Course = () => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  const { data: courseProgress } = useGetUserProgressQuery(courseId);
  const { userId } = useAuth();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(-1);
  const [currentSubSectionIndex, setCurrentSubSectionIndex] = useState(-1);

  if (isLoading) {
    return <Spinner />;
  }

  let userRating;
  if (data?.courseDetails?.studentsEnrolled?.includes(userId)) {
    userRating = data?.courseDetails?.ratingAndReviews?.find(
      (rating) => rating.user === userId
    );
  }

  let ratingSum = 0;
  let ratingAverage = 0;
  if (data?.courseDetails.ratingAndReviews.length > 0) {
    data?.courseDetails.ratingAndReviews.forEach((rating) => {
      ratingSum += rating.rating;
    });
    ratingAverage = ratingSum / data?.courseDetails.ratingAndReviews.length;
  }

  let totalDuration = 0;
  data?.courseDetails.courseContent.forEach((section) => {
    section.subSection.forEach((subsection) => {
      totalDuration += Math.round(subsection.timeDuration);
    });
  });
  totalDuration = Math.ceil(totalDuration / 60);

  let numberOfSubSections = 0;
  data?.courseDetails.courseContent.forEach((section) => {
    section.subSection.forEach(() => numberOfSubSections++);
  });

  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      <div className="py-8">
        <div className="flex relative">
          <div className="bg-zinc-800 px-20 py-6 w-full">
            <div className="w-2/3">
              <div className="flex gap-x-2 text-sm text-indigo-400 font-semibold">
                <Link to="/courses/id">{data?.courseDetails?.category}</Link>
                <span className="text-white">&#x1F892;</span>
                <Link to="course/category/subctegory/">
                  {data?.courseDetails?.subCategory}
                </Link>
              </div>
              <p className="text-4xl font-bold py-4">
                {data?.courseDetails?.courseName}
              </p>
              <p className="text-lg pb-4 text-zinc-300">
                {data?.courseDetails?.courseSubtitle}
              </p>
              <div className="flex gap-x-4 items-center py-2">
                <span className="bg-amber-300 text-yellow-800 px-2 py-0.5 text-sm rounded font-semibold">
                  Best Seller
                </span>
                <div className="flex gap-x-2 items-center">
                  <span className="text-yellow-400 font-bold text-lg">
                    {ratingAverage}
                  </span>
                  <Rating readOnly value={ratingAverage} className="w-24" />
                  <span className="text-indigo-300 underline text-sm">
                    ({data?.courseDetails.ratingAndReviews.length} ratings)
                  </span>
                </div>
                <span className="text-zinc-300 text-sm">
                  {data?.courseDetails.studentsEnrolled.length} students
                </span>
              </div>
              <div className="flex gap-x-3 text-sm text-zinc-300 mt-1">
                <span>Created by</span>
                <span className="text-indigo-400 underline">
                  {data?.courseDetails?.instructor?.firstName}{" "}
                  {data?.courseDetails?.instructor?.lastName}
                </span>
              </div>
              <div className="flex gap-x-8 text-sm mt-2 text-zinc-400">
                <p>
                  Last updated {data?.courseDetails?.updatedAt.substring(0, 10)}
                </p>
                <div className="flex items-center gap-x-2">
                  <SlGlobe className="text-base" />
                  <p>{data?.courseDetails?.locale}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-4 right-40 w-80 p-3 bg-zinc-800 border border-zinc-700 rounded-md shadow-lg">
            <video
              src={data?.courseDetails?.promoVideo}
              controls
              className="rounded"
            >
              Your browser does not support the video tag.
            </video>
            {!courseProgress?.userProgress ? (
              <div>
                <p className="font-bold border-b border-zinc-600 py-3 text-center text-lg text-white">
                  Personal
                </p>
                <p className="font-bold text-2xl py-3 pl-2 text-white">
                  {data?.courseDetails?.price > 0
                    ? "₹ " + data?.courseDetails?.price
                    : "FREE"}
                </p>
                <Checkout />
              </div>
            ) : (
              <CourseProgress />
            )}
          </div>
        </div>

        <div className="px-20 py-8 w-2/3">
          <div className="my-6 p-6 bg-zinc-800 border border-zinc-700 rounded-lg">
            <p className="font-bold text-2xl mb-4">What you’ll learn</p>
            <ul className="grid grid-cols-2 gap-x-6 list-disc pl-5 text-zinc-300">
              {data?.courseDetails?.learningObjectives.map(
                (objective, index) => (
                  <li key={index}>{objective.objective}</li>
                )
              )}
            </ul>
          </div>

          <div className="my-6">
            <p className="text-2xl font-bold mb-4">This course includes</p>
            <div className="grid grid-cols-2 gap-4 text-zinc-300">
              <div className="flex items-center gap-x-3">
                <LuMonitorPlay className="text-xl" />
                <p>{totalDuration} mins on-demand video</p>
              </div>
              <div className="flex items-center gap-x-3">
                <AiOutlineTrophy className="text-xl" />
                <p>Certificate of completion</p>
              </div>
            </div>
          </div>

          <div className="my-8">
            <p className="text-2xl font-bold mb-2">Course content</p>
            <div className="flex gap-x-4 text-zinc-400 mb-4">
              <span>{data?.courseDetails?.courseContent?.length} sections</span>
              <span>{numberOfSubSections} lectures</span>
            </div>

            <div>
              {data?.courseDetails?.courseContent.map(
                (section, sectionIndex) => (
                  <div
                    key={sectionIndex}
                    className="mb-4 border border-zinc-700 rounded-lg"
                  >
                    <p className="font-semibold text-lg bg-zinc-700 px-4 py-3 rounded-t">
                      {section?.sectionName}
                    </p>
                    {section.subSection.map((subsection, subindex) => (
                      <div
                        key={subsection._id}
                        className="flex items-center gap-x-3 px-4 py-2 border-t border-zinc-800"
                      >
                        <LuMonitorPlay className="text-lg text-indigo-400" />
                        <button
                          disabled={!courseProgress.userProgress}
                          onClick={() => {
                            setCurrentSectionIndex(sectionIndex);
                            setCurrentSubSectionIndex(subindex);
                            setIsVideoPlaying(true);
                          }}
                          className="text-violet-400 underline hover:text-violet-300"
                        >
                          {subsection?.subSectionName}
                        </button>

                        {isVideoPlaying &&
                          currentSectionIndex === sectionIndex &&
                          currentSubSectionIndex === subindex && (
                            <VideoPlayer
                              setIsVideoPlaying={setIsVideoPlaying}
                              subSection={subsection}
                              section={section}
                              currentSectionIndex={currentSectionIndex}
                              currentSubSectionIndex={currentSubSectionIndex}
                              setCurrentSectionIndex={setCurrentSectionIndex}
                              setCurrentSubSectionIndex={
                                setCurrentSubSectionIndex
                              }
                              courseContent={data?.courseDetails?.courseContent}
                            />
                          )}
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="py-4">
            <p className="text-2xl font-bold">Requirements</p>
            <ul className="list-disc pl-5 mt-2 text-zinc-300">
              {data?.courseDetails?.prerequisites.map((prerequisite) => (
                <li key={prerequisite._id}>{prerequisite.prerequisite}</li>
              ))}
            </ul>
          </div>

          <div className="my-6">
            <p className="text-2xl font-bold mb-2">Description</p>
            <p className="text-zinc-300">{data?.courseDetails?.description}</p>
          </div>

          <InstructorInfo />

          <div className="py-6">
            <RatingAndReview
              rating={userRating?.rating}
              review={userRating?.review}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Course;
