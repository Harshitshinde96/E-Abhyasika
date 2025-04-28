/* eslint-disable react/prop-types */
const ConfirmDeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900 bg-opacity-50 px-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-black w-full max-w-md rounded-lg p-6 text-center shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold text-black dark:text-white">
          Are you sure you want to delete this section?
        </p>

        <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onCancel}
            type="button"
            className="px-4 py-2 border border-purple-700 dark:border-purple-400 text-purple-700 dark:text-purple-400 rounded-md font-semibold hover:bg-purple-100 dark:hover:bg-purple-900"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            type="button"
            className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
