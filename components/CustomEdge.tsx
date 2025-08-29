
import React, { MouseEvent } from 'react';
import { getSmoothStepPath, EdgeProps, getEdgeCenter } from '@xyflow/react';
import { PlusIcon } from './icons';

// FIX: Add interface for custom edge data to strongly type the `data` prop.
interface CustomEdgeData {
  onOpenContextMenu: (position: { top: number, left: number }) => void;
}

// FIX: Use generic `EdgeProps<CustomEdgeData>` to correctly type the `data` prop.
const CustomEdge: React.FC<EdgeProps<CustomEdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  
  const handleAddClick = (e: MouseEvent) => {
      e.stopPropagation();
      const { clientX, clientY } = e;
      // FIX: Use optional chaining as `data` can be undefined on an edge.
      data?.onOpenContextMenu({ top: clientY, left: clientX + 10 });
  }

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={40}
        height={40}
        x={edgeCenterX - 20}
        y={edgeCenterY - 20}
        className="group"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="w-full h-full flex items-center justify-center">
            <button 
                onClick={handleAddClick}
                className="w-7 h-7 bg-indigo-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 scale-90 transition-all duration-200 ease-in-out transform hover:bg-indigo-500 shadow-lg"
                aria-label="Insert new node"
            >
                <PlusIcon className="w-5 h-5" />
            </button>
        </div>
      </foreignObject>
    </>
  );
};

export default CustomEdge;