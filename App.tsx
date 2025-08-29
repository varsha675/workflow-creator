
import React, { useState, useCallback, DragEvent, useRef } from 'react';
import { addEdge, useNodesState, useEdgesState, Position } from '@xyflow/react';
import type { OnConnect, OnEdgesChange, OnNodesChange, Edge } from '@xyflow/react';
import { NodeType, CustomNode, CustomEdge } from './types';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WorkflowCanvas from './components/WorkflowCanvas';
import SummaryView from './components/SummaryView';
import NodeContextMenu from './components/NodeContextMenu';
import { generateSummary } from './services/summaryGenerator';
import { PlayIcon, SendIcon, GitForkIcon, FlagIcon, MailIcon, CouponIcon, ClockIcon } from './components/icons';

const initialNodes: CustomNode[] = [
  // Level 0
  {
    id: '1', type: 'start', position: { x: 50, y: 400 },
    data: { label: 'Start', description: 'Cart abandoned for 7+ days', icon: <PlayIcon />, color: 'bg-green-600' },
  },
  // Level 1
  {
    id: '2', type: 'action', position: { x: 350, y: 400 },
    data: { label: 'Action', description: 'Send Push Notification', icon: <SendIcon />, color: 'bg-blue-600' },
  },
  {
    id: '3', type: 'logic', position: { x: 650, y: 400 },
    data: { label: 'Condition', description: 'Wait 2 days & check purchase', icon: <ClockIcon />, color: 'bg-purple-600' },
  },
  // Level 2
  {
    id: '4', type: 'end', position: { x: 950, y: 300 },
    data: { label: 'End', description: 'Converted', icon: <FlagIcon />, color: 'bg-emerald-600' },
  },
  {
    id: '5', type: 'action', position: { x: 950, y: 500 },
    data: { label: 'Action', description: 'Email/WhatsApp Blast', icon: <MailIcon />, color: 'bg-blue-600' },
  },
  // Level 3
  {
    id: '6', type: 'logic', position: { x: 1250, y: 500 },
    data: { label: 'Condition', description: 'Wait 2 days & check purchase', icon: <ClockIcon />, color: 'bg-purple-600' },
  },
  // Level 4
  {
    id: '7', type: 'end', position: { x: 1550, y: 400 },
    data: { label: 'End', description: 'Converted', icon: <FlagIcon />, color: 'bg-emerald-600' },
  },
  {
    id: '8', type: 'action', position: { x: 1550, y: 600 },
    data: { label: 'Action', description: 'Send 15% Off Coupon', icon: <CouponIcon />, color: 'bg-amber-500' },
  },
  // Level 5
  {
    id: '9', type: 'logic', position: { x: 1850, y: 600 },
    data: { label: 'Condition', description: 'Wait 2 days & check purchase', icon: <ClockIcon />, color: 'bg-purple-600' },
  },
  // Level 6
  {
    id: '10', type: 'end', position: { x: 2150, y: 500 },
    data: { label: 'End', description: 'Converted', icon: <FlagIcon />, color: 'bg-emerald-600' },
  },
  {
    id: '11', type: 'end', position: { x: 2150, y: 700 },
    data: { label: 'End', description: 'Not Converted', icon: <FlagIcon />, color: 'bg-rose-600' },
  },
];


const initialEdges: CustomEdge[] = [
  { id: 'e1-2', source: '1', target: '2', type: 'custom-edge', animated: true },
  { id: 'e2-3', source: '2', target: '3', type: 'custom-edge', animated: true },
  { id: 'e3-4', source: '3', target: '4', sourceHandle: 'yes', label: 'Yes', type: 'custom-edge', animated: true },
  { id: 'e3-5', source: '3', target: '5', sourceHandle: 'no', label: 'No', type: 'custom-edge', animated: true },
  { id: 'e5-6', source: '5', target: '6', type: 'custom-edge', animated: true },
  { id: 'e6-7', source: '6', target: '7', sourceHandle: 'yes', label: 'Yes', type: 'custom-edge', animated: true },
  { id: 'e6-8', source: '6', target: '8', sourceHandle: 'no', label: 'No', type: 'custom-edge', animated: true },
  { id: 'e8-9', source: '8', target: '9', type: 'custom-edge', animated: true },
  { id: 'e9-10', source: '9', target: '10', sourceHandle: 'yes', label: 'Yes', type: 'custom-edge', animated: true },
  { id: 'e9-11', source: '9', target: '11', sourceHandle: 'no', label: 'No', type: 'custom-edge', animated: true },
];

let id = 12;
const getId = () => `${id++}`;

