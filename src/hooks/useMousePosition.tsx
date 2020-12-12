import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../App';

const useMousePosition = () => {
  const [ positions, setPositions ] = useState({x:0, y:0})
  const theme = useContext(ThemeContext)
  const style = {
    background: theme.background,
    color: theme.color
  }
  useEffect(() => {
    console.log('add effect', positions.x);
    const clickListener = (e: MouseEvent) => {
      setPositions({
        x: e.clientX,
        y: e.clientY
      })
    }
    document.addEventListener('mousemove', clickListener)
    console.log('remove effect', positions.x);
    return () => {document.removeEventListener('mousemove', clickListener)}
  }, [])
  return positions
}

export default useMousePosition