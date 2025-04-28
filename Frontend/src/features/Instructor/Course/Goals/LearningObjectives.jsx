import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import {
  useEditCourseGoalsMutation,
  useGetCourseDetailsQuery,
} from "../../../../reducers/api/courseApi";

const LearningObjectives = () => {
  const { courseId } = useParams();
  const { data } = useGetCourseDetailsQuery(courseId);
  const [editCourseGoals, { isLoading }] = useEditCourseGoalsMutation();

  const { register, control, setValue, handleSubmit } = useForm({
    defaultValues: {
      learningObjectives: data?.courseDetails?.learningObjectives
        ? [...data.courseDetails.learningObjectives]
        : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "learningObjectives",
    control,
  });

  useEffect(() => {
    if (data?.courseDetails?.learningObjectives?.length) {
      data.courseDetails.learningObjectives.forEach((goal, index) => {
        setValue(`learningObjectives.${index}.objective`, goal.objective);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (formData) => {
    await editCourseGoals({ data: formData, courseId });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 sm:p-6 md:p-8 bg-white dark:bg-black rounded-lg shadow-md mt-8"
    >
      <div>
        <p className="font-bold text-lg sm:text-xl text-black dark:text-white mb-1">
          What will students learn in your course?
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Enter learning objectives or outcomes that learners can expect to
          achieve after completing your course.
        </p>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col sm:flex-row gap-2 sm:gap-4 mb-4 items-start sm:items-center"
          >
            <input
              type="text"
              placeholder="Objective"
              className="flex-1 p-3 border border-black dark:border-white bg-white dark:bg-black text-black dark:text-white rounded-md w-full"
              {...register(`learningObjectives.${index}.objective`, {
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
            onClick={() => append({ objective: "" })}
            className="text-red-600 font-semibold hover:underline"
          >
            + Add More to Your Responses
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-black text-white font-bold px-5 py-2 rounded disabled:bg-slate-600"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LearningObjectives;
