
import React, { MouseEvent } from 'react';
import { NodeType } from '../types';
import { PlayIcon, SendIcon, GitForkIcon, FlagIcon } from './icons';

interface NodeContextMenuProps {
  top: number;
  left: number;
  onSelect: (nodeType: NodeType) => void;
  onClose: () => void;
}

const nodeOptions = [
  { type: NodeType.Action, label: 'Action', icon: <SendIcon />, color: 'bg-blue-600' },
  { type: NodeType.Logic, label: 'Condition', icon: <GitForkIcon />, color: 'bg-purple-600' },
  { type: NodeType.End, label: 'End', icon: <FlagIcon />, color: 'bg-rose-600' },
];

const NodeContextMenu: React.FC<NodeContextMenuProps> = ({ top, left, onSelect, onClose }) => {
  
  const handleSelect = (e: MouseEvent, nodeType: NodeType) => {
    e.stopPropagation();
    onSelect(nodeType);
  };
  
  const handleContainerClick = (e: MouseEvent) => {
      e.stopPropagation();
  }

  return (
    <div
      style={{ top, left }}
      className="absolute z-50 w-56 p-2 bg-zinc-800/80 backdrop-blur-md border border-zinc-700 rounded-xl shadow-2xl animate-fade-in"
      onClick={handleContainerClick}
    >
        <p className="text-xs font-semibold text-zinc-400 px-2 pb-1 uppercase tracking-wider">Add next step</p>
        {nodeOptions.map(({ type, label, icon, color }) => (
            <button
            key={type}
            onClick={(e) => handleSelect(e, type)}
            className="flex items-center w-full gap-3 p-2 text-left rounded-md hover:bg-indigo-600/50 transition-colors duration-150 ease-in-out"
            >
                <div className={`p-1.5 rounded-md ${color}`}>{icon}</div>
                <span className="font-semibold text-gray-200 text-sm">{label}</span>
            </button>
        ))}
    </div>
  );
};

export default NodeContextMenu;
