import React from 'react';
import { EyeIcon, WorkflowIcon, WorkflowBuilderIcon } from './icons';

interface HeaderProps {
  currentView: 'detail' | 'summary';
  onViewChange: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, onViewChange }) => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-zinc-900/80 backdrop-blur-sm border-b border-zinc-700/50 h-16 shadow-lg z-10">
      <div className="flex items-center gap-3">
        <WorkflowBuilderIcon />
        <h1 className="text-xl font-semibold text-gray-100 tracking-wide">
          Workflow Builder
        </h1>
      </div>
      <button
        onClick={onViewChange}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105"
        aria-label={currentView === 'detail' ? 'Show workflow summary' : 'Show detailed workflow'}
      >
        {currentView === 'detail' ? <EyeIcon /> : <WorkflowIcon />}
        <span>{currentView === 'detail' ? 'Show Summary' : 'Show Details'}</span>
      </button>
    </header>
  );
};

export default Header;