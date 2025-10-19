"use client";
import React, { ReactNode } from "react";
import { Trash2, Copy, ChevronUp, ChevronDown } from "lucide-react";

interface EditableSectionProps {
  id: string;
  onDelete: () => void;
  onDuplicate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
  children: ReactNode;
  showControls?: boolean;
}

export default function EditableSection({
  id,
  onDelete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
  children,
  showControls = true,
}: EditableSectionProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && showControls && (
        <div className="absolute left-0.5 right-0.5 -top-8 flex flex-row items-center justify-center gap-2 z-10">
          <button
            onClick={onMoveUp}
            disabled={isFirst}
            className={`p-2 h-8 w-8 cursor-pointer rounded shadow-lg ${
              isFirst 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            title="Move section up"
          >
            <ChevronUp size={16} />
          </button>
          <button
            onClick={onMoveDown}
            disabled={isLast}
            className={`p-2 h-8 w-8 cursor-pointer rounded shadow-lg ${
              isLast 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            title="Move section down"
          >
            <ChevronDown size={16} />
          </button>
          <button
            onClick={onDuplicate}
            className="p-2 h-8 w-8 cursor-pointer bg-blue-500 text-white rounded hover:bg-blue-600 shadow-lg"
            title="Duplicate section"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-2 h-8 w-8 cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 shadow-lg"
            title="Delete section"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
      {children}
    </div>
  );
}