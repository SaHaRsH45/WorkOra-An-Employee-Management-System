import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [assignto, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const { employee, addTaskToEmployee } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!assignto) {
      alert("Please select an employee to assign the task.");
      return;
    }

    if (!title.trim() || !description.trim() || !date || !category.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    const selectedEmployee = employee.find(
      (emp) => String(emp.id) === String(assignto)
    );
    if (!selectedEmployee) {
      alert("Employee not found!");
      return;
    }

    const task = {
      title: title.trim(),
      description: description.trim(),
      date,
      category: category.trim(),
      priority: "low",
      active: true,
      newtask: true,
      completed: false,
      failed: false,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const success = await addTaskToEmployee(selectedEmployee.docId, task);

      if (success) {
        alert("Task created successfully!");
        setTitle("");
        setDescription("");
        setDate("");
        setAssignTo("");
        setCategory("");
      } else {
        alert("Failed to create task. Please try again.");
      }
    } catch (error) {
      console.error("Error in submitHandler:", error);
      alert("An error occurred while creating the task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 flex items-center justify-center py-10">
      <form
        onSubmit={submitHandler}
        className="w-[90%] md:w-[45%] lg:w-[40%] bg-white shadow-2xl rounded-3xl p-8 flex flex-col gap-6 border border-gray-200 hover:shadow-3xl transition-shadow duration-500"
      >
        <h2 className="text-2xl font-extrabold text-gray-800 mb-4 text-center">
          Create New Task
        </h2>

        {/* Task Title */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Task Title <span className="text-red-500">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Task Title"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm"
            required
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="4"
            placeholder="Provide detailed description of the task"
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm resize-none"
            required
            disabled={loading}
          ></textarea>
        </div>

        {/* Due Date */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Due Date <span className="text-red-500">*</span>
          </label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            min={new Date().toISOString().split("T")[0]}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm"
            required
            disabled={loading}
          />
        </div>

        {/* Assign To */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Assign To <span className="text-red-500">*</span>
          </label>
          <select
            value={assignto}
            onChange={(e) => setAssignTo(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm"
            required
            disabled={loading}
          >
            <option value="">Select Employee</option>
            {employee && employee.length > 0 ? (
              employee.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.firstname || "Unknown"} ({e.email || "No email"})
                </option>
              ))
            ) : (
              <option value="" disabled>
                No employees available
              </option>
            )}
          </select>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700 shadow-sm"
            required
            disabled={loading}
          >
            <option value="">Select Category</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Marketing">Marketing</option>
            <option value="Research">Research</option>
            <option value="Administration">Administration</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !employee || employee.length === 0}
          className={`w-full mt-4 bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:from-indigo-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-[1.03] ${
            loading || !employee || employee.length === 0
              ? "opacity-50 cursor-not-allowed hover:scale-100"
              : ""
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeOpacity="0.25"
                />
                <path
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  fill="currentColor"
                />
              </svg>
              Creating Task...
            </span>
          ) : (
            "Create Task"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
