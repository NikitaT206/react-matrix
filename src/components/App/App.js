import styles from './App.module.css';
import { useEffect, useMemo, useState } from 'react';
import { Symbol } from '../Symbol/Symbol';
import { ArrayOfSymbols } from '../ArrayOfSymbols/ArrayOfSymbols';

function App() {

  const [width, setWidth] = useState(window.innerWidth)

  const array = useMemo(() => [...new Array(Math.floor(width / 30))], [width])

  useEffect(() => {
    const resizeListener = () => {
      setTimeout(() => {
        setWidth(window.innerWidth)
      }, 1000)
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])
 
  return (
    <div className={styles.app}>
      {array.map((item, index) => {
        return <ArrayOfSymbols key={index}/>
      })}
    </div>
  );
}

export default App;