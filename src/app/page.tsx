'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import InteractiveDOMTree from '@/components/InteractiveDOMTree';
import FreeHandPatternForm from '@/components/FreeHandPatternForm';
import MainLayout from '@/components/MainLayout';
import patterns from '@/components/patterns';
import CodeGenerator from '@/components/CodeGenerator';
import BlackHole from '@/components/BlackHole';

const PatternPage: React.FC = () => {

  const pattern = patterns[0];

  const [customPattern, setCustomPattern] = useState(null);

  const handleCustomPatternSubmit = (data: any) => {
    setCustomPattern(data);
  };

  if (!pattern) {
    return (
      <MainLayout>
        <p>Pattern not found.</p>
      </MainLayout>
    );
  }

  const dataToRender = customPattern || pattern.data;

  return (
    <MainLayout>
      {/* <InteractiveDOMTree data={dataToRender} pattern={pattern.data.children} /> */}
      {/* <CodeGenerator data={pattern.data} /> */}
      {/* <FreeHandPatternForm onSubmit={handleCustomPatternSubmit} /> */}
      <BlackHole/>
    </MainLayout>
  );
};

export default PatternPage;