import React from 'react';
import { NodeType } from '../types';
import { PlayIcon, SendIcon, GitForkIcon, FlagIcon } from './icons';

interface DraggableNodeProps {
    type: NodeType;
    label: string;
    icon: React.ReactNode;
    color: string;
}

const DraggableNode: React.FC<DraggableNodeProps> = ({ type, label, icon, color }) => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    return (
        <div
            onDragStart={(event) => onDragStart(event, type)}
            draggable
            className="flex items-center gap-3 p-3 mb-4 bg-zinc-800/50 border border-zinc-700 rounded-lg cursor-grab hover:bg-zinc-700/80 hover:border-indigo-500 transition-all duration-200 ease-in-out transform hover:translate-x-1"
        >
            <div className={`p-2 rounded-md ${color} shadow-inner`}>{icon}</div>
            <span className="font-semibold text-gray-200">{label}</span>
        </div>
    );
};

const Sidebar = () => {
    return (
        <aside className="w-64 p-4 bg-zinc-900 border-r border-zinc-800 shadow-xl">
            <h2 className="text-lg font-bold mb-6 text-gray-300 tracking-wider border-b border-zinc-700 pb-2">Nodes</h2>
            <DraggableNode type={NodeType.Start} label="Start" icon={<PlayIcon />} color="bg-green-600" />
            <DraggableNode type={NodeType.Action} label="Action" icon={<SendIcon />} color="bg-blue-600" />
            <DraggableNode type={NodeType.Logic} label="Condition" icon={<GitForkIcon />} color="bg-purple-600" />
            <DraggableNode type={NodeType.End} label="End" icon={<FlagIcon />} color="bg-rose-600" />
        </aside>
    );
};

export default Sidebar;