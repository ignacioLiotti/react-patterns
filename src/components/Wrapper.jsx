import React, { useState, createContext, useContext } from 'react';

const AnimationContext = createContext();

export const Wrapper = ({ children }) => {
  const [animationIds, setAnimationIds] = useState([]);

  return (
    <AnimationContext.Provider value={{ animationIds, setAnimationIds }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimationContext = () => useContext(AnimationContext);