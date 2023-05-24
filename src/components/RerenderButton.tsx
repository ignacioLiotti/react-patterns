import React from 'react';
import styles from './RerenderButton.module.css';

interface RerenderButtonProps {
  onClick: () => void;
}

const RerenderButton: React.FC<RerenderButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.rerenderButton} onClick={onClick}>
      Re-render
    </button>
  );
};

export default RerenderButton;
