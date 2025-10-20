"use client";
import { ChevronDown, ChevronRight, Type } from "lucide-react";
import { StyleProps } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { updateSingleStyle } from "@/store/resumeSlice";
import { RootState } from "@/store/store";
import React from "react";

interface RenderStyleControlProps {
  label: string;
  section: string;
  sizeKey: keyof StyleProps;
  colorKey: keyof StyleProps;
  boldKey: keyof StyleProps;
  minSize: number;
  maxSize: number;
  expandedSections: Set<string>;
  toggleSection: (section: string) => void;
}

const RenderStyleControl: React.FC<RenderStyleControlProps> = ({
  label,
  section,
  sizeKey,
  colorKey,
  boldKey,
  minSize,
  maxSize,
  expandedSections,
  toggleSection,
}) => {
  const dispatch = useDispatch();
  const styles = useSelector((state: RootState) => state.resume.styles);
  const size = styles[sizeKey] as number;
  const color = styles[colorKey] as string;
  const bold = styles[boldKey] as boolean;

  return (
    <div className="border-b border-gray-100 last:border-b-0">
      <button
        onClick={() => toggleSection(section)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition"
      >
        <div className="flex items-center gap-2">
          {expandedSections.has(section) ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
          <span className="text-sm font-medium text-gray-700">{label}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded border border-gray-300" style={{ backgroundColor: color }} />
          <span className="text-xs text-gray-500">{size}px</span>
        </div>
      </button>
      {expandedSections.has(section) && (
        <div className="px-4 pb-4 space-y-3 bg-gray-50">
          <div className="flex items-center gap-3">
            <Type className="w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={size}
              onChange={(e) =>
                dispatch(updateSingleStyle({ key: sizeKey, value: Number(e.target.value) }))
              }
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-[#10B981]"
              min={minSize}
              max={maxSize}
            />
            <input
              type="range"
              value={size}
              onChange={(e) =>
                dispatch(updateSingleStyle({ key: sizeKey, value: Number(e.target.value) }))
              }
              className="flex-1"
              min={minSize}
              max={maxSize}
            />
          </div>
          <div className="flex items-left justify-left gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) =>
                dispatch(updateSingleStyle({ key: colorKey, value: e.target.value }))
              }
              className="w-10 h-8 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) =>
                dispatch(updateSingleStyle({ key: colorKey, value: e.target.value }))
              }
              className="px-2 w-20 py-1 text-sm border border-gray-300 rounded focus:ring-[#10B981]"
            />
            <div className="flex items-center gap-0.5">
              <input
                type="checkbox"
                id={`${section}Bold`}
                checked={bold}
                onChange={(e) =>
                  dispatch(updateSingleStyle({ key: boldKey, value: e.target.checked }))
                }
                className="w-4 h-4 cursor-pointer border-gray-300 rounded focus:ring-[#10B981]"
              />
              <label htmlFor={`${section}Bold`} className="text-sm font-bold text-gray-600">
                B
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RenderStyleControl;
