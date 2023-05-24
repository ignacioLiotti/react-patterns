'use client'
import React, { useEffect, useState } from 'react';
import { useAnimationContext } from './Wrapper';
import style from './Component.module.css';

const Component = ({ id, className, children }) => {
  const [reload, setReload] = useState(false);
  const handleReload = () => {
    setReload(!reload);
  };

  console.log('Component', id)

  const [backgroundColor, setBackgroundColor] = useState('white');

  useEffect(() => {
    setBackgroundColor('lightblue');
    setTimeout(() => {
      setBackgroundColor('white');
    }, 1000);
  }, []);

  useEffect(() => {
    setBackgroundColor('limegreen');
    setTimeout(() => {
      setBackgroundColor('white');
    }, 1000);
  }, [reload]);

  return (
    <div className={style.component + ' ' + className} style={{ backgroundColor }}>
      <div>Child {id}</div>
      <button onClick={handleReload}>{reload.toString()}</button>
      {children}
    </div>
  );
};

export default Component;

export function FirstComponent() {

  console.log('FirstComponent');

  function ThirdComponent () {
    console.log('ThirdComponent');
    return(
      <Component className={style.position3} id={3} />
    )
  }

  return(
    <Component className={style.position1} id={1}>
      <SecondComponent>
        <ThirdComponent/>
      </SecondComponent>
    </Component>
  )
}

function SecondComponent({children}) {
  
  console.log('SecondComponent');
  
  return(
    <Component className={style.position2} id={2}>
      {children}
    </Component>
  )
}
