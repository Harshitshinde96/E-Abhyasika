import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { toast } from "react-hot-toast";
import {
  useEditCourseGoalsMutation,
  useGetCourseDetailsQuery,
} from "../../../../reducers/api/courseApi";

const Prerequisites = () => {
  const { courseId } = useParams();
  const { data } = useGetCourseDetailsQuery(courseId);
  const [editCourseGoals, { isLoading }] = useEditCourseGoalsMutation();

  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      prerequisites: data?.courseDetails?.prerequisites
        ? [...data.courseDetails.prerequisites]
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "prerequisites",
    control,
  });

  useEffect(() => {
    if (data?.courseDetails?.prerequisites?.length) {
      data.courseDetails.prerequisites.forEach((prerequisite, index) => {
        setValue(`prerequisites.${index}.prerequisite`, prerequisite.prerequisite);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formData) => {
    try {
      await editCourseGoals({ data: formData, courseId }).unwrap();
      toast.success("Prerequisites updated successfully!");
    } catch (error) {
      toast.error("Failed to update prerequisites.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 sm:p-6 md:p-8 bg-white dark:bg-black rounded-lg shadow-md mt-8"
    >
      <div>
        <p className="font-bold text-lg sm:text-xl text-black dark:text-white mb-1">
          What are the requirements or prerequisites for taking your course?
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          List the required skills, experience, tools or equipment learners should have
          prior to taking your course. If there are no requirements, use this space as
          an opportunity to lower the barrier for beginners.
        </p>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 items-start sm:items-center"
          >
            <input
              type="text"
              placeholder="Prerequisite"
              className="flex-1 p-3 border border-purple-600 dark:border-purple-400 bg-white dark:bg-black text-black dark:text-white rounded-md w-full"
              {...register(`prerequisites.${index}.prerequisite`, {
                required: true,
              })}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800 text-xl"
              >
                <MdDelete />
              </button>
            )}
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => append({ prerequisite: "" })}
            className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
          >
            + Add More to Your Responses
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-5 py-2 rounded disabled:bg-slate-600"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Prerequisites;
