import styles from './ArrayOfSymbols.module.css'
import { useState, useEffect } from 'react'
import { Symbol } from '../Symbol/Symbol'

export function ArrayOfSymbols() {

  const [height, setHeight] = useState(window.innerHeight)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loop, setLoop] = useState(true)
  const [array, setArray] = useState([...new Array(Math.floor(height / 30))])
  const [resize, setResize] = useState(false)
  
  const [randomIndex, setRandomIndex] = useState(Math.floor(Math.random() * array.length - 1))
  const [randomDelay, setRandomDelay] = useState(Math.floor(Math.random() * 2000 + 50))

  useEffect(() => {
    if (loop) {
      setRandomDelay(Math.floor(Math.random() * 100 + 50))
      setRandomIndex(Math.floor(Math.random() * array.length - 1))
    }
  }, [loop])

  useEffect(() => {
    const resizeListener = () => {
      setTimeout(() => {
        setHeight(window.innerHeight)
        setResize(true)
      }, 0)
    }
    window.addEventListener('resize', resizeListener)
    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  useEffect(() => {
    if (resize) {
      window.location.reload()
    }
  }, [resize])

  useEffect(() => {
    const randomTimeout = Math.floor(Math.random() * 4000) 
    const timeout = setTimeout(() => {
      if (loop) {
        const randomDelay = Math.floor(Math.random() * 110 + 50)
        for (let i = 0; i < array.length; i++) {
          const timeout = setTimeout(() => {
            setCurrentIndex(state => state + 1)
            clearTimeout(timeout)
          }, i * randomDelay)
        }
      }
      clearTimeout(timeout)
    }, randomTimeout)
   
  }, [loop])

  useEffect(() => {
    setLoop(false)
    if (currentIndex >= array.length) {
      const randomDelay = Math.floor(Math.random() * 1000 + 0) 
      setCurrentIndex(0)
      const timeout = setTimeout(() => {
        setLoop(true)
        clearTimeout(timeout)
      }, randomDelay + 2000)
    }
  }, [currentIndex])

  return (
    <div className={styles.array}>
      {array.map((item, index, arr) => {
        return <Symbol 
          randomIndex={randomIndex} 
          randomDelay={randomDelay} 
          arr={arr} 
          index={index} 
          currentIndex={currentIndex} 
          loop={loop} 
          key={index}
        />
      })}
    </div>
  )
}