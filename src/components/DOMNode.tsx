import React from 'react';
import styles from './DOMNode.module.css';
import RerenderButton from './RerenderButton';

interface DOMNodeProps {
  data: {
    id: string;
    name: string;
    children: any[];
    memo?: boolean;
    props?: { [key: string]: string };
  };
  onRerender: (id: string) => void;
  rerenderingNodes: Set<string>;
  pattern: any[];
  isProp?: boolean;
  propsStyle?: any;
}

const findComponentInPattern = (pattern: any[], id: string): any => {
  for (const component of pattern) {
    if (component.id === id) {
      return component;
    }
    const foundInChildren = findComponentInPattern(component.children, id);
    if (foundInChildren) {
      return foundInChildren;
    }
  }
  return null;
};

const DOMNode: React.FC<DOMNodeProps> = ({
  data,
  onRerender,
  rerenderingNodes,
  pattern,
  isProp,
  propsStyle,
}) => {
  if (!data) {
    return null;
  }

  const isRerendering = rerenderingNodes.has(data.id);
  const passedProps = data.props || {};
  const propChildren = getPropChildren(pattern, passedProps);
  const allChildren = [...data.children, ...propChildren];

  const classNames = [
    styles.domNode,
    isRerendering && styles.rerendering,
    data.memo && styles.memo,
    isProp && styles.propComponent,
  ]
    .filter(Boolean)
    .join(' ');

  const style = {
    left: data.left + 'vw',
    top: data.top + 'vh',
  };

  return (
    <div className={classNames} style={style}>
      <div>{data.name}</div>
      {Object.entries(passedProps).map(([propName, propValue]) => (
        <div className={styles.prop} style={propsStyle}>
          {propName}:
        </div>
      ))}
      <RerenderButton onClick={() => onRerender(data.id)} />
      <div className={styles.children}>
        {allChildren.map((child) => (
          <DOMNode
            key={child?.id}
            data={child}
            onRerender={onRerender}
            rerenderingNodes={rerenderingNodes}
            pattern={pattern}
            isProp={child.isPropChildren ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

const getPropChildren = (pattern: any[], passedProps: { [key: string]: string }): any[] => {
  return Object.entries(passedProps)
    .map(([propName, propValue]) => {
      const propChild = findComponentInPattern(pattern, propValue);
      if (propChild) {
        const { left, top } = passedProps || {};
        return { ...propChild, isPropChildren: true, left, top };
      }
      return null;
    })
    .filter(Boolean); // Remove null values from the array
};

export default DOMNode;
