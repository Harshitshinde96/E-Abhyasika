/* eslint-disable react/prop-types */
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useCreateRatingMutation,
  useEditRatingMutation,
} from "../../../reducers/api/ratingAndReview";
import { useGetFullCourseDetailsQuery } from "../../../reducers/api/courseApi";
import Spinner from "../../../components/Spinner";
import useAuth from "../../../hooks/useAuth";

const RatingAndReview = ({ rating = 0, review = "" }) => {
  const { courseId } = useParams();
  const { data, isLoading } = useGetFullCourseDetailsQuery(courseId);
  const { userId } = useAuth();

  const [inputRating, setInputRating] = useState(rating);
  const [inputReview, setInputReview] = useState(review);
  const [isEditRating, setIsEditRating] = useState(false);

  const [createRating] = useCreateRatingMutation();
  const [editRating] = useEditRatingMutation();

  if (isLoading) return <Spinner />;

  let userRating;
  if (data?.courseDetails?.studentsEnrolled?.includes(userId)) {
    userRating = data?.courseDetails?.ratingAndReviews?.find(
      (rating) => rating?.user._id == userId
    );
  }

  const handleRating = (e) => setInputRating(e);
  const handleReview = (e) => setInputReview(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const rating = inputRating;
    const review = inputReview;
    if (!isEditRating) {
      await createRating({ courseId, rating, review });
    } else {
      await editRating({ courseId, rating, review });
      setIsEditRating(false);
    }
  };

  return (
    <div className="text-white bg-[#0a0a0a] p-6 rounded-xl shadow-md border border-red-600">
      <div>
        {data?.courseDetails?.studentsEnrolled?.includes(userId) ? (
          userRating && !isEditRating ? (
            <div>
              <p className="text-2xl font-bold text-red-500 py-2">
                Your Review
              </p>
              <div className="border border-red-600 p-4 rounded-xl bg-gray-900">
                <div className="flex gap-x-3 items-center text-sm text-gray-300">
                  <Rating
                    readOnly
                    value={userRating?.rating}
                    className="w-24"
                  />
                  <p>{userRating.updatedAt.substring(0, 10)}</p>
                </div>
                <div className="flex justify-between mt-2 text-gray-300">
                  <p>{userRating?.review}</p>
                  <button
                    type="button"
                    className="font-semibold text-red-400 hover:text-red-300 transition"
                    onClick={() => setIsEditRating(true)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-red-500">
                  Rate this course
                </p>
                <p className="text-gray-400">Tell others what you think</p>
              </div>
              <Rating
                value={inputRating}
                onChange={handleRating}
                className="w-40 py-2"
                isRequired
              />
              <input
                type="text"
                value={inputReview}
                onChange={handleReview}
                placeholder="Describe your experience (optional)"
                className="w-full p-3 rounded-md bg-gray-800 border border-red-500 text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700 transition"
              >
                Submit
              </button>
            </form>
          )
        ) : null}
      </div>

      <div className="mt-10">
        <p className="text-2xl font-bold text-red-500 pb-3 border-b border-red-700">
          Reviews
        </p>
        {data?.courseDetails.ratingAndReviews.map((rating) => (
          <div
            key={rating._id}
            className="p-4 border-b border-gray-700 text-gray-200"
          >
            <p className="font-semibold text-red-400">
              {rating.user.firstName + " " + rating.user.lastName}
            </p>
            <div className="flex gap-x-2 items-center text-sm mt-1">
              <Rating readOnly value={rating.rating} className="w-20" />
              <p>{rating.updatedAt?.substring(0, 10)}</p>
            </div>
            <p className="mt-1">{rating.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RatingAndReview;
