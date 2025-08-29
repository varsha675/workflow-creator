
import type { Node, Edge, Position } from '@xyflow/react';

export enum NodeType {
  Start = 'start',
  Action = 'action',
  Logic = 'logic',
  End = 'end',
}

export interface NodeData {
  label: string;
  description?: string;
  icon: React.ReactNode;
  color: string;
  // FIX: Add index signature to satisfy Record<string, unknown> constraint for @xyflow/react Node type.
  [key: string]: any;
}

export type CustomNode = Node<NodeData, NodeType>;
export type CustomEdge = Edge;

export interface NodeConfig {
    type: NodeType;
    label: string;
    description?: string;
    icon: React.ReactNode;
    color: string;
    handles: { type: 'source' | 'target'; position: Position; id?: string }[];
}