import { CustomNode, CustomEdge, NodeType } from '../types';

export const generateSummary = (nodes: CustomNode[], edges: CustomEdge[]): string[] => {
  const summary: string[] = [];
  const nodeMap = new Map(nodes.map(node => [node.id, node]));
  const outgoingEdges = new Map<string, CustomEdge[]>();

  edges.forEach(edge => {
    if (!outgoingEdges.has(edge.source)) {
      outgoingEdges.set(edge.source, []);
    }
    outgoingEdges.get(edge.source)!.push(edge);
  });

  const startNode = nodes.find(node => node.type === NodeType.Start);

  if (!startNode) {
    return [];
  }
  
  const traverse = (nodeId: string) => {
    const node = nodeMap.get(nodeId);
    if (!node) return;

    let prefix = '';
    switch(node.type) {
        case NodeType.Start: prefix = 'START'; break;
        case NodeType.Action: prefix = 'ACTION'; break;
        case NodeType.Logic: prefix = 'LOGIC'; break;
        case NodeType.End: prefix = 'END'; break;
    }
    
    summary.push(`${prefix}::${node.data.label}: ${node.data.description}`);

    const edgesFromNode = outgoingEdges.get(nodeId) || [];
    
    if (node.type === NodeType.Logic) {
      const yesEdge = edgesFromNode.find(e => e.sourceHandle === 'yes');
      const noEdge = edgesFromNode.find(e => e.sourceHandle === 'no');

      if (yesEdge) {
        summary.push('PATH_YES::Condition is met');
        traverse(yesEdge.target);
      }
      if (noEdge) {
        summary.push('PATH_NO::Condition is not met');
        traverse(noEdge.target);
      }
      summary.push('END_LOGIC::'); // Marker to close the logic block
    } else {
      edgesFromNode.forEach(edge => {
        traverse(edge.target);
      });
    }
  };

  traverse(startNode.id);
  
  return summary.filter(line => line !== 'END_LOGIC::');
};