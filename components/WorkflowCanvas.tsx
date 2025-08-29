
import React, { DragEvent } from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import type { OnConnect, OnEdgesChange, OnNodesChange, Edge } from '@xyflow/react';
import CustomNodeComponent from './CustomNode';
import CustomEdgeComponent from './CustomEdge';
import { CustomNode, CustomEdge } from '../types';

type ContextMenuContext = { type: 'node', nodeId: string } | { type: 'edge', edge: Edge };

interface WorkflowCanvasProps {
  nodes: CustomNode[];
  edges: CustomEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  onNodeDataChange: (nodeId: string, data: Partial<{ label: string, description: string }>) => void;
  onOpenContextMenu: (position: { top: number, left: number }, context: ContextMenuContext) => void;
}

const nodeTypes = {
  start: CustomNodeComponent,
  action: CustomNodeComponent,
  logic: CustomNodeComponent,
  end: CustomNodeComponent,
};

const edgeTypes = {
    'custom-edge': CustomEdgeComponent,
};

const WorkflowCanvas: React.FC<WorkflowCanvasProps> = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDragOver,
  onDrop,
  onNodeDataChange,
  onOpenContextMenu,
}) => {
    
  const nodesWithDataChangeHandler = nodes.map(node => ({
    ...node,
    data: {
      ...node.data,
      onDataChange: (data: Partial<{ label: string, description: string }>) => onNodeDataChange(node.id, data),
      onOpenContextMenu: (position: {top: number, left: number}) => onOpenContextMenu(position, {type: 'node', nodeId: node.id}),
    },
  }));

  const edgesWithContextMenu = edges.map(edge => ({
      ...edge,
      data: {
          ...edge.data,
          onOpenContextMenu: (position: {top: number, left: number}) => onOpenContextMenu(position, {type: 'edge', edge: edge}),
      }
  }))

  return (
    <div className="h-full w-full">
      <ReactFlow
        nodes={nodesWithDataChangeHandler}
        edges={edgesWithContextMenu}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDrop={onDrop}
        onDragOver={onDragOver}
        fitView
        className="bg-zinc-900"
      >
        <Controls 
          className="[&>button]:bg-zinc-800 [&>button]:border-zinc-700 [&>button:hover]:bg-zinc-700 [&_path]:fill-white" 
        />
        <Background color="#404040" gap={24} />
      </ReactFlow>
    </div>
  );
};

export default WorkflowCanvas;
