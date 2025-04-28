import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";
import Spinner from "../../../../components/Spinner";
import AddContent from "./AddContent";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import {
  useCreateSectionMutation,
  useCreateSubSectionMutation,
  useDeleteSectionMutation,
  useDeleteSubSectionMutation,
  useGetCourseDetailsQuery,
  useUpdateSectionMutation,
  useUpdateSubSectionMutation,
} from "../../../../reducers/api/courseApi";

const Curriculum = () => {
  const params = useParams();
  const { courseId } = params;
  const [isAddNewContent, setIsAddNewContent] = useState(false);
  const [isUpdateSection, setIsUpdateSection] = useState(false);
  const [isAddNewSection, setIsAddNewSection] = useState(false);
  const [isAddNewSubSection, setIsAddNewSubSection] = useState(false);
  const [isUpdateSubSection, setIsUpdateSubSection] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(-1);
  const [currentSubSectionId, setCurrentSubSectionId] = useState(-1);
  const [deleteSectionId, setDeleteSectionId] = useState(-1);

  const { data, isLoading } = useGetCourseDetailsQuery(courseId);
  const [updateSection] = useUpdateSectionMutation();
  const [createSection] = useCreateSectionMutation();
  const [createSubSection] = useCreateSubSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  const [updateSubSection] = useUpdateSubSectionMutation();
  const [deleteSubSection] = useDeleteSubSectionMutation();
  const methods = useForm();
  const { register, setValue, getValues } = methods;

  if (isLoading) return <Spinner />;

  const handleSectionChange = (id, sectionName) => {
    setValue("updatedSectionName", sectionName);
    setIsAddNewSubSection(false);
    setIsAddNewSection(false);
    setIsUpdateSection(true);
    setCurrentSectionId(id);
  };

  const handleSubSectionChange = (id) => {
    setIsAddNewSection(false);
    setIsUpdateSection(false);
    setCurrentSubSectionId(id);
    setIsUpdateSubSection(true);
  };

  const handleUpdateSection = async (e, sectionId) => {
    e.preventDefault();
    const sectionName = getValues("updatedSectionName");
    await updateSection({ sectionId, sectionName }).unwrap();
    setValue("updatedSectionName", "");
    setIsUpdateSection(false);
  };

  const handleAddSection = async (e) => {
    e.preventDefault();
    setIsAddNewSubSection(false);
    const sectionName = getValues("sectionName");
    setValue("sectionName", "");
    await createSection({ sectionName, courseId }).unwrap();
    setIsAddNewSection(false);
  };

  const handleUpdateSubSection = async (e, subSectionId) => {
    e.preventDefault();
    const subSectionName = getValues("updatedSubSectionName");
    await updateSubSection({ subSectionId, subSectionName });
    setValue("updatedSubSectionName", "");
    setIsUpdateSubSection(false);
  };

  const handleAddSubSection = async (e, sectionId) => {
    e.preventDefault();
    const subSectionName = getValues(`subSectionName.${sectionId}`);
    await createSubSection({ sectionId, subSectionName });
    setValue(`subSectionName.${sectionId}`, "");
    setIsAddNewSubSection(false);
  };

  const handleDeleteSectionChange = (sectionId) => {
    setDeleteSectionId(sectionId);
  };

  const handleCancelDelete = () => {
    setDeleteSectionId(-1);
  };

  const handleDeleteSubSection = async (e, sectionId, subSectionId) => {
    e.preventDefault();
    await deleteSubSection({ sectionId, subSectionId });
  };

  const handleConfirmDelete = async () => {
    await deleteSection({ courseId, deleteSectionId });
    setDeleteSectionId(-1);
  };

  return (
    <div>
      <FormProvider {...methods}>
        <form>
          {data.courseDetails.courseContent.map((section, index) => (
            <div
              className="border border-black m-10 py-4 px-2"
              key={section._id}
            >
              <div className="flex">
                <div className="whitespace-nowrap pr-2 pt-2">
                  Section {index + 1}:
                </div>
                <IoDocumentOutline className="mt-3" />
                {isUpdateSection && currentSectionId == section._id ? (
                  <div className="p-1 w-full">
                    <input
                      {...register("updatedSectionName")}
                      className="block border p-1 border-black w-full"
                    />
                    <div className="flex mt-2 space-x-1 w-full justify-end">
                      <button
                        className="font-bold py-1 px-2"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsUpdateSection(false);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-black text-white font-bold py-1 px-2"
                        type="button"
                        onClick={(e) => handleUpdateSection(e, section._id)}
                      >
                        Save Section
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="pl-2 flex py-1">
                    <p className="pt-1">{section.sectionName}</p>
                    <button
                      className="px-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleSectionChange(section._id, section.sectionName);
                      }}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="px-2"
                      type="button"
                      onClick={() => handleDeleteSectionChange(section._id)}
                    >
                      <MdDelete />
                    </button>
                    {deleteSectionId !== -1 && (
                      <ConfirmDeleteModal
                        onCancel={handleCancelDelete}
                        onConfirm={handleConfirmDelete}
                      />
                    )}
                  </div>
                )}
              </div>

              <div className="ml-10 mt-6">
                {section.subSection?.map((subSection, subindex) => (
                  <div
                    className="border border-black py-4 px-2 my-4"
                    key={subSection._id}
                  >
                    <div className="flex justify-between">
                      <div className="flex">
                        <div className="whitespace-nowrap pr-2 pt-2">
                          Lecture {subindex + 1}:
                        </div>
                        <IoDocumentOutline className="mt-3" />
                        {isUpdateSubSection &&
                        currentSubSectionId == subSection._id ? (
                          <div className="p-1 w-full">
                            <input
                              {...register("updatedSubSectionName")}
                              className="block border p-1 border-black w-full"
                            />
                            <div className="flex mt-2 space-x-1 w-full justify-end">
                              <button
                                className="font-bold py-1 px-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsUpdateSubSection(false);
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                className="bg-black text-white font-bold py-1 px-2"
                                type="button"
                                onClick={(e) =>
                                  handleUpdateSubSection(e, subSection._id)
                                }
                              >
                                Save Item
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="pl-2 flex py-1">
                            <p className="pt-1">{subSection.subSectionName}</p>
                            <button
                              className="px-2"
                              onClick={(e) => {
                                e.preventDefault();
                                handleSubSectionChange(subSection._id);
                              }}
                            >
                              <MdEdit />
                            </button>
                            <button
                              className="px-2"
                              type="button"
                              onClick={(e) => {
                                handleDeleteSubSection(
                                  e,
                                  section._id,
                                  subSection._id
                                );
                              }}
                            >
                              <MdDelete />
                            </button>
                          </div>
                        )}
                      </div>
                      <div>
                        {(!isAddNewContent ||
                          currentSubSectionId !== subSection._id) &&
                        !subSection.videoUrl ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentSubSectionId(subSection._id);
                              setIsAddNewContent(true);
                            }}
                            className="font-bold"
                          >
                            Add Content
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {(isAddNewContent &&
                      currentSubSectionId === subSection._id) ||
                    subSection.videoUrl ? (
                      <AddContent
                        setIsAddNewContent={setIsAddNewContent}
                        sectionId={section._id}
                        subSectionId={subSection._id}
                        videoUrl={subSection.videoUrl}
                        videoName={subSection.videoName}
                        date={subSection.videoDate?.substring(0, 10)}
                      />
                    ) : null}
                  </div>
                ))}

                {isAddNewSubSection && currentSectionId == section._id ? (
                  <>
                    <input
                      {...register(`subSectionName.${section._id}`)}
                      placeholder="SubSection"
                      className="block border p-4 w-1/2 border-black my-2"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsAddNewSubSection(false);
                          setCurrentSectionId(-1);
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="bg-black text-white font-bold py-1 px-2"
                        onClick={(e) => handleAddSubSection(e, section._id)}
                      >
                        Add SubSection
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    className="pt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsAddNewSubSection(true);
                      setCurrentSectionId(section._id);
                    }}
                  >
                    + Curriculum Item
                  </button>
                )}
              </div>
            </div>
          ))}

          <div className="pl-10">
            {!isAddNewSection ? (
              <button
                className="border py-1 px-3 border-black"
                onClick={(e) => {
                  e.preventDefault();
                  setIsAddNewSection(true);
                  setIsUpdateSection(false);
                }}
              >
                + Section
              </button>
            ) : (
              <div>
                <input
                  {...register("sectionName")}
                  className="block border p-4 w-1/2 border-black my-2"
                />
                <button
                  type="button"
                  onClick={(e) => handleAddSection(e)}
                  className="pt-4 text-purple-700 font-bold"
                >
                  Add Section
                </button>
              </div>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Curriculum;
