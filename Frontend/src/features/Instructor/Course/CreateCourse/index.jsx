import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateCourseMutation } from "../../../../reducers/api/courseApi";

const CreateCourse = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [createCourse, { isLoading }] = useCreateCourseMutation();

  const onSubmit = async (data) => {
    try {
      const result = await createCourse(data).unwrap();
      navigate(`/instructor/course/${result.data._id}/manage/basics`);
    } catch (err) {
      console.error("Error creating course:", err);
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-20 min-h-screen bg-gradient-to-br from-[#0a1a3c] via-[#0f254e] to-[#1a2e5c] text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-xl bg-[#111827] p-8 rounded-2xl shadow-lg space-y-6"
      >
        <div>
          <p className="text-2xl md:text-3xl font-bold text-red-500">
            Give a Working Title to Your Course
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Don’t worry, you can change it later.
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="courseName" className="font-semibold text-gray-200">
            Course Name
          </label>
          <input
            id="courseName"
            type="text"
            placeholder="e.g. Learn JavaScript in 60 Days"
            className="w-full px-4 py-3 bg-black border border-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            {...register("courseName", { required: true })}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="category" className="font-semibold text-gray-200">
            Category
          </label>
          <select
            {...register("category", { required: true })}
            className="w-full px-4 py-3 bg-black border border-red-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Choose Category</option>
            <option value="Development">Development</option>
            <option value="Business">Business</option>
            <option value="Finance">Finance</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Design">Design</option>
            <option value="Personal Development">Personal Development</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-md transition duration-300 disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
