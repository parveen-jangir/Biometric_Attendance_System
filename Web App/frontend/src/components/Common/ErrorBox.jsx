import React, { useEffect, useState } from "react";
import {
  FiAlertTriangle,
  IoCheckmarkCircle,
  IoInformationCircle,
  IoClose,
} from "../../utils/icons";

const ErrorBox = ({
  type = "error", // "error", "alert", "warning", "success"
  message = "Something went wrong!",

  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    error: {
      icon: <FiAlertTriangle className="h-6 w-6 mr-3 text-red-500" />,
      container: "bg-red-100 border border-red-400 text-red-700",
      progressBar: "bg-red-400",
    },
    alert: {
      icon: <IoInformationCircle className="h-6 w-6 mr-3 text-yellow-500" />,
      container: "bg-yellow-100 border border-yellow-400 text-yellow-700",
      progressBar: "bg-yellow-400",
    },
    warning: {
      icon: <FiAlertTriangle className="h-6 w-6 mr-3 text-orange-500" />,
      container: "bg-orange-100 border border-orange-400 text-orange-700",
      progressBar: "bg-orange-400",
    },
    success: {
      icon: <IoCheckmarkCircle className="h-6 w-6 mr-3 text-green-500" />,
      container: "bg-green-100 border border-green-400 text-green-700",
      progressBar: "bg-green-400",
    },
  };

  const { icon, container, progressBar } = typeStyles[type] || typeStyles.error;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-96">
      <div
        className={`relative px-6 py-4 rounded shadow-lg flex items-center ${container}`}
      >
        {icon}
        <span className="block sm:inline flex-grow">{message}</span>
        <button
          onClick={() => {
            setIsVisible(false);
            if (onClose) onClose();
          }}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <IoClose className="h-4 w-4" />
        </button>
        <div
          className={`absolute bottom-0 left-0 h-1 ${progressBar} rounded-b`}
          style={{
            animation: `progress-bar ${duration}ms linear forwards`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ErrorBox;
