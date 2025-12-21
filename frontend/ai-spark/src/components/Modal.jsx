import React from "react";
import { createPortal } from "react-dom";

const Modal = ({
  children,
  isOpen,
  onClose,
  title,
  hideHeader = false,
  showActionBtn = false,
  actionBtnIcon = null,
  actionBtnText = "Action",
  onActionClick,
}) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-[95vw] max-w-7xl h-[90vh] p-6 relative overflow-hidden transform transition-all duration-300 hover:scale-[1.02]">
        
        {/* Header */}
        {!hideHeader && (
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-extrabold bg-clip-text text-transparent 
              bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500">
              {title}
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ✖
            </button>
          </div>
        )}

        {/* Modal Content */}
        <div className="h-full overflow-y-auto">{children}</div>

        {/* Action Button */}
        {showActionBtn && (
          <div className="flex justify-end mt-4">
            <button
              onClick={onActionClick}
              className="flex items-center gap-2 bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500
                         text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-2xl 
                         hover:scale-105 transition-all duration-300"
            >
              {actionBtnIcon && <span>{actionBtnIcon}</span>}
              {actionBtnText}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