type ContextMenuContext = { type: 'node', nodeId: string } | { type: 'edge', edge: Edge };
interface ContextMenuState {
  top: number;
  left: number;
  context: ContextMenuContext;
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [view, setView] = useState<'detail' | 'summary'>('detail');
  const [summary, setSummary] = useState<string[]>([]);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: 'custom-edge', animated: true }, eds)),
    [setEdges]
  );
  
  const handleViewChange = () => {
    if (view === 'detail') {
      setSummary(generateSummary(nodes, edges));
      setView('summary');
    } else {
      setView('detail');
    }
  };
  
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current) { return; }
      
      const type = event.dataTransfer.getData('application/reactflow') as NodeType;
      if (typeof type === 'undefined' || !type) { return; }
      
      const { getBoundingClientRect } = reactFlowWrapper.current;
      const position = {
        x: event.clientX - getBoundingClientRect().left - 128,
        y: event.clientY - getBoundingClientRect().top - 40,
      };
      
      const newNode = createNewNode(type, position);
      if(newNode) setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );
  
  const onNodeDataChange = (nodeId: string, data: Partial<{label: string, description: string}>) => {
    setNodes((nds) => 
      nds.map((node) => {
        if(node.id === nodeId) {
          return {...node, data: {...node.data, ...data}};
        }
        return node;
      })
    );
  };
  
  const createNewNode = (type: NodeType, position: {x: number, y: number}): CustomNode | null => {
      let newNodeData: { label: string; description: string; icon: JSX.Element; color: string; };
      switch (type) {
        case NodeType.Start:
            newNodeData = { label: 'Start', description: 'Workflow Trigger', icon: <PlayIcon />, color: 'bg-green-600' };
            break;
        case NodeType.Action:
            newNodeData = { label: 'Action', description: 'Perform an action', icon: <SendIcon />, color: 'bg-blue-600' };
            break;
        case NodeType.Logic:
            newNodeData = { label: 'Condition', description: 'Check a condition', icon: <GitForkIcon />, color: 'bg-purple-600' };
            break;
        case NodeType.End:
            newNodeData = { label: 'End', description: 'Workflow complete', icon: <FlagIcon />, color: 'bg-rose-600' };
            break;
        default:
            return null;
      }

      return { id: getId(), type, position, data: newNodeData };
  };
  
  const openContextMenu = (position: { top: number, left: number }, context: ContextMenuContext) => {
    setContextMenu({ ...position, context });
  };
  
  const closeContextMenu = () => setContextMenu(null);

  const handleNodeAdd = (nodeType: NodeType) => {
    if (!contextMenu) return;

    const { context } = contextMenu;

    if (context.type === 'node') {
      const sourceNode = nodes.find(n => n.id === context.nodeId);
      if (!sourceNode) return;
      
      const newNodePosition = {
        x: sourceNode.position.x + 300,
        y: sourceNode.position.y
      };
      const newNode = createNewNode(nodeType, newNodePosition);
      if (!newNode) return;
      
      const newEdge: CustomEdge = {
          id: `e${sourceNode.id}-${newNode.id}`,
          source: sourceNode.id,
          target: newNode.id,
          type: 'custom-edge',
          animated: true,
      };
      
      setNodes(nds => nds.concat(newNode));
      setEdges(eds => addEdge(newEdge, eds));

    } else if (context.type === 'edge') {
      const originalEdge = context.edge;
      const sourceNode = nodes.find(n => n.id === originalEdge.source);
      const targetNode = nodes.find(n => n.id === originalEdge.target);
      if(!sourceNode || !targetNode) return;

      const newNodePosition = {
          x: (sourceNode.position.x + targetNode.position.x) / 2,
          y: (sourceNode.position.y + targetNode.position.y) / 2 - 20,
      }
      const newNode = createNewNode(nodeType, newNodePosition);
      if(!newNode) return;

      setNodes(nds => nds.concat(newNode));
      setEdges(eds => {
        const newEdges = eds.filter(e => e.id !== originalEdge.id);
        newEdges.push({id: `e${originalEdge.source}-${newNode.id}`, source: originalEdge.source, target: newNode.id, sourceHandle: originalEdge.sourceHandle, type: 'custom-edge', animated: true});
        newEdges.push({id: `e${newNode.id}-${originalEdge.target}`, source: newNode.id, target: originalEdge.target, targetHandle: originalEdge.targetHandle, type: 'custom-edge', animated: true});
        return newEdges;
      });
    }
    
    closeContextMenu();
  };

  return (
    <div className="flex flex-col h-screen font-sans" onClick={closeContextMenu}>
      <Header currentView={view} onViewChange={handleViewChange} />
      <div className="flex flex-grow h-[calc(100vh-64px)]">
        <Sidebar />
        <main className="flex-grow h-full bg-zinc-900" ref={reactFlowWrapper}>
          {view === 'detail' ? (
            <WorkflowCanvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange as OnNodesChange}
              onEdgesChange={onEdgesChange as OnEdgesChange}
              onConnect={onConnect}
              onDragOver={onDragOver}
              onDrop={onDrop}
              onNodeDataChange={onNodeDataChange}
              onOpenContextMenu={openContextMenu}
            />
          ) : (
            <SummaryView summary={summary} />
          )}
          {contextMenu && <NodeContextMenu {...contextMenu} onSelect={handleNodeAdd} onClose={closeContextMenu} />}
        </main>
      </div>
    </div>
  );
}
