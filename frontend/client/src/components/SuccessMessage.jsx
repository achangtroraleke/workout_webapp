import { FaRegCheckCircle } from "react-icons/fa";

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-green-100 text-green-700 border border-green-300 px-4 py-3 rounded-md shadow-sm mt-2 text-sm font-medium">
      <FaRegCheckCircle className="w-5 h-5" />
      {message}
    </div>
  );
};

export default SuccessMessage;
