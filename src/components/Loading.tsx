import { Loader } from "lucide-react";
import React from "react";

interface LoadingProps {
  visible?: boolean;
  title?: string; // Thêm prop này
}

const Loading: React.FC<LoadingProps> = ({ visible = true, title = "" }) => {
  if (!visible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 text-center">
        <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        )}
        <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
      </div>
    </div>
  );
};

export default Loading;
