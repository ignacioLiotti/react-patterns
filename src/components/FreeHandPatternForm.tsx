import React, { useState } from 'react';
import styles from './FreeHandPatternForm.module.css';

interface FreeHandPatternFormProps {
  onSubmit: (data: any) => void;
}

const FreeHandPatternForm: React.FC<FreeHandPatternFormProps> = ({ onSubmit }) => {
  const [patternData, setPatternData] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsedData = JSON.parse(patternData);
    onSubmit(parsedData);
  };

  return (
    <form className={styles.freeHandPatternForm} onSubmit={handleSubmit}>
      <label htmlFor="patternData">Enter your custom pattern data (JSON):</label>
      <textarea
        id="patternData"
        value={patternData}
        onChange={(event) => setPatternData(event.target.value)}
      />
      <button type="submit">Create custom pattern</button>
    </form>
    );
};

export default FreeHandPatternForm;
