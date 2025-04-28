import { useForm } from "react-hook-form";
import {
  useEditProfileMutation,
  useGetUserDetailsQuery,
} from "../../../reducers/api/userApi";

const BasicInformation = () => {
  const { data } = useGetUserDetailsQuery();
  const [editProfile] = useEditProfileMutation();

  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      firstName: data?.firstName,
      lastName: data?.lastName,
      headline: data?.headline,
      biography: data?.biography,
    },
  });

  const onSubmit = async () => {
    const firstName = getValues("firstName");
    const lastName = getValues("lastName");
    const headline = getValues("headline");
    const biography = getValues("biography");

    await editProfile({
      firstName,
      lastName,
      headline,
      biography,
    });
  };

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit <span className="text-purple-600">Basic Information</span>
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-2xl p-6 space-y-6"
      >
        {/* Name Fields */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="firstName" className="font-semibold block mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              {...register("firstName", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="w-full">
            <label htmlFor="lastName" className="font-semibold block mb-2">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              {...register("lastName", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
        </div>

        {/* Headline & Bio */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label htmlFor="headline" className="font-semibold block mb-2">
              Headline
            </label>
            <input
              id="headline"
              type="text"
              placeholder="Instructor at E-Abhyasika"
              {...register("headline", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
          <div className="w-full">
            <label htmlFor="biography" className="font-semibold block mb-2">
              Biography
            </label>
            <input
              id="biography"
              type="text"
              {...register("biography", { required: true })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition duration-300"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default BasicInformation;
