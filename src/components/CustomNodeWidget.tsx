import React from 'react';
import { CustomNodeModel } from './CustomNodeModel';
import styles from './CustomNodeWidget.module.css';

interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  onRerender: (id: string) => void;
  rerenderingNodes: Set<string>;
}

export class CustomNodeWidget extends React.Component<CustomNodeWidgetProps> {
  render() {
    const { node, onRerender, rerenderingNodes } = this.props;
    const data = node.getOptions().data;
    const isRerendering = rerenderingNodes.has(data?.id);
    console.log('rerenderingNodes', rerenderingNodes)
    const classNames = [styles.customNode, isRerendering && styles.rerendering]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={classNames} style={{ left: node.getX(), top: node.getY() }}>
        <div>{data?.name}</div>
        <button onClick={() => onRerender(data?.id)}>Re-render</button>
      </div>
    );
  }
}
