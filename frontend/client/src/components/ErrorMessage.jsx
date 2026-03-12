import React from 'react';
import { LuTriangleAlert } from "react-icons/lu";
const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-red-100 text-red-700 border border-red-300 px-4 py-3 rounded-md shadow-sm">
      <LuTriangleAlert className="w-5 h-5" />
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
