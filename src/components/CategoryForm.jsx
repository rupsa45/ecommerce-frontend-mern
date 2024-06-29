export default function CategoryForm({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) {
  return (
    <div className="p-3">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          className="mt-1 p-2 border rounded w-full bg-gray-800 text-white"
          placeholder="write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-lg
             hover:bg-blue-400 focus:outline-none focus:ring-2 foucs:ring-pink-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>
          {handleDelete && (
            <button 
              onClick={handleDelete}
              className=" bg-red-600 text-white  py-2 px-4 rounded-lg
                hover:bg-red-500 focus:outline-none focus:ring2 ">
                  Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
