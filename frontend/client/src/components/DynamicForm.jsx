import { useState, useEffect } from "react";
import useFields from "../hooks/useFields";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const DynamicForm = ({ fields, submitFunc, clientId = null, recordId = null, title = "", buttonName="Submit"}) => {
  const INITIAL_STATE = fields.reduce((acc, field) => {
    acc[field.name] =
      field.type === "checkbox" ? false : field.value ? field.value : "";
    return acc;
  }, {});

  const [formData, handleChange, resetData] = useFields(INITIAL_STATE);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...formData };
    if (recordId) payload.id = recordId;
    if (clientId) payload.client = clientId;
    console.log(recordId)
    try {
      await submitFunc(payload);
      
      setSuccess(true);
      setError(null);
      resetData();
    } catch (err) {
      setSuccess(false);
      setError(err?.message || "An error occurred");
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

      {success && <SuccessMessage message="Form submitted successfully!" />}
      {error && <ErrorMessage message={error} />}

      {fields.map(({ name, label, type, options = [] }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>

          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={formData[name]}
              onChange={(e) => handleChange(e, type)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          ) : type === "select" ? (
            <select
              id={name}
              name={name}
              value={formData[name]}
              onChange={(e) => handleChange(e, type)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              {options.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          ) : (
            <input
              id={name}
              name={name}
              type={type}
              value={type === "checkbox" ? undefined : formData[name]}
              checked={type === "checkbox" ? formData[name] : undefined}
              onChange={(e) => handleChange(e, type)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {buttonName}
      </button>
    </form>
  );
};

export default DynamicForm;
