import React, { useState, useEffect } from 'react';

const MouseTracker: React.FC = () => {
  const [ positions, setPositions ] = useState({x:0, y:0})
  useEffect(() => {
    const clickListener = (e: MouseEvent) => {
      console.log('inner')
      setPositions({
        x: e.clientX,
        y: e.clientY
      })
    }
    document.addEventListener('click', clickListener)
    return () => {document.removeEventListener('click', clickListener)}
  }, [])
  return (
    <p>X: {positions.x}, Y:{positions.y}</p>
  )
}

export default MouseTracker;