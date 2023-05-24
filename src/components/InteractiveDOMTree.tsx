import React, { useEffect, useState } from 'react';
import { CustomNodeModel } from './CustomNodeModel';
import { CustomNodeWidget } from './CustomNodeWidget';
import styles from './InteractiveDOMTree.module.css';

import {
  DiagramEngine,
  DiagramModel,
  DefaultNodeFactory,
  DefaultLinkFactory,
  DefaultLabelFactory,
  DefaultPortFactory,
} from '@projectstorm/react-diagrams';

interface InteractiveDOMTreeProps {
  data: {
    id: string;
    name: string;
    children: any[];
  };
  pattern: any[];
}

const InteractiveDOMTree: React.FC<InteractiveDOMTreeProps> = ({ data, pattern }) => {
  const [treeData, setTreeData] = useState(data);
  const [rerenderingNodes, setRerenderingNodes] = useState<Set<string>>(new Set());

  const engine = new DiagramEngine();

engine.getNodeFactories().registerFactory(new DefaultNodeFactory());
engine.getLinkFactories().registerFactory(new DefaultLinkFactory());
engine.getLabelFactories().registerFactory(new DefaultLabelFactory());
engine.getPortFactories().registerFactory(new DefaultPortFactory());

  const model = new DiagramModel();

  const createDiagramNodes = (data, x, y) => {
    const node = new CustomNodeModel(data);
    node.setPosition(x, y);
    model.addNode(node);

    if (data.children) {
      data.children.forEach((child, index) => {
        createDiagramNodes(child, x + 200, y + index * 100);
      });
    }
  };

  createDiagramNodes(treeData, 50, 50);
  engine.setModel(model);

  const rerenderComponentAndChildren = (node: any, rerenderingNodes: Set<string>) => {
    if (node.memo) {
      return;
    }
  
    setRerenderingNodes((prev) => new Set([...prev, node.id]));
  
    node.children.forEach((child) => rerenderComponentAndChildren(child, rerenderingNodes));
  };

  const handleRerender = (id: string) => {
    const updateTreeData = (node: any) => {
      if (node.id === id || rerenderingNodes.has(node.id)) {
        rerenderComponentAndChildren(node, rerenderingNodes);
        return { ...node, children: node.children.map(updateTreeData) };
      } else {
        return { ...node, children: node.children.map(updateTreeData) };
      }
    };
  
    setRerenderingNodes((prev) => new Set([...prev, id]));
    setTreeData(updateTreeData(treeData));
  };
  
  
  
  

useEffect(() => {
if (rerenderingNodes.size > 0) {
const timer = setTimeout(() => {
setRerenderingNodes(new Set());
}, 1000);
return () => clearTimeout(timer);
}
}, [rerenderingNodes]);

return (
<div className={styles.interactiveDomTree}>
{model.getNodes().map((node) => (
<CustomNodeWidget
key={node.getID()}
node={node as CustomNodeModel}
onRerender={handleRerender}
rerenderingNodes={rerenderingNodes}
/>
))}
</div>
);
};

export default InteractiveDOMTree;