
import React, { useState, useEffect, useRef, useCallback, MouseEvent } from 'react';
// FIX: The props for a custom node component should be of type Node<TData, TType>, not NodeProps<TData>.
import { Handle, Position, type Node } from '@xyflow/react';
import { NodeType, NodeData } from '../types';
import { PlusIcon } from './icons';

const nodeTypeConfig = {
  [NodeType.Start]: { handles: [{ type: 'source', position: Position.Right }] },
  [NodeType.Action]: { handles: [{ type: 'target', position: Position.Left }, { type: 'source', position: Position.Right }] },
  [NodeType.Logic]: {
    handles: [
      { type: 'target', position: Position.Left },
      { type: 'source', position: Position.Right, id: 'yes', style: { top: '35%' } },
      { type: 'source', position: Position.Right, id: 'no', style: { top: '65%' } },
    ],
  },
  [NodeType.End]: { handles: [{ type: 'target', position: Position.Left }] },
};

interface CustomNodeData extends NodeData {
    // FIX: Add onDataChange to the interface as it is destructured from data.
    onDataChange: (data: Partial<{ label: string; description: string }>) => void;
    onOpenContextMenu: (position: { top: number, left: number }) => void;
}

// FIX: Change the props type from NodeProps<CustomNodeData> to Node<CustomNodeData, NodeType> to satisfy the type constraints.
const CustomNodeComponent: React.FC<Node<CustomNodeData, NodeType>> = ({ id, data, type, selected }) => {
  const { label, description, icon, color, onDataChange, onOpenContextMenu } = data;
  const config = nodeTypeConfig[type as NodeType];
  const [currentDescription, setCurrentDescription] = useState(description);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, []);
  
  useEffect(() => {
    setCurrentDescription(description);
  }, [description]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [currentDescription, adjustTextareaHeight]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentDescription(e.target.value);
    adjustTextareaHeight();
  };
  
  const handleBlur = () => {
    if(currentDescription !== description) {
        onDataChange({ description: currentDescription });
    }
  };

  const handleAddClick = (e: MouseEvent) => {
      e.stopPropagation();
      const rect = e.currentTarget.getBoundingClientRect();
      onOpenContextMenu({ top: rect.top + window.scrollY, left: rect.left + window.scrollX + rect.width + 10 });
  }

  const hasSourceHandle = config.handles.some(h => h.type === 'source');

  return (
    <div className={`group w-64 rounded-xl shadow-2xl border ${selected ? 'border-indigo-500 shadow-indigo-500/20' : 'border-zinc-700'} transition-all duration-200 bg-zinc-800/70 backdrop-blur-sm relative`}>
      <div className={`flex items-center gap-3 p-3 rounded-t-lg ${color} border-b ${selected ? 'border-indigo-500' : 'border-zinc-700'}`}>
        {icon}
        <h3 className="font-bold text-white tracking-wide">{label}</h3>
      </div>
      <div className="p-3">
        <textarea
          ref={textareaRef}
          value={currentDescription}
          onChange={handleDescriptionChange}
          onBlur={handleBlur}
          className="w-full p-2 text-sm bg-zinc-700/50 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none overflow-hidden"
          placeholder="Enter description..."
          rows={1}
        />
      </div>
      {config.handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={handle.id}
          style={handle.style}
        />
      ))}
      {type === NodeType.Logic && (
        <>
            <div className="absolute right-[-30px] top-[35%] translate-y-[-50%] text-xs font-semibold text-green-400 bg-zinc-900/50 px-1.5 py-0.5 rounded">Yes</div>
            <div className="absolute right-[-28px] top-[65%] translate-y-[-50%] text-xs font-semibold text-rose-400 bg-zinc-900/50 px-1.5 py-0.5 rounded">No</div>
        </>
      )}
      {hasSourceHandle && (
          <button onClick={handleAddClick} className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 scale-90 transition-all duration-200 ease-in-out transform hover:bg-indigo-500 shadow-lg" aria-label="Add new node">
            <PlusIcon />
          </button>
      )}
    </div>
  );
};

export default CustomNodeComponent;