import React, { ReactNode } from 'react';
import { PlayIcon, SendIcon, ClockIcon, MailIcon, CouponIcon, GitForkIcon, FlagIcon, CheckCircleIcon, XCircleIcon } from './icons';

interface SummaryViewProps {
  summary: string[];
}

const getIconForStep = (type: string): ReactNode => {
    const iconClass = "h-6 w-6";
    switch(type) {
        case 'START': return <PlayIcon className={iconClass + " text-green-400"} />;
        case 'ACTION': return <SendIcon className={iconClass + " text-blue-400"} />;
        case 'LOGIC': return <GitForkIcon className={iconClass + " text-purple-400"} />;
        case 'END': return <FlagIcon className={iconClass + " text-rose-400"} />;
        case 'PATH_YES': return <CheckCircleIcon className={iconClass + " text-green-400"} />;
        case 'PATH_NO': return <XCircleIcon className={iconClass + " text-rose-400"} />;
        default: return <SendIcon className={iconClass + " text-gray-400"} />;
    }
}


const SummaryView: React.FC<SummaryViewProps> = ({ summary }) => {
  const renderSummaryTree = (lines: string[], level = 0) => {
    let i = 0;
    const elements = [];

    while (i < lines.length) {
      const line = lines[i];
      const [type, content] = line.split('::');

      if (type === 'PATH_YES' || type === 'PATH_NO') {
        const pathBlock = [];
        i++;
        while (i < lines.length && !['PATH_YES', 'PATH_NO', 'END_LOGIC'].includes(lines[i].split('::')[0])) {
          pathBlock.push(lines[i]);
          i++;
        }
        
        elements.push(
          <div key={`${line}-${i}`} className="ml-8 pl-8 border-l-2 border-dashed border-zinc-600 relative">
             <div className="absolute -left-[11px] top-4 h-6 w-6 bg-zinc-800 rounded-full flex items-center justify-center">
                {getIconForStep(type)}
            </div>
            {renderSummaryTree(pathBlock, level + 1)}
          </div>
        );
        
        // This handles the case where an END_LOGIC might immediately follow a path block
        if(i < lines.length && lines[i].split('::')[0] === 'END_LOGIC') {
            i++;
        }

      } else {
        const isLast = i === lines.length -1 || (i < lines.length-1 && !lines[i+1].startsWith("PATH"));
        elements.push(
          <div key={`${line}-${i}`} className="relative pl-12 pb-8">
            {!isLast && <div className="absolute left-[22px] top-8 h-full w-0.5 bg-zinc-700" />}
            <div className="absolute left-0 top-2 h-11 w-11 bg-zinc-900 rounded-full flex items-center justify-center ring-4 ring-zinc-800">
                {getIconForStep(type)}
            </div>
            <div className="bg-zinc-800/50 p-4 rounded-lg border border-zinc-700">
              <p className="font-bold text-lg text-gray-100">{content.split(':')[0]}</p>
              <p className="text-gray-300">{content.substring(content.indexOf(':') + 1).trim()}</p>
            </div>
          </div>
        );
        i++;
      }
    }
    return elements;
  };
  
  return (
    <div className="p-8 h-full overflow-y-auto bg-zinc-900 text-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white border-b-2 border-indigo-500 pb-3">Workflow Summary</h2>
        {summary.length > 0 ? (
          <div>{renderSummaryTree(summary)}</div>
        ) : (
          <p className="text-gray-400 text-center text-xl mt-10">No valid workflow to summarize. Please ensure there is a Start node.</p>
        )}
      </div>
    </div>
  );
};

export default SummaryView;