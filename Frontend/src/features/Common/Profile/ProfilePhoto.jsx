import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useEditProfileMutation,
  useGetUserDetailsQuery,
} from "../../../reducers/api/userApi";
import { toast } from "react-hot-toast";

const ProfilePhoto = () => {
  const [inputImage, setInputImage] = useState(false);
  const { data } = useGetUserDetailsQuery();
  const [editProfile, { isLoading }] = useEditProfileMutation();
  const { register, handleSubmit, getValues, watch } = useForm();
  const pictureWatch = watch("profilePicture");

  useEffect(() => {
    setInputImage(getValues("profilePicture")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pictureWatch]);

  const onSubmit = async () => {
    const profilePicture = getValues("profilePicture")[0];

    const toastId = toast.loading("Updating...");
    try {
      await editProfile({ profilePicture }).unwrap();
      toast.success("Profile photo updated successfully!", { id: toastId });
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md w-full mx-auto bg-white border border-gray-200 shadow-md rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-2xl font-semibold text-black text-center">
        Upload Profile Photo
      </h2>

      <div className="flex justify-center">
        <img
          src={
            inputImage ? URL.createObjectURL(inputImage) : data?.profilePicture
          }
          alt="Profile Preview"
          className="w-40 h-40 object-cover rounded-xl border border-gray-300 shadow-sm"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-700">
          Select New Photo
        </label>
        <input
          {...register("profilePicture", { required: true })}
          type="file"
          accept="image/*"
          className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2 px-4 text-white font-semibold rounded-md bg-purple-600 hover:bg-purple-70000 disabled:bg-gray-500 transition duration-200"
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default ProfilePhoto;
