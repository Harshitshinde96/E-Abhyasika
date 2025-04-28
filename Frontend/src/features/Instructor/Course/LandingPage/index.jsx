import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import { useIsMount } from "./useIsMount";
import CoursePromo from "./CoursePromo";
import {
  useEditCourseBasicsMutation,
  useGetCourseDetailsQuery,
} from "../../../../reducers/api/courseApi";
import { categories } from "../../../../data/categories";
import { PRICE_TIER } from "../../../../data/priceTier";

const locales = ["English", "German", "French", "Spanish", "Hindi", "Marathi"];
const instructionaleLevel = ["Beginner", "Medium", "Advanced", "All"];

const LandingPage = () => {
  const isMount = useIsMount();
  const params = useParams();
  const { courseId } = params;
  const { data } = useGetCourseDetailsQuery(courseId);
  const [editCourseBasics] = useEditCourseBasicsMutation();

  const [subCategories, setSubCategories] = useState(
    data?.courseDetails?.category
      ? categories?.find((category) => category[data?.courseDetails?.category])[
          data?.courseDetails?.category
        ]
      : []
  );

  const methods = useForm({
    defaultValues: {
      courseName: data.courseDetails?.courseName,
      courseSubtitle: data.courseDetails?.courseSubtitle,
      description: data.courseDetails?.description,
      locale: data.courseDetails?.locale,
      instructionalLevel: data.courseDetails?.instructionalLevel,
      category: data.courseDetails?.category,
      subCategory: data.courseDetails?.subCategory,
      price: data.courseDetails?.price,
      previewImage: "",
      promoVideo: "",
    },
  });

  const { register, handleSubmit, formState, getValues, watch } = methods;
  const watchCategory = watch("category");
  const { isDirty } = formState;

  useEffect(() => {
    if (!isMount) {
      const selectedCategoryObject = categories.find(
        (category) => category[getValues("category")]
      );
      setSubCategories(
        selectedCategoryObject
          ? selectedCategoryObject[getValues("category")]
          : []
      );
    }
  }, [watchCategory]);

  const onSubmit = async () => {
    const courseName = getValues("courseName");
    const courseSubtitle = getValues("courseSubtitle");
    const description = getValues("description");
    const locale = getValues("locale");
    const instructionalLevel = getValues("instructionalLevel");
    const category = getValues("category");
    const subCategory = getValues("subCategory");
    const price = getValues("price");
    const previewImage = getValues("previewImage")[0] || null;
    const promoVideo = getValues("promoVideo")[0] || null;

    await editCourseBasics({
      courseId,
      courseName,
      courseSubtitle,
      description,
      locale,
      instructionalLevel,
      category,
      subCategory,
      price,
      previewImage,
      promoVideo,
    });
  };

  return (
    <div className="shadow-md bg-white rounded-md mx-4 p-6 md:p-12">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="text-3xl font-bold text-gray-800">
              Course Landing Page
            </h1>
            <button
              type="submit"
              disabled={!isDirty}
              className="mt-4 md:mt-0 bg-black text-white font-semibold px-4 py-2 rounded-md disabled:bg-gray-500 transition duration-200"
            >
              Save
            </button>
          </div>

          <p className="text-gray-600">
            Your course landing page is crucial to your success on Udemy. A good
            landing page helps you gain visibility in search engines. Make it
            compelling!
          </p>

          {/* Course Title */}
          <div>
            <label htmlFor="courseName" className="font-semibold block mb-1">
              Course Title
            </label>
            <input
              id="courseName"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your course title"
              {...register("courseName", { required: true, maxLength: 50 })}
            />
            <p className="text-gray-400 text-sm mt-1">
              Title should be informative and optimized for search.
            </p>
          </div>

          {/* Subtitle */}
          <div>
            <label
              htmlFor="courseSubtitle"
              className="font-semibold block mb-1"
            >
              Course Subtitle
            </label>
            <input
              id="courseSubtitle"
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your course subtitle"
              {...register("courseSubtitle", {
                required: true,
                maxLength: 150,
              })}
            />
            <p className="text-gray-400 text-sm mt-1">
              Mention 3-4 important topics you've covered.
            </p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="font-semibold block mb-1">
              Course Description
            </label>
            <textarea
              id="description"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Describe your course content"
              {...register("description", {
                required: true,
                maxLength: 1000,
                minLength: 50,
              })}
            />
            <p className="text-gray-400 text-sm mt-1">
              Minimum 50 characters required.
            </p>
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Basic Info</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                {...register("locale", { required: true })}
                className="p-3 border border-gray-300 rounded-md"
              >
                <option value="">Choose Locale</option>
                {locales.map((locale) => (
                  <option key={locale} value={locale}>
                    {locale}
                  </option>
                ))}
              </select>

              <select
                {...register("instructionalLevel", { required: true })}
                className="p-3 border border-gray-300 rounded-md"
              >
                <option value="">Choose Level</option>
                {instructionaleLevel.map((level) => (
                  <option key={level} value={level}>
                    {level} Level
                  </option>
                ))}
              </select>

              <select
                {...register("category", { required: true })}
                className="p-3 border border-gray-300 rounded-md"
              >
                <option value="">Choose Category</option>
                {categories.map((category) => (
                  <option
                    key={Object.keys(category)[0]}
                    value={Object.keys(category)[0]}
                  >
                    {Object.keys(category)[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SubCategory */}
          <div className="w-full md:w-1/3">
            <label className="block font-semibold mb-1">Sub Category</label>
            <select
              {...register("subCategory", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Choose SubCategory</option>
              {subCategories.map((subCategory) => (
                <option key={subCategory} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </div>

          {/* Price Tier */}
          <div className="w-full md:w-1/3">
            <label className="block font-semibold mb-1">Price</label>
            <select
              {...register("price", { required: true })}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Choose Price</option>
              {PRICE_TIER.map((tier) => (
                <option
                  key={Object.values(tier)[0]}
                  value={Object.values(tier)[0]}
                >
                  {Object.keys(tier)[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Course Promo (Image & Video) */}
          <CoursePromo
            previewImage={data.courseDetails.previewImage}
            promoVideo={data.courseDetails.promoVideo}
          />
        </form>
      </FormProvider>
    </div>
  );
};

export default LandingPage;
