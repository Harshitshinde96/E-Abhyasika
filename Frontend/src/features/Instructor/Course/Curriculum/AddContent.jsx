/* eslint-disable react/prop-types */
import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import { useAddSubSectionContentMutation } from "../../../../reducers/api/courseApi";

const AddContent = ({
  setIsAddNewContent,
  videoUrl,
  subSectionId,
  videoName,
  date,
}) => {
  const [isLoading, setIsloading] = useState(false);
  const [isReplaceContent, setIsReplaceContent] = useState(false);
  const [addSubSectionContent] = useAddSubSectionContentMutation();
  const { setValue, resetField, control, register, getValues } =
    useFormContext();

  const handleFileChange = (e) => {
    setValue("file", e.target.files);
  };

  const handleUploadContent = async () => {
    setIsloading(true);
    const file = getValues("file")[0];

    await addSubSectionContent({
      subSectionId,
      file,
    });

    setIsAddNewContent(false);
    setIsReplaceContent(false);
    setIsloading(false);
  };

  const handleCancel = () => {
    setIsAddNewContent(false);
    setIsReplaceContent(false);
    resetField("file");
  };

  return (
    <div className="border border-black m-2 p-4 rounded-md shadow-md bg-white dark:bg-black">
      {videoUrl && !isReplaceContent ? (
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b text-sm sm:text-base">
                    <th className="px-2 py-2 w-2/3 text-black dark:text-white">
                      Name
                    </th>
                    <th className="px-2 py-2 text-black dark:text-white">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-sm sm:text-base">
                    <td className="px-2 py-2 break-words text-gray-800 dark:text-gray-200">
                      {videoName}
                    </td>
                    <td className="px-2 py-2 text-gray-800 dark:text-gray-300">
                      {date}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              className="mt-4 sm:mt-0 text-purple-700 dark:text-purple-400 font-semibold hover:underline"
              onClick={() => setIsReplaceContent(true)}
            >
              Replace
            </button>
          </div>
        </div>
      ) : (
        <>
          <label className="block font-semibold text-black dark:text-white mb-2">
            File:
            <Controller
              control={control}
              name="file"
              render={({ field }) => (
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="block mt-2 w-full p-2 border border-purple-600 dark:border-purple-400 rounded-md text-black dark:text-white bg-white dark:bg-black"
                  {...register("file")}
                />
              )}
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="py-2 px-4 border border-purple-600 dark:border-purple-400 text-purple-700 dark:text-purple-400 rounded font-semibold hover:bg-purple-100 dark:hover:bg-purple-900"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded font-semibold disabled:bg-slate-500"
              onClick={handleUploadContent}
              disabled={isLoading}
            >
              {isLoading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddContent;
