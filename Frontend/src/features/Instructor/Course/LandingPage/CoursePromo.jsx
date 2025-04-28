/* eslint-disable react/prop-types */
import { useFormContext, Controller } from "react-hook-form";
import imagePlaceholder from "../../../../assets/images/imagePlaceholder.jpg";
import { useState } from "react";

const CoursePromo = ({ previewImage, promoVideo }) => {
  const [isAddImage, setIsAddImage] = useState(false);
  const [isAddVideo, setIsAddVideo] = useState(false);
  const { register, control } = useFormContext();

  return (
    <div className="space-y-12 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-6 rounded-lg shadow-md">
      {/* Course Image Section */}
      <div>
        <label htmlFor="previewImage" className="block mb-2 font-bold text-xl">
          Course Image
        </label>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <img
            src={previewImage || imagePlaceholder}
            alt="Course Preview"
            className="w-full md:w-2/5 rounded-md shadow-lg border border-white"
          />
          <div className="md:w-3/5 text-sm space-y-3">
            <p>
              Upload your course image here. It must meet our course image
              quality standards to be accepted. <br />
              <span className="text-gray-300 text-xs">
                Important guidelines: 750x422 pixels; .jpg, .jpeg, .gif, or
                .png. No text on the image.
              </span>
            </p>
            {!isAddImage && previewImage ? (
              <button
                type="button"
                onClick={() => setIsAddImage(true)}
                className="font-bold text-yellow-400 hover:text-yellow-300 transition"
              >
                Change Image
              </button>
            ) : (
              <Controller
                control={control}
                name="previewImage"
                render={({ field }) => (
                  <input
                    type="file"
                    {...register("previewImage")}
                    className="text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
                  />
                )}
              />
            )}
          </div>
        </div>
      </div>

      {/* Promo Video Section */}
      <div>
        <label htmlFor="promoVideo" className="block mb-2 font-bold text-xl">
          Promotional Video
        </label>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-2/5">
            {promoVideo ? (
              <video
                src={promoVideo}
                controls
                className="w-full rounded shadow-lg border border-white"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <p className="text-gray-400 italic">No video uploaded yet</p>
            )}
          </div>
          <div className="md:w-3/5 text-sm space-y-3">
            <p>
              Your promo video is a quick and compelling way for students to
              preview what they will learn in your course. Students are more
              likely to enroll if your promo video is well-made.
            </p>
            {!isAddVideo && promoVideo ? (
              <button
                type="button"
                onClick={() => setIsAddVideo(true)}
                className="font-bold text-yellow-400 hover:text-yellow-300 transition"
              >
                Change
              </button>
            ) : (
              <Controller
                control={control}
                name="promoVideo"
                render={({ field }) => (
                  <input
                    type="file"
                    {...register("promoVideo")}
                    className="text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-black hover:file:bg-yellow-300"
                  />
                )}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePromo;
